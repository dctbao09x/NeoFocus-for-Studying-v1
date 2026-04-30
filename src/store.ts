import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addDays, format, isSameDay } from 'date-fns';
import { TimerMode, TimerConfig, Task, Note, SessionRecord, EventCountdown, MascotData } from './types';

interface AppState {
  // Timer State
  timeLeft: number;
  isRunning: boolean;
  mode: TimerMode;
  currentRound: number;
  config: TimerConfig;
  
  // Tasks & Notes
  tasks: Task[];
  notes: Note[];
  
  // Tracking
  sessions: SessionRecord[];
  xp: number;
  level: number;
  streak: number;
  lastActive: string | null;
  finishedSession: SessionRecord | null;
  
  // Subject Focus
  currentSubject: string | null;
  focusMode: boolean;

  // Custom Events
  events: EventCountdown[];
  
  // Settings
  soundEnabled: boolean;
  ambientSound: string | null;
  petEnabled: boolean;
  themeColor: string;
  mascot: MascotData;

  // Actions
  setTimeLeft: (t: number) => void;
  setIsRunning: (b: boolean) => void;
  setMode: (m: TimerMode) => void;
  setConfig: (c: TimerConfig) => void;
  completeSession: (duration: number, metrics?: Partial<SessionRecord>) => void;
  clearFinishedSession: () => void;
  
  addTask: (t: Omit<Task, 'id' | 'createdAt' | 'completed' | 'order'>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  reorderTasks: (tasks: Task[]) => void;

  addNote: (n: Omit<Note, 'id' | 'updatedAt'>) => void;
  updateNote: (id: string, content: string) => void;
  togglePinNote: (id: string) => void;
  deleteNote: (id: string) => void;

  setFocusMode: (b: boolean) => void;
  setCurrentSubject: (s: string | null) => void;
  
  addEvent: (e: Omit<EventCountdown, 'id'>) => void;
  deleteEvent: (id: string) => void;

  setSoundEnabled: (b: boolean) => void;
  setAmbientSound: (s: string | null) => void;
  setPetEnabled: (b: boolean) => void;
  setThemeColor: (c: string) => void;
  feedMascot: (xp: number) => void;
}

const DEFAULT_CONFIG: TimerConfig = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
  rounds: 4,
  autoStartBreaks: false,
  autoStartPomodoros: false,
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // initial state
      timeLeft: DEFAULT_CONFIG.pomodoro,
      isRunning: false,
      mode: 'pomodoro',
      currentRound: 1,
      config: DEFAULT_CONFIG,
      
      tasks: [],
      notes: [],
      sessions: [],
      xp: 0,
      level: 1,
      streak: 0,
      lastActive: null,
      finishedSession: null,
      
      currentSubject: null,
      focusMode: false,
      events: [],
      
      soundEnabled: true,
      ambientSound: null,
      petEnabled: true,
      themeColor: '#06b6d4', // Default to cyan-500
      mascot: { id: 'default', name: 'Cyber Neko', skin: 'cyber', level: 1, xp: 0 },

      // actions
      setTimeLeft: (t) => set({ timeLeft: t }),
      setIsRunning: (b) => set({ isRunning: b }),
      setMode: (m) => {
        const { config } = get();
        let nextTime = config.pomodoro;
        if (m === 'shortBreak') nextTime = config.shortBreak;
        if (m === 'longBreak') nextTime = config.longBreak;
        if (m === 'stopwatch') nextTime = 0;
        set({ mode: m, timeLeft: nextTime, isRunning: false });
      },
      setConfig: (c) => set({ config: c }),
      
