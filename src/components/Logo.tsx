'use client';

export function Logo() {
  return (
    <svg
      className="h-8 w-auto"
      viewBox="0 0 250 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 60 C40 50, 60 50, 70 60 C80 70, 70 80, 50 85 C40 87, 30 90, 35 100 C40 110, 60 105, 90 95"
        stroke="#00CC99"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ strokeDasharray: '0.1,0' }}
      />
      
      <defs>
        <linearGradient id="greenBlueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00CC99" />
          <stop offset="100%" stopColor="#3498DB" />
        </linearGradient>
      </defs>
      
      <text
        x="100"
        y="80"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        fontSize="35"
        fill="url(#greenBlueGradient)"
      >
        TeAI
      </text>
      <text
        x="180"
        y="80"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        fontSize="35"
        fill="#95A5A6"
        className="dark:fill-gray-400"
      >
        .io
      </text>
    </svg>
  );
}