import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface CharacterProps {
  state: 'idle' | 'run' | 'sleep';
  themeColor?: string;
}

export function PixelGirl({ state, themeColor = '#06b6d4' }: CharacterProps) {
  const anims = {
    idle: { y: [0, 2, 0], transition: { duration: 2, repeat: Infinity } },
    run: { y: [0, -4, 0], transition: { duration: 0.3, repeat: Infinity } },
    sleep: { y: 12, scaleY: 0.9, transition: { duration: 1 } }
  };

  const legAnims = {
    idle: { rotate: 0 },
    run: { rotate: [-20, 20, -20], transition: { duration: 0.3, repeat: Infinity } },
    sleep: { rotate: 90, x: 8, y: -4 }
  };
  
  const legAnims2 = {
    idle: { rotate: 0 },
    run: { rotate: [20, -20, 20], transition: { duration: 0.3, repeat: Infinity } },
    sleep: { rotate: 90, x: 8, y: -4 }
  };

  const armAnims = {
    idle: { rotate: 0 },
    run: { rotate: 45, x: 2, y: 2, transition: { duration: 0.3 } },
    sleep: { rotate: 0 }
  };
  
  const armAnims2 = {
    idle: { rotate: 0 },
    run: { rotate: -45, x: -2, y: 2, transition: { duration: 0.3 } },
    sleep: { rotate: 0 }
  };
  
  const eyeAnim = state === 'sleep' ? { scaleY: 0.1 } : { scaleY: [1, 1, 0.1, 1, 1], transition: { duration: 4, repeat: Infinity, times: [0, 0.9, 0.95, 0.98, 1] } };

  return (
    <motion.div className="relative flex flex-col items-center z-10 font-[Silkscreen]" animate={anims[state]}>
      {/* Head */}
      <div className="relative w-10 h-10 bg-[#ffddc1] border-2 border-black z-20" style={{ boxShadow: 'inset -2px -2px 0 rgba(0,0,0,0.1)' }}>
        {/* Hair */}
        <div className="absolute -top-2 -left-3 w-16 h-6 bg-[#3b2f2f] border-2 border-black border-b-0" />
        <div className="absolute top-4 -left-3 w-3 h-8 bg-[#3b2f2f] border-2 border-black border-r-0 border-t-0" />
        <div className="absolute top-4 -right-3 w-3 h-8 bg-[#3b2f2f] border-2 border-black border-l-0 border-t-0" />
        <div className="absolute -top-1 left-2 w-8 h-4 bg-[#3b2f2f] border-b-2 border-black" />
        
        {/* Eyes */}
        <motion.div animate={eyeAnim} className="absolute top-4 left-2 w-1.5 h-2 bg-black" />
        <motion.div animate={eyeAnim} className="absolute top-4 right-2 w-1.5 h-2 bg-black" />
        
        {/* Blush */}
        {state !== 'sleep' && (
          <>
            <div className="absolute top-6 left-1 w-2 h-1 bg-[#ff9999] opacity-70" />
            <div className="absolute top-6 right-1 w-2 h-1 bg-[#ff9999] opacity-70" />
          </>
        )}
      </div>

      {/* Body */}
      <div className="relative z-10 w-8 h-10 bg-[#3b82f6] border-2 border-black border-t-0 flex justify-center pt-1" style={{ backgroundColor: themeColor, boxShadow: 'inset -2px -2px 0 rgba(0,0,0,0.2)' }}>
         <div className="w-2 h-3 bg-white/20" /> {/* tie / detail */}
         
         {/* Arms */}
         <motion.div animate={armAnims} className="absolute -left-3 top-0 transform origin-top w-2 h-8 bg-[#ffddc1] border-2 border-black z-0" style={{ boxShadow: 'inset -1px -1px 0 rgba(0,0,0,0.2)' }} />
         <motion.div animate={armAnims2} className="absolute -right-3 top-0 transform origin-top w-2 h-8 bg-[#ffddc1] border-2 border-black z-0" style={{ boxShadow: 'inset -1px -1px 0 rgba(0,0,0,0.2)' }} />
         
         {/* Book (only when running/focusing) */}
         {state === 'run' && (
           <motion.div animate={{ y: [0, -1, 0] }} transition={{ duration: 0.3, repeat: Infinity }} className="absolute -bottom-1 -left-2 w-10 h-6 bg-[#fef3c7] border-2 border-black z-20 flex justify-between px-1 items-center shadow-[0_2px_0_rgba(0,0,0,0.3)]">
             <div className="w-3 h-0.5 bg-black/20" />
             <div className="w-0.5 h-full bg-black/20" /> {/* spine */}
             <div className="w-3 h-0.5 bg-black/20" />
           </motion.div>
         )}
      </div>

      {/* Legs */}
      <div className="flex gap-1 -mt-1 z-0 relative">
        <motion.div animate={legAnims} className="w-3 h-6 bg-[#1e3a8a] border-2 border-black origin-top" />
        <motion.div animate={legAnims2} className="w-3 h-6 bg-[#1e3a8a] border-2 border-black origin-top" />
      </div>

      {state === 'sleep' && (
        <motion.div animate={{ opacity: [0,1,0], y: -20, x: 10 }} transition={{ duration: 3, repeat: Infinity }} className="absolute -top-10 -right-6 text-white text-xs drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">Zzz</motion.div>
      )}
      {state === 'run' && (
         <motion.div animate={{ opacity: [0,1,0], y: -10, x: -10 }} transition={{ duration: 1, repeat: Infinity }} className="absolute -top-6 -left-6 text-cyan-200 text-[10px] drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">!</motion.div>
      )}
    </motion.div>
  );
}

