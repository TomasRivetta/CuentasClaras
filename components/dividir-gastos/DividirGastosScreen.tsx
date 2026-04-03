"use client";

import { useState, useRef, useEffect } from "react";
import TopNav from "./TopNav";
import AddParticipantForm from "./AddParticipantForm";
import ExpenseList from "./ExpenseList";
import ResultsSection from "./ResultsSection";
import { Participant, Transfer, computeTransfers } from "./logic";

export default function DividirGastosScreen() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [calculated, setCalculated] = useState(false);

  const addParticipant = (name: string, desc: string, amount: number) => {
    const p: Participant = { id: Date.now() + Math.random(), name, desc, amount };
    setParticipants((prev) => [...prev, p]);
    setCalculated(false);
    setTransfers([]);
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
  };

  const total = participants.reduce((s, p) => s + p.amount, 0);
  const avg = participants.length > 0 ? total / participants.length : 0;

  return (
    <>
      <TopNav onReset={resetAll} />

      <main className="ff-main">
        <div className="ff-container-full">

          {/* Page header */}
          <div className="ff-page-header">
            <h1 className="ff-display">Dividir la Juntada</h1>
            <p className="ff-subtitle">
              Repartir gastos nunca fue tan fácil. Gestioná los pagos de tu
              grupo con precisión y sin complicaciones.
            </p>
          </div>

          {/* Main layout: form | right panel */}
          <div className="ff-layout">

            {/* LEFT — formulario */}
            <div className="ff-panel-left">
              <AddParticipantForm onAdd={addParticipant} />
            </div>

            {/* RIGHT — lista o resultados */}
            <div className="ff-panel-right">
              {calculated ? (
                <ResultsSection
                  participants={participants}
                  transfers={transfers}
                  total={total}
                  avg={avg}
                  onReset={resetAll}
                  onToggleSettle={toggleSettle}
                  onBack={() => setCalculated(false)}
                />
              ) : (
                <ExpenseList
                  participants={participants}
                  onRemove={removeParticipant}
                  onCalculate={calculate}
                />
              )}
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
