import { motion } from 'motion/react';
import { useStore } from '../store';
import { Play, Pause, RotateCcw, Maximize2, SkipForward, CheckCircle2, Circle, Settings2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState } from 'react';
import { SessionSetupModal } from '../components/SessionSetupModal';

export function Dashboard() {
  const { 
    timeLeft, isRunning, mode, setMode, setIsRunning, setTimeLeft, 
    config, currentRound, themeColor, tasks, toggleTask, addTask,
    focusMode, setFocusMode, currentSubject, setCurrentSubject
  } = useStore();

  const [newTaskStr, setNewTaskStr] = useState('');
  const [isSetupOpen, setIsSetupOpen] = useState(false);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const maxTime = config[mode === 'stopwatch' ? 'pomodoro' : mode];
  const isFreshSession = timeLeft === maxTime && !isRunning;

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(maxTime);
  };

  const handleAddTask = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTaskStr.trim()) {
      addTask({ title: newTaskStr.trim() });
      setNewTaskStr('');
    }
  };

  const handlePlayToggle = () => {
    if (isFreshSession && mode === 'pomodoro') {
      setIsSetupOpen(true);
    } else {
      setIsRunning(!isRunning);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 sm:gap-8 h-full">
      {/* Timer Section */}
      <div className={cn(
        "flex-1 flex flex-col items-center justify-center relative min-h-[50vh] lg:min-h-0",
        focusMode ? "fixed inset-0 z-50 bg-black/40 backdrop-blur-md pt-20" : "flex-1"
      )}>
        {focusMode && (
           <button onClick={() => setFocusMode(false)} className="absolute top-10 right-10 text-white/50 hover:text-white z-50 p-3 rounded-full hover:bg-white/10 transition-colors drop-shadow-md">
             <Maximize2 size={32} />
           </button>
        )}

        {/* Mode Selector */}
        <div className="flex bg-black/40 p-2 border-2 border-white/20 z-10 shadow-[4px_4px_0px_rgba(0,0,0,0.5)] mb-8 sm:mb-12">
          {(['pomodoro', 'shortBreak', 'longBreak'] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setIsRunning(false); }}
              className={cn(
                "px-4 sm:px-6 py-2 text-[10px] sm:text-sm font-[Silkscreen] transition-all uppercase tracking-widest leading-none border-2",
                mode === m ? "bg-white/20 text-white border-white/40 shadow-[inset_2px_2px_0px_rgba(0,0,0,0.3)]" : "text-white/60 hover:text-white border-transparent"
              )}
            >
              {m === 'pomodoro' ? 'Focus' : m === 'shortBreak' ? 'Break' : 'Long Rest'}
            </button>
          ))}
        </div>

          {/* Huge Timer */}
        <div className="relative group z-10 flex flex-col items-center justify-center my-8 md:my-16">
          <motion.div 
            className="absolute inset-0 bg-white/5 blur-[100px] rounded-full pointer-events-none"
            animate={{ scale: isRunning ? [1, 1.2, 1] : 1, opacity: isRunning ? [0.5, 0.8, 0.5] : 0.2 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ backgroundColor: themeColor }}
          />

          {/* Crystal Core Visual */}
          <motion.div 
            className="absolute -inset-10 md:-inset-20 z-0 opacity-20 pointer-events-none"
            animate={isRunning ? { rotate: 360 } : {}}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-full h-full border-4 border-dashed rounded-full" style={{ borderColor: themeColor }} />
            <div className="absolute inset-4 border-4 border-dotted rounded-full" style={{ borderColor: themeColor, rotate: '45deg' }} />
          </motion.div>

          {/* Time Display */}
          <motion.h1 
            key={timeString}
            initial={{ y: -10, opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-[100px] sm:text-[140px] md:text-[180px] lg:text-[200px] leading-none tracking-widest tabular-nums select-none font-[VT323] flex items-center justify-center drop-shadow-[4px_4px_0px_rgba(0,0,0,0.8)] relative z-10"
            style={{ color: isRunning ? '#fff' : 'inherit', textShadow: isRunning ? `0 0 40px ${themeColor}, 0 0 80px ${themeColor}` : `0 0 20px rgba(0,0,0,0.5)` }}
          >
            {timeString.split(':').map((part, i, arr) => (
                <span key={i} className="flex items-center text-center">
                    {i > 0 && <span className="opacity-50 mx-1 md:mx-2 -translate-y-1 sm:-translate-y-2 lg:-translate-y-3">:</span>}
                    <span style={i === 1 && isRunning ? { color: themeColor } : {}} className={i === 1 && isRunning ? "" : "text-white"}>{part}</span>
                </span>
            ))}
          </motion.h1>
          
          <div className="absolute -bottom-16 sm:-bottom-20 flex flex-col items-center gap-2 z-10">
             <div className="flex items-center gap-2 sm:gap-3 text-white text-xs sm:text-sm font-[Silkscreen] uppercase tracking-widest drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)]">
               <span className="bg-black/60 px-4 py-2 border-2 border-white/20">Cycle {currentRound}/{config.rounds}</span>
             </div>
             {isFreshSession && mode === 'pomodoro' && (
                <button onClick={() => setIsSetupOpen(true)} className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-white bg-black/60 px-4 py-2 border-2 font-[Silkscreen] uppercase tracking-widest hover:bg-white/10 active:translate-y-px transition-colors mt-2" style={{ borderColor: themeColor }}>
                  <Settings2 size={12} className="sm:w-[14px] sm:h-[14px]" /> Configuration
                </button>
             )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 mt-16 sm:mt-24 z-10">
          <button 
            onClick={handleReset}
            className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-black/60 border-4 border-[#333] hover:border-white text-white/70 hover:text-white transition-all active:translate-y-2 shadow-[0_8px_0_#111] active:shadow-[0_0px_0_#111] rounded-full"
          >
            <RotateCcw size={24} />
          </button>
          
          <button 
            onClick={handlePlayToggle}
            className="w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center text-black active:translate-y-2 transition-all rounded-full group"
            style={{ 
              backgroundColor: isRunning ? '#fff' : themeColor, 
              boxShadow: isRunning ? '0 8px 0 #999, inset 0 -4px 0 rgba(0,0,0,0.2)' : `0 8px 0 rgba(0,0,0,0.5), inset 0 -4px 0 rgba(0,0,0,0.2)`
            }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
               {isRunning ? <Pause size={40} className="sm:w-14 sm:h-14" fill="currentColor" /> : <Play size={40} className="sm:w-14 sm:h-14 ml-2 sm:ml-3" fill="currentColor" />}
            </motion.div>
          </button>
          
          <button 
            onClick={() => setTimeLeft(0)} // skip
            className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-black/60 border-4 border-[#333] hover:border-white text-white/70 hover:text-white transition-all active:translate-y-2 shadow-[0_8px_0_#111] active:shadow-[0_0px_0_#111] rounded-full"
          >
            <SkipForward size={24} />
          </button>
        </div>
      </div>

      {/* Side Panel (Tasks & Subject) - Hidden in focus mode */}
      {!focusMode && (
        <div className="w-full lg:w-[400px] flex flex-col gap-6 h-full z-10 shrink-0">
           {/* Active Quest (Subject) */}
           <div className="bg-[#fef3c7] border-4 border-[#854d0e] p-6 flex flex-col gap-4 relative shadow-[8px_8px_0px_rgba(0,0,0,0.5)] transform -rotate-1">
             {/* Pin */}
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.5)]" />
             
             <div className="flex items-center justify-between relative z-10">
                <h3 className="text-sm font-[Silkscreen] uppercase tracking-widest text-[#92400e]">Current Quest</h3>
             </div>
             <input 
               type="text" 
               placeholder="What are you focusing on?"
               value={currentSubject || ''}
               onChange={e => setCurrentSubject(e.target.value)}
               className="w-full bg-transparent text-3xl font-[VT323] text-black outline-none placeholder:text-black/30 border-b-2 border-dashed border-[#b45309] pb-2 focus:border-red-500 transition-colors relative z-10"
             />
             <button onClick={() => setFocusMode(true)} className="flex items-center justify-center gap-2 mt-2 bg-[#b45309] text-white border-2 border-black p-3 hover:bg-[#92400e] active:translate-y-1 shadow-[4px_4px_0px_rgba(0,0,0,1)] relative z-10 font-[Silkscreen] text-xs uppercase tracking-widest">
               <Maximize2 size={16} /> Enter Deep Focus
             </button>
           </div>

           {/* Quest Board (Tasks) */}
           <div className="bg-[#bc9a5c] border-8 border-[#5f370e] p-4 flex-1 flex flex-col relative overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,0.5)]">
             <div className="absolute inset-x-0 inset-y-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, #000 20px)' }} />
             
             <div className="bg-[#fef3c7] border-4 border-black p-4 flex-1 flex flex-col relative z-10 shadow-[4px_4px_0px_rgba(0,0,0,0.3)] rotate-1">
               <h3 className="text-sm font-[Silkscreen] uppercase tracking-widest text-black/40 mb-4 border-b-2 border-black/10 pb-2">Sub Quests</h3>
               
               <div className="flex-1 overflow-y-auto no-scrollbar space-y-2 relative z-10 pr-2">
                 {tasks.length === 0 ? (
                   <div className="text-center text-black/40 text-xl py-10 font-[VT323] flex flex-col items-center gap-4">
                     <div className="w-12 h-12 border-2 border-dashed border-black/20 flex items-center justify-center opacity-50">
                        <CheckCircle2 size={24} />
                     </div>
                     No active quests.
                   </div>
                 ) : (
                   tasks.map(task => (
                     <div key={task.id} className="group flex items-center gap-4 py-2 border-b-2 border-black/5 hover:border-black/20 cursor-pointer transition-all" onClick={() => toggleTask(task.id)}>
                       <div className={cn(
                          "w-6 h-6 flex items-center justify-center transition-colors shrink-0 border-2",
                          task.completed ? "bg-black text-white border-black shadow-[inset_2px_2px_0_rgba(255,255,255,0.4)]" : "border-black/30 group-hover:border-black bg-white"
                       )}>
                          {task.completed && <CheckCircle2 size={16} className="text-white" />}
                       </div>
                       <div className="flex-1 min-w-0">
                         <div className={cn("text-2xl font-[VT323] transition-all truncate text-black", task.completed && "line-through opacity-40")}>
                           {task.title}
                         </div>
                       </div>
                     </div>
                   ))
                 )}
               </div>

               <div className="mt-4 pt-4 relative z-10">
                 <input 
                   type="text" 
                   placeholder="+ Add sub quest..."
                   value={newTaskStr}
                   onChange={e => setNewTaskStr(e.target.value)}
                   onKeyDown={handleAddTask}
                   className="w-full bg-black/5 border-2 border-transparent border-b-black/20 p-2 text-2xl font-[VT323] text-black outline-none focus:border-b-black transition-colors placeholder:text-black/30"
                 />
               </div>
             </div>
           </div>
        </div>
      )}

      {/* Modals */}
      <SessionSetupModal 
         isOpen={isSetupOpen} 
         onClose={() => setIsSetupOpen(false)} 
         onStart={() => setIsRunning(true)} 
      />
    </div>
  );
}
