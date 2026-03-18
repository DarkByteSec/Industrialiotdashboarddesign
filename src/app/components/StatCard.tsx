import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: LucideIcon;
  color: string;
  trend?: number;
  status?: 'Running' | 'Stopped' | 'Warning';
}

export function StatCard({ title, value, unit, icon: Icon, color, trend, status }: StatCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'Running': return 'text-green-400';
      case 'Stopped': return 'text-red-400';
      case 'Warning': return 'text-yellow-400';
      default: return 'text-slate-400';
    }
  };

  const getStatusBg = () => {
    switch (status) {
      case 'Running': return 'bg-green-500/20 border-green-500';
      case 'Stopped': return 'bg-red-500/20 border-red-500';
      case 'Warning': return 'bg-yellow-500/20 border-yellow-500';
      default: return 'bg-slate-500/20 border-slate-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend !== undefined && (
          <div className={`text-xs px-2 py-1 rounded ${trend >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {trend >= 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
      
      <div className="mb-2">
        <h3 className="text-sm text-slate-400 mb-1">{title}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white">{value}</span>
          <span className="text-sm text-slate-400">{unit}</span>
        </div>
      </div>

      {status && (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border ${getStatusBg()}`}>
          <div className={`w-2 h-2 rounded-full ${getStatusColor()} animate-pulse`}></div>
          <span className={`text-xs font-medium ${getStatusColor()}`}>{status}</span>
        </div>
      )}
    </motion.div>
  );
}
