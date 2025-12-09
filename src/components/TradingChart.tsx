import { useEffect, useState } from "react";

const TradingChart = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % 200);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Generate dynamic chart path
  const generatePath = (baseOffset: number, amplitude: number, frequency: number) => {
    const points = [];
    for (let x = 0; x <= 400; x += 4) {
      const y = 150 + 
        Math.sin((x + baseOffset) * 0.02 * frequency) * amplitude +
        Math.sin((x + baseOffset) * 0.05) * (amplitude * 0.3) +
        Math.cos((x + baseOffset) * 0.01) * (amplitude * 0.5);
      points.push(`${x},${y}`);
    }
    return `M${points.join(" L")}`;
  };

  // Generate candles
  const generateCandles = () => {
    const candles = [];
    for (let i = 0; i < 20; i++) {
      const x = 20 + i * 20;
      const baseY = 150 + Math.sin((i * 30 + offset) * 0.05) * 40;
      const height = 20 + Math.random() * 30;
      const isGreen = Math.sin(i + offset * 0.1) > 0;
      
      candles.push(
        <g key={i}>
          {/* Wick */}
          <line
            x1={x}
            y1={baseY - height / 2 - 10}
            x2={x}
            y2={baseY + height / 2 + 10}
            stroke={isGreen ? "hsl(168, 100%, 42%)" : "hsl(0, 84%, 60%)"}
            strokeWidth="1"
            opacity="0.6"
          />
          {/* Body */}
          <rect
            x={x - 6}
            y={baseY - height / 2}
            width="12"
            height={height}
            fill={isGreen ? "hsl(168, 100%, 42%)" : "hsl(0, 84%, 60%)"}
            rx="1"
            opacity="0.8"
          />
        </g>
      );
    }
    return candles;
  };

  return (
    <div className="absolute inset-0 overflow-hidden opacity-30">
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        {/* Grid Lines */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="hsl(222, 30%, 18%)"
              strokeWidth="0.5"
            />
          </pattern>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(168, 100%, 42%)" stopOpacity="0" />
            <stop offset="20%" stopColor="hsl(168, 100%, 42%)" stopOpacity="1" />
            <stop offset="80%" stopColor="hsl(199, 100%, 50%)" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(199, 100%, 50%)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(168, 100%, 42%)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(168, 100%, 42%)" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Area Fill */}
        <path
          d={`${generatePath(offset, 50, 1)} L400,300 L0,300 Z`}
          fill="url(#areaGradient)"
        />

        {/* Main Chart Line */}
        <path
          d={generatePath(offset, 50, 1)}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          filter="url(#glow)"
        />

        {/* Secondary Line */}
        <path
          d={generatePath(offset + 50, 30, 0.7)}
          fill="none"
          stroke="hsl(199, 100%, 50%)"
          strokeWidth="1"
          opacity="0.4"
          strokeDasharray="4 4"
        />

        {/* Moving Average Line */}
        <path
          d={generatePath(offset - 30, 20, 0.5)}
          fill="none"
          stroke="hsl(45, 100%, 50%)"
          strokeWidth="1"
          opacity="0.3"
        />

        {/* Candlesticks (subtle) */}
        <g opacity="0.4">
          {generateCandles()}
        </g>

        {/* Price Indicator */}
        <g transform={`translate(350, ${130 + Math.sin(offset * 0.05) * 20})`}>
          <circle r="6" fill="hsl(168, 100%, 42%)" filter="url(#glow)" />
          <circle r="3" fill="white" />
          <line
            x1="-350"
            y1="0"
            x2="-10"
            y2="0"
            stroke="hsl(168, 100%, 42%)"
            strokeWidth="1"
            strokeDasharray="4 2"
            opacity="0.5"
          />
        </g>
      </svg>
    </div>
  );
};

export default TradingChart;
