import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../../store';
import { cn } from '../../lib/utils';
import { Moon, Sparkles, Coffee, Focus, Zap } from 'lucide-react';

export function FloatingPet() {
  const { mode, isRunning, timeLeft, config, themeColor, petEnabled } = useStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 }); // We let framer motion handle it via drag

  if (petEnabled === false) return null;

  const isBreak = mode === 'shortBreak' || mode === 'longBreak';
  const isFinished = timeLeft === 0;

  let emotion = 'idle';
  if (isRunning && !isBreak) emotion = 'focus';
  if (isRunning && isBreak) emotion = 'break';
  if (!isRunning && timeLeft < config[mode]) emotion = 'pause'; // Paused mid-session
  if (isFinished) emotion = 'complete';

  // Environment colors based on state
  const envConfigMap = {
    focus: { bg: 'from-cyan-900/40 to-transparent', ground: 'bg-cyan-500/10', border: 'border-cyan-500/30', glow: 'shadow-[0_0_30px_rgba(6,182,212,0.15)]' },
    break: { bg: 'from-yellow-900/40 to-transparent', ground: 'bg-yellow-500/10', border: 'border-yellow-500/30', glow: 'shadow-[0_0_30px_rgba(234,179,8,0.1)]' },
    pause: { bg: 'from-slate-900/40 to-transparent', ground: 'bg-slate-500/10', border: 'border-slate-500/30', glow: 'shadow-none' },
    complete: { bg: 'from-emerald-900/40 to-transparent', ground: 'bg-emerald-500/10', border: 'border-emerald-500/30', glow: 'shadow-[0_0_40px_rgba(16,185,129,0.2)]' },
    idle: { bg: 'from-slate-900/40 to-transparent', ground: 'bg-white/5', border: 'border-white/10', glow: 'shadow-none' }
  };
  const envConfig = envConfigMap[emotion as keyof typeof envConfigMap] || envConfigMap.idle;

  // Let's create an animated cyber pet
  // It has a base container mapping to coordinates.
  return (
    <motion.div
      drag
      dragConstraints={{ top: -window.innerHeight + 256, left: -window.innerWidth + 256, right: 10, bottom: 10 }}
      dragMomentum={false}
      className={cn(
        "fixed z-50 cursor-grab active:cursor-grabbing bottom-6 right-6 md:bottom-10 md:right-10",
        isExpanded ? "w-64 h-64" : "w-32 h-32"
      )}
      onClick={() => !isExpanded && setIsExpanded(true)}
    >
      <motion.div 
        layout
        className={cn(
          "w-full h-full rounded-3xl overflow-hidden relative border backdrop-blur-md transition-shadow duration-700",
          envConfig.border, envConfig.glow,
          "bg-black/60 shadow-2xl"
        )}
      >
        {/* Environment Background */}
        <div className={cn("absolute inset-0 bg-gradient-to-t transition-colors duration-1000", envConfig.bg)} />
        
        {/* Dynamic Particles based on state */}
        <EnvironmentParticles emotion={emotion} themeColor={themeColor} />

        {/* Pixel Ground Platform */}
        <div className="absolute bottom-0 inset-x-0 h-1/3 perspective-1000">
          <div className={cn("w-full h-full transform origin-bottom border-t border-dashed transition-colors duration-1000", envConfig.border, envConfig.ground)} 
               style={{ transform: 'rotateX(60deg) scaleX(1.5)' }} />
        </div>

        {/* The Pet */}
        <div className="absolute inset-0 flex items-center justify-center pb-4 pointer-events-none">
           <CyberPixelPet emotion={emotion} themeColor={themeColor} isExpanded={isExpanded} />
        </div>

        {/* Overlay Controls */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="absolute inset-x-0 top-0 p-3 flex justify-between items-start pointer-events-auto"
            >
              <div className="bg-black/50 px-2 py-1 rounded border border-white/5 text-[9px] uppercase tracking-widest text-slate-300 font-bold backdrop-blur-md">
                 Lvl 1 Cyber Fox
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
                className="w-6 h-6 bg-black/50 hover:bg-white/10 rounded-full border border-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
               >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Status Bubble */}
        <AnimatePresence>
          {!isExpanded && (
             <motion.div 
               initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
               className="absolute bottom-2 inset-x-2 bg-black/80 border border-white/10 rounded px-2 py-1 flex items-center justify-center gap-1.5 backdrop-blur-md pointer-events-none"
             >
                {emotion === 'focus' && <><Zap size={10} className="text-cyan-400"/> <span className="text-[8px] font-bold text-cyan-400 uppercase tracking-widest">Focusing</span></>}
                {emotion === 'break' && <><Coffee size={10} className="text-yellow-400"/> <span className="text-[8px] font-bold text-yellow-400 uppercase tracking-widest">Resting</span></>}
                {emotion === 'complete' && <><Sparkles size={10} className="text-emerald-400"/> <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest">Done!</span></>}
                {emotion === 'pause' && <><Moon size={10} className="text-slate-400"/> <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Idle</span></>}
             </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// Environmental visual effects
function EnvironmentParticles({ emotion, themeColor }: { emotion: string, themeColor: string }) {
   if (emotion === 'focus') {
     return (
       <div className="absolute inset-0 overflow-hidden">
         {[...Array(5)].map((_, i) => (
           <motion.div 
             key={i}
             className="absolute w-0.5 h-4 rounded-full opacity-0"
             style={{ backgroundColor: themeColor, left: `${20 + i * 15}%` }}
             animate={{ y: [-20, 150], opacity: [0, 0.5, 0] }}
             transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3, ease: 'linear' }}
           />
         ))}
       </div>
     );
   }
   if (emotion === 'break') {
     return (
       <div className="absolute inset-0 overflow-hidden">
         {[...Array(3)].map((_, i) => (
           <motion.div 
             key={i}
             className="absolute w-1 h-1 rounded-full bg-yellow-200 opacity-0"
             style={{ left: `${30 + i * 20}%`, top: `${40 + Math.random() * 20}%` }}
             animate={{ y: [0, -10, 0], x: [0, 5, 0], opacity: [0, 0.8, 0] }}
             transition={{ duration: 3, repeat: Infinity, delay: i * 1, ease: 'easeInOut' }}
           />
         ))}
       </div>
     );
   }
   return null;
}

// The Geometric Pet built to look like animated pixel art
function CyberPixelPet({ emotion, themeColor, isExpanded }: { emotion: string, themeColor: string, isExpanded: boolean }) {
  const scale = isExpanded ? 1.5 : 1;

  // Animation Maps
  const anims: any = {
    idle: {
      body: { y: [0, 2, 0], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } },
      head: { y: [0, 1, 0], transition: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 } },
      tail: { rotate: [0, -15, 0], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } },
      eyes: { scaleY: [1, 1, 0.1, 1, 1], transition: { duration: 4, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 1] } },
      container: { x: 0 }
    },
    focus: {
      body: { y: [0, -4, 0], transition: { duration: 0.4, repeat: Infinity, ease: "linear" } },
      head: { y: [0, -2, 0], transition: { duration: 0.4, repeat: Infinity, ease: "linear", delay: 0.1 } },
      tail: { rotate: [-20, 20, -20], transition: { duration: 0.4, repeat: Infinity, ease: "linear" } },
      eyes: { scaleY: 1, x: [0, 2, 0], transition: { duration: 2, repeat: Infinity } },
      container: { x: [-10, 10, -10], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } }
    },
    break: {
      body: { y: 8, scaleY: 0.8, transition: { duration: 0.5 } },
      head: { y: 12, x: 4, rotate: 15, transition: { duration: 0.5 } },
      tail: { rotate: -60, y: 10, transition: { duration: 0.5 } },
      eyes: { scaleY: 0.1, transition: { duration: 0.5 } },
      container: { x: 0 }
    },
    complete: {
      body: { y: [0, -15, 0], rotate: [0, 360, 360], transition: { duration: 1, repeat: Infinity } },
      head: { y: [0, -15, 0], transition: { duration: 1, repeat: Infinity } },
      tail: { rotate: [-45, 45, -45], transition: { duration: 0.2, repeat: Infinity } },
      eyes: { scaleY: [1, 0.2, 1], transition: { duration: 0.5, repeat: Infinity } },
      container: { x: 0 }
    },
    pause: {
      body: { y: 6, scaleY: 0.9, transition: { duration: 0.5 } },
      head: { y: 8, transition: { duration: 0.5 } },
      tail: { rotate: -40, y: 8, transition: { duration: 0.5 } },
      eyes: { scaleY: [1, 0.1, 1], transition: { duration: 6, repeat: Infinity } },
      container: { x: 0 }
    }
  };

  const currentAnim = anims[emotion as keyof typeof anims] || anims.idle;

  const [interaction, setInteraction] = useState<'none' | 'tap' | 'hover'>('none');

  const handleTap = () => {
    setInteraction('tap');
    setTimeout(() => setInteraction('none'), 1000);
  };

  return (
    <motion.div 
      className="relative flex flex-col items-center pointer-events-auto cursor-pointer"
      style={{ scale }}
      animate={interaction === 'tap' ? { y: [0, -20, 0], scale: [scale, scale*1.1, scale] } : currentAnim.container}
      transition={interaction === 'tap' ? { duration: 0.5, ease: "easeOut" } : undefined}
      whileHover={{ scale: scale * 1.05 }}
      whileTap={{ scale: scale * 0.95 }}
      onClick={handleTap}
      onHoverStart={() => setInteraction('hover')}
      onHoverEnd={() => setInteraction('none')}
    >
      {/* Sleep Zzzs */}
      <AnimatePresence>
         {emotion === 'break' && (
           <motion.div 
             initial={{ opacity: 0, scale: 0.5 }}
             animate={{ opacity: [0, 1, 0], y: [-10, -30], x: [0, 10] }}
             exit={{ opacity: 0 }}
             transition={{ duration: 2, repeat: Infinity }}
             className="absolute -top-10 -right-4 font-bold text-yellow-300 text-xs font-mono"
           >
             Zzz
           </motion.div>
         )}
      </AnimatePresence>

      <motion.div className="relative">
        {/* Head */}
        <motion.div 
          animate={currentAnim.head}
          className="relative z-20"
        >
           {/* Ears */}
           <div className="absolute -top-3 -left-1 w-3 h-4 bg-orange-500 origin-bottom-right" style={{ transform: 'rotate(-20deg)', borderRadius: '2px 2px 0 0' }}>
              <div className="absolute inset-x-0.5 bottom-0 h-2 bg-orange-300/50" />
           </div>
           <div className="absolute -top-3 -right-1 w-3 h-4 bg-orange-500 origin-bottom-left" style={{ transform: 'rotate(20deg)', borderRadius: '2px 2px 0 0' }}>
              <div className="absolute inset-x-0.5 bottom-0 h-2 bg-orange-300/50" />
           </div>
           
           {/* Face */}
           <div className="w-10 h-8 bg-orange-500 rounded-lg relative overflow-hidden shadow-[inset_0_-2px_4px_rgba(0,0,0,0.2)]">
              {/* Pattern */}
              <div className="absolute top-0 inset-x-0 h-2 bg-white/20" />
              
              {/* Eyes */}
              <motion.div 
                className="absolute top-3 left-2 w-1.5 h-2 bg-black rounded-full"
                animate={currentAnim.eyes}
              />
              <motion.div 
                className="absolute top-3 right-2 w-1.5 h-2 bg-black rounded-full"
                animate={currentAnim.eyes}
              />
              
              {/* Nose/Snout */}
              <div className="absolute bottom-1 left-1.5 right-1.5 h-3 bg-white rounded-t-md flex justify-center">
                 <div className="w-1.5 h-1 bg-black rounded-full mt-0.5" />
              </div>
           </div>
        </motion.div>

        {/* Body */}
        <motion.div 
          animate={currentAnim.body}
          className="relative z-10 w-8 h-8 bg-orange-600 mx-auto -mt-1 rounded-md shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3)]"
        >
           {/* Belly */}
           <div className="absolute bottom-0 left-1.5 right-1.5 top-2 bg-white/90 rounded-t-lg" />
        </motion.div>

        {/* Tail */}
        <motion.div 
          animate={currentAnim.tail}
          className="absolute bottom-1 -left-4 w-5 h-2.5 bg-orange-500 rounded-l-full origin-right z-0"
        >
           <div className="absolute left-0 top-0 bottom-0 w-2 bg-white/90 rounded-l-full" />
        </motion.div>
        
        {/* Feet */}
        <motion.div animate={currentAnim.body} className="absolute -bottom-1 left-1 w-2.5 h-2 bg-orange-700 rounded-full z-20" />
        <motion.div animate={currentAnim.body} className="absolute -bottom-1 right-1 w-2.5 h-2 bg-orange-700 rounded-full z-20" />
      </motion.div>
      
      {/* Shadow */}
      <motion.div 
        animate={{
          scaleX: emotion === 'break' ? 1.5 : emotion === 'focus' ? [1, 0.8, 1] : 1,
          opacity: emotion === 'complete' ? [0.4, 0.1, 0.4] : 0.4
        }}
        transition={emotion === 'focus' ? { duration: 0.4, repeat: Infinity } : (emotion === 'complete' ? { duration: 1, repeat: Infinity } : { duration: 0.5 })}
        className="w-10 h-2 bg-black/60 rounded-full blur-sm mt-1 absolute -bottom-2 z-0"
      />
    </motion.div>
  );
}
