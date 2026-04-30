import { motion } from 'motion/react';
import { useStore } from '../../store';
import { cn } from '../../lib/utils';
import { PixelGirl, PixelDog, PixelCat } from '../characters/PixelSprites';

export function PixelWorld() {
  const { mode, isRunning, themeColor, petEnabled } = useStore();
  const isNight = mode === 'shortBreak' || mode === 'longBreak';
  
  let state: 'idle' | 'run' | 'sleep' = 'idle';
  if (isRunning && !isNight) state = 'run';
  if (isNight) state = 'sleep';
  
  return (
    <div className={cn("fixed inset-0 z-0 overflow-hidden transition-colors duration-[3000ms] pointer-events-none", isNight ? 'bg-[#0f172a]' : 'bg-[#7dd3fc]')}>
      
      {/* Dynamic Sky Gradient */}
      <div className={cn("absolute inset-0 transition-opacity duration-[3000ms] bg-gradient-to-b from-[#020617] via-[#1e1b4b] to-[#312e81]", isNight ? "opacity-100" : "opacity-0")} />
      <div className={cn("absolute inset-0 transition-opacity duration-[3000ms] bg-gradient-to-b from-[#38bdf8] to-[#e0f6ff]", isNight ? "opacity-0" : "opacity-100")} />

      {/* Stars */}
      <div className={cn("absolute inset-0 transition-opacity duration-[3000ms]", isNight ? "opacity-100" : "opacity-0")}>
         {[...Array(40)].map((_, i) => (
           <motion.div 
             key={i}
             className="absolute w-1 h-1 bg-white rounded-none"
             style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 60}%` }}
             animate={{ opacity: [0.1, 0.8, 0.1] }}
             transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
           />
         ))}
      </div>

      {/* Sun / Moon */}
      <motion.div 
         animate={{ 
            y: isNight ? [0, -10, 0] : [0, -10, 0], 
            rotate: isNight ? 180 : 0, 
            scale: isNight ? 0.8 : 1,
            opacity: isNight ? 0.9 : 1 
         }}
         transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
         className="absolute top-16 right-32 w-24 h-24 sm:w-32 sm:h-32 rounded-full z-0"
         style={{
            background: isNight ? '#cbd5e1' : '#fef08a',
            boxShadow: isNight ? '0 0 40px #e2e8f060' : '0 0 60px #fef08a80',
         }}
      >
         {isNight && <div className="absolute top-4 left-4 w-6 h-6 bg-[#94a3b8] rounded-full opacity-50" />}
         {isNight && <div className="absolute bottom-6 right-8 w-4 h-4 bg-[#94a3b8] rounded-full opacity-40" />}
      </motion.div>

      {/* Distant Clouds (Slow) */}
      <div className="absolute top-[10vh] left-0 w-full h-32 opacity-40 mix-blend-overlay">
         <motion.div 
           animate={isRunning ? { x: ['0%', '-50%'] } : { x: ['0%', '-10%'] }}
           transition={{ duration: isRunning ? 60 : 120, repeat: Infinity, ease: "linear" }}
           className="flex gap-64 w-[200vw]"
         >
           {[...Array(8)].map((_, i) => <PixelCloud key={i} />)}
         </motion.div>
      </div>

      {/* Far Mountains */}
      <div className="absolute bottom-[25vh] inset-x-0 flex items-end">
         <motion.div className="flex w-[200vw]" animate={isRunning ? { x: ['0%', '-5%'] } : {}} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
            {[...Array(6)].map((_, i) => (
               <div key={i} className={cn("w-[60vw] h-[30vh] flex-shrink-0 transition-colors duration-1000", isNight ? 'bg-[#1e293b]' : 'bg-[#3b82f6]')} style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', marginLeft: i === 0 ? '-10%' : '-20%' }} />
            ))}
         </motion.div>
      </div>

      {/* Mid Hills */}
      <div className="absolute bottom-[20vh] inset-x-0 flex items-end">
         <motion.div className="flex w-[200vw]" animate={isRunning ? { x: ['0%', '-25%'] } : {}} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}>
            {[...Array(8)].map((_, i) => (
               <div key={i} className={cn("w-[40vw] h-[20vh] flex-shrink-0 rounded-t-[100px] transition-colors duration-1000", isNight ? 'bg-[#0f172a]' : 'bg-[#10b981]')} style={{ marginLeft: i === 0 ? '-5%' : '-10%' }} />
            ))}
         </motion.div>
      </div>
      
      {/* Trees Parallax */}
      <div className="absolute bottom-[20vh] inset-x-0 h-32 overflow-hidden z-10 opacity-90">
         <motion.div className="flex w-[200vw] items-end pb-2 pt-10" animate={isRunning ? { x: ['0%', '-50%'] } : {}} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}>
            {[...Array(15)].map((_, i) => (
               <div key={i} className="flex-1 flex justify-center">
                 <PixelTree isNight={isNight} delay={i * 0.2} />
               </div>
            ))}
         </motion.div>
      </div>

      {/* Ground Foreground */}
      <div className={cn("absolute bottom-0 inset-x-0 h-[25vh] transition-colors duration-[3000ms] border-t-[12px] shadow-[inset_0_40px_60px_rgba(0,0,0,0.4)] z-10", 
          isNight ? 'bg-[#020617] border-[#0f172a]' : 'bg-[#4ade80] border-[#22c55e]'
      )}>
         {/* Animated Grass Details */}
         <motion.div className="w-[200vw] h-full flex flex-wrap gap-12 p-4 opacity-70" animate={isRunning ? { x: ['0%', '-50%'] } : {}} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}>
           {[...Array(60)].map((_, i) => (
              <motion.div key={i} animate={isRunning ? { skewX: [-15, 15, -15] } : { skewX: [-5, 5, -5] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: Math.random() }}
                 className={cn("w-2 h-4 border-l-[3px] border-t-[3px]", isNight ? 'border-[#1e293b]' : 'border-[#16a34a]')} />
           ))}
         </motion.div>
      </div>

      {/* Environmental Particles */}
      <div className="absolute inset-x-0 bottom-0 top-[50vh] overflow-hidden pointer-events-none z-20">
         {[...Array(25)].map((_, i) => (
            <motion.div 
               key={i}
               className={cn("absolute w-2 h-2 rounded-none", isNight ? "bg-yellow-300 shadow-[0_0_12px_#fde047]" : "bg-white/50 shadow-[0_0_8px_white]")}
               style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
               animate={{ 
                 y: [0, Math.random() * -60 - 20, 0], 
                 x: [0, Math.random() * 60 - 30, 0], 
                 opacity: [0, isNight ? 0.9 : 0.6, 0] 
               }}
               transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 3 }}
            />
         ))}
      </div>

      {/* Living Characters */}
      <div className="absolute bottom-[20vh] left-1/2 -translate-x-1/2 w-full max-w-5xl px-10 z-30">
         <div className="relative w-full h-32 flex items-end justify-center drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] border-b-4 border-black/20">
            <div className="absolute" style={{ left: 'calc(50%)' }}>
               <PixelGirl state={state} themeColor={themeColor} />
            </div>
            {petEnabled && (
                <>
                  <div className="absolute" style={{ left: 'calc(50% + 120px)' }}>
                     <PixelDog state={state} />
                  </div>
                  <div className="absolute" style={{ left: 'calc(50% - 140px)' }}>
                     <PixelCat state={state} />
                  </div>
                </>
            )}
         </div>
      </div>
    </div>
  );
}

function PixelCloud() {
  return (
    <div className="relative w-64 h-20 bg-white/80" style={{ clipPath: 'polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%)' }} />
  );
}

function PixelTree({ isNight, delay }: { isNight: boolean, delay: number }) {
  const treeColors = isNight ? ['bg-[#0f172a]', 'bg-[#1e293b]'] : ['bg-[#15803d]', 'bg-[#16a34a]'];
  const trunkColor = isNight ? 'bg-[#020617]' : 'bg-[#78350f]';

  return (
    <motion.div 
      className="flex flex-col items-center justify-end h-full origin-bottom"
      animate={{ skewX: [-2, 2, -2] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
    >
       {/* Leaves */}
       <div className={cn("w-20 h-24 border-4 border-black/50 -mb-2 z-10", treeColors[0])} style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}>
          <div className={cn("absolute bottom-0 right-0 w-1/2 h-full", treeColors[1])} style={{ clipPath: 'polygon(0% 100%, 100% 0%, 100% 100%)' }} />
       </div>
       {/* Trunk */}
       <div className={cn("w-6 h-12 border-4 border-black/50 border-t-0", trunkColor)} />
    </motion.div>
  );
}
