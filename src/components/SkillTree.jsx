import { motion } from 'framer-motion';
import { STAGES } from '../data/storyData';
import {
  MessageSquare, BellRing, Search, PieChart,
  Lock, Check, ChevronRight
} from 'lucide-react';
import './SkillTree.css';

const ICON_MAP = {
  'message-square': MessageSquare,
  'bell-ring': BellRing,
  search: Search,
  'pie-chart': PieChart,
};

export default function SkillTree({ completedStages, activeStage, onStageSelect }) {
  return (
    <div className="skill-tree">
      <div className="skill-tree-header">
        <h2 className="skill-tree-title">Module 1: Payslip 101</h2>
        <p className="skill-tree-subtitle">Complete each stage to unlock the next</p>
      </div>
      
      <div className="skill-tree-track">
        {STAGES.map((stage, i) => {
          const isCompleted = completedStages.includes(stage.id);
          const isActive = activeStage === i;
          const isLocked = !isCompleted && !isActive;
          const IconComponent = ICON_MAP[stage.lucideIcon] || Search;
          
          return (
            <motion.div
              key={stage.id}
              className="skill-tree-node-wrapper"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12 }}
            >
              {/* Connector line */}
              {i > 0 && (
                <div className={`tree-connector ${isCompleted || isActive ? 'connector-active' : ''}`} />
              )}
              
              <button
                className={`tree-node ${isCompleted ? 'node-completed' : ''} ${isActive ? 'node-active' : ''} ${isLocked ? 'node-locked' : ''}`}
                onClick={() => !isLocked && onStageSelect(i)}
                disabled={isLocked}
                style={{ '--node-color': stage.color }}
              >
                <div className="node-circle">
                  {isCompleted ? (
                    <Check size={20} />
                  ) : isLocked ? (
                    <Lock size={18} />
                  ) : (
                    <IconComponent size={20} />
                  )}
                </div>
                
                <div className="node-info">
                  <div className="node-info-top">
                    <span className="node-number">Stage {stage.number}</span>
                    <span className={`node-type-badge ${stage.type}`}>{stage.type}</span>
                  </div>
                  <h3 className="node-title">{stage.title}</h3>
                  <p className="node-subtitle">{stage.subtitle}</p>
                </div>
                
                <div className="node-right">
                  {isCompleted ? (
                    <span className="node-xp-earned">+{stage.xpReward} XP</span>
                  ) : isActive ? (
                    <ChevronRight size={18} className="node-go-icon" />
                  ) : null}
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
