import { motion } from 'motion/react';
import { X, Cpu, Target, Clock, Zap } from 'lucide-react';
import { useStore } from '../store';
import { cn } from '../lib/utils';
import { useState } from 'react';

export function SessionSetupModal({ isOpen, onClose, onStart }: { isOpen: boolean, onClose: () => void, onStart: () => void }) {
  const { currentSubject, setCurrentSubject, setMode, setTimeLeft, config } = useStore();
  const [goal, setGoal] = useState('');
  const [estimatedBlocks, setEstimatedBlocks] = useState(1);
  const [difficulty, setDifficulty] = useState<'normal' | 'hard' | 'extreme'>('normal');

  if (!isOpen) return null;

  const handleStart = () => {
    // Actually apply the settings (we might save goal somewhere in store later)
    if (estimatedBlocks * config.pomodoro > 0) {
      // Just keep track of target if we want
    }
    setMode('pomodoro');
    setTimeLeft(config.pomodoro);
    onStart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg pixel-panel p-0 overflow-hidden z-10"
      >
        <div className="h-1 w-full bg-primary" />
        
        <div className="p-4 flex justify-between items-center border-b-2 border-white/10 bg-black/40">
          <h2 className="text-sm flex items-center gap-2 font-[Silkscreen] text-white tracking-widest drop-shadow-md">
            <Cpu size={16} className="text-cyan-400" />
            <span>Initialize Protocol</span>
          </h2>
          <button onClick={onClose} className="p-2 text-white/50 hover:text-white transition-colors bg-white/5 border-2 border-transparent hover:border-white/20 active:translate-y-px">
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Subject */}
          <div className="space-y-2">
            <label className="text-xs font-[Silkscreen] uppercase tracking-widest text-white/50 flex items-center gap-2">
               <Target size={14} /> Focus Target
            </label>
            <input 
              type="text" 
              value={currentSubject || ''}
              onChange={e => setCurrentSubject(e.target.value)}
              placeholder="e.g. Advanced Calculus, System Design..."
              className="w-full bg-black/60 border-2 border-white/20 p-3 text-white font-[VT323] text-xl outline-none focus:border-cyan-500 transition-colors shadow-inner"
            />
          </div>

          {/* Goal */}
          <div className="space-y-2">
            <label className="text-xs font-[Silkscreen] uppercase tracking-widest text-white/50 flex items-center gap-2">
               <Zap size={14} /> Primary Objective
            </label>
            <input 
              type="text" 
              value={goal}
              onChange={e => setGoal(e.target.value)}
              placeholder="What must be completed?"
              className="w-full bg-black/60 border-2 border-white/20 p-3 text-white font-[VT323] text-xl outline-none focus:border-cyan-500 transition-colors shadow-inner"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Intensity */}
            <div className="space-y-2">
               <label className="text-xs font-[Silkscreen] uppercase tracking-widest text-white/50">Intensity</label>
               <div className="flex bg-black/60 border-2 border-white/20 p-1">
                 {(['normal', 'hard', 'extreme'] as const).map(d => (
                   <button 
                     key={d}
                     onClick={() => setDifficulty(d)}
                     className={cn(
                       "flex-1 text-[10px] py-2 font-[Silkscreen] transition-all capitalize border-2",
                       difficulty === d ? "bg-white/20 text-white border-white/40 shadow-[inset_2px_2px_0px_rgba(0,0,0,0.3)]" : "text-white/50 hover:text-white border-transparent"
                     )}
                   >
                     {d}
                   </button>
                 ))}
               </div>
            </div>

            {/* Estimated Duration */}
            <div className="space-y-2">
               <label className="text-xs font-[Silkscreen] uppercase tracking-widest text-white/50 flex items-center gap-2">
                 <Clock size={14} /> Est. Blocks
               </label>
               <div className="flex items-center justify-between bg-black/60 border-2 border-white/20 px-4 py-1.5 h-[46px]">
                 <button onClick={() => setEstimatedBlocks(Math.max(1, estimatedBlocks - 1))} className="text-white/50 hover:text-white active:translate-y-px">-</button>
                 <span className="font-[VT323] text-2xl font-bold">{estimatedBlocks}</span>
                 <button onClick={() => setEstimatedBlocks(estimatedBlocks + 1)} className="text-white/50 hover:text-white active:translate-y-px">+</button>
               </div>
            </div>
          </div>
        </div>

        <div className="p-6 pt-0 mt-4">
          <button 
            onClick={handleStart}
            className="w-full p-4 pixel-btn text-base font-[Silkscreen] bg-cyan-600 hover:bg-cyan-500 text-white border-cyan-400 shadow-[4px_4px_0px_rgba(0,0,0,0.8)]"
          >
            Engage Focus
          </button>
        </div>
      </motion.div>
    </div>
  );
}
