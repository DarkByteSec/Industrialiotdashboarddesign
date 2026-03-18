import { Cpu } from 'lucide-react';

export function Header() {
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  });
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="h-16 bg-slate-900 border-b border-slate-700 flex items-center justify-between px-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
          <Cpu className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-white">Machine Monitoring System</h1>
          <p className="text-xs text-slate-400">Industrial IoT Platform</p>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="text-right">
          <div className="text-sm font-mono text-blue-400">{currentTime}</div>
          <div className="text-xs text-slate-400">{currentDate}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-slate-400">System Active</span>
        </div>
      </div>
    </div>
  );
}
