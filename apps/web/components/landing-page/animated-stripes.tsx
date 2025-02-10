"use client";

const STRIPES_COUNT = 15;
const BASE_OPACITY = 0.1;
const OPACITY_STEP = 0.05;

export function AnimatedStripes() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div className="relative w-full h-full">
        {Array.from({ length: STRIPES_COUNT }).map((_, i) => (
          <div
            key={i}
            className="absolute h-full w-24 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent"
            style={
              {
                "--stripe-left": `${i * 8}%`,
                "--stripe-opacity": (
                  BASE_OPACITY +
                  i * OPACITY_STEP
                ).toString(),
                "--animation-duration": `${10 + i * 0.5}s`,
                left: "var(--stripe-left)",
                opacity: "var(--stripe-opacity)",
                animation:
                  "stripeFloat var(--animation-duration) infinite ease-in-out",
              } as React.CSSProperties
            }
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
