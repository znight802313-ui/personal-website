import { motion, AnimatePresence } from 'framer-motion'

export default function BackgroundEffects({ 
  hasEntered, 
  sunsetMode, 
  starMode, 
  roseMode
}) {
  return (
    <>
      {/* 半透明遮罩 */}
      <motion.div
        className="absolute inset-0 backdrop-blur-sm pointer-events-none"
        animate={{
          backgroundColor: !hasEntered
            ? 'rgba(15, 23, 42, 0.7)'
            : sunsetMode
            ? 'rgba(255, 140, 60, 0.25)'
            : starMode
            ? 'rgba(20, 30, 50, 0.4)'
            : roseMode
            ? 'rgba(255, 182, 193, 0.25)'
            : 'rgba(255, 255, 255, 0.1)'
        }}
        transition={{ duration: hasEntered ? 2.5 : 0 }}
      />

      {/* 日落渐变天空 */}
      <AnimatePresence>
        {sunsetMode && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{
              background: 'linear-gradient(to bottom, rgba(255, 94, 77, 0.3) 0%, rgba(255, 140, 60, 0.4) 30%, rgba(255, 183, 77, 0.3) 60%, rgba(253, 216, 177, 0.2) 100%)'
            }}
          />
        )}
      </AnimatePresence>

      {/* 日落太阳 */}
      <AnimatePresence>
        {sunsetMode && (
          <motion.div
            className="absolute pointer-events-none"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 2 }}
            style={{
              left: '15%',
              top: '20%',
            }}
          >
            {/* 太阳本体 */}
            <motion.div
              className="relative"
              animate={{
                y: [0, 100, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* 太阳光晕 */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  width: '120px',
                  height: '120px',
                  background: 'radial-gradient(circle, rgba(255, 140, 60, 0.6) 0%, rgba(255, 183, 77, 0.3) 50%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 0.9, 0.6]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              {/* 太阳核心 */}
              <div
                className="relative rounded-full"
                style={{
                  width: '80px',
                  height: '80px',
                  background: 'radial-gradient(circle, rgba(255, 200, 100, 0.9) 0%, rgba(255, 140, 60, 0.8) 100%)',
                  boxShadow: '0 0 40px rgba(255, 140, 60, 0.8), inset 0 0 20px rgba(255, 220, 150, 0.5)'
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 日落云朵 */}
      <AnimatePresence>
        {sunsetMode && (
          <>
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`cloud-${i}`}
                className="absolute pointer-events-none text-6xl opacity-40"
                initial={{ opacity: 0, x: -100 }}
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  x: ['0vw', '110vw']
                }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  x: {
                    duration: 40 + i * 10,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 5
                  }
                }}
                style={{
                  top: `${20 + i * 15}%`,
                  filter: 'drop-shadow(0 0 10px rgba(255, 140, 60, 0.3))'
                }}
              >
                ☁️
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* 背景装饰元素 - 小王子风格 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* 装饰效果 - 只在入场后显示 */}
        {hasEntered && (
          <>
            {/* 落叶效果 */}
            {[...Array(sunsetMode ? 8 : 4)].map((_, i) => (
              <motion.div
                key={`leaf-${i}`}
                className="absolute text-2xl"
                style={{
                  left: `${i * 25 + 10}%`,
                  top: '-5%',
                }}
                animate={{
                  y: ['0vh', '110vh'],
                  x: [0, 30, -20, 40, 0],
                  rotate: [0, 180, 360, 540, 720],
                  opacity: [0, 0.7, 0.7, 0.7, 0]
                }}
                transition={{
                  duration: 15 + i * 2,
                  delay: i * 2.5,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              >
                🍂
              </motion.div>
            ))}

            {/* 玫瑰花瓣飘落 */}
            {[...Array(roseMode ? 50 : 5)].map((_, i) => (
              <motion.div
                key={`petal-${i}`}
                className="absolute"
                style={{
                  left: `${(i * 7 + 3) % 95}%`,
                  top: '-5%',
                }}
                animate={{
                  y: ['0vh', '110vh'],
                  x: [0, -25, 15, -30, 0],
                  rotate: [0, -120, -240, -360, -480],
                  opacity: [0, 0.8, 0.8, 0.8, 0],
                  scale: [0.8, 1, 0.9, 1, 0.8]
                }}
                transition={{
                  duration: 12 + (i % 10) * 1.5,
                  delay: i * 0.6,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                {/* 手绘花瓣形状 */}
                <div
                  className="relative"
                  style={{
                    width: '12px',
                    height: '16px',
                    background: 'linear-gradient(135deg, #E76F51 0%, #D95F4A 50%, #C54E3E 100%)',
                    borderRadius: '50% 50% 50% 0',
                    transform: 'rotate(-45deg)',
                    boxShadow: '0 2px 8px rgba(231, 111, 81, 0.4), inset -2px -2px 4px rgba(0,0,0,0.1)',
                    filter: 'drop-shadow(0 0 3px rgba(231, 111, 81, 0.5))'
                  }}
                >
                  {/* 花瓣纹理 */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '30%',
                      left: '20%',
                      width: '60%',
                      height: '1.5px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '50%',
                      transform: 'rotate(20deg)'
                    }}
                  />
                </div>
              </motion.div>
            ))}

            {/* 流星划过效果 - 温暖梦幻版 */}
            {[...Array(starMode ? 20 : 6)].map((_, i) => {
              // 为每颗流星生成随机参数
              const randomTop = Math.random() * 70 + 10; // 10-80%
              const randomDuration = Math.random() * 4 + 6; // 6-10秒
              const randomDelay = Math.random() * (starMode ? 15 : 20); // 随机延迟
              const randomYEnd = Math.random() * 30 + 20; // 20-50vh

              return (
                <motion.div
                  key={`meteor-${i}`}
                  className="absolute"
                  style={{
                    top: `${randomTop}%`,
                    left: '-10%',
                  }}
                  animate={{
                    x: ['0vw', '120vw'],
                    y: ['0vh', `${randomYEnd}vh`],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: randomDuration,
                    delay: randomDelay,
                    repeat: Infinity,
                    repeatDelay: starMode ? 8 : 18,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                >
                {/* 流星核心 - 小星星 */}
                <motion.div
                  className="relative"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    rotate: { duration: 1, repeat: Infinity, ease: "linear" },
                    scale: { duration: 0.5, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <span className="text-3xl" style={{
                    filter: 'drop-shadow(0 0 12px rgba(244, 162, 97, 1)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 30px rgba(244, 162, 97, 0.6))'
                  }}>
                    ⭐
                  </span>
                </motion.div>

                {/* 流星尾迹 - 多层渐变 */}
                <div className="absolute top-1/2 right-full -translate-y-1/2 flex items-center">
                  {/* 主尾迹 */}
                  <motion.div
                    className="h-1.5 rounded-full"
                    style={{
                      width: '120px',
                      background: 'linear-gradient(to left, rgba(244, 162, 97, 1), rgba(244, 162, 97, 0.6), transparent)',
                      boxShadow: '0 0 15px rgba(244, 162, 97, 0.8), 0 0 25px rgba(244, 162, 97, 0.5)'
                    }}
                    animate={{
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  {/* 次级尾迹 */}
                  <motion.div
                    className="absolute h-1 rounded-full"
                    style={{
                      width: '100px',
                      background: 'linear-gradient(to left, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.5), transparent)',
                      top: '-3px',
                      boxShadow: '0 0 10px rgba(255, 255, 255, 0.6)'
                    }}
                  />
                  <motion.div
                    className="absolute h-1 rounded-full"
                    style={{
                      width: '100px',
                      background: 'linear-gradient(to left, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.5), transparent)',
                      bottom: '-3px',
                      boxShadow: '0 0 10px rgba(255, 255, 255, 0.6)'
                    }}
                  />
                </div>

                {/* 星尘粒子 */}
                {[...Array(5)].map((_, j) => (
                  <motion.div
                    key={j}
                    className="absolute text-sm"
                    style={{
                      left: `-${20 + j * 15}px`,
                      top: `${-5 + j * 2}px`,
                      filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))'
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.2, 0.5]
                    }}
                    transition={{
                      duration: 0.6,
                      delay: j * 0.1,
                      repeat: Infinity,
                      repeatDelay: 1.4
                    }}
                  >
                    ✨
                  </motion.div>
                ))}
              </motion.div>
            );
            })}
            
            {/* 左上角 - 小星球 */}
            <motion.div
              className="absolute top-16 left-12 text-5xl opacity-25"
              animate={{
                rotate: [0, 360],
                y: [0, -8, 0, 8, 0]
              }}
              transition={{
                rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              🪐
            </motion.div>

            {/* 右上角 - 月亮 */}
            <motion.div
              className="absolute top-20 right-16 text-4xl opacity-20"
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, 10, 0, -10, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              🌙
            </motion.div>

            {/* 左侧中间 - 流星 */}
            <motion.div
              className="absolute top-1/3 left-8 text-3xl opacity-20"
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            >
              💫
            </motion.div>

            {/* 右侧中间 - 飘浮的心 */}
            <motion.div
              className="absolute top-1/2 right-1/4 text-3xl opacity-15"
              animate={{
                y: [0, -30, 0],
                scale: [1, 1.2, 1],
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              💛
            </motion.div>

            {/* 左下角 - 玫瑰花 */}
            <motion.div
              className="absolute bottom-24 left-20 text-4xl opacity-25"
              animate={{
                rotate: [0, 5, 0, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              🌹
            </motion.div>

            {/* 右下角 - 小狐狸 */}
            <motion.div
              className="absolute bottom-32 right-20 text-4xl opacity-20"
              animate={{
                x: [0, 10, 0, -10, 0],
                rotate: [0, 3, 0, -3, 0]
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              🦊
            </motion.div>

            {/* 顶部中间 - 闪烁星星群 */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`bg-star-${i}`}
                className="absolute text-2xl"
                style={{
                  top: `${15 + i * 8}%`,
                  left: `${45 + i * 5}%`,
                }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
              >
                ✨
              </motion.div>
            ))}
          </>
        )}
      </div>
    </>
  )
}
