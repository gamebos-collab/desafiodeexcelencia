import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";
import "./HomePage.css";

// altura da barra (px) compartilhada
const PROGRESS_SVG_HEIGHT = 36;

// utilitário para detectar strings de imagem
function isImageString(s) {
  if (typeof s !== "string") return false;
  return (
    s.startsWith("/") ||
    s.startsWith("http") ||
    s.startsWith("data:") ||
    /\.(png|jpe?g|svg|webp|gif)(\?.*)?$/i.test(s)
  );
}

// utilitário para normalizar percentuais
function parsePercentValue(p) {
  if (typeof p === "string") {
    const cleaned = p.replace("%", "").trim();
    const n = parseFloat(cleaned.replace(",", "."));
    if (Number.isFinite(n)) return n;
    return 0;
  }
  const n = Number(p);
  if (!Number.isFinite(n) || isNaN(n)) return 0;
  // suporte a valores fracionários 0..1 => converte para 0..100
  if (n > 0 && n <= 1) return n * 100;
  return n;
}

// utilitário: expande linhas que têm múltiplos BOs separados por vírgula
function expandRows(rows = []) {
  // Para cada row: se BO contiver vírgulas, cria uma linha por BO
  return rows.flatMap((r) => {
    const boField = r.BO ?? r.bo ?? "";
    const boStr = String(boField);
    // split por vírgula e por quebra de linha; trim e filtra vazios
    const parts = boStr
      .split(/[,|\n]/)
      .map((s) => s.trim())
      .filter((s) => s !== "");
    if (parts.length <= 1) {
      return [r];
    }
    // gera uma nova linha para cada BO, mantendo as demais propriedades
    return parts.map((singleBO) => ({
      ...r,
      BO: singleBO,
    }));
  });
}

