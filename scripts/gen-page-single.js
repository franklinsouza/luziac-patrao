import fs from "fs";

export async function generateSingleProperties(json) {
  try {
    const imoveis = json.slice(0, 20).map((item) => {
      const id = item.CodigoImovel.toLowerCase();
      const tituloImovel = item.TituloImovel ?? "";
      const cidade = item.Cidade ?? "";
      const bairro = item.Bairro ?? "";
      const nomeCondominio = item.NomeCondominio ?? "";
      const tipoImovel = item.TipoImovel ?? "";
      const subTipoImovel = item.SubTipoImovel ?? "";
      const precoVenda = Number(item.PrecoVenda).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}) ?? ""
      const precoLocacao = Number(item.PrecoLocacao).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}) ?? "";
      const precoCondominio = Number(item.PrecoCondominio).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}) ?? "";
      const precoIptu = Number(item.PrecoIptu).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}) ?? "";
      const areaUtil = item.AreaUtil ?? "";
      const areaTotal = item.AreaTotal ?? "";
      const qtdDormitorios = item.QtdDormitorios ?? "";
      const qtdSuites = item.QtdSuites ?? "";
      const qtdBanheiros = item.QtdBanheiros ?? "";
      const qtdVagas = item.QtdVagas ?? "";
      const observacao = item.Observacao ?? "";
      const latitude = item.latitude ?? "";
      const longitude = item.longitude ?? "";
      const aceitaPet = item.AceitaPet ?? "";

      return {
        id,
        slug: [slugGen(subTipoImovel), slugGen(bairro), slugGen(cidade),id].filter(Boolean).join("-"),
        titulo: [bairro +' ', ' '+ cidade].join("-"),
        tituloImovel,
        tipoImovel,
        precoVenda,
        precoLocacao,
        precoCondominio,
        precoIptu,
        areaUtil,
        areaTotal,
        qtdDormitorios,
        qtdSuites,
        qtdBanheiros,
        qtdVagas,
        cidade,
        bairro,
        nomeCondominio,
        observacao,
        latitude,
        longitude,
        aceitaPet,
        fotos: item.Fotos?.Foto,
      };
    });

    fs.writeFileSync(
      "./public/data/single.json",
      JSON.stringify(imoveis, null, 2),
    );

    console.log("🏠 Singles");
    console.log("   │");
    console.log(`   ├── ${imoveis.length} imóveis gerados`);
    console.log(`   └── Tamanho aproximado: ${(fs.statSync("./public/data/single.json").size / 1024 / 1024).toFixed(10)} MB`,);
    console.log('');
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
