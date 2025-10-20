import React, { useState, useEffect } from "react";

export default function Informativo() {
  const [mostrarPopup, setMostrarPopup] = useState(false);

  const abrirPopup = () => setMostrarPopup(true);
  const fecharPopup = () => setMostrarPopup(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        fecharPopup();
      }
    };

    if (mostrarPopup) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mostrarPopup]);

  return (
    <>
      <button
        onClick={abrirPopup}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: "#ff4081",
          color: "#fff",
          border: "none",
          padding: "10px 16px",
          borderRadius: "8px",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        Informativo
      </button>

      {mostrarPopup && (
        <div
          onClick={fecharPopup}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "linear-gradient(175deg, #fffefeff, #575757ff)",
              padding: "40px",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "1400px",
              maxHeight: "90vh",
              overflowY: "auto",
              textAlign: "center",
              boxShadow: "0 0 20px rgba(0,0,0,0.3)",
            }}
          >
            <img
              src="/assets/banner-desafio.png"
              alt="Banner do Desafio"
              style={{
                width: "9%",
                maxHeight: "100px",
                objectFit: "cover",
                borderRadius: "12px",
                marginBottom: "24px",
              }}
            />

            <h2 style={{ marginBottom: "16px", color: "#2a0845" }}>
              Informações do Desafio
            </h2>

            <p
              style={{
                fontSize: "1rem",
                marginBottom: "24px",
                color: "#333",
                fontFamily: "sans-serif",
              }}
            >
              Este desafio tem como objetivo promover a excelência operacional
              da companhia. Acompanhe o BID (boletim de informações diário)
              diretamente aqui.
            </p>

            <video
              controls
              style={{
                width: "0%",
                maxHeight: "0px",
                borderRadius: "12px",
                marginBottom: "94px",
              }}
            >
              <source src="/assets/.mp4" type="video/mp4" />
              Seu navegador não suporta vídeo.
            </video>
            <p
              style={{
                fontSize: "1rem",
                marginBottom: "24px",
                color: "#2a0845",
                fontFamily: "sans-serif",
              }}
            >
              <div>
                <img
                  src="/assets/equipesenior/cwb.jpg" // troque pelo caminho da sua imagem
                  alt="Ícone"
                  width="50" // tamanho pequeno, ajuste conforme necessário
                  style={{ verticalAlign: "middle", marginRight: "8px" }}
                />
                Penalização Por Reversão Indevida do{" "}
                <b>B.O 99-867 | NF 116443</b>
                <br /> Informamos que foi aplicada uma penalização a{" "}
                <b> EQUIPE CWB</b> devido à ocorrência registrada no dia 03/10,
                referente à reversão indevida de B.O ao parceiro ADR, sem
                justificativa conforme os procedimentos internos. Como
                resultado, foi atribuída uma penalidade de <b>-3 pontos</b> no
                sistema de desempenho. Reforçamos a importância de seguir os
                protocolos estabelecidos para garantir a integridade dos
                processos e a qualidade das operações.
              </div>
              ______________________________________________________________________________________________________________________________
              <br />
              <div style={{ position: "relative", display: "inline-block" }}>
                {/* Aviso de Cancelado */}
                <div
                  style={{
                    position: "absolute",
                    top: "-20px",
                    left: "400px",
                    color: "rgba(255, 0, 0, 0.5)", // vermelho com 50% de opacidade
                    fontSize: "80px",
                    fontWeight: "bold",
                    zIndex: 1,
                    pointerEvents: "none",
                  }}
                >
                  CANCELADO
                </div>
                {/* Conteúdo original */}
                <div style={{ position: "relative", zIndex: 0 }}>
                  <img
                    src="/assets/equipesenior/sao.jpg"
                    alt="Ícone"
                    width="45"
                    style={{ verticalAlign: "middle", marginRight: "8px" }}
                  />
                  Penalização Por Baixa Indevida <b>B.O 6-75650 | NF 2383519</b>
                  <br />
                  Informamos a Retificação da penalização a equipe de SAO devido
                  à ocorrência registrada no dia 06/10, referente à baixa
                  indevida de B.O sem justificativa, o mesmo justificou e
                  através de documentos foi comprovado a baixa <b>procedente</b>
                  , com isso, tivemos a penalização CANCELADA.
                </div>
                ______________________________________________________________________________________________________________________________
                <div>
                  <img
                    src="/assets/equipesoft/fln.jpg" // troque pelo caminho da sua imagem
                    alt="Ícone"
                    width="50" // tamanho pequeno, ajuste conforme necessário
                    style={{ verticalAlign: "middle", marginRight: "8px" }}
                  />
                  Penalização Por Reversão Indevida do{" "}
                  <b>B.O 14-31388 | NF 62223</b>
                  <br /> Informamos que foi aplicada uma penalização a
                  <b> EQUIPE FLN</b> pela reversão de B.O indevida à ocorrência
                  registrada no dia 07/10, onde a troca foi por erro de
                  etiquetagem de FLN. Como resultado, foi atribuída as
                  penalidades de{" "}
                  <b>
                    -3 pontos (reversão), -3 pontos (B.O aberto a mais de 15
                    dias) e -1 ponto (a cada dia) até a data presente 20/10
                    contabilizados o total de - 37 pontos
                  </b>{" "}
                  no sistema de desempenho. Reforçamos a importância de seguir
                  os protocolos estabelecidos para garantir a integridade dos
                  processos e a qualidade das operações.
                </div>
                ______________________________________________________________________________________________________________________________
                <div style={{ position: "relative", zIndex: 0 }}>
                  <img
                    src="/assets/equipesenior/blu.jpg"
                    alt="Ícone"
                    width="45"
                    style={{ verticalAlign: "middle", marginRight: "8px" }}
                  />
                  Penalização Por Baixas Indevidas{" "}
                  <b>B.O 14-31464 | NF 61189 e B.O 69-6892 | NF 2006473</b>
                  <br />
                  Informamos que foi aplicada penalizações a <b>
                    {" "}
                    EQUIPE BLU
                  </b>{" "}
                  devido às ocorrências registradas no dia 10/10, referente à
                  baixas indevidas de B.O, com a justificativa de abertura de
                  novo B.O para o mesmo caso. Como resultado, foi atribuída uma
                  penalidade de <b>-12 pontos</b> no sistema de desempenho.
                  Reforçamos a importância de seguir os protocolos estabelecidos
                  para garantir a integridade dos processos e a qualidade das
                  operações.
                </div>
                ______________________________________________________________________________________________________________________________
                <div style={{ position: "relative", zIndex: 0 }}>
                  <img
                    src="/assets/equipesenior/cpn.png"
                    alt="Ícone"
                    width="45"
                    style={{ verticalAlign: "middle", marginRight: "8px" }}
                  />
                  Penalização Por Reversões Indevidas{" "}
                  <b>
                    B.O 78-3984 | NF 6546793, B.O 70-31236 | NF 16019068 e B.O
                    70-31230 | NF 745638
                  </b>
                  <br />
                  Informamos que foi aplicada penalizações a <b>
                    {" "}
                    EQUIPE CPN
                  </b>{" "}
                  devido às ocorrências registradas no dia 14/10 e 15/10,
                  referente à baixas e reverão indevidas de B.O, sem
                  justificativa. Como resultado, foi atribuída uma penalidade de{" "}
                  <b>-15 pontos</b> no sistema de desempenho. Reforçamos a
                  importância de seguir os protocolos estabelecidos para
                  garantir a integridade dos processos e a qualidade das
                  operações.
                </div>
                ______________________________________________________________________________________________________________________________
                <div style={{ position: "relative", zIndex: 0 }}>
                  <img
                    src="/assets/equipesenior/vix.jpeg"
                    alt="Ícone"
                    width="45"
                    style={{ verticalAlign: "middle", marginRight: "8px" }}
                  />
                  Penalização Por Reversão Indevida{" "}
                  <b>B.O 6-75878 | NF 100052</b>
                  <br />
                  Informamos que foi aplicada penalizações a <b>
                    {" "}
                    EQUIPE VIX
                  </b>{" "}
                  devido às ocorrência registrada no dia 16/10, referente à
                  reversão indevidas de B.O, com a justificativa de abertura de
                  de B.O fora do prazo. Como resultado, foi atribuída uma
                  penalidade de <b>-3 pontos</b> no sistema de desempenho.
                  Reforçamos a importância de seguir os protocolos estabelecidos
                  para garantir a integridade dos processos e a qualidade das
                  operações.
                </div>
                ______________________________________________________________________________________________________________________________
                <div style={{ position: "relative", zIndex: 0 }}>
                  <img
                    src="/assets/equipesenior/sao.jpg"
                    alt="Ícone"
                    width="45"
                    style={{ verticalAlign: "middle", marginRight: "8px" }}
                  />
                  Penalização Por Reversão Indevidas{" "}
                  <b>B.O 86-27790 | NF 6543104</b>
                  <br />
                  Informamos que foi aplicada penalizações a <b>
                    {" "}
                    EQUIPE SAO
                  </b>{" "}
                  devido às ocorrência registrada no dia 13/10, referente à
                  reversão indevida de B.O, sem justificativa. Como resultado,
                  foi atribuída uma penalidade de <b>-3 pontos</b> no sistema de
                  desempenho. Reforçamos a importância de seguir os protocolos
                  estabelecidos para garantir a integridade dos processos e a
                  qualidade das operações.
                </div>
                ______________________________________________________________________________________________________________________________
                <div style={{ position: "relative", zIndex: 0 }}>
                  <img
                    src="/assets/equipepleno/ppy.png"
                    alt="Ícone"
                    width="45"
                    style={{ verticalAlign: "middle", marginRight: "8px" }}
                  />
                  Penalização Por Reversão Indevida{" "}
                  <b>B.O 20-18031 | NF 84942</b>
                  <br />
                  Informamos que foi aplicada penalizações a <b>
                    {" "}
                    EQUIPE PPY
                  </b>{" "}
                  devido às ocorrência registrada no dia 16/10, referente à
                  reversão indevida de B.O, reversão para o parceiro em uma
                  troca de Resp. PPY. Como resultado, foi atribuída uma
                  penalidade de <b>-3 pontos</b> no sistema de desempenho.
                  Reforçamos a importância de seguir os protocolos estabelecidos
                  para garantir a integridade dos processos e a qualidade das
                  operações.
                </div>
                ______________________________________________________________________________________________________________________________
                <div style={{ position: "relative", zIndex: 0 }}>
                  <img
                    src="/assets/equipesenior/poa.jpg"
                    alt="Ícone"
                    width="45"
                    style={{ verticalAlign: "middle", marginRight: "8px" }}
                  />
                  Penalização Por Reversão Indevida{" "}
                  <b>B.O 41-8543 | NF 6552254</b>
                  <br />
                  Informamos que foi aplicada penalizações a <b>
                    {" "}
                    EQUIPE POA
                  </b>{" "}
                  devido às ocorrência registrada no dia 17/10, referente à
                  reversão indevida de B.O, reversão para o parceiro sem
                  confirmar carregamento. Como resultado, foi atribuída uma
                  penalidade de <b>-3 pontos</b> no sistema de desempenho.
                  Reforçamos a importância de seguir os protocolos estabelecidos
                  para garantir a integridade dos processos e a qualidade das
                  operações.
                </div>
                ______________________________________________________________________________________________________________________________
                <div style={{ position: "relative", zIndex: 0 }}>
                  <img
                    src="/assets/equipesenior/sao.jpg"
                    alt="Ícone"
                    width="45"
                    style={{ verticalAlign: "middle", marginRight: "8px" }}
                  />
                  Penalização Por Reversão Indevida{" "}
                  <b>B.O 263-2490 | NF 960281</b>
                  <br />
                  Informamos que foi aplicada penalizações a <b>
                    {" "}
                    EQUIPE SAO
                  </b>{" "}
                  devido às ocorrência registrada no dia 17/10, referente à
                  reversão indevida de B.O, reversão para o parceiro sem
                  confirmar carregamento. Como resultado, foi atribuída uma
                  penalidade de <b>-3 pontos</b> no sistema de desempenho.
                  Reforçamos a importância de seguir os protocolos estabelecidos
                  para garantir a integridade dos processos e a qualidade das
                  operações.
                </div>
                ______________________________________________________________________________________________________________________________
                <div style={{ position: "relative", zIndex: 0 }}>
                  <img
                    src="/assets/equipesoft/bau.png"
                    alt="Ícone"
                    width="45"
                    style={{ verticalAlign: "middle", marginRight: "8px" }}
                  />
                  Penalização Por Reversão Indevida{" "}
                  <b>B.O 7-93613 | NF 333999</b>
                  <br />
                  Informamos que foi aplicada penalizações a <b>
                    {" "}
                    EQUIPE BAU
                  </b>{" "}
                  devido às ocorrências registradas no dia 07/10 e 16/10,
                  referente à reversão indevida de B.O, reversão para outra
                  unidade afim de cobrar ações, erro de leitura de BAU com envio
                  errado para outra unidade. Como resultado, foi atribuída uma
                  penalidade de <b>-6 pontos</b> no sistema de desempenho.
                  Reforçamos a importância de seguir os protocolos estabelecidos
                  para garantir a integridade dos processos e a qualidade das
                  operações.
                </div>
              </div>
            </p>
            <br />
            <img
              src="/assets/bbmlogistica.png"
              alt="Banner do Desafio"
              style={{
                width: "28%",
                maxHeight: "100px",
                objectFit: "cover",
                borderRadius: "12px",
                marginBottom: "24px",
              }}
            />
            <br />
            <button
              onClick={fecharPopup}
              style={{
                backgroundColor: "#8e2de2",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
