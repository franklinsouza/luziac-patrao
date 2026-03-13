import fs from "fs";


export async function generateProperties(numPorps) {
  const json = await JSON.parse(
    fs.readFileSync("./public/data/full.json", "utf-8"),
  );

  try {
    const imoveis = json.slice(0, numPorps).map((item) => {
      return {
        id: item.id,
        slug: item.slug,
        titulo: item.titulo,
        tituloImovel: item.tituloImovel,
        tipoImovel: item.tipoImovel,
        precoVenda: item.precoVenda,
        venda: item.venda,
        precoLocacao: item.precoLocacao,
        locacao: item.locacao,
        areaUtil: item.areaUtil,
        qtdDormitorios: item.qtdDormitorios,
        qtdSuites: item.qtdSuites,
        qtdBanheiros: item.qtdBanheiros,
        qtdVagas: item.qtdVagas,
        cidade: item.cidade,
        bairro: item.bairro,
        nomeCondominio: item.nomeCondominio,
        fotoPrincipal: item.fotoPrincipal,
      };
    });

    fs.writeFileSync(
      "./public/data/list.json",
      JSON.stringify(imoveis, null, 2),
    );

    console.log("🏠 Imóveis");
    console.log("   │");
    console.log(`   ├── ${imoveis.length} imóveis gerados`);
    console.log(
      `   └── Tamanho aproximado: ${(fs.statSync("./public/data/list.json").size / 1024 / 1024).toFixed(10)} MB`,
    );
    console.log("");
  } catch (error) {
    console.error("Erro ao gerar imóveis:", error);
    process.exit(1);
  }
}
