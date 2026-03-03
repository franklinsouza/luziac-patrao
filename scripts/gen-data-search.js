import fs from "fs";
import MiniSearch from "minisearch";

export async function generateSearchData(jsonData) {
  try {
    const miniSearch = new MiniSearch({
      // Campos que serão usados para buscar (os mais importantes)
      fields: ["id", "titulo", "cidade", "bairro", "condominio"],

      // Campos que irão retornar nos resultados
      storeFields: [
        "id",
        "titulo",
        "valor",
        "cidade",
        "bairro",
        "fotoPrincipal",
        //"foto", // URL da foto principal
        //"pretensao", // comprar / alugar
        //"tipo", // apartamento, casa, terreno...
        //"dormitorios", // se quiser mostrar no card
      ],

      // Config de busca
      searchOptions: {
        fuzzy: 0.2,
        prefix: true,
        boost: {
          titulo: 3, // muito importante
          condominio: 2.5,
          bairro: 2,
          cidade: 1.5,
        },
        combineWith: "AND",
        tokenize: (text) =>
          text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""),
      },
    });

    // Adiciona todos os imóveis ao índice
    miniSearch.addAll(
      jsonData.map((imovel) => ({
        id: imovel.CodigoImovel,
        ...imovel,
      })),
    );

    // Salva o índice serializado
    fs.writeFileSync(
      "./public/data/search-index.json",
      JSON.stringify(miniSearch.toJSON()),
    );

    console.log("🏠 Busca");
    console.log("   │");
    console.log(`   ├── ${miniSearch.documentCount} imóveis gerados`);
    console.log(`   └── Tamanho aproximado: ${(fs.statSync("./public/data/search-index.json").size / 1024 / 1024).toFixed(10)} MB`,);
    console.log('');
  } catch (error) {
    console.error("Erro ao gerar minisearch", error);
    process.exit(1);
  }
}