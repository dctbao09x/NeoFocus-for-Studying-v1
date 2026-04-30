import { useStore } from '../store';
import { format, subDays, getHours } from 'date-fns';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Cell, AreaChart, Area, PieChart, Pie, Sector } from 'recharts';
import { Brain, Zap, Target, TrendingUp, Clock, Activity, Sun } from 'lucide-react';
import { cn } from '../lib/utils';

export function Analytics() {
  const { sessions, xp, level, themeColor } = useStore();

  const totalFocusTime = sessions
    .filter(s => s.mode === 'pomodoro' || s.mode === 'stopwatch')
    .reduce((acc, curr) => acc + curr.duration, 0);

  const hours = Math.floor(totalFocusTime / 3600);
  const minutes = Math.floor((totalFocusTime % 3600) / 60);

  // Focus time by day (Last 14 days for Area Chart)
  const last14Days = Array.from({ length: 14 }).map((_, i) => {
    const d = subDays(new Date(), 13 - i);
    const dateStr = format(d, 'yyyy-MM-dd');
    const daySessions = sessions.filter(s => s.date.startsWith(dateStr) && s.mode === 'pomodoro');
    const daySeconds = daySessions.reduce((acc, curr) => acc + curr.duration, 0);
    return {
      name: format(d, 'MMM d'),
      focusTime: parseFloat((daySeconds / 60).toFixed(1)),
    };
  });

  const maxVal = Math.max(...last14Days.map(d => d.focusTime));

  // Subject Analysis
  const formatSubject = (subject?: string) => subject ? subject : 'Uncategorized';
  
  const subjectDataMap = sessions
    .filter(s => s.mode === 'pomodoro')
    .reduce((acc, curr) => {
      const sub = formatSubject(curr.subject);
      acc[sub] = (acc[sub] || 0) + curr.duration;
      return acc;
    }, {} as Record<string, number>);

  const COLORS = [themeColor, '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#f59e0b'];
  const subjectData = Object.entries(subjectDataMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, val], i) => ({
       name, 
       value: parseFloat((val / 60).toFixed(1)),
       fill: COLORS[i % COLORS.length]
    }));

  // Best Time to Work Analysis
  const hourlyData = new Array(24).fill(0);
  sessions.filter(s => s.mode === 'pomodoro').forEach(s => {
     const hour = getHours(new Date(s.date));
     hourlyData[hour] += s.duration;
  });
  const bestHour = hourlyData.indexOf(Math.max(...hourlyData));
  const bestHourStr = bestHour > -1 && hourlyData[bestHour] > 0 ? `${bestHour}:00 - ${bestHour+1}:00` : 'Not enough data';

  return (
    <div className="flex flex-col gap-8 h-full max-w-6xl mx-auto pb-10">
      <div className="flex items-center gap-3 pixel-panel p-4">
         <div className="p-3 border-2 border-white/20 bg-black/40 shadow-inner">
           <Activity className="text-white" size={32} />
         </div>
         <div>
            <h1 className="text-2xl font-[Silkscreen] tracking-widest text-white uppercase drop-shadow-md shadow-black">Intelligence</h1>
            <p className="text-xs text-white/70 tracking-widest uppercase font-[Silkscreen] mt-1">Performance & Behavioral Analytics</p>
         </div>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Stat Card 1 */}
        <div className="pixel-panel p-6 relative group overflow-hidden">
           <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:opacity-10 transition-opacity">
              <Clock size={48} />
           </div>
           <div className="text-xs uppercase tracking-widest text-white/60 font-[Silkscreen] mb-4 flex items-center gap-2 drop-shadow-md"><Target size={14}/> Focus Time</div>
           <div className="text-4xl text-white font-[VT323] drop-shadow-md">
             {hours}<span className="text-xl text-white/50 ml-1">h</span> {minutes}<span className="text-xl text-white/50 ml-1">m</span>
           </div>
        </div>
        
        {/* Stat Card 2 */}
        <div className="pixel-panel p-6 relative group overflow-hidden">
           <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:opacity-10 transition-opacity">
              <Zap size={48} />
           </div>
           <div className="text-xs uppercase tracking-widest text-white/60 font-[Silkscreen] mb-4 flex items-center gap-2 drop-shadow-md"><TrendingUp size={14}/> Sessions</div>
           <div className="text-4xl text-white font-[VT323] drop-shadow-md">
             {sessions.length}
           </div>
        </div>

        {/* Stat Card 3 */}
        <div className="pixel-panel p-6 relative overflow-hidden md:col-span-2 bg-gradient-to-r from-black/60 to-black/40">
           <div className="relative z-10 flex h-full justify-between items-center">
              <div>
                 <div className="text-xs uppercase tracking-widest text-white/60 font-[Silkscreen] mb-4 flex items-center gap-2 drop-shadow-md"><Brain size={14}/> Player Level</div>
                 <div className="text-4xl text-white font-[VT323] drop-shadow-md flex items-baseline gap-2">
                   {level} <span className="text-sm font-[Silkscreen] tracking-widest text-cyan-400 uppercase drop-shadow-md">{xp} Total XP</span>
                 </div>
              </div>
              <div className="w-16 h-16 border-4 border-white/20 flex items-center justify-center relative bg-black/40 shadow-inner">
                  <div className="absolute inset-x-0 bottom-0 bg-cyan-400 opacity-40 transition-all duration-1000" style={{ height: `${(xp % 1000) / 10}%` }} />
                  <span className="font-bold text-lg font-[VT323] relative z-10 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)]">{Math.floor((xp % 1000) / 10)}%</span>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Behavioral Trends Chart */}
        <div className="pixel-panel p-6 lg:col-span-2 flex flex-col">
          <div className="flex items-center justify-between mb-8 relative z-10">
             <h3 className="text-sm font-[Silkscreen] tracking-widest uppercase text-white shadow-black drop-shadow-md">Focus Trend (14 D)</h3>
          </div>
          
          <div className="flex-1 w-full relative min-h-[250px] z-10 font-[VT323] text-xl">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={last14Days} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorFocus" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={themeColor} stopOpacity={0.5}/>
                    <stop offset="95%" stopColor={themeColor} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  axisLine={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 2 }} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 14 }} 
                  dy={10} 
                  minTickGap={20}
                />
                <YAxis 
                  axisLine={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 2 }} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 14 }}
                  dx={-10}
                />
                <RechartsTooltip 
                  cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 2, strokeDasharray: '4 4' }} 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '0', boxShadow: '4px 4px 0px rgba(0,0,0,0.5)', fontFamily: 'VT323' }}
                  itemStyle={{ color: '#fff', fontSize: '20px' }}
                  labelStyle={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', marginBottom: '4px', textTransform: 'uppercase' }}
                  formatter={(value: number) => [`${value} min`, 'Focused']}
                />
                <Area 
                  type="step" 
                  dataKey="focusTime" 
                  stroke={themeColor} 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorFocus)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subjects & Peak Time */}
        <div className="flex flex-col gap-6">
           {/* Peak Cognitive Hour */}
           <div className="pixel-panel p-6 flex-1 flex flex-col justify-center items-center text-center relative overflow-hidden group">
              <div className="p-4 bg-yellow-400/20 mb-4 text-yellow-400 border-2 border-yellow-400/50 shadow-inner">
                <Sun size={32} />
              </div>
              <div className="text-xs uppercase tracking-widest text-white/50 font-[Silkscreen] mb-2 drop-shadow-md">Peak Window</div>
              <div className="text-3xl font-[VT323] text-white tracking-widest drop-shadow-md">{bestHourStr}</div>
              <div className="text-xs text-white/40 mt-2 font-[VT323] text-xl">Highest output</div>
           </div>

           {/* Top Subject */}
           {subjectData.length > 0 && (
             <div className="pixel-panel p-6 flex-1 flex flex-col justify-center relative overflow-hidden">
                <div className="text-xs uppercase tracking-widest text-white/60 font-[Silkscreen] mb-6 drop-shadow-md">Subjects</div>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={subjectData}
                          innerRadius={0}
                          outerRadius={40}
                          paddingAngle={0}
                          dataKey="value"
                          stroke="#000"
                          strokeWidth={2}
                        >
                          {subjectData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-col gap-2 flex-1 min-w-0 font-[VT323] text-lg">
                     {subjectData.slice(0, 3).map((item, i) => (
                       <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-2 truncate pr-2">
                             <div className="w-3 h-3 border-2 border-black shrink-0" style={{ backgroundColor: item.fill }} />
                             <span className="text-white truncate">{item.name}</span>
                          </div>
                          <span className="text-white/50 shrink-0">{item.value}m</span>
                       </div>
                     ))}
                  </div>
                </div>
             </div>
           )}
        </div>
      </div>
      
      {/* Activity Heatmap */}
      <div className="pixel-panel p-8">
         <h3 className="text-sm font-[Silkscreen] tracking-widest uppercase text-white shadow-black drop-shadow-md mb-8">Interaction Grid (Last 30 Days)</h3>
         <div className="flex flex-col gap-2 overflow-x-auto pb-4 no-scrollbar">
            <div className="flex gap-1 min-w-max">
              {Array.from({ length: 30 }).map((_, i) => {
                 const d = subDays(new Date(), 29 - i);
                 const dateStr = format(d, 'yyyy-MM-dd');
                 const daySessions = sessions.filter(s => s.date.startsWith(dateStr));
                 const intensity = daySessions.length;
                 
                 let colorStyle = { backgroundColor: 'rgba(255,255,255,0.05)' };
                 if (intensity > 4) colorStyle = { backgroundColor: themeColor };
                 else if (intensity > 2) colorStyle = { backgroundColor: `${themeColor}cc` };
                 else if (intensity > 0) colorStyle = { backgroundColor: `${themeColor}66` };
                 
                 return (
                   <div 
                     key={i} 
                     className="group relative"
                   >
                     <div 
                       className="w-8 h-8 border-2 transition-transform hover:-translate-y-1 hover:border-white shadow-inner cursor-crosshair"
                       style={{ ...colorStyle, borderColor: intensity > 0 ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.1)' }}
                     />
                     
                     <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black px-2 py-1 text-sm font-[VT323] border-2 border-white/20 text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-[2px_2px_0px_rgba(0,0,0,0.8)] z-50">
                       {format(d, 'MMM d')}: {intensity} sessions
                     </div>
                   </div>
                 );
              })}
            </div>
         </div>
      </div>
    </div>
  );
}
