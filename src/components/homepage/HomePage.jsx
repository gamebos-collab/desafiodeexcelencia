import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./Homepage.css";

/**
 * Página temporária de vencedores (Homepage).
 * - Imagens devem estar em: public/assets/vencedores/ ou public/assets/
 * - Para usar: importe e coloque <Homepage /> em alguma rota ou no App.
 */

export default function Homepage() {
  // Dados de exemplo — ajuste conforme necessário (pode vir de API)
  const winners = [
    {
      position: 1,
      team: "EQUIPE SAOO",
      score: "835",
      img: "/assets/vencedores/sao.png",
      highlight: "EQUIPE SÊNIOR",
    },
    {
      position: 2,
      team: "EQUIPE BHZ",
      score: "354",
      img: "/assets/vencedores/bhz.png",
      highlight: "EQUIPE PLENO",
    },
    {
      position: 3,
      team: "EQUIPE CAS",
      score: "991",
      img: "/assets/vencedores/cas.png",
      highlight: "EQUIPE SOFT",
    },
  ];

  useEffect(() => {
    // Demo: side-effects futuros (analytics, fetch, etc.)
  }, []);

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 18, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 14 },
    },
  };

  return (
    <div className="vencedores-root homepage-root">
      <div className="confetti-wrap" aria-hidden="true">
        <span className="confetti c1" />
        <span className="confetti c2" />
        <span className="confetti c3" />
        <span className="confetti c4" />
        <span className="confetti c5" />
        <span className="confetti c6" />
        <span className="confetti c7" />
        <span className="confetti c8" />
      </div>

      <main className="vencedores-container homepage-container">
        <motion.header
          className="vencedores-hero homepage-hero"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="badge-left">Desafio de Excelência</div>

          <div className="hero-center">
            <h2 className="label-month">Vencedores</h2>
            <div className="hero-title">
              <span className="hero-main">OUTUBRO</span>
              <span className="hero-sub">DESAFIO DE EXCELÊNCIA</span>
            </div>
          </div>

          <div className="badge-right">Parabéns!</div>
        </motion.header>

        <section className="results-section">
          <motion.div
            className="cards-row"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {winners.map((w) => (
              <motion.article
                key={w.team}
                className={`winner-card pos-${w.position}`}
                variants={cardVariant}
              >
                <div className="card-top">
                  <div className="medal">
                    {w.position === 1 ? "🥇" : w.position === 2 ? "🥈" : "🥉"}
                  </div>
                  <div className="team-name">{w.team}</div>
                </div>

                <div className="card-media">
                  <img
                    src={w.img}
                    alt={`${w.team} foto`}
                    onError={(e) => {
                      e.currentTarget.src =
                        "/assets/vencedores/placeholder.png";
                    }}
                  />
                </div>

                <div className="card-footer">
                  <div className="score">
                    <span className="score-value">{w.score}</span>
                    <span className="score-label">Pontos</span>
                  </div>
                  <div className="highlight">{w.highlight}</div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <motion.div
            className="congrats"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3>PARABÉNS A TODOS</h3>
            <p className="congrats-strong">VENCEDORES</p>
          </motion.div>
        </section>
      </main>

      <footer className="vencedores-footer homepage-footer">
        <small></small>
      </footer>
    </div>
  );
}