      completeSession: (duration, metrics) => {
        const now = new Date();
        const dateStr = format(now, 'yyyy-MM-dd');
        
        let newSessionRec: SessionRecord | null = null;

        set((state) => {
          let newStreak = state.streak;
          const lastActiveDate = state.lastActive ? new Date(state.lastActive) : null;
          
          if (!lastActiveDate) {
            newStreak = 1;
          } else {
             const prevDay = addDays(now, -1);
             if (isSameDay(lastActiveDate, prevDay)) {
               newStreak += 1;
             } else if (!isSameDay(lastActiveDate, now)) {
               newStreak = 1; // reset streak
             }
          }

          const earnedXP = Math.floor(duration / 60) * 10 + (metrics?.focusScore || 0);
          const newTotalXP = state.xp + earnedXP;
          const newLevel = Math.floor(newTotalXP / 1000) + 1;

          newSessionRec = {
            id: Math.random().toString(36).substr(2, 9),
            duration,
            mode: state.mode,
            date: now.toISOString(),
            subject: state.currentSubject || undefined,
            ...metrics
          };

          return {
            xp: newTotalXP,
            level: newLevel,
            streak: newStreak,
            lastActive: now.toISOString(),
            sessions: [...state.sessions, newSessionRec],
            finishedSession: newSessionRec
          };
        });
        
        // Handle auto progressing round
        const state = get();
        if (state.mode === 'pomodoro') {
          if (state.currentRound % state.config.rounds === 0) {
            state.setMode('longBreak');
          } else {
            state.setMode('shortBreak');
          }
        } else if (state.mode === 'shortBreak' || state.mode === 'longBreak') {
          set({ currentRound: state.currentRound + 1 });
          state.setMode('pomodoro');
        }
        
        // Auto start handling (basic implementation, can be extended inside the component for delays)
        const newState = get();
        if (state.mode === 'pomodoro' && state.config.autoStartBreaks) {
          setTimeout(() => set({ isRunning: true }), 1000);
        } else if ((state.mode === 'shortBreak' || state.mode === 'longBreak') && state.config.autoStartPomodoros) {
          setTimeout(() => set({ isRunning: true }), 1000);
        }
      },
      clearFinishedSession: () => set({ finishedSession: null }),

      addTask: (t) => set(state => ({
        tasks: [{ ...t, id: Math.random().toString(36).substr(2, 9), createdAt: Date.now(), completed: false, order: state.tasks.length }, ...state.tasks]
      })),
      toggleTask: (id) => set(state => ({
        tasks: state.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
      })),
      deleteTask: (id) => set(state => ({
        tasks: state.tasks.filter(t => t.id !== id)
      })),
      reorderTasks: (tasks) => set({ tasks }),
      
      addNote: (n) => set(state => ({
        notes: [{ ...n, id: Math.random().toString(36).substr(2, 9), updatedAt: Date.now() }, ...state.notes]
      })),
      updateNote: (id, content) => set(state => ({
        notes: state.notes.map(n => n.id === id ? { ...n, content, updatedAt: Date.now() } : n)
      })),
      togglePinNote: (id) => set(state => ({
        notes: state.notes.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n)
      })),
      deleteNote: (id) => set(state => ({
        notes: state.notes.filter(n => n.id !== id)
      })),

      setFocusMode: (b) => set({ focusMode: b }),
      setCurrentSubject: (s) => set({ currentSubject: s }),
      
      addEvent: (e) => set(state => ({
        events: [...state.events, { ...e, id: Math.random().toString(36).substr(2, 9) }]
      })),
      deleteEvent: (id) => set(state => ({
        events: state.events.filter(e => e.id !== id)
      })),

      setSoundEnabled: (b) => set({ soundEnabled: b }),
      setAmbientSound: (s) => set({ ambientSound: s }),
      setPetEnabled: (b) => set({ petEnabled: b }),
      setThemeColor: (c) => set({ themeColor: c }),
      feedMascot: (xp) => set(state => {
         const newXp = state.mascot.xp + xp;
         const newLevel = Math.floor(newXp / 500) + 1;
         return { mascot: { ...state.mascot, xp: newXp, level: newLevel } };
      }),
    }),
    {
      name: 'productivity-dashboard-storage',
    }
  )
);
