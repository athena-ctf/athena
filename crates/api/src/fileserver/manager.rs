use std::ops::Range;

use bytes::Bytes;
use futures::{StreamExt, TryStreamExt};
use object_store::aws::AmazonS3;
use object_store::local::LocalFileSystem;
use object_store::path::Path;
use object_store::{GetOptions, ObjectMeta, ObjectStore, PutPayload};
use uuid::Uuid;

use crate::errors::{Error, Result};

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

    pub async fn download(&self, id: Uuid, range: Option<Range<usize>>) -> Result<Bytes> {
        Ok(self
            .local
            .get_opts(&Path::from(id.simple().to_string()), GetOptions {
                range: range.map(Into::into),
                ..Default::default()
            })
            .await
            .map_err(|err| match err {
                object_store::Error::NotFound { .. } => Error::NotFound("File not found".to_owned()),
                _ => err.into(),
            })?
            .bytes()
            .await?)
    }

    pub async fn delete(&self, id: Uuid) -> Result<()> {
        self.cloud
            .delete(&Path::from(id.simple().to_string()))
            .await
            .map_err(|err| match err {
                object_store::Error::NotFound { .. } => Error::NotFound("File not found".to_owned()),
                _ => err.into(),
            })?;

        self.local
            .delete(&Path::from(id.simple().to_string()))
            .await
            .map_err(|err| match err {
                object_store::Error::NotFound { .. } => Error::NotFound("File not found".to_owned()),
                _ => err.into(),
            })
    }

    pub async fn list(&self) -> Result<Vec<ObjectMeta>> {
        Ok(self.local.list(None).try_collect().await?)
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

            let data = self
                .local
                .get(&file.location)
                .await
                .map_err(|err| match err {
                    object_store::Error::NotFound { .. } => Error::NotFound("File not found".to_owned()),
                    _ => err.into(),
                })?
                .bytes()
                .await?;
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

            let data = self
                .cloud
                .get(&file.location)
                .await
                .map_err(|err| match err {
                    object_store::Error::NotFound { .. } => Error::NotFound("File not found".to_owned()),
                    _ => err.into(),
                })?
                .bytes()
                .await?;
            self.local.put(&file.location, data.into()).await?;
        }

        Ok(())
    }

    pub async fn meta(&self, id: Uuid) -> Result<ObjectMeta> {
        self.local
            .head(&Path::from(id.simple().to_string()))
            .await
            .map_err(|err| match err {
                object_store::Error::NotFound { .. } => Error::NotFound("File not found".to_owned()),
                _ => err.into(),
            })
    }
}
