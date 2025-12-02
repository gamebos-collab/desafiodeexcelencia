import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import EquipeCard from "../components/EquipeCard/EquipeCard";
import Navigation from "../components/Navigation/Navigation";

export default function EquipesPage() {
  const [membroSelecionado, setMembroSelecionado] = useState(null);
  const [equipeSelecionada, setEquipeSelecionada] = useState(null);
  const [descricaoMapeada, setDescricaoMapeada] = useState({});
  const [pontuacaoEquipe, setPontuacaoEquipe] = useState({});
  const [pontuacoesPorCentralizadora, setPontuacoesPorCentralizadora] =
    useState({});
  const [celulasPorCentralizadora, setCelulasPorCentralizadora] = useState({});
  const [
    celulasInvertidoPorCentralizadora,
    setCelulasInvertidoPorCentralizadora,
  ] = useState({}); // NOVO

  useEffect(() => {
    fetch(`/gamekpi.xlsx?v=${Date.now()}`)
      .then((res) => res.arrayBuffer())
      .then((data) => {
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets["Planilha2"];
        const json = XLSX.utils.sheet_to_json(sheet, { range: "A1:D100" });

        // Função para pegar valor seguro
        const getValorSeguro = (celula) =>
          celula?.v !== undefined && celula?.v !== null ? celula.v : 0;

        // Extrai pontuações específicas por centralizadora
        const pontuacoes = {
          CPN: sheet["H4"]?.v !== undefined ? sheet["H4"].v : 0,
          POA: sheet["H2"]?.v !== undefined ? sheet["H2"].v : 0,
          SAO: sheet["H3"]?.v !== undefined ? sheet["H3"].v : 0,
          CWB: sheet["H5"]?.v !== undefined ? sheet["H5"].v : 0,
          BLU: sheet["L8"]?.v !== undefined ? sheet["L8"].v : 0,
          VIX: sheet["L6"]?.v !== undefined ? sheet["L6"].v : 0,
          GRU: sheet["L5"]?.v !== undefined ? sheet["L5"].v : 0,
          CXS: sheet["L3"]?.v !== undefined ? sheet["L3"].v : 0,
          BHZ: sheet["L2"]?.v !== undefined ? sheet["L2"].v : 0,
          PPY: sheet["L4"]?.v !== undefined ? sheet["L4"].v : 0,
          LDA: sheet["P7"]?.v !== undefined ? sheet["P7"].v : 0,
          CAS: sheet["P4"]?.v !== undefined ? sheet["P4"].v : 0,
          FLN: sheet["P2"]?.v !== undefined ? sheet["P2"].v : 0,
          BAU: sheet["L7"]?.v !== undefined ? sheet["L7"].v : 0,
          SOR: sheet["P5"]?.v !== undefined ? sheet["P5"].v : 0,
          JVL: sheet["P6"]?.v !== undefined ? sheet["P6"].v : 0,
          SMA: sheet["P8"]?.v !== undefined ? sheet["P8"].v : 0,
          RIP: sheet["P3"]?.v !== undefined ? sheet["P3"].v : 0,
        };
        setPontuacoesPorCentralizadora(pontuacoes);

        // Bloco padrão (normal)
        const celulas = {
          POA: {
            valor1: sheet["F11"] ? sheet["F11"].v : "",
            valor2: sheet["H11"] ? sheet["H11"].v : "",
          },
          BAU: {
            valor1: sheet["J22"] ? sheet["J22"].v : "",
            valor2: sheet["L22"] ? sheet["L22"].v : "",
          },
          BLU: {
            valor1: sheet["J23"] ? sheet["J23"].v : "",
            valor2: sheet["L23"] ? sheet["L23"].v : "",
          },
          SAO: {
            valor1: sheet["F12"] ? sheet["F12"].v : "",
            valor2: sheet["H12"] ? sheet["H12"].v : "",
          },
          CPN: {
            valor1: sheet["F13"] ? sheet["F13"].v : "",
            valor2: sheet["H13"] ? sheet["H13"].v : "",
          },
          CWB: {
            valor1: sheet["F14"] ? sheet["F14"].v : "",
            valor2: sheet["H14"] ? sheet["H14"].v : "",
          },
          VIX: {
            valor1: sheet["J21"] ? sheet["J21"].v : "",
            valor2: sheet["L21"] ? sheet["L21"].v : "",
          },
          GRU: {
            valor1: sheet["J20"] ? sheet["J20"].v : "",
            valor2: sheet["L20"] ? sheet["L20"].v : "",
          },
          CXS: {
            valor1: sheet["J18"] ? sheet["J18"].v : "",
            valor2: sheet["L18"] ? sheet["L18"].v : "",
          },
          BHZ: {
            valor1: sheet["J17"] ? sheet["J17"].v : "",
            valor2: sheet["L17"] ? sheet["L17"].v : "",
          },
          PPY: {
            valor1: sheet["J19"] ? sheet["J19"].v : "",
            valor2: sheet["L19"] ? sheet["L19"].v : "",
          },
          // Adicione outras centralizadoras conforme necessário
        };
        setCelulasPorCentralizadora(celulas);

        // Bloco invertido (F13 e H13 para POA, outras centralizadoras conforme desejar)
        const celulasInvertido = {
          POA: {
            valor1: sheet["F7"] ? sheet["F7"].v : "",
            valor2: sheet["H7"] ? sheet["H7"].v : "",
          },
          BAU: {
            valor1: sheet["J15"] ? sheet["J15"].v : "",
            valor2: sheet["L15"] ? sheet["L15"].v : "",
          },
          BLU: {
            valor1: sheet["J16"] ? sheet["J16"].v : "",
            valor2: sheet["L16"] ? sheet["L16"].v : "",
          },
          SAO: {
            valor1: sheet["F8"] ? sheet["F8"].v : "",
            valor2: sheet["H8"] ? sheet["H8"].v : "",
          },
          CPN: {
            valor1: sheet["F9"] ? sheet["F9"].v : "",
            valor2: sheet["H9"] ? sheet["H9"].v : "",
          },
          CWB: {
            valor1: sheet["F10"] ? sheet["F10"].v : "",
            valor2: sheet["H10"] ? sheet["H10"].v : "",
          },
          VIX: {
            valor1: sheet["J14"] ? sheet["J14"].v : "",
            valor2: sheet["L14"] ? sheet["L14"].v : "",
          },
          GRU: {
            valor1: sheet["J13"] ? sheet["J13"].v : "",
            valor2: sheet["L13"] ? sheet["L13"].v : "",
          },
          CXS: {
            valor1: sheet["J11"] ? sheet["J11"].v : "",
            valor2: sheet["L11"] ? sheet["L11"].v : "",
          },
          BHZ: {
            valor1: sheet["J10"] ? sheet["J10"].v : "",
            valor2: sheet["L10"] ? sheet["L10"].v : "",
          },
          PPY: {
            valor1: sheet["J12"] ? sheet["J12"].v : "",
            valor2: sheet["L12"] ? sheet["L12"].v : "",
          },
          // Adicione outros parceiros conforme necessário
        };
        setCelulasInvertidoPorCentralizadora(celulasInvertido);

        // Pontuação de equipe
        const pontuacoesEquipe = {
          Sênior: getValorSeguro(sheet["H15"]),
          Pleno: getValorSeguro(sheet["L24"]),
          Soft: getValorSeguro(sheet["P9"]),
        };
        setPontuacaoEquipe(pontuacoesEquipe);

        const mapa = {};
        json.forEach((linha) => {
          const executor = linha["CENTRALIZADORA"]?.trim().toUpperCase();
          if (executor) {
            if (!mapa[executor]) mapa[executor] = [];
            mapa[executor].push({
              membro: executor,
              nome: linha["NOME"] || "",
              funcao: linha["FUNÇÃO"] || "",
              pontuacao: linha["PONTUAÇÃO"] || "",
            });
          }
        });

        setDescricaoMapeada(mapa);
      })
      .catch((err) => console.error("Erro ao carregar Excel:", err));
  }, []);

  const equipes = [
    {
      nome: "Sênior",
      pontuacao: pontuacaoEquipe?.["Sênior"] ?? 0,
      imagem: "/assets/equipeA.jpg",
      membrosLinha1: [
        { nome: "CPN", avatar: "/assets/equipesenior/cpn.png" },
        { nome: "POA", avatar: "/assets/equipesenior/poa.jpg" },
      ],
      membrosLinha2: [
        { nome: "CWB", avatar: "/assets/equipesenior/cwb.jpg" },
        { nome: "SAO", avatar: "/assets/equipesenior/sao.jpg" },
      ],
    },
    {
      nome: "Pleno",
      pontuacao: pontuacaoEquipe?.["Pleno"] ?? 0,
      imagem: "/assets/equipeB.jpg",

      membrosLinha1: [
        { nome: "GRU", avatar: "/assets/equipepleno/gru.png" },
        { nome: "CXS", avatar: "/assets/equipepleno/cxs.jpg" },
        { nome: "BAU", avatar: "/assets/equipesoft/bau.png" },
      ],
      membrosLinha2: [
        { nome: "BHZ", avatar: "/assets/equipepleno/bhz.png" },
        { nome: "PPY", avatar: "/assets/equipepleno/ppy.png" },
        { nome: "BLU", avatar: "/assets/equipesenior/blu.jpg" },
        { nome: "VIX", avatar: "/assets/equipesenior/vix.jpeg" },
      ],
    },
    {
      nome: "Soft",
      pontuacao: pontuacaoEquipe?.["Soft"] ?? 0,
      imagem: "/assets/equipeC.jpg",

      membrosLinha1: [
        { nome: "FLN", avatar: "/assets/equipesoft/fln.jpg" },
        { nome: "SMA", avatar: "/assets/equipesoft/sma.png" },
        { nome: "SOR", avatar: "/assets/equipesoft/sor.png" },
      ],
      membrosLinha2: [
        { nome: "JVL", avatar: "/assets/equipesoft/jvl.jpg" },
        { nome: "LDA", avatar: "/assets/equipepleno/lda.jpg" },
        { nome: "CAS", avatar: "/assets/equipepleno/cas.png" },
        { nome: "RIP", avatar: "/assets/equipesoft/rip.jpg" },
      ],
    },
    //... outras equipes
  ];

  const handleMembroClick = (membro, equipe) => {
    const chave = membro.nome.trim().toUpperCase();
    const linhas = descricaoMapeada[chave] || [];
    setMembroSelecionado({ ...membro, linhas });
    setEquipeSelecionada(equipe);
  };

  const closeModal = () => {
    setMembroSelecionado(null);
    setEquipeSelecionada(null);
  };

  const thStyle = {
    borderBottom: "1px solid #ccc",
    padding: "8px",
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const tdStyle = {
    borderBottom: "2px solid #444",
    padding: "12px",
    textAlign: "center",
    color: "#fff",
    maxWidth: "2200px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  // Função para renderizar o bloco das duas células extras (normal)
  function renderCelulasExtras() {
    if (!membroSelecionado) return null;
    const chave = membroSelecionado.nome?.trim().toUpperCase();
    const celulas = celulasPorCentralizadora[chave];
    if (!celulas) return null;
    return (
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          width: "200px",
          height: "100px",
          borderRadius: "8px",
          boxShadow: "0 0 8px rgba(241, 235, 235, 0.84)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "15px",
          color: "#ebe8e8ff",
          zIndex: 1000,
          padding: "8px",
        }}
      >
        <div>
          <span>{celulas.valor1}</span>
        </div>
        <div>
          <span>{celulas.valor2}</span>
        </div>
      </div>
    );
  }

  // Função para renderizar o bloco das duas células invertidas
  function renderCelulasExtrasInvertido() {
    if (!membroSelecionado) return null;
    const chave = membroSelecionado.nome?.trim().toUpperCase();
    const celulas = celulasInvertidoPorCentralizadora[chave];
    if (!celulas) return null;
    return (
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          width: "200px",
          height: "100px",
          borderRadius: "8px",
          boxShadow: "0 0 8px rgba(241, 235, 235, 0.84)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "15px",
          color: "#ebe8e8ff",
          zIndex: 1000,
          padding: "8px",
        }}
      >
        <div>
          <span>{celulas.valor1}</span>
        </div>
        <div>
          <span>{celulas.valor2}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "2px",
        textAlign: "center",
        background: "linear-gradient(135deg, #160125ff)",
        position: "relative",
        minHeight: "95vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "30px",
          left: "88%",
          transform: "translateX(-50%) rotate(45deg)", // Rotaciona só o GIF
          width: "300px",
          height: "300px",
          backgroundImage: 'url("/assets/luzes.gif")',
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          zIndex: 2,
        }}
      />

      <Navigation />
      <h1 style={{ color: "#f9a826", marginBottom: "120px" }}>
        Ranking das Equipes
      </h1>

      <div
        style={{
          display: "flex",
          gap: "94px",
          justifyContent: "center",
          flexWrap: "wrap",
          flexGrow: 1,
          marginBottom: "64px",
        }}
      >
        {equipes.map((equipe, index) => (
          <EquipeCard
            key={index}
            nome={equipe.nome}
            pontuacao={equipe.pontuacao}
            imagem={equipe.imagem}
            membrosLinha1={equipe.membrosLinha1}
            membrosLinha2={equipe.membrosLinha2}
            onMembroClick={(membro) => handleMembroClick(membro, equipe)}
          />
        ))}
      </div>

      {membroSelecionado && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            fontSize: "13px",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
            padding: "20px",
          }}
          onClick={closeModal}
        >
          <div
            style={{
              backgroundImage: 'url("/assets/backgroundpopup.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              boxShadow: "0 2px 14px rgba(184, 14, 241, 0.7)",
              padding: "40px",
              borderRadius: "8px",
              width: "1200px",
              textAlign: "center",
              position: "relative",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bloco das células extras normal (direita) */}
            {renderCelulasExtras()}
            {/* Bloco das células invertidas (esquerda) */}
            {renderCelulasExtrasInvertido()}
            <div
              style={{
                position: "sticky",
                top: 0,
                backgroundImage: 'url("/assets/backgroundpopup2.png")',
                paddingBottom: "20px",
                zIndex: 10,
              }}
            >
              <img
                src={membroSelecionado.avatar}
                alt={membroSelecionado.nome}
                style={{ width: "125px", borderRadius: "10%" }}
              />
              <div style={{ textAlign: "center" }}>
                <h2 style={{ marginTop: "12px", color: "#fff" }}>
                  {membroSelecionado.nome}
                </h2>
                <p style={{ color: "#fff" }}>
                  Equipe: <strong>{equipeSelecionada.nome}</strong>
                </p>
                <p style={{ color: "#fff" }}>
                   Pontuação:{" "}
                  <strong>
                    {Number.isFinite(
                      pontuacoesPorCentralizadora[
                        membroSelecionado.nome.trim().toUpperCase()
                      ]
                    )
                      ? pontuacoesPorCentralizadora[
                          membroSelecionado.nome.trim().toUpperCase()
                        ]
                      : 0}{" "}
                    pontos
                  </strong>
                  <p
                    style={{
                      color: "#ff0000ff",
                      fontFamily: "Arial, sans-serif",
                      fontSize: 10,
                    }}
                  >
                    Parceiros e operacional, NÃO são contabilizados na pontuação
                    geral da equipe.
                  </p>
                </p>
              </div>
            </div>
            <div
              style={{
                marginTop: "24px",
                textAlign: "left",
                maxWidth: "800px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {membroSelecionado.linhas.length > 0 ? (
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    tableLayout: "relative",
                  }}
                >
                  <thead>
                    <tr>
                      <th style={thStyle}>CENTRALIZADORA</th>
                      <th style={thStyle}>NOME</th>
                      <th style={thStyle}>FUNÇÃO</th>
                      <th style={thStyle}>PONTUAÇÃO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {membroSelecionado.linhas.map((linha, index) => (
                      <tr key={index} className="table-row-hover">
                        <td style={tdStyle}>{linha.membro}</td>
                        <td style={tdStyle}>{linha.nome}</td>
                        <td style={tdStyle}>{linha.funcao}</td>
                        <td style={tdStyle}>
                          {Number.isFinite(linha.pontuacao)
                            ? linha.pontuacao
                            : 0}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p style={{ color: "#fff" }}>Descrição não encontrada.</p>
              )}
            </div>

            <button
              onClick={closeModal}
              style={{
                marginTop: "16px",
                padding: "8px 16px",
                backgroundColor: "#8e2de2",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
