export default function Home() {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-black">
      {/* Animated background gradient orbs */}
      <div className="absolute inset-0">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] noise" />

      {/* Thin horizontal rule */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-6 select-none">
        <p className="text-xs uppercase tracking-[0.4em] text-white/30 font-light">
          Suits · New York
        </p>

        <h1 className="name-text text-center font-bold uppercase tracking-tight text-white">
          Harvey
          <br />
          <span className="text-outline">Specter</span>
        </h1>

        <p className="text-sm text-white/25 tracking-[0.2em] uppercase font-light">
          The best closer in New York City
        </p>
      </div>

      <style>{`
        .orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(120px);
          opacity: 0.15;
          animation: drift 12s ease-in-out infinite alternate;
        }
        .orb-1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, #0ea5e9, transparent);
          top: -10%; left: -10%;
          animation-duration: 14s;
        }
        .orb-2 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #075985, transparent);
          bottom: -10%; right: -5%;
          animation-duration: 10s;
          animation-delay: -4s;
        }
        .orb-3 {
          width: 350px; height: 350px;
          background: radial-gradient(circle, #0369a1, transparent);
          top: 40%; left: 55%;
          animation-duration: 16s;
          animation-delay: -8s;
        }
        @keyframes drift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(40px, 30px) scale(1.1); }
        }
        .name-text {
          font-size: clamp(4rem, 14vw, 11rem);
          line-height: 0.9;
          letter-spacing: -0.03em;
          background: linear-gradient(135deg, #fff 30%, #0ea5e9 60%, #fff 90%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 5s linear infinite;
        }
        .text-outline {
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke: 1px rgba(14,165,233,0.6);
          background: none;
        }
        @keyframes shimmer {
          from { background-position: 0% center; }
          to   { background-position: 200% center; }
        }
        .noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
        }
      `}</style>
    </div>
  );
}
