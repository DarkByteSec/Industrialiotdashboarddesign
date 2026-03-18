import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useParams, useNavigate } from 'react-router';
import { machines, generateMachineData } from '../data/machines';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft, Thermometer, Zap, Package, Upload, Download, MapPin, Calendar } from 'lucide-react';

export function MachineDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dataType, setDataType] = useState<'temperature' | 'power' | 'production'>('temperature');
  
  const machine = machines.find(m => m.id === id);
  const [chartData] = useState(() => generateMachineData(id || ''));

  if (!machine) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">
            Machine Not Found
          </h2>
          <button
            onClick={() => navigate('/')}
            className="text-blue-500 hover:text-blue-600"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

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

  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx,.xls,.csv';
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        alert(`File "${file.name}" selected for upload. (Demo mode: no actual upload)`);
      }
    };
    input.click();
  };

  const handleDownload = () => {
    // Mock download functionality
    alert(`Downloading data for ${machine.name}... (Demo mode: no actual download)`);
  };

  const getDataKey = () => {
    return dataType;
  };

  const getDataLabel = () => {
    switch (dataType) {
      case 'temperature': return 'Temperature (°C)';
      case 'power': return 'Power (kW)';
      case 'production': return 'Production (units)';
    }
  };

  const getLineColor = () => {
    switch (dataType) {
      case 'temperature': return '#ef4444';
      case 'power': return '#3b82f6';
      case 'production': return '#10b981';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
                {machine.name}
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Machine ID: {machine.id}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(machine.status)} animate-pulse`}></div>
              <span className={`font-semibold ${getStatusTextColor(machine.status)}`}>
                {machine.status}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span className="text-sm text-slate-600 dark:text-slate-400">Location</span>
            </div>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">
              {machine.location}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span className="text-sm text-slate-600 dark:text-slate-400">Last Maintenance</span>
            </div>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">
              {new Date(machine.lastMaintenance).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </p>
          </motion.div>
        </div>

        {/* Key Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Key Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                  <Thermometer className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-400">Temperature</span>
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                {machine.temperature}
                <span className="text-lg text-slate-600 dark:text-slate-400 ml-1">°C</span>
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-400">Power</span>
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                {machine.power}
                <span className="text-lg text-slate-600 dark:text-slate-400 ml-1">kW</span>
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-400">Production</span>
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                {machine.production}
                <span className="text-lg text-slate-600 dark:text-slate-400 ml-1">units</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              24-Hour Data
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setDataType('temperature')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  dataType === 'temperature'
                    ? 'bg-red-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                Temperature
              </button>
              <button
                onClick={() => setDataType('power')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  dataType === 'power'
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                Power
              </button>
              <button
                onClick={() => setDataType('production')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  dataType === 'production'
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                Production
              </button>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData} key={`machine-detail-chart-${dataType}`}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
              <XAxis 
                dataKey="time" 
                stroke="#64748b"
                tick={{ fill: '#64748b', fontSize: 12 }}
              />
              <YAxis 
                stroke="#64748b"
                tick={{ fill: '#64748b', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
                labelStyle={{ color: '#0f172a', fontWeight: 600 }}
              />
              <Line 
                type="monotone" 
                dataKey={getDataKey()}
                stroke={getLineColor()}
                strokeWidth={2}
                dot={{ fill: getLineColor(), r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Excel Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
        >
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Data Management
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleUpload}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              <Upload className="w-5 h-5" />
              Upload Excel File
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
            >
              <Download className="w-5 h-5" />
              Download Excel Report
            </button>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 text-center">
            Upload machine data or download current statistics as Excel files
          </p>
        </motion.div>
      </main>
    </div>
  );
}
