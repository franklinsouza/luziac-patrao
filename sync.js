import fs from 'fs';
import path from 'path';
import { toJson } from "./scripts/parser.js";
import { generateFullJson } from "./scripts/full-gen-data.js";
import { generateProperties } from "./scripts/list-gen-data.js";
import { generateSingleProperties } from "./scripts/single-gen-page.js";
import { generateHomeProperties } from "./scripts/home-gen-data.js";
import { generateSearchData } from "./scripts/search-gen-data.js";

async function sync() {
  // const xmlData = fs.readFileSync(
  //   "https://imob.valuegaia.com.br/integra/midia.ashx?midia=GaiaWebServiceImovel&p=eXXvKdmjrNnPs%2fQK3Ca3PANJ%2f02NH5czWBuSoWQmuGNCABHflgBKNd7KKHOXZaMgjj5INYO%2bXnra0P6rOSu5lK7kTLCejtWs",
  //   "utf8",
  // );

  //const xmlData = fs.readFileSync("./public/data/ingaia.xml", "utf-8");
  const xmlData = await fetch("https://imob.valuegaia.com.br/integra/midia.ashx?midia=GaiaWebServiceImovel&p=eXXvKdmjrNnPs%2FQK3Ca3PANJ%2F02NH5czWBuSoWQmuGNCABHflgBKNd7KKHOXZaMgjj5INYO%2BXnra0P6rOSu5lK7kTLCejtWs").then(r => r.text());
  const json = await toJson(xmlData);

  const filePath = './public/data/full.json';
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  console.log(`🏠 Total de imóveis:  ${json.length}`);
  console.log("");
  console.log("Iniciando sincronização...");
  console.log("");

  try {
    const numProps = undefined;

    await generateFullJson(json);
    await generateProperties(numProps);
    await generateSingleProperties(numProps);
    await generateHomeProperties(15);
    await generateSearchData(numProps);

    console.log("Sync finalizado com sucesso");
    console.log("");
  } catch (error) {
    console.error("Erro no sync:", error);
    process.exit(1);
  }
}

sync();