// ======= MissionPopup (mantido) =======
function MissionPopup({
  show,
  onClose,
  title = "Missão do Dia",
  subtitle = "Você pode editar esta missão até Segunda-feira 0:00",
  period = "Seg 4:00 - Sex 4:00",
  missions = [],
}) {
  if (!show) return null;

  return (
    <div className="mission-popup-overlay">
      <motion.div
        className="mission-popup"
        initial={{ opacity: 0, y: -80, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65 }}
      >
        <div className="mission-popup-header">
          <div className="mission-popup-flag" />
          <div>
            <h2>{title}</h2>
            <p>{subtitle}</p>
            <span className="mission-period">{period}</span>
          </div>
          <button className="mission-close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="mission-list">
          {missions.map((mission, idx) => (
            <div key={idx} className="mission-card">
              <div className="mission-card-title">Missão {mission.level}</div>
              <div className="mission-info-row">
                <span className="mission-target">
                  {mission.target.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </span>
                <span className="mission-reward">{mission.reward}</span>
              </div>
              {mission.benefit && (
                <div className="mission-benefit">
                  <span>+{mission.benefit}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ======= Report Modal Popup (overlay modal) =======
function ReportModal({
  show,
  onClose,
  rows = [],
  title = "Relatório de Progresso",
}) {
  if (!show) return null;

  // expande linhas com múltiplos BOs
  const expanded = expandRows(rows);

  return (
    <div className="report-popup-overlay">
      <motion.div
        className="report-popup"
        initial={{ scale: 0.98, opacity: 0, y: -10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.98, opacity: 0, y: -10 }}
        transition={{ duration: 0.28 }}
      >
        <div className="report-popup-header">
          <h3 style={{ margin: 0 }}>{title}</h3>
          <button className="mission-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div
          className="report-table-wrapper"
          style={{ overflow: "auto", maxHeight: "58vh", paddingTop: 8 }}
        >
          <table
            className="report-table"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th style={thStyle}>Unidade</th>
                <th style={thStyle}>BO</th>
                <th style={thStyle}>NF</th>
                <th style={thStyle}>Parecer</th>
                <th style={thStyle}>Dias em Aberto</th>
                <th style={thStyle}>Funcionário</th>
                <th style={thStyle}>Pontuação</th>
              </tr>
            </thead>
            <tbody>
              {expanded && expanded.length > 0 ? (
                expanded.map((r, i) => (
                  <tr
                    key={i}
                    style={{
                      background:
                        i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
                    }}
                  >
                    <td style={tdStyle}>{r.Unidade ?? r.unidade ?? ""}</td>
                    <td style={tdStyle}>{r.BO ?? r.bo ?? ""}</td>
                    <td style={tdStyle}>{r.NF ?? r.nf ?? ""}</td>
                    <td style={tdStyle}>{r.Parecer ?? r.parecer ?? ""}</td>
                    <td style={tdStyle}>
                      {r["Dias em Aberto"] ?? r.Dias ?? r.dias ?? ""}
                    </td>
                    <td style={tdStyle}>
                      {r.Funcionario ?? r.funcionario ?? ""}
                    </td>
                    <td style={tdStyle}>
                      {r.Pontuacao ?? r.Pontuação ?? r.pontuacao ?? ""}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td style={tdStyle} colSpan={6}>
                    Nenhum registro.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: 12, textAlign: "right" }}>
          <button className="btn" onClick={onClose}>
            Fechar
          </button>
        </div>
      </motion.div>
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "8px 10px",
  color: "#fff",
  fontSize: 13,
  borderBottom: "1px solid rgba(255,255,255,0.06)",
};

const tdStyle = {
  padding: "8px 10px",
  color: "#e8e8e8",
  fontSize: 13,
  borderBottom: "1px solid rgba(255,255,255,0.03)",
};

// ======= ProgressBar (clicável) =======
function ProgressBar({
  name,
  subtitle,
  icon,
  targetPercent,
  reportRows = [],
  index,
  animateDelay = 0,
  onCompleteReward = (n) => {},
  onOpenReport = () => {},
}) {
  const svgHeight = PROGRESS_SVG_HEIGHT;
  const waveMoveDuration = 10000;
  const waveBobDuration = 5000;
  const fillTransitionDuration = 900;

  const [displayed, setDisplayed] = useState(0);
  const [completed, setCompleted] = useState(false);
  const rafRef = useRef();

  const parsedTarget = Math.max(
    0,
    Math.min(100, parsePercentValue(targetPercent))
  );
  const safeIdBase = `${name}`.replace(/[^a-zA-Z0-9_-]/g, "_") + `_${index}`;

  useEffect(() => {
    let start = null;
    const duration = 800 + Math.min(1200, parsedTarget * 8);
    const startValue = 0;
    const endValue = parsedTarget;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = Math.round(startValue + (endValue - startValue) * eased);
      setDisplayed(val);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        if (endValue >= 100) {
          if (!completed) {
            setCompleted(true);
            try {
              onCompleteReward(name);
            } catch (err) {
              // ignore
            }
          }
        } else {
          setCompleted(false);
        }
      }
    };

    const delayTimeout = setTimeout(() => {
      rafRef.current = requestAnimationFrame(step);
    }, animateDelay);

    return () => {
      clearTimeout(delayTimeout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetPercent, animateDelay]);

  const waveYOffset = (1 - displayed / 100) * (svgHeight * 0.6);

  const getGradient = (p) => {
    if (p >= 80) return { from: "#39e6a6", to: "#3bd5ff" };
    if (p >= 50) return { from: "#ffd200", to: "#3bd5ff" };
    if (p >= 30) return { from: "#ff6b6b", to: "#ffd200" };
    return { from: "#ff6b6b", to: "#ff9f43" };
  };

  const grad = getGradient(parsedTarget);

  const renderIcon = () => {
    if (React.isValidElement(icon)) return icon;
    if (isImageString(icon)) {
      return (
        <img
          src={icon}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      );
    }
    return (
      <span className="icon-emoji" style={{ fontSize: 14 }}>
        {icon}
      </span>
    );
  };

  const handleOpenReport = (e) => {
    e && e.stopPropagation && e.stopPropagation();
    if (typeof onOpenReport === "function") onOpenReport(reportRows || []);
  };

  return (
    <div
      className="progress-card"
      aria-hidden={false}
      style={{ cursor: "pointer" }}
      onClick={handleOpenReport}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleOpenReport(e);
      }}
    >
      <div className="progress-meta" style={{ alignItems: "center" }}>
        <div
          className="progress-icon"
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            flex: "0 0 36px",
            overflow: "hidden",
          }}
        >
          {renderIcon()}
        </div>

        <div style={{ marginLeft: 8, overflow: "hidden", minWidth: 0 }}>
          <div
            className="progress-name"
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#fff",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </div>
          {subtitle && (
            <div
              className="progress-subtitle"
              style={{
                fontSize: 12,
                color: "#bfbfbf",
                marginTop: 2,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        <div
          className="progress-percent"
          style={{
            marginLeft: "auto",
            fontSize: 13,
            color: "#ffd85a",
            fontWeight: 700,
          }}
        >
          {displayed}%
        </div>
      </div>

      <div
        className="progress-container"
        role="progressbar"
        aria-valuenow={displayed}
        aria-valuemin="0"
        aria-valuemax="100"
        style={{ marginTop: 6 }}
      >
        <div className="progress-frame" style={{ position: "relative" }}>
          <svg
            width="100%"
            height={svgHeight}
            viewBox={`0 0 420 ${svgHeight}`}
            preserveAspectRatio="none"
            className="progress-svg progress-bg-svg"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <clipPath id={`r-clip-bg-${safeIdBase}`}>
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height={svgHeight}
                  rx={svgHeight / 2}
                  ry={svgHeight / 2}
                />
              </clipPath>
            </defs>
            <g clipPath={`url(#r-clip-bg-${safeIdBase})`}>
              <rect
                x="0"
                y="0"
                width="100%"
                height={svgHeight}
                fill="rgba(255,255,255,0.015)"
              />
              <rect
                x="0"
                y="0"
                width="100%"
                height={svgHeight}
                fill="rgba(0,0,0,0.12)"
              />
            </g>
          </svg>

          <div
            className="fill-wrapper"
            style={{
              position: "absolute",
              left: 4,
              top: 4,
              height: svgHeight,
              width: `${displayed}%`,
              maxWidth: "calc(100% - 8px)",
              overflow: "hidden",
              borderRadius: svgHeight / 2,
              transition: `width ${fillTransitionDuration}ms cubic-bezier(.22,.9,.32,1)`,
            }}
            aria-hidden="true"
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(90deg, ${grad.from}, ${grad.to})`,
                filter: "saturate(1.05)",
              }}
            />

            <svg
              width="100%"
              height={svgHeight}
              viewBox={`0 0 420 ${svgHeight}`}
              preserveAspectRatio="none"
              className="progress-svg progress-fill-svg"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: "block", position: "relative" }}
              aria-hidden="true"
            >
              <defs>
                <linearGradient id={`g-${safeIdBase}`} x1="0" x2="1">
                  <stop offset="0%" stopColor={grad.from} />
                  <stop offset="100%" stopColor={grad.to} />
                </linearGradient>
                <clipPath id={`r-clip-${safeIdBase}`}>
                  <rect
                    x="0"
                    y="0"
                    width="420"
                    height={svgHeight}
                    rx={svgHeight / 2}
                    ry={svgHeight / 2}
                  />
                </clipPath>
              </defs>

              <g
                clipPath={`url(#r-clip-${safeIdBase})`}
                style={{
                  transform: `translate3d(0px, ${waveYOffset}px, 0)`,
                  transition: `transform ${fillTransitionDuration}ms cubic-bezier(.22,.9,.32,1)`,
                }}
              >
                <g
                  className="waveGroup"
                  style={{
                    transformOrigin: "0 0",
                    animation: `waveMove ${waveMoveDuration}ms linear infinite, waveBob ${waveBobDuration}ms ease-in-out infinite`,
                  }}
                >
                  <path
                    className="wave wave-back"
                    d={`
                      M0 ${Math.max(6, svgHeight * 0.26)}
                      C70 ${Math.max(-6, svgHeight * 0.02)}, 140 ${Math.max(
                      -6,
                      svgHeight * 0.02
                    )}, 210 ${Math.max(6, svgHeight * 0.26)}
                      C280 ${Math.max(
                        svgHeight * 0.52,
                        svgHeight * 0.42
                      )}, 350 ${Math.max(
                      svgHeight * 0.52,
                      svgHeight * 0.42
                    )}, 420 ${Math.max(6, svgHeight * 0.26)}
                      L420 ${svgHeight} L0 ${svgHeight} Z
                    `}
                    fill={`url(#g-${safeIdBase})`}
                    opacity="0.65"
                    style={{ filter: "blur(0.5px)" }}
                  />

                  <path
                    className="wave wave-front"
                    d={`
                      M0 ${Math.max(8, svgHeight * 0.3)}
                      C70 ${Math.max(6, svgHeight * 0.06)}, 140 ${Math.max(
                      6,
                      svgHeight * 0.06
                    )}, 210 ${Math.max(8, svgHeight * 0.3)}
                      C280 ${Math.max(
                        svgHeight * 0.48,
                        svgHeight * 0.38
                      )}, 350 ${Math.max(
                      svgHeight * 0.48,
                      svgHeight * 0.38
                    )}, 420 ${Math.max(8, svgHeight * 0.3)}
                      L420 ${svgHeight} L0 ${svgHeight} Z
                    `}
                    fill={`rgba(255,255,255,0.08)`}
                    opacity="0.85"
                    style={{ mixBlendMode: "overlay" }}
                  />

                  <path
                    d={`
                      M0 ${Math.max(5, svgHeight * 0.18)}
                      C70 ${Math.max(-2, svgHeight * 0.0)}, 140 ${Math.max(
                      -2,
                      svgHeight * 0.0
                    )}, 210 ${Math.max(5, svgHeight * 0.18)}
                      C280 ${Math.max(16, svgHeight * 0.4)}, 350 ${Math.max(
                      16,
                      svgHeight * 0.4
                    )}, 420 ${Math.max(5, svgHeight * 0.18)}
                      L420 ${svgHeight} L0 ${svgHeight} Z
                    `}
                    fill="rgba(255,255,255,0.06)"
                    opacity="0.9"
                    style={{ mixBlendMode: "screen", filter: "blur(0.9px)" }}
                  />

                  <g className="bubbles" opacity="0.95">
                    <circle
                      className="bubble b1"
                      cx="50"
                      cy={Math.max(6, svgHeight * 0.18)}
                      r="2.8"
                      fill="rgba(255,255,255,0.9)"
                    />
                    <circle
                      className="bubble b2"
                      cx="140"
                      cy={Math.max(5, svgHeight * 0.14)}
                      r="2.2"
                      fill="rgba(255,255,255,0.8)"
                    />
                    <circle
                      className="bubble b3"
                      cx="230"
                      cy={Math.max(8, svgHeight * 0.22)}
                      r="2.4"
                      fill="rgba(255,255,255,0.85)"
                    />
                    <circle
                      className="bubble b4"
                      cx="320"
                      cy={Math.max(5, svgHeight * 0.12)}
                      r="1.8"
                      fill="rgba(255,255,255,0.75)"
                    />
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>

      {parsedTarget >= 100 && completed && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.9 }}
          animate={{ opacity: 1, y: -6, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="reward-badge"
        >
          ✨ +50 pontos
        </motion.div>
      )}
    </div>
  );
}

// ======= ProgressPopupInner (manages report modal) =======
function ProgressPopupInner({
  show,
  onClose,
  title = "Barra de Progresso",
  bars = [],
}) {
  if (!show) return null;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalRows, setModalRows] = useState([]);
  const [modalTitle, setModalTitle] = useState("");

  const openModal = (rows = [], titleText = "Relatório de Progresso") => {
    setModalRows(rows || []);
    setModalTitle(titleText);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalRows([]);
    setModalTitle("");
  };

  return (
    <div className="progress-popup-overlay">
      <motion.div
        className="progress-popup"
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="progress-popup-header">
          <div className="progress-popup-flag" />
          <div style={{ flex: "1 1 auto" }}>
            <h2 style={{ margin: 0 }}>{title}</h2>
            <p style={{ margin: "6px 0 0 0", color: "#e0e0e0", fontSize: 13 }}>
              Clique em uma barra para abrir o relatório.
            </p>
          </div>
          <button className="mission-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div
          className="progress-list"
          style={{
            maxHeight: `calc(72vh - 120px)`,
            overflowY: "auto",
            paddingRight: 8,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {bars.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i, duration: 0.35 }}
            >
              <ProgressBar
                name={b.name}
                subtitle={b.subtitle}
                icon={b.icon}
                targetPercent={b.percent}
                reportRows={b.reportRows || []}
                index={i}
                animateDelay={60 * i}
                onCompleteReward={() => {}}
                onOpenReport={(rows) =>
                  openModal(rows, `${b.name} — Relatório`)
                }
              />
            </motion.div>
          ))}
        </div>

        {/* Report modal overlay (opens on top) */}
        <ReportModal
          show={modalOpen}
          onClose={closeModal}
          rows={modalRows}
          title={modalTitle}
        />
      </motion.div>
    </div>
  );
}

// ======= HomePage (export default) =======
export default function HomePage() {
  const navigate = useNavigate();
  const [dadosTabela, setDadosTabela] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // ativa desativa popup missao
  const [showProgressPopup, setShowProgressPopup] = useState(true); // ativa desativa popup progresso

  // exemplo de barras (preencha reportRows manualmente)
  const barras = [
    {
      name: "Equipe BLU",
      subtitle: "5/5",
      percent: 100,
      icon: "/assets/equipesenior/blu.jpg",
      reportRows: [
        {
          Unidade: "BLU",
          BO: "7-93309",
          NF: "29527",
          Parecer: "Finalizado",
          "Dias em Aberto": 62,
          Funcionario: "Gabriela Luckmann",
          Pontuacao: 3,
        },
        {
          Unidade: "BLU",
          BO: "6-76220",
          NF: "89145",
          Parecer: "Finalizado",
          "Dias em Aberto": 17,
          Funcionario: "Gabriela Luckmann",
          Pontuacao: 3,
        },
        {
          Unidade: "BLU",
          BO: "6-76330",
          NF: "99183",
          Parecer: "Volumes Aceitos Pelo Cliente",
          "Dias em Aberto": 13,
          Funcionario: "Gabriela Luckmann",
          Pontuacao: 2,
        },
        {
          Unidade: "BLU",
          BO: "14-31495",
          NF: "108403",
          Parecer: "Volumes/documentos localizados",
          "Dias em Aberto": 50,
          Funcionario: "Sara Ferreira",
          Pontuacao: 3,
        },
        {
          Unidade: "BLU",
          BO: "60-11924",
          NF: "230539",
          Parecer: "Volumes/documentos localizados",
          "Dias em Aberto": 15,
          Funcionario: "Sara Ferreira",
          Pontuacao: 2,
        },
      ],
    },
    {
      name: "Equipe SAO",
      subtitle: "18/20",
      percent: 90,
      icon: "/assets/equipesenior/sao.jpg",
      reportRows: [
        {
          Unidade: "SAO",
          BO: "141-324",
          NF: "186416",
          Parecer: "Volumes/documentos localizados",
          "Dias em Aberto": 13,
          Funcionario: "Felipe Calado",
          Pontuacao: 2,
        },
        {
          Unidade: "SAO",
          BO: "141-323",
          NF: "50999",
          Parecer: "Volumes/documentos localizados",
          "Dias em Aberto": 15,
          Funcionario: "Felipe Calado",
          Pontuacao: 2,
        },
        {
          Unidade: "SAO",
          BO: "137-10594",
          NF: "361897",
          Parecer: "Volumes/documentos localizados",
          "Dias em Aberto": 14,
          Funcionario: "Felipe Calado",
          Pontuacao: 2,
        },
        {
          Unidade: "SAO",
          BO: "2-119872",
          NF: "17723",
          Parecer: "Volumes/documentos localizados",
          "Dias em Aberto": 20,
          Funcionario: "Marcia Barbosa",
          Pontuacao: 3,
        },
        {
          Unidade: "SAO",
          BO: "23-58316",
          NF: "2866749",
          Parecer: "Finalizado",
          "Dias em Aberto": 18,
          Funcionario: "Marcia Barbosa",
          Pontuacao: 3,
        },
        {
          Unidade: "SAO",
          BO: "138-4079",
          NF: "609259",
          Parecer: "Volumes aceitos pelo cliente",
          "Dias em Aberto": 39,
          Funcionario: "Milton Machado",
          Pontuacao: 3,
        },
        {
          Unidade: "SAO",
          BO: "141-324",
          NF: "186416",
          Parecer: "Volumes/documentos localizados",
          "Dias em Aberto": 13,
          Funcionario: "Felipe Calado",
          Pontuacao: 2,
        },
        {
          Unidade: "SAO",
          BO: "57-30599",
          NF: "609259",
          Parecer: "Volumes/documentos localizados",
          "Dias em Aberto": 27,
          Funcionario: "Milton Machado",
          Pontuacao: 3,
        },
        {
          Unidade: "SAO",
          BO: "6-75864",
          NF: "49559",
          Parecer: "Volumes aceitos pelo cliente",
          "Dias em Aberto": 34,
          Funcionario: "Milton Machado",
          Pontuacao: 3,
        },
        {
          Unidade: "SAO",
          BO: "132-43239",
          NF: "116749",
          Parecer: "Volumes/documentos localizados",
          "Dias em Aberto": 14,
          Funcionario: "Milton Machado",
          Pontuacao: 2,
        },
        {
          Unidade: "SAO",
          BO: "2-118901",
          NF: "63184",
          Parecer: "Volumes aceitos pelo cliente",
          "Dias em Aberto": 42,
          Funcionario: "Milton Machado",
          Pontuacao: 3,
        },
        {
          Unidade: "SAO",
          BO: "2-118328",
          NF: "7781",
          Parecer: "Volumes/documentos localizados",
          "Dias em Aberto": 50,
          Funcionario: "Milton Machado",
          Pontuacao: 3,
        },
        {
          Unidade: "SAO",
          BO: "2-119402",
          NF: "461496",
          Parecer: "Volumes/documentos localizados",
          "Dias em Aberto": 32,
          Funcionario: "Milton Machado",
          Pontuacao: 3,
        },
        {
          Unidade: "SAO",
          BO: "2-120297",
          NF: "606682",
          Parecer: "Volumes/documentos localizados",
          "Dias em Aberto": 13,
          Funcionario: "Milton Machado",
          Pontuacao: 2,
        },
        {
          Unidade: "SAO",
          BO: "5-209810",
          NF: "2396677",
          Parecer: "Volumes aceitos pelo cliente",
          "Dias em Aberto": 17,
          Funcionario: "Milton Machado",
          Pontuacao: 3,
        },
        {
          Unidade: "SAO",
          BO: "137-10600",
          NF: "209733",
          Parecer: "Volumes/documentos localizados",
          "Dias em Aberto": 12,
          Funcionario: "Milton Machado",
          Pontuacao: 2,
        },
        {
          Unidade: "SAO",
          BO: "2-119816",
          NF: "210429",
          Parecer: "Volumes/documentos localizados",
          "Dias em Aberto": 22,
          Funcionario: "Milton Machado",
          Pontuacao: 3,
        },
        {
          Unidade: "SAO",
          BO: "2-119633",
          NF: "36964",
          Parecer: "Volumes/documentos localizados",
          "Dias em Aberto": 26,
          Funcionario: "Milton Machado",
          Pontuacao: 3,
        },
      ],
    },

    {
      name: "Equipe CPN",
      subtitle: "9/20",
      percent: 45,
      icon: "/assets/equipesenior/cpn.png",
      reportRows: [
        {
          Unidade: "CPN",
          BO: "132-43111",
          NF: "601289",
          Parecer: "Finalizado",
          "Dias em Aberto": 22,
          Funcionario: "Luiza Souza",
          Pontuacao: 3,
        },
        {
          Unidade: "CPN",
          BO: "85-27785",
          NF: "300073",
          Parecer: "Volumes/documentos localizados",
          "Dias em Aberto": 19,
          Funcionario: "Luiza Souza",
          Pontuacao: 3,
        },
        {
          Unidade: "CPN",
          BO: "146-477",
          NF: "86805",
          Parecer: "Volumes/documentos localizados",
          "Dias em Aberto": 21,
          Funcionario: "Luiza Souza",
          Pontuacao: 3,
        },
        {
          Unidade: "CPN",
          BO: "335-4116",
          NF: "993147",
          Parecer: "Volumes/documentos localizados",
          "Dias em Aberto": 14,
          Funcionario: "Maria Gadelha",
          Pontuacao: 2,
        },
        {
          Unidade: "CPN",
          BO: "5-209978",
          NF: "747970",
          Parecer: "Volumes/documentos localizados",
          "Dias em Aberto": 12,
          Funcionario: "Maria Gadelha",
          Pontuacao: 2,
        },
        {
          Unidade: "CPN",
          BO: "15-33190",
          NF: "4950962",
          Parecer: "Volumes/documentos localizados",
          "Dias em Aberto": 12,
          Funcionario: "Maria Gadelha",
          Pontuacao: 2,
        },
        {
          Unidade: "CPN",
          BO: "104-6675",
          NF: "67195",
          Parecer: "Volumes aceitos pelo cliente",
          "Dias em Aberto": 12,
          Funcionario: "Paula Costa",
          Pontuacao: 2,
        },
        {
          Unidade: "CPN",
          BO: "1-137791",
          NF: "33774",
          Parecer: "Volumes/documentos localizados",
          "Dias em Aberto": 14,
          Funcionario: "Paula Costa",
          Pontuacao: 2,
        },
        {
          Unidade: "CPN",
          BO: "6-76388",
          NF: "47705",
          Parecer: "Volumes/documentos localizados",
          "Dias em Aberto": 12,
          Funcionario: "Paula Costa",
          Pontuacao: 2,
        },
      ],
    },
    {
      name: "Equipe CXS",
      subtitle: "2/5",
      percent: 40,
      icon: "/assets/equipepleno/cxs.jpg",
      reportRows: [
        {
          Unidade: "CXS",
          BO: "335-4037",
          NF: "656534",
          Parecer: "Volumes/documentos localizados",
          "Dias em Aberto": 29,
          Funcionario: "Marenice Pauletti",
          Pontuacao: 3,
        },
        {
          Unidade: "CXS",
          BO: "1-137649",
          NF: "173932",
          Parecer: "Volumes/documentos localizados",
          "Dias em Aberto": 22,
          Funcionario: "Marenice Pauletti",
          Pontuacao: 3,
        },
      ],
    },
    {
      name: "Equipe POA",
      subtitle: "2/20",
      percent: 10,
      icon: "/assets/equipesenior/poa.jpg",
      reportRows: [
        {
          Unidade: "POA",
          BO: "171-893",
          NF: "351592",
          Parecer: "Volumes/documentos localizados",
          "Dias em Aberto": 15,
          Funcionario: "Tito Silva",
          Pontuacao: 2,
        },
        {
          Unidade: "POA",
          BO: "3-163482",
          NF: "6567728",
          Parecer: "Volumes/documentos localizados",
          "Dias em Aberto": 15,
          Funcionario: "Tito Silva",
          Pontuacao: 2,
        },
      ],
    },
    {
      name: "Equipe VIX",
      subtitle: "1/20",
      percent: 5,
      icon: "/assets/equipesenior/vix.jpeg",
      reportRows: [
        {
          Unidade: "VIX",
          BO: "7-93952",
          NF: "221630",
          Parecer: "Volumes/documentos localizados",
          "Dias em Aberto": 13,
          Funcionario: "Sidney Mendes",
          Pontuacao: 2,
        },
      ],
    },
  ];

  // inject scoped CSS
  useEffect(() => {
    const styleId = "progress-popup-scoped-styles-final";
    if (document.getElementById(styleId)) return;

    const css = `
      .progress-popup-overlay { position: fixed; inset: 0; background: rgba(3,3,6,0.56); display:flex; align-items:center; justify-content:center; z-index:1505; padding:18px; }
      .progress-popup { width: min(980px,96%); max-height:72vh; overflow:hidden; background: linear-gradient(180deg, rgba(10,10,12,0.95), rgba(6,6,8,0.98)); border-radius:14px; padding:12px 14px; box-shadow:0 10px 40px rgba(0,0,0,0.6); border:1px solid rgba(249,168,38,0.06); }
      .progress-popup-header { display:flex; gap:10px; align-items:center; margin-bottom:8px; }
      .progress-popup-flag { width:40px; height:40px; border-radius:8px; background:linear-gradient(135deg,#ffc400,#ff8a00); box-shadow: inset 0 -4px 8px rgba(0,0,0,0.25),0 6px 18px rgba(255,156,28,0.06); }

      .progress-list { display:flex; flex-direction:column; gap:8px; padding:6px 4px 12px 4px; max-height: calc(72vh - 120px); overflow-y:auto; flex:1; min-width:0; }
      .progress-card { background: linear-gradient(180deg, rgba(255,255,255,0.015), rgba(255,255,255,0.005)); border-radius:12px; padding:8px; display:flex; flex-direction:column; gap:6px; border:1px solid rgba(112,112,112,0.05); position:relative; cursor:pointer; }
      .progress-meta { display:flex; align-items:center; gap:10px; }
      .progress-icon { width:36px; height:36px; border-radius:8px; overflow:hidden; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg, rgba(255,255,255,0.02), rgba(0,0,0,0.08)); font-size:16px; color:#fff; box-shadow: inset 0 -3px 6px rgba(0,0,0,0.28); flex:0 0 36px; }
      .progress-icon img { width:100%; height:100%; object-fit:cover; display:block; }
      .progress-name { font-weight:700; color:#fff; font-size:13px; }
      .progress-subtitle { font-size:12px; color:#bfbfbf; margin-top:2px; }
      .progress-percent { color:#ffd85a; font-weight:700; font-size:13px; margin-left:auto; }

      .progress-frame { width:100%; border-radius:14px; padding:3px; background: linear-gradient(90deg, rgba(255,162,38,0.10), rgba(255,162,38,0.02)); box-shadow: inset 0 2px 0 rgba(255,255,255,0.02),0 6px 18px rgba(0,0,0,0.45); }
      .progress-svg { display:block; width:100%; height: ${PROGRESS_SVG_HEIGHT}px; border-radius:12px; overflow:hidden; }

      @keyframes waveMove { 0% { transform: translateX(0%); } 100% { transform: translateX(-12%); } }
      @keyframes waveBob { 0% { transform: translateY(0px); } 50% { transform: translateY(-3px); } 100% { transform: translateY(0px); } }

      .wave-back { filter: blur(0.5px); opacity:0.72 }
      .wave-front { filter: blur(0.2px); opacity:0.86 }

      .waveGroup .b1 { animation: bubbleFloat1 4200ms ease-in-out infinite; transform-origin:center; }
      .waveGroup .b2 { animation: bubbleFloat2 5200ms ease-in-out 400ms infinite; transform-origin:center; }
      .waveGroup .b3 { animation: bubbleFloat3 4600ms ease-in-out 800ms infinite; transform-origin:center; }
      .waveGroup .b4 { animation: bubbleFloat4 5600ms ease-in-out 200ms infinite; transform-origin:center; }

      .reward-badge { position:absolute; right:12px; top:-8px; background: linear-gradient(90deg,#ffd84a,#ffb347); color:#2b2b2b; padding:6px 10px; border-radius:12px; font-weight:800; font-size:13px; box-shadow:0 8px 22px rgba(255,160,0,0.12); }

      /* Report modal overlay */
      .report-popup-overlay { position: fixed; inset: 0; display:flex; align-items:center; justify-content:center; background: rgba(0,0,0,0.6); z-index:2000; padding: 18px; }
      .report-popup { width: min(880px,96%); max-height:80vh; overflow:auto; background: linear-gradient(180deg, rgba(10,10,12,0.98), rgba(6,6,8,0.99)); color:#fff; border-radius:12px; padding:12px; box-shadow:0 12px 40px rgba(0,0,0,0.7); border:1px solid rgba(249,168,38,0.06); }

      .report-table-wrapper { border-radius:8px; overflow:auto; }
      .report-table th { background: transparent; text-align:left; padding:8px 10px; color:#fff; font-weight:700; font-size:13px; border-bottom:1px solid rgba(255,255,255,0.06); }
      .report-table td { padding:8px 10px; color:#e8e8e8; font-size:13px; border-bottom:1px solid rgba(255,255,255,0.03); }

      .progress-list::-webkit-scrollbar, .report-table-wrapper::-webkit-scrollbar { width: 10px; }
      .progress-list::-webkit-scrollbar-thumb, .report-table-wrapper::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 8px; }

      @media (max-width:520px) { .progress-meta { gap:8px } .progress-name { font-size:12px } .progress-subtitle { font-size:11px } .progress-percent { font-size:12px } }
    `;
    const styleEl = document.createElement("style");
    styleEl.id = styleId;
    styleEl.innerHTML = css;
    document.head.appendChild(styleEl);
  }, []);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const res = await fetch(`/gamekpi.xlsx?v=${Date.now()}`);
        const buffer = await res.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: "array" });
        const json = XLSX.utils.sheet_to_json(workbook.Sheets["Planilha2"], {
          range: "F27:K45",
          header: 1,
          blankrows: false,
          defval: 0,
        });
        setDadosTabela(json);
      } catch (err) {
        console.error("Erro ao carregar planilha:", err);
      }
    };
    carregarDados();
  }, []);

  return (
    <>
      <div
        className="homepage-container"
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <div style={{ flexGrow: 1 }}>
          <motion.div
            className="banner"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="game-title">🎮 Desafio de Excelência</h1>
            <p className="subtitle">
              Competição entre equipes rumo à excelência!
            </p>
          </motion.div>

          <MissionPopup
            show={showPopup}
            onClose={() => setShowPopup(false)}
            title="Missão do Dia"
            subtitle="Ganhe pontos extra no seu Desafio de Excelência!"
            period="Ter - 18/11 08:00 à Ter - 18/11 12:00"
            missions={[
              {
                level: 1,
                target: "20 B.Os\nAcima de 11 dias",
                reward: "🏆 50 pontos",
                benefit: "CPN SAO POA VIX",
              },
              {
                level: 2,
                target: "10 B.Os\nAcima de 11 dias",
                reward: "🏆 50 pontos",
                benefit: "CWB GRU BHZ",
              },
              {
                level: 3,
                target: "5 B.Os\nAcima de 11 dias",
                reward: "🏆 50 pontos",
                benefit: "CXS BLU PPY BAU",
              },
            ]}
          />

          <ProgressPopupInner
            show={showProgressPopup}
            onClose={() => setShowProgressPopup(false)}
            title="Resultado da Missão"
            bars={barras}
          />

          <motion.div
            className="buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <button className="btn" onClick={() => navigate("/")}>
              Home
            </button>
            <button className="btn" onClick={() => navigate("/equipes")}>
              Ver Equipes
            </button>
            <button className="btn" onClick={() => navigate("/ranking")}>
              Ranking
            </button>
            <button className="btn" onClick={() => navigate("/conquistas")}>
              Conquistas
            </button>
            <button className="btn" onClick={() => navigate("/regras")}>
              Regras
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{
              textAlign: "center",
              marginTop: "10px",
              color: "#ccc",
              fontSize: "12px",
            }}
          >
            <p style={{ color: "#ffc400ff" }}>
              🕒 Última atualização do sistema: 19/11/2025 10:44h
            </p>
          </motion.div>

          <div className="tabela-overlay">
            {dadosTabela.length > 1 ? (
              <div
                style={{
                  margin: "40px auto",
                  padding: "20px",
                  width: "80%",
                  maxWidth: "1200px",
                  maxHeight: "120vh",
                }}
              >
                <table
                  style={{
                    borderCollapse: "collapse",
                    backgroundColor: "rgba(0,0,0,0.89)",
                    color: "#fff",
                    width: "100%",
                    fontSize: "12px",
                    borderRadius: "8px",
                  }}
                >
                  <thead>
                    <tr>
                      {Array.isArray(dadosTabela[0]) &&
                        dadosTabela[0].map((header, index) => (
                          <th
                            key={index}
                            style={{
                              padding: "12px",
                              borderBottom: "2px solid #f9a826",
                              fontWeight: "bold",
                              textAlign: "center",
                              backgroundColor: "rgba(0,0,0,0.89)",
                            }}
                          >
                            {header}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dadosTabela.slice(1).map((row, rowIndex) => {
                      const corDeFundo =
                        rowIndex % 2 === 0 ? "#1a1a1ac2" : "#69696938";
                      return (
                        <tr
                          key={rowIndex}
                          className="table-row-hover"
                          style={{ backgroundColor: corDeFundo }}
                        >
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              style={{
                                padding: "8.5px",
                                borderBottom: "1px solid #707070ff",
                                textAlign: "center",
                              }}
                            >
                              {cell !== undefined && cell !== null ? cell : 0}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div style={{ marginTop: "10px", textAlign: "center" }}>
                  <img
                    src="/assets/bbmlogistica.png"
                    alt="Banner"
                    style={{
                      maxWidth: "47%",
                      height: "auto",
                      borderRadius: "12px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                    }}
                  />
                </div>
              </div>
            ) : (
              <p style={{ color: "#fff", marginTop: "40px" }}>
                Carregando dados da planilha...
              </p>
            )}
          </div>

          <div className="animated-background" />
        </div>
        <br />
      </div>
    </>
  );
}
