import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../store';
import { Play, Pause, SkipForward, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function MiniPlayer() {
  const { isRunning, timeLeft, mode, setIsRunning, setTimeLeft, config, themeColor, currentSubject } = useStore();
  const location = useLocation();

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  // Show only if we are NOT on the dashboard, AND there is an active session (running or paused with time remaining)
  const isDashboard = location.pathname === '/';
  // A session is active if it's running, or if it isn't reset.
  const maxTime = config[mode === 'stopwatch' ? 'pomodoro' : mode]; // default fallback
  const hasStarted = timeLeft < maxTime;
  const shouldShow = !isDashboard && (isRunning || hasStarted);

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className="fixed bottom-24 sm:bottom-8 right-6 w-80 pixel-panel p-4 z-50 flex flex-col gap-3"
        >
          {/* Header info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
               {/* Mascot mini head */}
               <div className="w-8 h-8 bg-slate-800 flex items-center justify-center shrink-0 border-2 border-white/20 shadow-inner relative overflow-hidden">
                 <div className="absolute inset-0 opacity-20" style={{ backgroundColor: themeColor }} />
                 <div className="w-4 h-3 bg-slate-400 border-b-2 border-black flex items-center justify-center relative translate-y-1">
                   {/* Eyes */}
                   <div className="absolute top-1 left-0.5 w-1 h-1 bg-black" />
                   <div className="absolute top-1 right-0.5 w-1 h-1 bg-black" />
                 </div>
               </div>
               
               {/* Subject */}
               <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-[Silkscreen] text-white/50 uppercase tracking-widest truncate drop-shadow-md">
                    {mode === 'pomodoro' ? 'Focus' : mode === 'shortBreak' ? 'Break' : 'Long Break'}
                  </span>
                  <span className="text-sm font-[VT323] text-white tracking-widest truncate drop-shadow-md">
                    {currentSubject || 'Awaiting Orders'}
                  </span>
               </div>
            </div>
          </div>
          
          {/* Time & Progress */}
          <div className="flex items-center gap-4">
             <div className="font-[VT323] text-3xl font-bold tracking-widest drop-shadow-md" style={{ color: isRunning ? themeColor : '#fff' }}>
                {timeString}
             </div>
             
             {/* Progress Bar */}
             <div className="flex-1 h-3 bg-black/60 border-2 border-white/20 overflow-hidden shadow-inner">
                <motion.div 
                  className="h-full border-r-2 border-white/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]"
                  style={{ backgroundColor: themeColor }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(1 - Math.max(0, timeLeft) / maxTime) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
             </div>
          </div>
          
          {/* Controls */}
          <div className="flex items-center justify-between mt-1">
             <Link to="/" className="text-[10px] uppercase tracking-widest font-[Silkscreen] text-white/50 hover:text-white transition-colors">
               Open Hub
             </Link>
             
             <div className="flex items-center gap-2">
               <button 
                 onClick={() => setTimeLeft(0)}
                 className="w-8 h-8 bg-black/60 border-2 border-white/20 active:translate-y-px active:shadow-none flex items-center justify-center text-white/50 hover:text-white"
               >
                 <SkipForward size={14} />
               </button>
               
               <button 
                 onClick={() => setIsRunning(!isRunning)}
                 className="w-10 h-10 border-2 active:translate-y-px active:shadow-none flex items-center justify-center text-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)]"
                 style={{ backgroundColor: isRunning ? '#fff' : themeColor, borderColor: isRunning ? '#cbd5e1' : 'rgba(255,255,255,0.4)' }}
               >
                 {isRunning ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-1" />}
               </button>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
