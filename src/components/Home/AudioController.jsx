import { motion, AnimatePresence } from 'framer-motion'

export default function AudioController({
  volume,
  setVolume,
  showVolumeControl,
  handleVolumeControlEnter,
  handleVolumeControlLeave,
  toggleMute
}) {
  return (
    <motion.div
      className="fixed top-8 right-8 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
    >
      <div className="relative">
        {/* 音量按钮 */}
        <motion.button
          className="relative w-12 h-12 rounded-xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg flex items-center justify-center cursor-pointer overflow-hidden"
          onHoverStart={handleVolumeControlEnter}
          onHoverEnd={handleVolumeControlLeave}
          onClick={toggleMute}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* 音量波纹 */}
          {volume > 0 && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-xl"
                  style={{
                    border: '2px solid',
                    borderColor: 'rgba(244, 162, 97, 0.3)'
                  }}
                  animate={{
                    scale: [1, 1.5, 2],
                    opacity: [0.5, 0.2, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.6,
                    ease: "easeOut"
                  }}
                />
              ))}
            </>
          )}

          {/* 音量图标 */}
          <span className="relative z-10 text-lg">
            {volume === 0 ? '🔇' : volume < 0.3 ? '🔈' : volume < 0.7 ? '🔉' : '🔊'}
          </span>
        </motion.button>

        {/* 音量滑块面板 */}
        <AnimatePresence>
          {showVolumeControl && (
            <motion.div
              className="absolute top-0 right-14 w-56"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onMouseEnter={handleVolumeControlEnter}
              onMouseLeave={handleVolumeControlLeave}
            >
              <div className="bg-white/70 backdrop-blur-2xl rounded-2xl p-4 shadow-2xl border border-white/50">
                {/* 顶部 - 音量数值 */}
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-xs font-medium text-earthBrown/50 uppercase tracking-wider">Volume</span>
                  <motion.div
                    className="flex items-baseline gap-1"
                    key={Math.round(volume * 100)}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-2xl font-bold text-warmOrange">{Math.round(volume * 100)}</span>
                    <span className="text-xs text-earthBrown/50">%</span>
                  </motion.div>
                </div>

                {/* 水平滑块 */}
                <div className="relative h-12 flex items-center mb-3">
                  {/* 轨道背景 */}
                  <div className="absolute inset-x-0 h-1.5 rounded-full bg-earthBrown/10">
                    {/* 进度填充 */}
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 rounded-full bg-gradient-to-r from-warmOrange to-sageGreen"
                      style={{ width: `${volume * 100}%` }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      {/* 光晕 */}
                      <motion.div
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-warmOrange/40 blur-xl"
                        animate={{
                          opacity: [0.4, 0.8, 0.4],
                          scale: [1, 1.3, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* 滑块输入 */}
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer z-20"
                  />

                  {/* 滑块手柄 */}
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 pointer-events-none z-10"
                    style={{ left: `calc(${volume * 100}% - 10px)` }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <div className="relative">
                      {/* 手柄圆点 */}
                      <div className="w-5 h-5 rounded-full bg-white shadow-lg border-2 border-warmOrange" />
                      {/* 内部光点 */}
                      <motion.div
                        className="absolute inset-1 rounded-full bg-warmOrange"
                        animate={{
                          opacity: [0.6, 1, 0.6],
                          scale: [0.8, 1, 0.8]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </div>
                  </motion.div>
                </div>

                {/* 底部 - 音量可视化 */}
                <div className="flex items-end justify-between h-8 gap-1 px-1">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-full"
                      style={{
                        backgroundColor: i / 12 <= volume ? 'rgba(244, 162, 97, 0.8)' : 'rgba(139, 157, 131, 0.2)',
                        height: `${20 + (i % 3) * 10}px`
                      }}
                      animate={{
                        height: i / 12 <= volume
                          ? [`${20 + (i % 3) * 10}px`, `${25 + (i % 3) * 10}px`, `${20 + (i % 3) * 10}px`]
                          : `${20 + (i % 3) * 10}px`,
                        opacity: i / 12 <= volume ? [0.8, 1, 0.8] : 0.3
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.05,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>

                {/* 快捷按钮 */}
                <div className="flex gap-2 mt-3 pt-3 border-t border-earthBrown/10">
                  {[0, 0.5, 1].map((val) => (
                    <motion.button
                      key={val}
                      onClick={() => setVolume(val)}
                      className="flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors"
                      style={{
                        backgroundColor: volume === val ? 'rgba(244, 162, 97, 0.2)' : 'rgba(139, 157, 131, 0.1)',
                        color: volume === val ? 'rgba(244, 162, 97, 1)' : 'rgba(139, 115, 85, 0.5)'
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {val === 0 ? 'Mute' : val === 0.5 ? '50%' : 'Max'}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
