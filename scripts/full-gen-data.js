import fs from "fs";

export async function generateFullJson(json) {
  try {
    const imoveis = json.map((item) => {
      const id = item.CodigoImovel.toLowerCase();

      //console.log(item.precoLocacao);

      //const precoVenda = item.PrecoVenda ? real(item.PrecoVenda) : "";
      //const precoLocacao = item.PrecoLocacao ? real(item.PrecoLocacao) : "";

      return {
        id,
        slug: [
          slugGen(item.SubTipoImovel),
          slugGen(item.Bairro),
          slugGen(item.Cidade),
          id,
        ]
          .filter(Boolean)
          .join("-"),
        titulo: [item.Bairro + " ", " " + item.Cidade].join("-"),
        tituloImovel: item.TituloImovel ?? "",
        tipoImovel: item.TipoImovel ?? "",
        finalidade: item.Finalidade.toLowerCase() ?? "",
        precoVenda: item.PrecoVenda,
        venda: item.PrecoVenda ? 1 : 0,
        precoLocacao: item.PrecoLocacao,
        locacao: item.PrecoLocacao ? 1 : 0,
        areaUtil: item.AreaUtil ?? "",
        qtdDormitorios: item.QtdDormitorios ?? "",
        qtdSuites: item.QtdSuites ?? "",
        qtdBanheiros: item.QtdBanheiros ?? "",
        qtdVagas: item.QtdVagas ?? "",
        cidade: item.Cidade ?? "",
        bairro: item.Bairro ?? "",
        nomeCondominio: item.NomeCondominio ?? "",
        obs: item.Observacao,
        latitude: item.latitude ?? "",
        longitude: item.longitude ?? "",
        fotos: item.Fotos?.Foto,
        fotoPrincipal: item.Fotos?.Foto[0]?.URLArquivo,
        mobliado: item.Mobiliado ? 1 : 0,
        condominioFechado: item.CondominioFechado,
      };
    });

    fs.writeFileSync(
      "./public/data/full.json",
      JSON.stringify(imoveis, null, 2),
    );

    console.log("⚙️​ Json");
    console.log("   │");
    console.log(`   ├── ${imoveis.length} imóveis gerados`);
    console.log(
      `   └── Tamanho aproximado: ${(fs.statSync("./public/data/full.json").size / 1024 / 1024).toFixed(10)} MB`,
    );
    console.log("");
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

function real(val) {
  return Number(val).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
