"use client";

import { Participant, Transfer, AVATAR_COLORS, formatMoney } from "./logic";

interface ResultsSectionProps {
  participants: Participant[];
  transfers: Transfer[];
  total: number;
  avg: number;
  onReset: () => void;
  onToggleSettle: (i: number) => void;
  onBack: () => void;
}

export default function ResultsSection({
  participants,
  transfers,
  total,
  avg,
  onReset,
  onToggleSettle,
  onBack,
}: ResultsSectionProps) {
  const perParticipant = participants.map((p, idx) => ({
    name: p.name,
    balance: p.amount - avg,
    idx,
  }));
  const allSettled = transfers.length > 0 && transfers.every((t) => t.settled);

  return (
    <div className="ff-results">
      {/* Header row: back + reset */}
      <div className="ff-results-topbar">
        <button className="ff-back-btn" onClick={onBack}>
          <span className="material-symbols-outlined" style={{ fontSize: "1rem" }}>arrow_back</span>
          Volver
        </button>
        <button className="ff-btn-ghost" onClick={onReset}>
          <span className="material-symbols-outlined" style={{ fontSize: "1rem" }}>restart_alt</span>
          Reiniciar
        </button>
      </div>

      {/* Summary row — solo Total */}
      <div className="ff-summary-row">
        <div className="ff-summary-pill ff-summary-pill--positive" style={{ gridColumn: "1 / -1" }}>
          <p className="ff-summary-label">Total Gastado</p>
          <p className="ff-summary-amount" id="total-display">{formatMoney(total)}</p>
        </div>
      </div>

      {/* Individual balances */}
      <section className="ff-balances-section">
        <h2 className="ff-section-title">Balances Individuales</h2>
        <div className="ff-balances-grid">
          {perParticipant.map((b) => (
            <BalanceCard key={b.name} name={b.name} balance={b.balance} idx={b.idx} />
          ))}
        </div>
      </section>

      {/* Who pays whom */}
      <section className="ff-transfers-section">
        <div className="ff-transfers-header">
          <div className="ff-transfers-icon-wrap">
            <span className="material-symbols-outlined" style={{ fontSize: "1.2rem", color: "white" }}>
              currency_exchange
            </span>
          </div>
          <h2 className="ff-section-title" style={{ marginBottom: 0 }}>
            Quién le paga a quién
          </h2>
        </div>

        {allSettled ? (
          <div className="ff-all-settled">
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: "3rem",
                color: "#006d4a",
                display: "block",
                marginBottom: "0.75rem",
                fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
              }}
            >
              check_circle
            </span>
            <p className="ff-all-settled-title">¡Todo saldado! 🎉</p>
            <p className="ff-all-settled-sub">
              No hay transferencias pendientes.
            </p>
          </div>
        ) : transfers.length === 0 ? (
          <div className="ff-all-settled">
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: "3rem",
                color: "#006d4a",
                display: "block",
                marginBottom: "0.75rem",
                fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
              }}
            >
              check_circle
            </span>
            <p className="ff-all-settled-title">¡Ya está todo saldado!</p>
            <p className="ff-all-settled-sub">Todos gastaron exactamente lo mismo.</p>
          </div>
        ) : (
          <div className="ff-transfers-list">
            {transfers.map((t, i) => (
              <TransferRow
                key={i}
                transfer={t}
                index={i}
                onToggle={onToggleSettle}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function BalanceCard({
  name,
  balance,
  idx,
}: {
  name: string;
  balance: number;
  idx: number;
}) {
  const color = AVATAR_COLORS[idx % AVATAR_COLORS.length];
  const isZero = Math.abs(balance) < 0.01;
  const isPositive = balance > 0.01;

  const chipClass = isZero
    ? "ff-chip ff-chip--neutral"
    : isPositive
    ? "ff-chip ff-chip--positive"
    : "ff-chip ff-chip--negative";
  const chipLabel = isZero ? "Saldado" : isPositive ? "Excedente" : "En deuda";
  const amtColor = isZero ? "#596064" : isPositive ? "#006d4a" : "#bd0c3b";
  const sign = isPositive && !isZero ? "+" : "";

  return (
    <div className="ff-balance-card">
      <div className="ff-balance-left">
        <div
          className="ff-avatar"
          style={{ background: color.bg, color: color.color }}
        >
          {name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="ff-balance-name">{name}</p>
          <span className={chipClass}>{chipLabel}</span>
        </div>
      </div>
      <p className="ff-balance-amount" style={{ color: amtColor }}>
        {sign}
        {formatMoney(balance)}
      </p>
    </div>
  );
}

function TransferRow({
  transfer,
  index,
  onToggle,
}: {
  transfer: Transfer;
  index: number;
  onToggle: (i: number) => void;
}) {
  return (
    <div
      className={`ff-transfer-row ${transfer.settled ? "ff-transfer-row--settled" : ""}`}
      style={{ borderLeftColor: transfer.settled ? "#69f6b8" : "#006d4a" }}
    >
      <div className="ff-transfer-names">
        <span className="ff-transfer-name">{transfer.from}</span>
        <span className="material-symbols-outlined ff-transfer-arrow">
          arrow_forward
        </span>
        <span className="ff-transfer-name">{transfer.to}</span>
      </div>
      <div className="ff-transfer-right">
        <span className="ff-transfer-amount">{formatMoney(transfer.amount)}</span>
        <button
          className={`ff-settle-btn ${transfer.settled ? "ff-settle-btn--done" : ""}`}
          onClick={() => onToggle(index)}
          aria-label={transfer.settled ? "Marcar como pendiente" : "Marcar como saldado"}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: "0.9rem",
              fontVariationSettings: transfer.settled
                ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
                : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
            }}
          >
            {transfer.settled ? "check_circle" : "radio_button_unchecked"}
          </span>
          {transfer.settled ? "Saldado" : "Saldar"}
        </button>
      </div>
    </div>
  );
}
