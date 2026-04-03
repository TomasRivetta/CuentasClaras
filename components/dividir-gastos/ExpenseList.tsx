"use client";

import { Participant, AVATAR_COLORS, formatMoney } from "./logic";

interface ExpenseListProps {
  participants: Participant[];
  onRemove: (id: number) => void;
  onCalculate: () => void;
}

export default function ExpenseList({
  participants,
  onRemove,
  onCalculate,
}: ExpenseListProps) {
  const n = participants.length;
  const canCalculate = n >= 2;

  return (
    <div className="ff-card ff-card--flush">
      {/* Header */}
      <div className="ff-list-header">
        <h3 className="ff-card-title">Lista de Gastos</h3>
        <span className="ff-count-badge" id="participant-count">
          {n} {n === 1 ? "participante" : "participantes"}
        </span>
      </div>

      {/* Rows */}
      <div className="ff-list-body">
        {n === 0 ? (
          <EmptyState />
        ) : (
          participants.map((p, idx) => (
            <ParticipantRow
              key={p.id}
              participant={p}
              idx={idx}
              onRemove={onRemove}
            />
          ))
        )}
      </div>

      {/* Footer action */}
      <div className="ff-list-footer">
        <button
          id="calc-btn"
          className={`ff-btn-dark ${!canCalculate ? "ff-btn--disabled" : ""}`}
          onClick={onCalculate}
          disabled={!canCalculate}
          title={!canCalculate ? "Necesitás al menos 2 participantes" : ""}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "1.2rem" }}>
            calculate
          </span>
          Calcular Reparto
        </button>
        {!canCalculate && n > 0 && (
          <p className="ff-hint">Necesitás al menos 2 participantes</p>
        )}
      </div>
    </div>
  );
}

function ParticipantRow({
  participant,
  idx,
  onRemove,
}: {
  participant: Participant;
  idx: number;
  onRemove: (id: number) => void;
}) {
  const color = AVATAR_COLORS[idx % AVATAR_COLORS.length];
  const initial = participant.name.charAt(0).toUpperCase();

  return (
    <div className="ff-participant-row">
      <div className="ff-participant-info">
        <div
          className="ff-avatar"
          style={{ background: color.bg, color: color.color }}
        >
          {initial}
        </div>
        <div className="ff-participant-text">
          <p className="ff-participant-name">{participant.name}</p>
          <p className="ff-participant-desc">
            {participant.desc || "Sin descripción"}
          </p>
        </div>
      </div>
      <div className="ff-participant-right">
        <p className="ff-participant-amount">{formatMoney(participant.amount)}</p>
        <button
          className="ff-delete-btn"
          onClick={() => onRemove(participant.id)}
          title="Eliminar"
          aria-label={`Eliminar a ${participant.name}`}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "1.2rem" }}>
            delete
          </span>
        </button>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="ff-empty-state">
      <span className="material-symbols-outlined ff-empty-icon">receipt_long</span>
      <p className="ff-empty-text">
        Todavía no hay participantes.
        <br />
        ¡Añadí el primero!
      </p>
    </div>
  );
}
