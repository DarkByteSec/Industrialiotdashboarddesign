import { LayoutDashboard, BarChart3, Bell, Settings } from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'alerts', icon: Bell, label: 'Alerts' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-20 bg-slate-900 border-r border-slate-700 flex flex-col items-center py-6">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        
        return (
          <motion.button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`relative w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors ${
              isActive 
                ? 'bg-blue-500/20 text-blue-400' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-blue-500/20 rounded-xl border-2 border-blue-500"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <Icon className="w-6 h-6 relative z-10" />
          </motion.button>
        );
      })}
    </div>
  );
}
