"use client";

import { useState, KeyboardEvent } from "react";

interface AddParticipantFormProps {
  onAdd: (name: string, desc: string, amount: number) => void;
}

export default function AddParticipantForm({ onAdd }: AddParticipantFormProps) {
  const [name, setName]     = useState("");
  const [desc, setDesc]     = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState<{ name?: string; amount?: string }>({});

  const validate = (): boolean => {
    const e: { name?: string; amount?: string } = {};
    if (!name.trim())             e.name   = "Ingresá un nombre";
    if (!amount || +amount <= 0)  e.amount = "Ingresá un monto válido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleAdd = () => {
    if (!validate()) return;
    onAdd(name.trim(), desc.trim(), parseFloat(amount));
    setName(""); setDesc(""); setAmount(""); setErrors({});
  };

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="ff-card">
      <div className="ff-form-header">
        <span className="material-symbols-outlined ff-form-icon">person_add</span>
        <h3 className="ff-card-title">Agregar Participante</h3>
      </div>

      <div className="ff-form-fields">
        <div className="ff-field">
          <label className="ff-label">NOMBRE</label>
          <input
            id="input-name"
            className={`ff-input ${errors.name ? "ff-input--error" : ""}`}
            type="text"
            placeholder="Ej: Tomi"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKey}
            autoComplete="off"
          />
          {errors.name && <p className="ff-error-msg">{errors.name}</p>}
        </div>

        <div className="ff-field">
          <label className="ff-label">DESCRIPCIÓN DEL GASTO</label>
          <input
            id="input-desc"
            className="ff-input"
            type="text"
            placeholder="Ej: Asado y carbón"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            onKeyDown={handleKey}
            autoComplete="off"
          />
        </div>

        <div className="ff-field">
          <label className="ff-label">MONTO GASTADO</label>
          <div className="ff-amount-wrapper">
            <span className="ff-amount-prefix">$</span>
            <input
              id="input-amount"
              className={`ff-input ff-amount-input ${errors.amount ? "ff-input--error" : ""}`}
              type="number"
              min="0"
              step="0.01"
              placeholder="0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onKeyDown={handleKey}
            />
          </div>
          {errors.amount && <p className="ff-error-msg">{errors.amount}</p>}
        </div>

        <button id="add-btn" className="ff-btn-primary" onClick={handleAdd}>
          <span className="material-symbols-outlined" style={{ fontSize: "1.2rem" }}>
            add_circle
          </span>
          Añadir a la lista
        </button>
      </div>
    </div>
  );
}
