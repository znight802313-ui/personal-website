import { motion } from 'framer-motion'

export default function InteractiveTags({
  tagHovered,
  setTagHovered,
  playSound
}) {
  return (
    <motion.div
      className="flex flex-wrap gap-3 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
    >
      {/* 农药深度中毒 */}
      <motion.div
        className="px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white/70 text-sm font-handwriting text-earthBrown/90 cursor-pointer relative overflow-visible shadow-lg"
        style={{
          boxShadow: '0 4px 15px rgba(34, 197, 94, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
        }}
        whileHover={{
          scale: 1.1,
          boxShadow: '0 8px 25px rgba(34, 197, 94, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
        }}
        onHoverStart={() => {
          setTagHovered('game')
          playSound('game')
        }}
        onHoverEnd={() => setTagHovered(null)}
      >
        <span style={{ imageRendering: tagHovered === 'game' ? 'pixelated' : 'auto' }}>农药深度中毒</span>
        {tagHovered === 'game' && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute font-bold"
                style={{
                  left: `${15 + i * 10}%`,
                  bottom: '100%',
                  fontSize: '16px',
                  color: '#22c55e',
                  textShadow: '0 0 8px rgba(34, 197, 94, 0.8), 0 0 12px rgba(34, 197, 94, 0.6)'
                }}
                initial={{ y: 0, opacity: 1, scale: 1 }}
                animate={{ y: -40, opacity: 0, scale: 1.2 }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.08,
                  repeat: Infinity,
                  repeatDelay: 0.3,
                  ease: 'easeOut'
                }}
              >
                +1
              </motion.span>
            ))}
          </>
        )}
      </motion.div>

      {/* 公路漫游者 */}
      <motion.div
        className="px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white/70 text-sm font-handwriting text-earthBrown/90 cursor-pointer relative overflow-hidden shadow-lg"
        style={{
          boxShadow: '0 4px 15px rgba(139, 115, 85, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
        }}
        whileHover={{
          scale: 1.1,
          boxShadow: '0 8px 25px rgba(139, 115, 85, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
        }}
        onHoverStart={() => {
          setTagHovered('road')
          playSound('road')
        }}
        onHoverEnd={() => setTagHovered(null)}
      >
        {tagHovered === 'road' && (
          <>
            {/* 公路主体 - 深色路面 */}
            <motion.div
              className="absolute inset-0 z-0"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, #4a4a4a 20%, #5a5a5a 40%, #5a5a5a 60%, #4a4a4a 80%, transparent 100%)',
                backgroundSize: '200% 100%'
              }}
              animate={{
                backgroundPosition: ['200% 0', '-200% 0']
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
            {/* 公路中线 - 白色虚线 */}
            <motion.div
              className="absolute top-1/2 left-0 right-0 h-0.5 z-0"
              style={{
                background: 'repeating-linear-gradient(90deg, white 0px, white 15px, transparent 15px, transparent 30px)',
                backgroundSize: '200% 100%',
                transform: 'translateY(-50%)'
              }}
              animate={{
                backgroundPosition: ['200% 0', '-200% 0']
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
            {/* 小汽车 - 镜像翻转 */}
            <motion.div
              className="absolute top-1/2 z-20"
              style={{
                transform: 'translateY(-50%) scaleX(-1)',
                fontSize: '18px',
                filter: 'drop-shadow(2px 2px 3px rgba(0,0,0,0.3))'
              }}
              animate={{
                left: ['-10%', '110%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
                repeatDelay: 0.5
              }}
            >
              🚗
            </motion.div>
            {/* 山峦剪影 - 上方 */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-3 z-0"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(139, 115, 85, 0.4) 10%, rgba(139, 115, 85, 0.6) 30%, rgba(139, 115, 85, 0.4) 50%, rgba(139, 115, 85, 0.6) 70%, rgba(139, 115, 85, 0.4) 90%, transparent 100%)',
                backgroundSize: '300% 100%',
                clipPath: 'polygon(0 100%, 5% 60%, 15% 80%, 25% 50%, 35% 70%, 45% 40%, 55% 65%, 65% 45%, 75% 70%, 85% 55%, 95% 75%, 100% 100%)'
              }}
              animate={{
                backgroundPosition: ['300% 0', '-300% 0']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
            {/* 草甸 - 下方 */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-2 z-0"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(139, 157, 131, 0.5) 20%, rgba(139, 157, 131, 0.7) 50%, rgba(139, 157, 131, 0.5) 80%, transparent 100%)',
                backgroundSize: '250% 100%'
              }}
              animate={{
                backgroundPosition: ['250% 0', '-250% 0']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </>
        )}
        <span className="relative z-10">公路漫游者</span>
      </motion.div>

      {/* 光影捕手 */}
      <motion.div
        className="px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white/70 text-sm font-handwriting text-earthBrown/90 cursor-pointer relative overflow-hidden shadow-lg"
        style={{
          boxShadow: '0 4px 15px rgba(139, 115, 85, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
        }}
        whileHover={{
          scale: 1.1,
          boxShadow: '0 8px 25px rgba(139, 115, 85, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
        }}
        onHoverStart={() => {
          setTagHovered('photo')
          playSound('photo')
        }}
        onHoverEnd={() => setTagHovered(null)}
        animate={tagHovered === 'photo' ? {
          borderColor: ['rgba(255,255,255,0.7)', 'rgba(139,115,85,0.8)', 'rgba(255,255,255,0.7)']
        } : {}}
        transition={{
          duration: 0.5,
          repeat: tagHovered === 'photo' ? Infinity : 0
        }}
      >
        光影捕手
        {tagHovered === 'photo' && (
          <>
            {/* 取景器角标 */}
            <motion.div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-earthBrown" />
            <motion.div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-earthBrown" />
            <motion.div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-earthBrown" />
            <motion.div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-earthBrown" />
          </>
        )}
      </motion.div>

      {/* 无辣不欢 */}
      <motion.div
        className="px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white/70 text-sm font-handwriting text-earthBrown/90 cursor-pointer relative overflow-visible shadow-lg"
        style={{
          boxShadow: '0 4px 15px rgba(255, 107, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
        }}
        whileHover={{
          scale: 1.1,
          boxShadow: '0 8px 25px rgba(255, 107, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
        }}
        onHoverStart={() => {
          setTagHovered('spicy')
          playSound('spicy')
        }}
        onHoverEnd={() => setTagHovered(null)}
        animate={tagHovered === 'spicy' ? {
          x: [0, -2, 2, -2, 2, 0]
        } : {}}
        transition={{
          duration: 0.3,
          repeat: tagHovered === 'spicy' ? Infinity : 0,
          repeatDelay: 0.1
        }}
      >
        无辣不欢
        {tagHovered === 'spicy' && (
          <>
            {/* 火焰粒子 - 更多更密集 */}
            {[...Array(15)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute"
                style={{
                  left: `${5 + i * 6.5}%`,
                  bottom: '100%',
                  fontSize: i % 3 === 0 ? '14px' : '12px',
                  filter: 'drop-shadow(0 0 3px rgba(255, 107, 0, 0.8))'
                }}
                initial={{ y: 0, opacity: 1, scale: 1 }}
                animate={{
                  y: -35,
                  opacity: 0,
                  scale: 0.3,
                  x: [0, (i % 2 === 0 ? 3 : -3), 0]
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.06,
                  repeat: Infinity,
                  repeatDelay: 0.2,
                  ease: 'easeOut'
                }}
              >
                {i % 4 === 0 ? '🔥' : i % 4 === 1 ? '🌶️' : i % 4 === 2 ? '💥' : '✨'}
              </motion.span>
            ))}
            {/* 热浪效果 - 底部向上扩散 */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at bottom, rgba(255, 107, 0, 0.3) 0%, rgba(255, 69, 0, 0.2) 30%, transparent 60%)',
              }}
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
