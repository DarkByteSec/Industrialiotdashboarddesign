import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'motion/react';

const data = [
  { machine: 'M-01', power: 45 },
  { machine: 'M-02', power: 67 },
  { machine: 'M-03', power: 52 },
  { machine: 'M-04', power: 89 },
  { machine: 'M-05', power: 73 },
  { machine: 'M-06', power: 41 },
  { machine: 'M-07', power: 58 },
  { machine: 'M-08', power: 82 },
];

const COLORS = ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'];

export function PowerChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Power Usage by Machine</h3>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-xs text-slate-400">kW</span>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} key="power-bar-chart">
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis 
            dataKey="machine" 
            stroke="#64748b" 
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          />
          <YAxis 
            stroke="#64748b" 
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1e293b', 
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#fff'
            }}
            cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
          />
          <Bar 
            dataKey="power" 
            radius={[8, 8, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`power-cell-${entry.machine}-${index}`}
                fill={COLORS[index % COLORS.length]}
                style={{ filter: `drop-shadow(0 0 8px ${COLORS[index % COLORS.length]})` }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}