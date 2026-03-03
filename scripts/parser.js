import { XMLParser } from "fast-xml-parser";

export async function toJson(xmlData) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
  });

  const json = parser.parse(xmlData).Carga.Imoveis.Imovel;

  return json;
}