export function PixelDog({ state }: CharacterProps) {
  const anims = {
    idle: { y: [0, 2, 0], scaleY: [1, 0.95, 1], transition: { duration: 1.5, repeat: Infinity } },
    run: { y: [0, -6, 0], transition: { duration: 0.2, repeat: Infinity } },
    sleep: { y: 10, scaleY: 0.8, transition: { duration: 1 } }
  };
  
  const legAnims = {
    idle: { rotate: 0 },
    run: { rotate: [-30, 30, -30], transition: { duration: 0.2, repeat: Infinity } },
    sleep: { rotate: 90, x: 6, y: -2 }
  };
  
  const legAnims2 = {
    idle: { rotate: 0 },
    run: { rotate: [30, -30, 30], transition: { duration: 0.2, repeat: Infinity } },
    sleep: { rotate: 90, x: 6, y: -2 }
  };

  const earAnim = state === 'run' ? { rotate: [-10, 10, -10], transition: { duration: 0.2, repeat: Infinity } } : { rotate: 0 };
  const earAnim2 = state === 'run' ? { rotate: [10, -10, 10], transition: { duration: 0.2, repeat: Infinity } } : { rotate: 0 };
  const tailAnim = state === 'run' ? { rotate: [0, 45, 0], transition: { duration: 0.15, repeat: Infinity } } : state === 'idle' ? { rotate: [0, 15, 0], transition: { duration: 2, repeat: Infinity } } : { rotate: 0 };

  return (
    <motion.div className="relative flex flex-col items-center z-10 font-[Silkscreen]" animate={anims[state]}>
      {/* Head */}
      <div className="relative w-10 h-8 bg-[#d97706] border-2 border-black z-20 mt-4" style={{ boxShadow: 'inset -2px -2px 0 rgba(0,0,0,0.1)' }}>
         {/* Snout */}
         <div className="absolute top-3 w-8 h-4 bg-[#fcd34d] border-2 border-black -right-2 z-10" />
         {/* Nose */}
         <div className="absolute top-3 -right-3 w-2 h-2 bg-black z-20" />
         {/* Eye */}
         <motion.div animate={state === 'sleep' ? { scaleY: 0.1 } : {}} className="absolute top-2 right-2 w-1.5 h-2 bg-black z-20" />
         
         {/* Ears */}
         <motion.div animate={earAnim} className="absolute -top-3 left-1 w-3 h-5 bg-[#92400e] border-2 border-black origin-bottom rounded-t-sm" />
         <motion.div animate={earAnim2} className="absolute -top-3 left-5 w-3 h-5 bg-[#92400e] border-2 border-black origin-bottom rounded-t-sm" />
      </div>

      {/* Body */}
      <div className="relative z-10 w-12 h-6 bg-[#d97706] border-2 border-black -mt-1 -ml-2" style={{ boxShadow: 'inset -2px -2px 0 rgba(0,0,0,0.2)' }}>
         {/* Tail */}
         <motion.div animate={tailAnim} className="absolute -left-3 top-0 w-4 h-2 bg-[#d97706] border-2 border-black origin-right" />
      </div>

      {/* Legs */}
      <div className="flex gap-4 -mt-1 z-0 relative ml-2">
        <motion.div animate={legAnims} className="w-2.5 h-4 bg-[#92400e] border-2 border-black origin-top" />
        <motion.div animate={legAnims2} className="w-2.5 h-4 bg-[#92400e] border-2 border-black origin-top" />
      </div>

      {state === 'sleep' && (
        <motion.div animate={{ opacity: [0,1,0], y: -15, x: 5 }} transition={{ duration: 3, repeat: Infinity }} className="absolute -top-4 -right-4 text-white text-[10px] drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">Zzz</motion.div>
      )}
    </motion.div>
  );
}

