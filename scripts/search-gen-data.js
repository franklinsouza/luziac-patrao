import fs from "fs";
import MiniSearch from "minisearch";

export async function generateSearchData(numProps) {
  const json = await JSON.parse(
    fs.readFileSync("./public/data/full.json", "utf-8"),
  );

  try {
    const miniSearch = new MiniSearch({
      // Campos que serão usados para buscar (os mais importantes)
      fields: [
        "id",
        "titulo",
        "tituloImovel",
        "tipoImovel",
        "finalidade",
        "cidade",
        "bairro",
        "nomeCondominio",
        "venda",
        "locacao",
      ],

      // Campos que irão retornar nos resultados
      storeFields: [
        "id",
        "slug",
        "titulo",
        "tipoImovel",
        "finalidade",
        "precoVenda",
        "precoLocacao",
        "areaUtil",
        "qtdDormitorios",
        "qtdSuites",
        "qtdBanheiros",
        "qtdVagas",
        "fotoPrincipal",
        "venda",
        "locacao",
      ],

      // Config de busca
      searchOptions: {
        fuzzy: 0.2,
        prefix: true,
        combineWith: "AND",
        boost: {
          id: 10,
          tituloImovel: 3,
          nomeCondominio: 2.5,
          bairro: 2,
          cidade: 1.5,
        },
        tokenize: (text) =>
          text
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .split(/\s+/)
      },
    });

    // Adiciona todos os imóveis ao índice
    //console.log(jsonData);

    miniSearch.addAll(
      json.slice(0, numProps).map((item) => ({
        id: item.id,
        ...item,

        tipoImovel: normalize(item.tipoImovel),
      })),
    );

    // Salva o índice serializado
    fs.writeFileSync(
      "./public/data/search.json",
      JSON.stringify(miniSearch.toJSON()),
    );

    console.log("🏠 Busca");
    console.log("   │");
    console.log(`   ├── ${miniSearch.documentCount} imóveis gerados`);
    console.log(
      `   └── Tamanho aproximado: ${(fs.statSync("./public/data/search.json").size / 1024 / 1024).toFixed(10)} MB`,
    );
    console.log("");
  } catch (error) {
    console.error("Erro ao gerar minisearch", error);
    process.exit(1);
  }
}

function normalize(text) {
  return text
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}
