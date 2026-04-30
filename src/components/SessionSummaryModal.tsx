import { motion } from 'motion/react';
import { X, Trophy, Target, Star, Brain } from 'lucide-react';
import { SessionRecord } from '../types';
import { useState } from 'react';
import { useStore } from '../store';
import { cn } from '../lib/utils';

interface SessionSummaryModalProps {
  session: SessionRecord;
  onClose: () => void;
}

export function SessionSummaryModal({ session, onClose }: SessionSummaryModalProps) {
  const [mood, setMood] = useState<string | null>(null);
  const [reflection, setReflection] = useState('');
  const { themeColor } = useStore();

  const handleComplete = () => {
     // We could save reflection to notes here
     onClose();
  };

  const minutesFocused = Math.floor(session.duration / 60);
  const xpEarned = minutesFocused * 10 + (session.focusScore || 0);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={handleComplete}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 10 }}
        className="relative w-full max-w-lg pixel-panel p-0 overflow-hidden z-10"
      >
        <div className="h-1 w-full bg-primary" />
        
        <button onClick={handleComplete} className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors bg-white/5 border-2 border-transparent hover:border-white/20 active:translate-y-px z-50">
          <X size={16} />
        </button>

        <div className="p-8 text-center border-b-2 border-white/10 bg-black/40 relative overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/20 blur-[60px] rounded-full pointer-events-none" />
           <motion.div 
             initial={{ scale: 0, rotate: -45 }}
             animate={{ scale: 1, rotate: 0 }}
             transition={{ type: 'spring', damping: 15, delay: 0.2 }}
             className="w-16 h-16 mx-auto flex items-center justify-center mb-6 shadow-2xl relative z-10 border-2 border-white/20"
             style={{ backgroundColor: themeColor }}
           >
             <Trophy size={32} className="text-white drop-shadow-md" />
           </motion.div>
           <h2 className="text-2xl font-[Silkscreen] text-white tracking-widest drop-shadow-md mb-2 relative z-10 uppercase">Protocol Complete</h2>
           <p className="text-white/60 font-[VT323] text-xl relative z-10 drop-shadow-md">Excellent work. Your neural link has been severed.</p>
        </div>

        <div className="p-6 grid grid-cols-2 gap-4">
           {/* Stats Summary */}
           <div className="bg-black/60 border-2 border-white/20 p-4 shadow-inner flex flex-col items-center justify-center gap-2">
             <div className="text-[10px] font-[Silkscreen] uppercase tracking-widest text-white/50 flex items-center gap-2 drop-shadow-md"><Target size={14}/> Time Focused</div>
             <div className="text-4xl font-[VT323] text-white drop-shadow-md">{minutesFocused}<span className="text-xl text-white/50 ml-1">m</span></div>
           </div>
           
           <div className="bg-black/60 border-2 border-white/20 p-4 shadow-inner flex flex-col items-center justify-center gap-2">
             <div className="text-[10px] font-[Silkscreen] uppercase tracking-widest text-white/50 flex items-center gap-2 drop-shadow-md"><Star size={14}/> XP Earned</div>
             <div className="text-4xl font-[VT323] text-cyan-400 drop-shadow-md">+{xpEarned}</div>
           </div>
        </div>

        <div className="px-6 pb-6 space-y-6">
           <div className="space-y-3">
             <div className="text-[10px] font-[Silkscreen] uppercase tracking-widest text-white/50 text-center drop-shadow-md">Energy State</div>
             <div className="flex flex-wrap justify-center gap-2 sm:gap-3 bg-black/60 border-2 border-white/20 p-2 shadow-inner">
               {['⚡️ High', '🔋 Normal', '🪫 Drained'].map(m => (
                 <button 
                   key={m}
                   onClick={() => setMood(m)}
                   className={cn(
                     "px-3 py-2 text-[10px] font-[Silkscreen] transition-all capitalize border-2",
                     mood === m ? "bg-white/20 text-white border-white/40 shadow-[inset_2px_2px_0px_rgba(0,0,0,0.3)]" : "text-white/50 hover:text-white border-transparent"
                   )}
                 >
                   {m}
                 </button>
               ))}
             </div>
           </div>

           <div className="space-y-2">
             <label className="text-[10px] font-[Silkscreen] uppercase tracking-widest text-white/50 flex items-center gap-2 drop-shadow-md">
               <Brain size={14} /> Quick Reflection
             </label>
             <textarea 
               value={reflection}
               onChange={e => setReflection(e.target.value)}
               placeholder="What did you accomplish? Any blockers?"
               className="w-full h-24 bg-black/60 border-2 border-white/20 p-3 text-white font-[VT323] text-xl resize-none outline-none focus:border-cyan-500 transition-colors placeholder:text-white/30 shadow-inner"
             />
           </div>
        </div>

        <div className="p-6 pt-0">
          <button 
            onClick={handleComplete}
            className="w-full p-4 pixel-btn text-base font-[Silkscreen] bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-600 shadow-[4px_4px_0px_rgba(0,0,0,0.8)]"
          >
            Acknowledge
          </button>
        </div>
      </motion.div>
    </div>
  );
}
