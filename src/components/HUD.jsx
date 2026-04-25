import { useGame } from '../contexts/GameContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { Zap, Heart, Flame } from 'lucide-react';
import './HUD.css';

export default function HUD() {
  const { xp, hearts, maxHearts, streak, xpPopup, clearXpPopup } = useGame();
  
  useEffect(() => {
    if (xpPopup) {
      const timer = setTimeout(clearXpPopup, 2000);
      return () => clearTimeout(timer);
    }
  }, [xpPopup, clearXpPopup]);
  
  return (
    <div className="hud">
      <div className="hud-inner">
        {/* XP Counter */}
        <div className="hud-stat hud-xp">
          <Zap size={16} className="hud-lucide-icon hud-xp-icon" />
          <span className="hud-value">{xp}</span>
          <span className="hud-label">XP</span>
          
          <AnimatePresence>
            {xpPopup && (
              <motion.div
                key={xpPopup.id}
                className="xp-popup"
                initial={{ opacity: 0, y: 10, scale: 0.5 }}
                animate={{ opacity: 1, y: -30, scale: 1 }}
                exit={{ opacity: 0, y: -60, scale: 0.8 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                +{xpPopup.amount} XP
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Hearts */}
        <div className="hud-stat hud-hearts">
          {Array.from({ length: maxHearts }).map((_, i) => (
            <motion.div
              key={i}
              className={`heart-icon-wrapper ${i < hearts ? 'heart-full' : 'heart-empty'}`}
              animate={i < hearts ? { scale: [1, 1.2, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Heart size={18} fill={i < hearts ? '#FF4757' : 'none'} stroke={i < hearts ? '#FF4757' : '#4A6380'} />
            </motion.div>
          ))}
        </div>
        
        {/* Streak */}
        <div className="hud-stat hud-streak">
          <Flame size={18} className="hud-lucide-icon hud-streak-icon" />
          <span className="hud-value">{streak}</span>
          <span className="hud-label">day</span>
        </div>
      </div>
    </div>
  );
}
