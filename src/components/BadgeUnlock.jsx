import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import { playBadgeUnlock } from '../utils/audio';
import { Trophy, Award, Zap, FileCheck, ShieldCheck, Wallet, Swords, Flame } from 'lucide-react';
import { useEffect } from 'react';
import './BadgeUnlock.css';

const ICON_MAP = {
  'file-check': FileCheck,
  'shield-check': ShieldCheck,
  'wallet': Wallet,
  'swords': Swords,
  'flame': Flame,
};

export default function BadgeUnlock() {
  const { showBadgeUnlock, lastBadgeEarned, dismissBadge } = useGame();
  
  // Play badge unlock jingle
  useEffect(() => {
    if (showBadgeUnlock) {
      playBadgeUnlock();
    }
  }, [showBadgeUnlock]);
  
  if (!lastBadgeEarned) return null;
  
  return (
    <AnimatePresence>
      {showBadgeUnlock && (
        <motion.div
          className="badge-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={dismissBadge}
        >
          {/* Particles */}
          <div className="badge-particles">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  background: i % 3 === 0 ? 'var(--gold-primary)' : i % 3 === 1 ? 'var(--neon-primary)' : 'var(--success)',
                }}
                initial={{ y: -20, opacity: 0, scale: 0 }}
                animate={{
                  y: [0, -200 - Math.random() * 300],
                  x: [0, (Math.random() - 0.5) * 200],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0.5],
                  rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  delay: Math.random() * 0.5,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>
          
          <motion.div
            className="badge-card"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          >
            <div className="badge-glow" />
            
            <motion.div
              className="badge-header"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="badge-unlock-label">
                <Trophy size={14} />
                <span>BADGE UNLOCKED</span>
              </div>
            </motion.div>
            
            <motion.div
              className="badge-icon-display"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.4, 1] }}
              transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
            >
              {(() => {
                const Icon = ICON_MAP[lastBadgeEarned.lucideIcon] || Award;
                return <Icon size={48} className="badge-award-icon" />;
              })()}
            </motion.div>
            
            <motion.h2
              className="badge-name"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {lastBadgeEarned.name}
            </motion.h2>
            
            <motion.p
              className="badge-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {lastBadgeEarned.description}
            </motion.p>
            
            <motion.div
              className="badge-xp-reward"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
            >
              <Zap size={14} className="badge-xp-icon" />
              <span className="badge-xp-amount">+{lastBadgeEarned.xpReward} XP</span>
            </motion.div>
            
            <motion.button
              className="btn btn-gold badge-continue-btn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              onClick={(e) => {
                e.stopPropagation();
                dismissBadge();
              }}
            >
              Awesome!
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
