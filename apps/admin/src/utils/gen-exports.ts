export const genExports = <T extends object>(table: string, objects: T[]) => ({
  json: JSON.stringify(objects),
  xml: `<${table} xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">${objects
    .map(
      (obj) =>
        `<row>${Object.entries(obj)
          .map(([k, v]) => `<${k}>${v}</${k}>`)
          .join("\n")}</row>`,
    )
    .join("\n")}</${table}>`,
  csv: `${Object.keys(objects[0]).join(",")}
${objects
  .map((obj) =>
    Object.values(obj)
      .map((v) => `"${v}"`)
      .join(","),
  )
  .join("\n")}`,
});
