import { useEffect } from 'react';
import { useStore } from '../store';
import useSound from 'use-sound';

export function TimerService() {
  const { isRunning, timeLeft, mode, currentRound, config, setTimeLeft, completeSession, soundEnabled } = useStore();
  
  // Minimal sounds using native Audio or standard beeps. Since we don't have sound files, 
  // we'll rely on a tiny base64 audio snippet or fallback to a soft visual cue if use-sound fails without src.
  // Actually, we'll try to use standard sounds or skip use-sound and just use the Audio API with a synth.
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      // play sound
      if (soundEnabled) {
         playBeep();
      }
      
      // Determine duration passed
      const durationPassed = mode === 'pomodoro' ? config.pomodoro : (mode === 'shortBreak' ? config.shortBreak : config.longBreak);
      completeSession(durationPassed);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, config, setTimeLeft, completeSession, soundEnabled]);

  return null;
}

// Simple synth beep
function playBeep() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch (e) {
    console.error("Audio playback error:", e);
  }
}
