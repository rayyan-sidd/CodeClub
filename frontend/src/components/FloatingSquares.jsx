export default function FloatingSquares() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Cyber Dot-Grid Background with subtle vignette fade */}
      <div 
        className="absolute inset-0 cyber-grid opacity-35"
        style={{
          maskImage: "radial-gradient(ellipse 85% 65% at 50% 25%, black 40%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 65% at 50% 25%, black 40%, transparent 85%)",
        }}
      />

      {/* Top Center Emerald Ambient Light Orb */}
      <div 
        className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[650px] sm:w-[900px] h-[450px] rounded-full opacity-20 blur-[130px] pointer-events-none animate-ambient-pulse"
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,0.45) 0%, rgba(13,150,104,0.15) 50%, transparent 75%)",
        }}
      />

      {/* IUL LMS Signature Floating Glass Squares */}
      <ul className="relative w-full h-full">
        <li className="floating-square square-1" />
        <li className="floating-square square-2" />
        <li className="floating-square square-3" />
        <li className="floating-square square-4" />
        <li className="floating-square square-5" />
        <li className="floating-square square-6" />
        <li className="floating-square square-7" />
        <li className="floating-square square-8" />
        <li className="floating-square square-9" />
        <li className="floating-square square-10" />
      </ul>
    </div>
  );
}