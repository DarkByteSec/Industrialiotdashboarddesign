import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface GaugeChartProps {
  value: number;
  min: number;
  max: number;
  title: string;
  unit: string;
}

export function GaugeChart({ value, min, max, title, unit }: GaugeChartProps) {
  const [displayValue, setDisplayValue] = useState(min);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayValue(value);
    }, 100);
    return () => clearTimeout(timer);
  }, [value]);

  const percentage = ((displayValue - min) / (max - min)) * 100;
  const angle = (percentage / 100) * 180 - 90;

  const getColor = () => {
    if (percentage < 50) return '#10b981'; // green
    if (percentage < 75) return '#f59e0b'; // orange
    return '#ef4444'; // red
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
      
      <div className="relative w-full aspect-square max-w-sm mx-auto">
        {/* Gauge Background */}
        <svg viewBox="0 0 200 120" className="w-full">
          {/* Background Arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#1e293b"
            strokeWidth="20"
            strokeLinecap="round"
          />
          
          {/* Colored Arc */}
          <motion.path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke={getColor()}
            strokeWidth="20"
            strokeLinecap="round"
            strokeDasharray="251.2"
            strokeDashoffset={251.2 - (251.2 * percentage) / 100}
            initial={{ strokeDashoffset: 251.2 }}
            animate={{ strokeDashoffset: 251.2 - (251.2 * percentage) / 100 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 8px ${getColor()})` }}
          />

          {/* Needle */}
          <motion.line
            x1="100"
            y1="100"
            x2="100"
            y2="30"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ transformOrigin: '100px 100px' }}
            initial={{ rotate: -90 }}
            animate={{ rotate: angle }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          
          {/* Center Circle */}
          <circle cx="100" cy="100" r="8" fill="#0f172a" stroke="white" strokeWidth="2" />
        </svg>

        {/* Value Display */}
        <div className="absolute inset-0 flex items-center justify-center pt-8">
          <div className="text-center">
            <motion.div
              className="text-4xl font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {displayValue.toFixed(1)}
            </motion.div>
            <div className="text-sm text-slate-400">{unit}</div>
          </div>
        </div>

        {/* Min/Max Labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-xs text-slate-400">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>

      {/* Status Bar */}
      <div className="mt-6 flex gap-4 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-xs text-slate-400">Normal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-xs text-slate-400">Warning</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-xs text-slate-400">Critical</span>
        </div>
      </div>
    </div>
  );
}
