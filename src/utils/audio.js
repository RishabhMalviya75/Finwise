// =========================================
// WealthQuest — Web Audio API sound engine
// Tiny synth sounds — no mp3 files needed.
// =========================================

import { AUDIO_MAP } from '../data/storyData';

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  // Resume if suspended (browser autoplay policy)
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(frequency, duration, type = 'sine', gainVal = 0.15) {
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, ctx.currentTime);
  gain.gain.setValueAtTime(gainVal, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

export function playSound(key) {
  const config = AUDIO_MAP[key];
  if (!config) return;
  
  try {
    playTone(config.frequency, config.duration, config.type);
    
    if (config.secondFreq) {
      setTimeout(() => {
        playTone(config.secondFreq, config.duration, config.type);
      }, config.duration * 500);
    }
    
    if (config.thirdFreq) {
      setTimeout(() => {
        playTone(config.thirdFreq, config.duration, config.type);
      }, config.duration * 1000);
    }
  } catch (e) {
    // Audio context not available — silent fallback
  }
}

export function playCorrect() { playSound('correct'); }
export function playWrong() { playSound('wrong'); }
export function playXpPop() { playSound('xpPop'); }
export function playBadgeUnlock() { playSound('badgeUnlock'); }
