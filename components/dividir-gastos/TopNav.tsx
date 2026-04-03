"use client";

interface TopNavProps {
  onReset: () => void;
}

export default function TopNav({ onReset }: TopNavProps) {
  return (
    <header className="ff-topnav">
      <div className="ff-topnav-inner">
        <span className="ff-brand">Financial Fluidity</span>
      </div>
    </header>
  );
}
  