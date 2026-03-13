import fs from "fs";
import { toJson } from "./scripts/parser.js";
import { generateFullJson } from "./scripts/full-gen-data.js";
import { generateProperties } from "./scripts/list-gen-data.js";
import { generateSingleProperties } from "./scripts/single-gen-page.js";
import { generateHomeProperties } from "./scripts/home-gen-data.js";
import { generateSearchData } from "./scripts/search-gen-data.js";
import { generateTestJson } from "./scripts/test-gen-data.js";

async function sync() {
  //Usar xml online
  //url no env

  // const xmlData = fs.readFileSync(
  //   "https://imob.valuegaia.com.br/integra/midia.ashx?midia=GaiaWebServiceImovel&p=eXXvKdmjrNnPs%2fQK3Ca3PANJ%2f02NH5czWBuSoWQmuGNCABHflgBKNd7KKHOXZaMgjj5INYO%2bXnra0P6rOSu5lK7kTLCejtWs",
  //   "utf8",
  // );

  const xmlData = fs.readFileSync("./public/data/ingaia.xml", "utf-8");
  const json = await toJson(xmlData);

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
    await generateTestJson(numProps);

    console.log("Sync finalizado com sucesso");
    console.log("");
  } catch (error) {
    console.error("Erro no sync:", error);
    process.exit(1);
  }
}

sync();
