import fs from "fs";
import { toJson } from "./scripts/parser.js";
import { generateProperties } from "./scripts/gen-data-properties.js";
import { generateSingleProperties } from "./scripts/gen-page-single.js";
import { generateHomeProperties } from "./scripts/gen-data-home.js";
import { generateSearchData } from "./scripts/gen-data-search.js";

async function sync() {
  //Usar xml online
  //url no env

  const xmlData = fs.readFileSync("./public/data/ingaia.xml", "utf-8");
  const json = await toJson(xmlData);

  //console.log(json);

  try {
    console.log(`🏠 Total de imóveis:  ${json.length}`);
    console.log("Iniciando sincronização...");
    console.log('');

    await generateProperties(json);
    await generateSingleProperties(json);
    await generateHomeProperties(json);
    await generateSearchData(json);

    console.log("Sync finalizado com sucesso");
    console.log('');
  } catch (error) {
    console.error("Erro no sync:", error);
    process.exit(1);
  }
}

sync();
