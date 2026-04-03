"use client";

interface TopNavProps {
  onReset: () => void;
}

export default function TopNav({ onReset }: TopNavProps) {
  return (
    <header className="ff-topnav">
      <div className="ff-topnav-inner">
        {/* Logo mark + brand */}
        <div className="ff-brand-group">
          <div className="ff-logo-mark" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="28" height="28" rx="8" fill="url(#logoGrad)" />
              <path d="M8 14h12M14 8v12" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
              <circle cx="9" cy="9" r="1.5" fill="white" fillOpacity="0.7"/>
              <circle cx="19" cy="19" r="1.5" fill="white" fillOpacity="0.7"/>
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#00b87a"/>
                  <stop offset="100%" stopColor="#006d4a"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="ff-brand-text-group">
            <span className="ff-brand">Cuentas Claras</span>
            <span className="ff-brand-tagline">Dividí gastos sin drama</span>
          </div>
        </div>

        {/* Right side: decorative badge */}
        <div className="ff-topnav-badge" aria-hidden="true">
          <span className="material-symbols-outlined" style={{ fontSize: "1rem", color: "var(--ff-primary)" }}>
            balance
          </span>
          <span className="ff-topnav-badge-text">Dividir por igual</span>
        </div>
      </div>

      {/* Accent strip */}
      <div className="ff-topnav-strip" aria-hidden="true" />
    </header>
  );
}
