export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden="true"
      >
        {/* Central I beam */}
        <rect
          x="14"
          y="6"
          width="4"
          height="20"
          fill="#CCFF00"
          className="animate-pulse"
        />

        {/* Top circuit lines - left side */}
        <path
          d="M14 8H8C7 8 6 9 6 10V12"
          stroke="#CCFF00"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M14 12H10C9 12 8 13 8 14V16"
          stroke="#CCFF00"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Top circuit lines - right side */}
        <path
          d="M18 8H24C25 8 26 9 26 10V12"
          stroke="#CCFF00"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M18 12H22C23 12 24 13 24 14V16"
          stroke="#CCFF00"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Bottom circuit lines - left side */}
        <path
          d="M14 24H8C7 24 6 23 6 22V20"
          stroke="#CCFF00"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M14 20H10C9 20 8 19 8 18V16"
          stroke="#CCFF00"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Bottom circuit lines - right side */}
        <path
          d="M18 24H24C25 24 26 23 26 22V20"
          stroke="#CCFF00"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M18 20H22C23 20 24 19 24 18V16"
          stroke="#CCFF00"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Connection dots */}
        <circle cx="6" cy="12" r="1" fill="#CCFF00" />
        <circle cx="8" cy="16" r="1" fill="#CCFF00" />
        <circle cx="26" cy="12" r="1" fill="#CCFF00" />
        <circle cx="24" cy="16" r="1" fill="#CCFF00" />
        <circle cx="6" cy="20" r="1" fill="#CCFF00" />
        <circle cx="8" cy="16" r="1" fill="#CCFF00" />
        <circle cx="26" cy="20" r="1" fill="#CCFF00" />
        <circle cx="24" cy="16" r="1" fill="#CCFF00" />
      </svg>
    </div>
  );
}
