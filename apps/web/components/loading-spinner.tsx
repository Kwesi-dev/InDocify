export function LoadingSpinner({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <svg
        className="animate-spin"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 4.75V6.25"
          stroke="#CCFF00"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.1266 6.87347L16.0659 7.93413"
          stroke="#CCFF00"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-90"
        />
        <path
          d="M19.25 12H17.75"
          stroke="#CCFF00"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-80"
        />
        <path
          d="M17.1266 17.1265L16.0659 16.0659"
          stroke="#CCFF00"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-70"
        />
        <path
          d="M12 19.25V17.75"
          stroke="#CCFF00"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-60"
        />
        <path
          d="M6.87347 17.1265L7.93413 16.0659"
          stroke="#CCFF00"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-50"
        />
        <path
          d="M4.75 12H6.25"
          stroke="#CCFF00"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-40"
        />
        <path
          d="M6.87347 6.87347L7.93413 7.93413"
          stroke="#CCFF00"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-30"
        />
      </svg>
    </div>
  );
}
