use bytes::Bytes;
use futures::StreamExt;
use object_store::aws::AmazonS3;
use object_store::local::LocalFileSystem;
use object_store::path::Path;
use object_store::{ObjectStore, PutPayload};
use uuid::Uuid;

use crate::errors::Result;
use crate::schemas::StoredFile;

pub struct Manager {
    pub local: LocalFileSystem,
    pub cloud: AmazonS3,
}

impl Manager {
    pub fn new(local: LocalFileSystem, cloud: AmazonS3) -> Self {
        Self { local, cloud }
    }

    pub async fn upload(&self, id: Uuid, body: Bytes) -> Result<()> {
        self.local
            .put(&Path::from(id.simple().to_string()), PutPayload::from_bytes(body))
            .await?;
        Ok(())
    }

    pub async fn download(&self, id: Uuid) -> Result<Bytes> {
        Ok(self
            .local
            .get(&Path::from(id.simple().to_string()))
            .await?
            .bytes()
            .await?)
    }

    pub async fn delete(&self, id: Uuid) -> Result<()> {
        self.cloud.delete(&Path::from(id.simple().to_string())).await?;

        Ok(self.local.delete(&Path::from(id.simple().to_string())).await?)
    }

    pub async fn list(&self) -> Result<Vec<StoredFile>> {
        let mut entries = self.local.list(None);
        let mut files = Vec::with_capacity(entries.size_hint().0);

        while let Some(entry) = entries.next().await {
            let entry = entry?;

            files.push(StoredFile {
                last_modified: entry.last_modified,
                size: entry.size,
                location: entry.location.to_string(),
            });
        }

        Ok(files)
    }

    pub async fn sync(&self) -> Result<()> {
        let mut files = self.local.list(None);

        while let Some(file) = files.next().await {
            let file = file?;
            match self.cloud.head(&file.location).await {
                Ok(_) => continue,
                Err(object_store::Error::NotFound { .. }) => {}
                Err(err) => return Err(err.into()),
            }

            let data = self.local.get(&file.location).await?.bytes().await?;
            self.cloud.put(&file.location, data.into()).await?;
        }

        let mut files = self.cloud.list(None);

        while let Some(file) = files.next().await {
            let file = file?;
            match self.local.head(&file.location).await {
                Ok(_) => continue,
                Err(object_store::Error::NotFound { .. }) => {}
                Err(err) => return Err(err.into()),
            }

            let data = self.cloud.get(&file.location).await?.bytes().await?;
            self.local.put(&file.location, data.into()).await?;
        }

        Ok(())
    }
}
