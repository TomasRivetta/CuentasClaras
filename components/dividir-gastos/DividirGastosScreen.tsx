"use client";

import { useState } from "react";
import TopNav from "./TopNav";
import AddParticipantForm from "./AddParticipantForm";
import ExpenseList from "./ExpenseList";
import ResultsSection from "./ResultsSection";
import { Participant, Transfer, computeTransfers } from "./logic";

export default function DividirGastosScreen() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [calculated, setCalculated] = useState(false);
  // Mobile tab: "form" | "list"
  const [mobileTab, setMobileTab] = useState<"form" | "list">("form");

  const addParticipant = (name: string, desc: string, amount: number) => {
    const p: Participant = { id: Date.now() + Math.random(), name, desc, amount };
    setParticipants((prev) => [...prev, p]);
    setCalculated(false);
    setTransfers([]);
    // Auto-switch to list after adding
    setMobileTab("list");
  };

  const removeParticipant = (id: number) => {
    setParticipants((prev) => prev.filter((p) => p.id !== id));
    setCalculated(false);
    setTransfers([]);
  };

  const calculate = () => {
    if (participants.length < 2) return;
    const total = participants.reduce((s, p) => s + p.amount, 0);
    const avg = total / participants.length;
    const balances = participants.map((p) => ({
      name: p.name,
      balance: p.amount - avg,
    }));
    setTransfers(computeTransfers(balances));
    setCalculated(true);
  };

  const toggleSettle = (i: number) => {
    setTransfers((prev) =>
      prev.map((t, idx) => (idx === i ? { ...t, settled: !t.settled } : t))
    );
  };

  const resetAll = () => {
    setParticipants([]);
    setTransfers([]);
    setCalculated(false);
    setMobileTab("form");
  };

  const handleBack = () => {
    setCalculated(false);
  };

  const total = participants.reduce((s, p) => s + p.amount, 0);
  const avg = participants.length > 0 ? total / participants.length : 0;

  const rightPanel = calculated ? (
    <ResultsSection
      participants={participants}
      transfers={transfers}
      total={total}
      avg={avg}
      onReset={resetAll}
      onToggleSettle={toggleSettle}
      onBack={handleBack}
    />
  ) : (
    <ExpenseList
      participants={participants}
      onRemove={removeParticipant}
      onCalculate={calculate}
    />
  );

  return (
    <>
      <TopNav onReset={resetAll} />

      {/* ── MOBILE TAB BAR ── */}
      <nav className="ff-mobile-tabs" aria-label="Secciones">
        <button
          className={`ff-mobile-tab-btn ${mobileTab === "form" ? "ff-mobile-tab-btn--active" : ""}`}
          onClick={() => setMobileTab("form")}
          aria-selected={mobileTab === "form"}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "1.25rem" }}>person_add</span>
          <span>Agregar</span>
        </button>
        <button
          className={`ff-mobile-tab-btn ${mobileTab === "list" ? "ff-mobile-tab-btn--active" : ""}`}
          onClick={() => setMobileTab("list")}
          aria-selected={mobileTab === "list"}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "1.25rem" }}>receipt_long</span>
          <span>Lista</span>
          {participants.length > 0 && (
            <span className="ff-mobile-tab-badge">{participants.length}</span>
          )}
        </button>
      </nav>

      <main className="ff-main">
        {/* ── MOBILE: single panel view ── */}
        <div className="ff-mobile-view">
          <div
            className="ff-mobile-panel"
            style={{ display: mobileTab === "form" ? "flex" : "none" }}
          >
            <AddParticipantForm onAdd={addParticipant} />
          </div>
          <div
            className="ff-mobile-panel"
            style={{ display: mobileTab === "list" ? "flex" : "none" }}
          >
            {rightPanel}
          </div>
        </div>

        {/* ── DESKTOP: two-column layout ── */}
        <div className="ff-container-full">
          <div className="ff-page-header">
            <h1 className="ff-display">Dividir la Juntada</h1>
            <p className="ff-subtitle">
              Repartir gastos nunca fue tan fácil. Gestioná los pagos de tu
              grupo con precisión y sin complicaciones.
            </p>
          </div>

          <div className="ff-layout">
            <div className="ff-panel-left">
              <AddParticipantForm onAdd={addParticipant} />
            </div>
            <div className="ff-panel-right">
              {rightPanel}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
