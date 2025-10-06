import React from "react";
import Navigation from "../components/Navigation/Navigation";

function Regras() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #160125ff)",
        color: "#f9a826",
        padding: "0",
        margin: "0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navigation />

      <div
        style={{
          flex: 1,
          maxWidth: 900,
          margin: "0 auto",
          padding: "64px 24px 0 24px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "1.9rem",
            fontWeight: 800,
            marginBottom: 24,
            fontFamily: "Orbitron",
            letterSpacing: 1.5,
          }}
        >
          REGRAS DESAFIO DE EXCELÊNCIA
        </h1>

        <div
          style={{
            background: "#2a0845",
            borderRadius: 16,
            padding: "32px 24px",
            fontSize: "1rem",
            lineHeight: 1.7,
            boxShadow: "0 2px 14px rgba(184, 14, 241, 1)",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "1rem",
                fontWeight: 200,
                fontFamily: "Arial, sans-serif",
                marginBottom: 16,
                marginTop: 0,
                color: "#ffffffff",
                letterSpacing: 1,
                padding: "8px 12px",
                borderRadius: 0,
                textAlign: "center",
                display: "inline-block",
              }}
            >
              O objetivo principal do projeto é reduzir o número de BO’s em
              aberto por falhas operacionais, incentivando a qualidade na
              tratativa e a eficiência nos processos. Todas as baixas devem ser
              realizadas com responsabilidade, seguindo integralmente os
              critérios operacionais da Translovato PO.OPE.011, evitando
              encerramentos indevidos.
              <br />
              <br />
            </h2>

            <h3
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                marginTop: 28,
                color: "#ffffffff",
                fontFamily: "Arial, sans-serif",
                textAlign: "center",
              }}
            >
              ✅ Desafio Normal – Regras de Pontuação Positiva
            </h3>
            <p
              style={{
                marginTop: -48,
                fontFamily: "sans-serif",
                textAlign: "center",
                color: "#ffffffff",
              }}
            >
              <br />
              <br />
              Somente serão contabilizadas como pontuação positiva as baixas
              realizadas conforme os critérios abaixo:
              <br />
              <br />
            </p>
            <ul style={{ color: "#ffffffff", fontFamily: "sans-serif" }}>
              <li>
                <i>Mercadoria localizada (Parecer 7);</i>
              </li>
              <li>
                <i>Volume aceito pelo destinatário (Parecer 9);</i>
              </li>

              <i>Finalizado (Parecer 6) ;</i>

              <li>
                <i>6 a 10 dias em aberto →</i>
                <span style={{ background: "#00ff0dff" }}>
                  {" "}
                  <b> 1 Ponto.</b>
                </span>
              </li>
              <li>
                <i>11 a 15 dias em aberto → </i>
                <span style={{ background: "#00ff0dff" }}>
                  {" "}
                  <b> 2 Pontos.</b>
                </span>
              </li>
              <li>
                <i>Acima de 15 dias em aberto → </i>
                <span style={{ background: "#00ff0dff" }}>
                  {" "}
                  <b> 3 pontos.</b>
                </span>
              </li>
            </ul>

            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                marginTop: 28,
                color: "#ffffffff",
                textAlign: "center",
                fontFamily: "sans-serif",
              }}
            >
              📌 As baixas são contabilizadas por USUÁRIO que realizou a
              tratativa, e não por Centralizadora, garantindo a efetividade de
              cada setor responsável.
              <br />
              <br />
              ⚠️ Atenção: Baixas realizadas pelo Time Operacional e pelos
              Parceiros não geram pontuação positiva.
            </h3>

            <h3
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                marginTop: 28,
                color: "#ffffffff",
                textAlign: "center",
                fontFamily: "sans-serif",
              }}
            >
              <br />
              🔄 Desafio Invertido – Regras de Penalidade
            </h3>
            <p
              style={{
                marginTop: -48,
                fontFamily: "Segoe UI, Arial, sans-serif",
                textAlign: "center",
                color: "#ffffffff",
              }}
            >
              <br />
              <br />
              Cada SPP/Centralizadora inicia com 1.000 pontos, e será penalizada
              conforme o tempo em aberto do B.O.:
              <br />
              <br />
            </p>
            <ul style={{ color: "#ffffffff", fontFamily: "sans-serif" }}>
              <li>
                <i>5 a 10 dias em aberto →</i>
                <span style={{ background: "#ff0000ff" }}>
                  {" "}
                  <b>– 1 Ponto.</b>
                </span>
              </li>
              <li>
                <i>10 a 15 dias em aberto →</i>
                <span style={{ background: "#ff0000ff" }}>
                  {" "}
                  <b> – 2 Pontos.</b>
                </span>
              </li>
              <li>
                <i>15 dias em aberto → </i>
                <span style={{ background: "#ff0000ff" }}>
                  {" "}
                  <b> – 3 Pontos.</b>
                </span>
              </li>
              <li>
                <i>Acima de 15 dias em aberto → </i>
                <span style={{ background: "#ff0000ff" }}>
                  {" "}
                  <b> – 1 ponto para cada dia adicional em aberto.</b>
                </span>
              </li>
            </ul>

            <h3
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                marginTop: 28,
                color: "#ffffffff",
                textAlign: "center",
                fontFamily: "Arial, sans-serif",
              }}
            >
              <br />
              Para garantir a integridade do Desafio, as seguintes ocorrências
              resultarão em perda de pontos imediata:
            </h3>
            <ul style={{ color: "#ffffffff", fontFamily: "sans-serif" }}>
              <li>
                <i>Reversão de BO indevida →</i>
                <span style={{ background: "#ff0000ff" }}>
                  {" "}
                  <b>-3 pontos</b>
                </span>
              </li>
              <li>
                <i>Baixa de BO indevida →</i>
                <span style={{ background: "#ff0000ff" }}>
                  {" "}
                  <b>-6 pontos</b>
                </span>
              </li>
              <li>
                <i>
                  Retenção intencional de BO (segurar o B.O. para tentar
                  manipular pontuação) →
                </i>
                <span style={{ background: "#ff0000ff" }}>
                  {" "}
                  <b>-10 ponto.</b>
                  <h3
                    style={{
                      fontSize: "2rem",
                      fontWeight: 700,
                      marginTop: 28,
                      color: "#ffffffff",
                      textAlign: "center",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    <br />
                    🏅 Conquistas
                  </h3>
                  <br />
                  <br />
                </span>
                <i>
                  No site do desafio haverá uma aba de Conquistas. As medalhas
                  de merecimento serão concedidas exclusivamente às
                  centralizadoras que atingirem os requisitos ao final do
                  período vigente do desafio.
                  <br />
                  <br />
                  👉 Lembre-se: O Desafio de Excelência não é apenas sobre
                  pontuação, mas sim sobre prevenção, qualidade na tratativa e
                  eliminação das falhas operacionais.
                </i>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

export default Regras;
