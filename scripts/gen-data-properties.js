import fs from "fs";

export async function generateProperties(json) {
  try {
    const imoveis = json.slice(0, 20).map((item) => {
      const id = item.CodigoImovel.toLowerCase();
      const tituloImovel = item.TituloImovel ?? "";
      const cidade = item.Cidade ?? "";
      const bairro = item.Bairro ?? "";
      const nomeCondominio = item.NomeCondominio ?? "";
      const tipoImovel = item.TipoImovel ?? "";
      const subTipoImovel = item.SubTipoImovel ?? "";
      const precoVenda = Number(item.PrecoVenda).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}) ?? "";
      const precoLocacao = Number(item.PrecoLocacao).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}) ?? "";
      const areaUtil = item.AreaUtil ?? "";
      const qtdDormitorios = item.QtdDormitorios ?? "";
      const qtdSuites = item.QtdSuites ?? "";
      const qtdBanheiros = item.QtdBanheiros ?? "";
      const qtdVagas = item.QtdVagas ?? "";

      return {
        id,
        slug: [slugGen(subTipoImovel), slugGen(bairro), slugGen(cidade),id].filter(Boolean).join("-"),
        titulo: [bairro +' ', ' '+ cidade].join("-"),
        tituloImovel,
        //pretensao: item.pretensao,
        tipoImovel,
        precoVenda,
        precoLocacao,
        areaUtil,
        qtdDormitorios,
        qtdSuites,
        qtdBanheiros,
        qtdVagas,
        cidade,
        bairro,
        nomeCondominio,
        fotoPrincipal: item.Fotos?.Foto[0]?.URLArquivo,
      };
    });

    fs.writeFileSync(
      "./public/data/properties.json",
      JSON.stringify(imoveis, null, 2),
    );

    console.log("🏠 Imóveis");
    console.log("   │");
    console.log(`   ├── ${imoveis.length} imóveis gerados`);
    console.log(`   └── Tamanho aproximado: ${(fs.statSync("./public/data/properties.json").size / 1024 / 1024).toFixed(10)} MB`,);
    console.log('');
  } catch (error) {
    console.error("Erro ao gerar imóveis:", error);
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
