import { useStore } from '../store';
import { TimerConfig } from '../types';
import { Settings as SettingsIcon, Bell, Palette, Timer, Workflow, Database } from 'lucide-react';

const THEMES = [
  { name: 'Cyan (Default)', value: '#06b6d4' },
  { name: 'Neon Green', value: '#10b981' },
  { name: 'Sunset', value: '#f59e0b' },
  { name: 'Orchid', value: '#d946ef' },
  { name: 'Cobalt', value: '#3b82f6' },
  { name: 'Crimson', value: '#e11d48' },
];

export function Settings() {
  const { 
    config, setConfig, 
    soundEnabled, setSoundEnabled,
    themeColor, setThemeColor,
    petEnabled, setPetEnabled,
    clearFinishedSession // For reset data if needed in future
  } = useStore();

  const handleConfigChange = (key: keyof TimerConfig, val: string) => {
    // Only handle numbers
    let num = parseInt(val, 10);
    if (isNaN(num)) num = 0;
    
    // View minutes back to seconds (except rounds)
    if (key === 'pomodoro' || key === 'shortBreak' || key === 'longBreak') {
      num = num * 60;
    }
    
    setConfig({ ...config, [key]: num });
  };

  const handleToggle = (key: keyof TimerConfig) => {
     setConfig({ ...config, [key]: !config[key] });
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col gap-8 pb-10">
      <div className="flex items-center gap-3 pixel-panel p-4">
         <div className="p-3 border-2 border-white/20 bg-black/40 shadow-inner">
           <SettingsIcon className="text-white" size={32} />
         </div>
         <div>
            <h1 className="text-2xl font-[Silkscreen] tracking-widest text-white uppercase drop-shadow-md shadow-black">System Config</h1>
            <p className="text-xs text-white/70 tracking-widest uppercase font-[Silkscreen] mt-1">Modify Core Parameters</p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Appearance */}
        <div className="pixel-panel p-8 flex flex-col gap-6 relative">
          <h3 className="text-sm font-[Silkscreen] tracking-widest uppercase text-white shadow-black drop-shadow-md border-b-2 border-white/10 pb-4 flex items-center gap-2 relative z-10"><Palette size={16}/> Interface</h3>
          
          <div className="relative z-10">
            <label className="text-[10px] font-bold text-white/50 mb-4 block uppercase tracking-widest font-[Silkscreen]">Accent Color</label>
            <div className="flex flex-wrap gap-4">
              {THEMES.map(t => (
                <button
                  key={t.name}
                  onClick={() => setThemeColor(t.value)}
                  className="w-10 h-10 border-2 transition-transform active:translate-y-1 active:translate-x-1"
                  style={{ backgroundColor: t.value, borderColor: themeColor === t.value ? '#fff' : 'rgba(255,255,255,0.2)', boxShadow: themeColor === t.value ? `2px 2px 0px ${t.value}80` : '2px 2px 0px rgba(0,0,0,0.5)' }}
                  title={t.name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Audio Constraints */}
        <div className="pixel-panel p-8 flex flex-col gap-6 relative">
          <h3 className="text-sm font-[Silkscreen] tracking-widest uppercase text-white shadow-black drop-shadow-md border-b-2 border-white/10 pb-4 flex items-center gap-2 relative z-10"><Bell size={16}/> Audio System</h3>
          
          <div className="flex items-center justify-between pt-2 relative z-10">
            <div>
              <div className="font-[VT323] text-xl tracking-wide text-white">System Tones</div>
              <div className="text-xs text-white/50 mt-1 font-[Silkscreen]">Acoustic feedback</div>
            </div>
            <button 
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="w-10 h-10 border-2 transition-transform active:translate-y-1 active:translate-x-1 flex items-center justify-center font-[Silkscreen] text-xs"
              style={{ backgroundColor: soundEnabled ? themeColor : 'rgba(0,0,0,0.4)', borderColor: 'rgba(255,255,255,0.2)', boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
            >
              {soundEnabled ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Time Definitions */}
        <div className="pixel-panel p-8 flex flex-col gap-6 relative md:col-span-2">
          <h3 className="text-sm font-[Silkscreen] tracking-widest uppercase text-white shadow-black drop-shadow-md border-b-2 border-white/10 pb-4 flex items-center gap-2 relative z-10"><Timer size={16}/> Temporal Framework (Minutes)</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest font-[Silkscreen] text-white/50">Focus Block</label>
              <input 
                type="number" 
                value={Math.floor(config.pomodoro / 60)}
                onChange={(e) => handleConfigChange('pomodoro', e.target.value)}
                className="bg-black/60 border-2 border-white/20 p-3 outline-none focus:border-cyan-500 transition-colors font-[VT323] text-2xl text-white text-center shadow-inner"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest font-[Silkscreen] text-white/50">Rest Segment</label>
              <input 
                type="number" 
                value={Math.floor(config.shortBreak / 60)}
                onChange={(e) => handleConfigChange('shortBreak', e.target.value)}
                className="bg-black/60 border-2 border-white/20 p-3 outline-none focus:border-cyan-500 transition-colors font-[VT323] text-2xl text-white text-center shadow-inner"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest font-[Silkscreen] text-white/50">Deep Rest</label>
              <input 
                type="number" 
                value={Math.floor(config.longBreak / 60)}
                onChange={(e) => handleConfigChange('longBreak', e.target.value)}
                className="bg-black/60 border-2 border-white/20 p-3 outline-none focus:border-cyan-500 transition-colors font-[VT323] text-2xl text-white text-center shadow-inner"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest font-[Silkscreen] text-white/50">Cycle Limit</label>
              <input 
                type="number" 
                value={config.rounds}
                onChange={(e) => handleConfigChange('rounds', e.target.value)}
                className="bg-black/60 border-2 border-white/20 p-3 outline-none focus:border-cyan-500 transition-colors font-[VT323] text-2xl text-white text-center shadow-inner"
              />
            </div>
          </div>
        </div>

        {/* Automation */}
        <div className="pixel-panel p-8 flex flex-col gap-6 relative md:col-span-2">
          <h3 className="text-sm font-[Silkscreen] tracking-widest uppercase text-white shadow-black drop-shadow-md border-b-2 border-white/10 pb-4 flex items-center gap-2 relative z-10"><Workflow size={16}/> Automation & Companions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div className="flex items-center justify-between pb-4 border-b-2 border-white/10">
              <div>
                <div className="font-[VT323] text-xl tracking-wide text-white">Pet Companion</div>
                <div className="text-[10px] font-[Silkscreen] uppercase tracking-widest text-white/50 mt-1">Show animated focus companion</div>
              </div>
              <button 
                onClick={() => setPetEnabled(!petEnabled)}
                className="w-10 h-10 border-2 transition-transform active:translate-y-1 active:translate-x-1 flex items-center justify-center font-[Silkscreen] text-xs"
                style={{ backgroundColor: petEnabled ? themeColor : 'rgba(0,0,0,0.4)', borderColor: 'rgba(255,255,255,0.2)', boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
              >
                {petEnabled ? 'ON' : 'OFF'}
              </button>
            </div>

            <div className="flex items-center justify-between pb-4 border-b-2 border-white/10">
              <div>
                <div className="font-[VT323] text-xl tracking-wide text-white">Auto-start Breaks</div>
                <div className="text-[10px] font-[Silkscreen] uppercase tracking-widest text-white/50 mt-1">Proceed to rest without prompt</div>
              </div>
              <button 
                onClick={() => handleToggle('autoStartBreaks')}
                className="w-10 h-10 border-2 transition-transform active:translate-y-1 active:translate-x-1 flex items-center justify-center font-[Silkscreen] text-xs"
                style={{ backgroundColor: config.autoStartBreaks ? themeColor : 'rgba(0,0,0,0.4)', borderColor: 'rgba(255,255,255,0.2)', boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
              >
                {config.autoStartBreaks ? 'ON' : 'OFF'}
              </button>
            </div>

            <div className="flex items-center justify-between pb-4 border-b-2 border-white/10">
              <div>
                <div className="font-[VT323] text-xl tracking-wide text-white">Auto-start Focus</div>
                <div className="text-[10px] font-[Silkscreen] uppercase tracking-widest text-white/50 mt-1">Resume focus block automatically</div>
              </div>
              <button 
                onClick={() => handleToggle('autoStartPomodoros')}
                className="w-10 h-10 border-2 transition-transform active:translate-y-1 active:translate-x-1 flex items-center justify-center font-[Silkscreen] text-xs"
                style={{ backgroundColor: config.autoStartPomodoros ? themeColor : 'rgba(0,0,0,0.4)', borderColor: 'rgba(255,255,255,0.2)', boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
              >
                {config.autoStartPomodoros ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
