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
              da companhia. Acompanhe o BID (boletim de informações diárias)
              diretamente aqui.
            </p>

            <video
              controls
              style={{
                width: "40%",
                maxHeight: "295px",
                borderRadius: "12px",
                marginBottom: "94px",
              }}
            >
              <source src="/assets/video-desafio.mp4" type="video/mp4" />
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
              Este desafio tem como objetivo promover a excelência operacional
              da companhia. Acompanhe o BID (boletim de informações diárias)
              diretamente aqui.Este desafio tem como objetivo promover a
              excelência operacional da companhia. Acompanhe o BID (boletim de
              informações diárias) diretamente aqui. Este desafio tem como
              objetivo promover a excelência operacional da companhia. Acompanhe
              o BID (boletim de informações diárias) diretamente aqui. Este
              desafio tem como objetivo promover a excelência operacional da
              companhia. Acompanhe o BID (boletim de informações diárias)
              diretamente aqui.Este desafio tem como objetivo promover a
              excelência operacional da companhia. Acompanhe o BID (boletim de
              informações diárias) diretamente aqui. Este desafio tem como
              objetivo promover a excelência operacional da companhia. Acompanhe
              o BID (boletim de informações diárias) diretamente aqui.Este
              desafio tem como objetivo promover a excelência operacional da
              companhia. Acompanhe o BID (boletim de informações diárias)
              diretamente aqui. Este desafio tem como objetivo promover a
              excelência operacional da companhia. Acompanhe o BID (boletim de
              informações diárias) diretamente aqui. Este desafio tem como
              objetivo promover a excelência operacional da companhia. Acompanhe
              o BID (boletim de informações diárias) diretamente aqui. Este
              desafio tem como objetivo promover a excelência operacional da
              companhia. Acompanhe o BID (boletim de informações diárias)
              diretamente aqui. Este desafio tem como objetivo promover a
              excelência operacional da companhia. Acompanhe o BID (boletim de
              informações diárias) diretamente aqui. Este desafio tem como
              objetivo promover a excelência operacional da companhia. Acompanhe
              o BID (boletim de informações diárias) diretamente aqui. Este
              desafio tem como objetivo promover a excelência operacional da
              companhia. Acompanhe o BID (boletim de informações diárias)
              diretamente aqui.
            </p>
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
