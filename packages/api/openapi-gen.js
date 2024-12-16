import openapiTS from "openapi-typescript";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const baseDir = path.dirname(fileURLToPath(import.meta.url));

const localPath = new URL(path.resolve(baseDir, process.argv[2]), import.meta.url);
openapiTS(localPath, {
  transform(schemaObject, metadata) {
    if (schemaObject.format === "binary") {
      if (metadata.path.endsWith("multipart/form-data")) {
        return schemaObject.nullable ? "File | null" : "File";
      }
      if (metadata.path.endsWith("application/octet-stream")) {
        return schemaObject.nullable ? "Blob | null" : "Blob";
      }
    }
    return undefined;
  },
}).then((output) => fs.writeFileSync(path.resolve(baseDir, "./src/openapi.d.ts"), output));
