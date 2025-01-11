"use client";

export function AnimatedStripes() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div className="relative w-full h-full">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-full w-24 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent"
            style={{
              left: `${i * 8}%`,
              opacity: 0.1 + i * 0.05,
              animation: `stripeFloat ${10 + i * 0.5}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes stripeFloat {
          0%,
          100% {
            transform: translateY(-5%);
          }
          50% {
            transform: translateY(5%);
          }
        }
      `}</style>
    </div>
  );
}