export function PixelCat({ state }: CharacterProps) {
  const anims = {
    idle: { y: [0, 1, 0], scaleY: [1, 0.98, 1], transition: { duration: 2, repeat: Infinity } },
    run: { y: [0, -4, 0], transition: { duration: 0.25, repeat: Infinity } },
    sleep: { y: 8, scaleY: 0.8, scaleX: 1.1, transition: { duration: 1 } } // sploot
  };
  
  const legAnims = {
    idle: { rotate: 0 },
    run: { rotate: [-20, 20, -20], transition: { duration: 0.25, repeat: Infinity } },
    sleep: { rotate: 90, x: 4, y: -2, opacity: 0 } // hide in sploot
  };
  
  const legAnims2 = {
    idle: { rotate: 0 },
    run: { rotate: [20, -20, 20], transition: { duration: 0.25, repeat: Infinity } },
    sleep: { rotate: 90, x: 4, y: -2, opacity: 0 }
  };

  const tailAnim = state === 'run' ? { rotate: [0, 20, 0], transition: { duration: 0.5, repeat: Infinity } } : state === 'idle' ? { rotate: [0, -20, 0], transition: { duration: 3, repeat: Infinity } } : { rotate: 90, y: 4, x: -2 };

  return (
    <motion.div className="relative flex flex-col items-center z-10 font-[Silkscreen]" animate={anims[state]}>
      {/* Head */}
      <div className="relative w-8 h-7 bg-[#cbd5e1] border-2 border-black z-20 mt-6" style={{ boxShadow: 'inset -2px -2px 0 rgba(0,0,0,0.1)' }}>
         {/* Eye */}
         <motion.div animate={state === 'sleep' ? { scaleY: 0.1 } : {}} className="absolute top-2 right-1 w-1 h-1.5 bg-black z-20" />
         
         {/* Ears */}
         <div className="absolute -top-2 left-0 w-3 h-3 bg-[#94a3b8] border-2 border-black border-b-0" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
         <div className="absolute -top-2 right-0 w-3 h-3 bg-[#94a3b8] border-2 border-black border-b-0" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
         
         {/* Whiskers */}
         {state !== 'sleep' && (
           <>
             <div className="absolute top-3.5 -right-2 w-3 h-0.5 bg-black" />
             <div className="absolute top-5 -right-2 w-3 h-0.5 bg-black" />
           </>
         )}
      </div>

      {/* Body */}
      <div className="relative z-10 w-10 h-6 bg-[#cbd5e1] border-2 border-black -mt-1 -ml-2" style={{ boxShadow: 'inset -2px -2px 0 rgba(0,0,0,0.2)' }}>
         {/* Tail */}
         <motion.div animate={tailAnim} className="absolute -left-2 -top-4 w-2 h-6 bg-[#cbd5e1] border-2 border-black origin-bottom-right" />
      </div>

      {/* Legs */}
      <div className="flex gap-3 -mt-1 z-0 relative ml-2">
        <motion.div animate={legAnims} className="w-2 h-3 bg-[#94a3b8] border-2 border-black origin-top" />
        <motion.div animate={legAnims2} className="w-2 h-3 bg-[#94a3b8] border-2 border-black origin-top" />
      </div>

      {state === 'sleep' && (
        <motion.div animate={{ opacity: [0,1,0], y: -15, x: 5 }} transition={{ duration: 3, repeat: Infinity }} className="absolute -top-4 -right-2 text-white text-[8px] drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">Zzz</motion.div>
      )}
    </motion.div>
  );
}
