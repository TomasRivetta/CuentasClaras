import type { Metadata } from "next";
import DividirGastosScreen from "@/components/dividir-gastos/DividirGastosScreen";

export const metadata: Metadata = {
  title: "Dividir la Juntada – Financial Fluidity",
  description:
    "Repartí gastos con tus amigos de forma simple y elegante. Calculá quién le debe a quién sin complicaciones.",
};

export default function DividirGastosPage() {
  return <DividirGastosScreen />;
}
