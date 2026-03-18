import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { machines } from '../data/machines';
import { Factory, TrendingUp } from 'lucide-react';

export function Home() {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Running': return 'bg-green-500';
      case 'Stopped': return 'bg-red-500';
      case 'Warning': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'Running': return 'text-green-600 dark:text-green-400';
      case 'Stopped': return 'text-red-600 dark:text-red-400';
      case 'Warning': return 'text-yellow-600 dark:text-yellow-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const runningCount = machines.filter(m => m.status === 'Running').length;
  const warningCount = machines.filter(m => m.status === 'Warning').length;
  const stoppedCount = machines.filter(m => m.status === 'Stopped').length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Factory className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
                  Machine Monitoring
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Industrial IoT Dashboard
                </p>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {runningCount} Running
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {warningCount} Warning
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {stoppedCount} Stopped
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-slate-900 dark:text-white">
            All Machines
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Click on a machine to view details
          </p>
        </div>

        {/* Machine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {machines.map((machine, index) => (
            <motion.div
              key={machine.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              onClick={() => navigate(`/machine/${machine.id}`)}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(machine.status)} shadow-lg`}></div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {machine.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {machine.id}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Status</span>
                  <span className={`font-medium ${getStatusTextColor(machine.status)}`}>
                    {machine.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Location</span>
                  <span className="text-slate-900 dark:text-white font-medium">
                    {machine.location}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Production
                  </span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-blue-500" />
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {machine.production} units
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
