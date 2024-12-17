import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import openapiTS, { astToString } from "openapi-typescript";
import ts from "typescript";

const baseDir = path.dirname(fileURLToPath(import.meta.url));

const BLOB = ts.factory.createTypeReferenceNode(ts.factory.createIdentifier("Blob"));
const FILE = ts.factory.createTypeReferenceNode(ts.factory.createIdentifier("File"));
const NULL = ts.factory.createLiteralTypeNode(ts.factory.createNull());

const localPath = new URL(path.resolve(baseDir, process.argv[2]), import.meta.url);
openapiTS(localPath, {
  transform(schemaObject, metadata) {
    if (schemaObject.format === "binary") {
      if (metadata.path.endsWith("multipart~1form-data")) {
        return schemaObject.nullable ? ts.factory.createUnionTypeNode([FILE, NULL]) : FILE;
      }
      if (metadata.path.endsWith("application~1octet-stream")) {
        return schemaObject.nullable ? ts.factory.createUnionTypeNode([BLOB, NULL]) : BLOB;
      }
    }
    return undefined;
  },
}).then((output) =>
  fs.writeFileSync(path.resolve(baseDir, "./src/openapi.d.ts"), astToString(output)),
);
