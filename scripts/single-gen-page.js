import fs from "fs";

export async function generateSingleProperties(props) {
  const json = await JSON.parse(
    fs.readFileSync("./public/data/full.json", "utf-8"),
  );

  try {
    const imoveis = json.slice(0, props).map((item) => {
      return {
        id: item.id,
        slug: item.slug,
        titulo: item.titulo,
        tituloImovel: item.tituloImovel,
        tipoImovel: item.tipoImovel,
        precoVenda: item.precoVenda,
        precoLocacao: item.precoLocacao,
        precoCondominio: item.precoCondominio,
        precoIptu: item.precoIptu,
        areaUtil: item.areaUtil,
        areaTotal: item.areaTotal,
        qtdDormitorios: item.qtdDormitorios,
        qtdSuites: item.qtdSuites,
        qtdBanheiros: item.qtdBanheiros,
        qtdVagas: item.qtdVagas,
        cidade: item.cidade,
        bairro: item.bairro,
        nomeCondominio: item.nomeCondominio,
        obs: item.obs,
        latitude: item.latitude,
        longitude: item.longitude,
        aceitaPet: item.aceitaPet,
        fotos: item.fotos,
      };
    });

    fs.writeFileSync(
      "./public/data/single.json",
      JSON.stringify(imoveis, null, 2),
    );

    console.log("🏠 Singles");
    console.log("   │");
    console.log(`   ├── ${imoveis.length} imóveis gerados`);
    console.log(
      `   └── Tamanho aproximado: ${(fs.statSync("./public/data/single.json").size / 1024 / 1024).toFixed(10)} MB`,
    );
    console.log("");
  } catch (error) {
    console.error("Erro ao gerar Singles:", error);
    process.exit(1);
  }
}

function slugGen(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
