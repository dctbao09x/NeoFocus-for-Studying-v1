export type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak' | 'stopwatch' | 'custom';

export interface TimerConfig {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  rounds: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
}

export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  tag?: string;
  subject?: string;
  priority?: TaskPriority;
  estimatedMinutes?: number;
  createdAt: number;
  order: number;
}

export interface Note {
  id: string;
  content: string;
  title?: string;
  pinned: boolean;
  subject?: string;
  tags?: string[];
  updatedAt: number;
}

export interface SessionRecord {
  id: string;
  duration: number; // in seconds
  mode: TimerMode;
  date: string; // ISO string
  subject?: string;
  completedTasksCount?: number;
  focusScore?: number;
  interruptions?: number;
  mood?: string;
}

export interface EventCountdown {
  id: string;
  title: string;
  targetDate: string; // ISO string
  color: string;
  icon: string;
}

export type MascotState = 'idle' | 'running' | 'sleeping' | 'happy' | 'celebrating' | 'tired' | 'focused';

export interface MascotData {
  id: string;
  name: string;
  skin: string;
  level: number;
  xp: number;
}
