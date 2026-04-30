import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Timer, BarChart2, BookOpen, Settings, LayoutDashboard } from 'lucide-react';
import { useStore } from '../../store';
import { cn } from '../../lib/utils';
import { useEffect, useState } from 'react';
import { FloatingPet } from '../pet/FloatingPet';
import { MiniPlayer } from '../MiniPlayer';
import { SessionSummaryModal } from '../SessionSummaryModal';
import { PixelWorld } from './PixelWorld';

const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/notes', label: 'Notes', icon: BookOpen },
  { path: '/analytics', label: 'Analytics', icon: BarChart2 },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export function Layout() {
  const location = useLocation();
  const { isRunning, timeLeft, focusMode, mode, themeColor, finishedSession, clearFinishedSession } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const content = focusMode && location.pathname === '/' ? (
    <main className="min-h-screen font-sans overflow-hidden selection:bg-cyan-500/30 relative">
      {mounted && <PixelWorld />}
      <div className="relative z-10 w-full h-full">
         <Outlet />
      </div>
    </main>
  ) : (
    <div className="flex min-h-screen text-slate-200 font-[VT323] text-xl overflow-hidden selection:bg-cyan-500/30 relative">
      {mounted && <PixelWorld />}
      
      {/* Cinematic Gradient overlay to ensure readability while showing environment */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/90 via-black/50 to-black/10 pointer-events-none" />

      <nav className="w-20 md:w-72 m-4 md:m-6 hidden sm:flex flex-col flex-shrink-0 z-20">
        <div className="bg-[#0f172a] border-2 border-[#1e293b] p-2 flex flex-col h-full relative shadow-[8px_8px_0_rgba(0,0,0,0.5)]">
           {/* Terminal Chrome */}
           <div className="flex items-center gap-2 mb-4 border-b-2 border-[#1e293b] pb-2">
             <div className="w-3 h-3 bg-red-500 rounded-none border-2 border-black" />
             <div className="w-3 h-3 bg-yellow-500 rounded-none border-2 border-black" />
             <div className="w-3 h-3 bg-green-500 rounded-none border-2 border-black" />
           </div>

           <div className="flex items-center gap-3 px-4 py-2 mb-6 bg-black/40 border-2 border-white/5">
             <div className="w-10 h-10 flex items-center justify-center border-2" style={{ backgroundColor: themeColor, borderColor: '#fff', color: '#000', boxShadow: 'inset -2px -2px 0px rgba(0,0,0,0.5)' }}>
               <Timer size={20} />
             </div>
             <span className="hidden md:block text-white text-xl" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.8)' }}>NEO<span className="opacity-50">FOCUS</span></span>
           </div>

           <div className="flex-1 px-2 flex flex-col gap-2">
             {NAV_ITEMS.map((item) => {
               const isActive = location.pathname === item.path;
               const Icon = item.icon;
               
               return (
                 <Link key={item.path} to={item.path}>
                   <motion.div
                     whileHover={{ x: 4 }}
                     whileTap={{ scale: 0.98 }}
                     className={cn(
                       "flex items-center gap-4 px-4 py-3 relative overflow-hidden group uppercase tracking-widest",
                       isActive ? "bg-black/60 shadow-[inset_2px_2px_0px_rgba(255,255,255,0.1),2px_2px_0_rgba(0,0,0,0.8)] border-l-4" : "hover:bg-white/5 border-l-4 border-transparent"
                     )}
                     style={isActive ? { borderColor: themeColor, color: themeColor } : { color: 'rgba(255,255,255,0.6)' }}
                   >
                     {isActive && (
                        <div className="absolute inset-0 opacity-10 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABZJREFUeNpi2rVrf2QDEGBmAAgwAAAHAH8L3V0pAAAAAElFTkSuQmCC')] repeat mix-blend-overlay pointer-events-none" />
                     )}
                     <Icon size={20} className="z-10" />
                     <span className="hidden md:block z-10 font-[Silkscreen] text-sm text-white" style={isActive ? { textShadow: `0 0 10px ${themeColor}` } : {}}>{item.label}</span>
                   </motion.div>
                 </Link>
               );
             })}
           </div>
           
           <div className="p-2 border-t-2 border-[#1e293b] hidden md:block bg-black/40 mt-auto">
             <div className="flex items-center gap-3 p-3 cursor-pointer relative overflow-hidden transition-colors hover:bg-white/5 border-2 border-transparent hover:border-white/10">
               <div className="w-10 h-10 flex items-center justify-center text-[10px] font-black uppercase tracking-widest border-2 border-black/20" style={{ backgroundColor: themeColor, color: '#000', boxShadow: 'inset -2px -2px 0px rgba(0,0,0,0.3)' }}>
                  XP
               </div>
               <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold uppercase tracking-widest text-white font-[Silkscreen] truncate drop-shadow-md">Level {useStore(s => s.level)}</div>
                  <div className="text-xs text-cyan-300 font-[Silkscreen] truncate mt-0.5">{useStore(s => s.xp)} XP</div>
               </div>
             </div>
           </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto relative z-10 flex flex-col">
        {/* Mobile Nav Bar */}
        <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-black/90 pixel-panel border-t-2 border-white/10 flex justify-around items-center p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] z-50">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path} className="relative p-3 flex-1 flex justify-center">
                 <Icon size={22} className={isActive ? "" : "text-white/50"} style={isActive ? { color: themeColor } : {}} />
                 {isActive && <motion.div layoutId="mobile-indicator" className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 shadow-[0_0_8px_rgba(255,255,255,0.8)]" style={{ backgroundColor: themeColor }} />}
              </Link>
            );
          })}
        </div>

        <motion.div
           key={location.pathname}
           initial={{ opacity: 0, scale: 0.98 }}
           animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0, scale: 0.98 }}
           transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
           className="flex-1 relative z-10 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full pb-[calc(6rem+env(safe-area-inset-bottom))] sm:pb-8 flex flex-col pt-safe"
        >
          <Outlet />
        </motion.div>
      </main>

      {mounted && <MiniPlayer />}
    </div>
  );

  return (
    <>
      {content}
      {mounted && <FloatingPet />}
      <AnimatePresence>
        {finishedSession && (
           <SessionSummaryModal session={finishedSession} onClose={clearFinishedSession} />
        )}
      </AnimatePresence>
    </>
  );
}
