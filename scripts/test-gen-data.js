import fs from "fs";

export async function generateTestJson(numPorps) {
  const json = await JSON.parse(
    fs.readFileSync("./public/data/full.json", "utf-8"),
  );

  try {
    const imoveis = json.slice(0, numPorps).map((item) => {
      return {
        tipoImovel: item.tipoImovel,
        finalidade: item.finalidade, // Teste de busca, apagar depois
        venda: item.venda,
        locacao: item.locacao,
      };
    });

    fs.writeFileSync(
      "./public/data/data-test.json",
      JSON.stringify(imoveis, null, 2),
    );

    console.log("🏠 Test");
    console.log("   │");
    console.log(`   ├── ${imoveis.length} json test gerado com sucesso`);
    console.log(
      `   └── Tamanho aproximado: ${(fs.statSync("./public/data/data-test.json").size / 1024 / 1024).toFixed(10)} MB`,
    );
    console.log("");
  } catch (error) {
    console.error("Erro ao gerar imóveis:", error);
    process.exit(1);
  }
}
