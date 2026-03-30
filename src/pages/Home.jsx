import { motion, useMotionValue, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { generatedAssets } from '../assets/generatedAssets'
import profilePhoto from '../assets/images/小王子风格照片.jpg'

// 导入音效文件
import gameSound from '../assets/sounds/game.mp3'
import roadSound from '../assets/sounds/road.mp3'
import photoSound from '../assets/sounds/photo.mp3'
import spicySound from '../assets/sounds/spicy.mp3'

// 视频使用动态 URL（避免 Vite 构建时处理 12MB 文件）
const profileVideo = new URL('../assets/videos/profile.mp4', import.meta.url).href

// 导入拆分的组件
import BackgroundEffects from '../components/Home/BackgroundEffects'
import InteractiveTags from '../components/Home/InteractiveTags'
import PolaroidFrame from '../components/Home/PolaroidFrame'

export default function Home({ volume, setVolume }) {
  const [imageHovered, setImageHovered] = useState(false)
  const [tagHovered, setTagHovered] = useState(null)
  const [storyRevealed, setStoryRevealed] = useState(true)
  const [displayedText, setDisplayedText] = useState('')
  const [typingDone, setTypingDone] = useState(false)
  const [roseHovered, setRoseHovered] = useState(false)
  const [sunsetHovered, setSunsetHovered] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  // 页面特效状态
  const [roseMode, setRoseMode] = useState(false)
  const [sunsetMode, setSunsetMode] = useState(false)
  const [starMode, setStarMode] = useState(false)

  const videoRef = useRef(null)

  // 创建音频对象引用
  const audioRefs = useRef({})

  // 音频源映射
  const audioSources = useRef({
    game: gameSound,
    road: roadSound,
    photo: photoSound,
    spicy: spicySound
  })

  // 更新已加载音频的音量
  useEffect(() => {
    Object.values(audioRefs.current).forEach(audio => {
      if (audio) audio.volume = volume
    })
    if (videoRef.current) {
      videoRef.current.volume = volume
    }
  }, [volume])

  // 音频上下文解锁状态
  const audioUnlocked = useRef(false)

  // 用户首次点击页面时解锁音频上下文
  useEffect(() => {
    const unlock = () => {
      if (audioUnlocked.current) return
      audioUnlocked.current = true
      // 创建一个静默的 AudioContext 来解锁浏览器音频策略
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      ctx.resume().then(() => ctx.close())
      document.removeEventListener('click', unlock)
      document.removeEventListener('touchstart', unlock)
      document.removeEventListener('keydown', unlock)
    }
    document.addEventListener('click', unlock)
    document.addEventListener('touchstart', unlock)
    document.addEventListener('keydown', unlock)
    return () => {
      document.removeEventListener('click', unlock)
      document.removeEventListener('touchstart', unlock)
      document.removeEventListener('keydown', unlock)
    }
  }, [])

  // 音效播放函数（懒加载：首次播放时才创建 Audio 对象）
  const playSound = (type) => {
    if (!audioUnlocked.current) return
    try {
      if (!audioRefs.current[type]) {
        const src = audioSources.current[type]
        if (!src) return
        audioRefs.current[type] = new Audio(src)
        audioRefs.current[type].volume = volume
      }
      const audio = audioRefs.current[type]
      audio.currentTime = 0
      audio.play().catch(() => {})
    } catch (_) {}
  }

  // 鼠标位置追踪
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // 聚光灯颜色（根据日落悬停状态变化）
  const [spotlightColor, setSpotlightColor] = useState('rgba(244, 162, 97, 0.3)')

  // 打字机效果
  const fullStory = '破碎之处，亦有星光 ✨'

  const [storyHovered, setStoryHovered] = useState(false)

  useEffect(() => {
    if (storyRevealed) {
      setTypingDone(false)
      let index = 0
      const timer = setInterval(() => {
        if (index <= fullStory.length) {
          setDisplayedText(fullStory.slice(0, index))
          index++
        } else {
          clearInterval(timer)
          setTypingDone(true)
        }
      }, 80)
      return () => clearInterval(timer)
    } else {
      setDisplayedText('')
      setTypingDone(false)
    }
  }, [storyRevealed])

  // 鼠标移动处理
  const handleMouseMove = (e) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-8 pt-32 pb-16 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* 固定背景层 - 独立图层避免滚动重绘 */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url(${generatedAssets.homeBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform',
        }}
      />
      <BackgroundEffects
        sunsetMode={sunsetMode}
        roseMode={roseMode}
        starMode={starMode}
      />

      {/* 动态遮罩，用于文字 Spotlight 聚焦效果 */}
      <AnimatePresence>
        {storyHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              background: `radial-gradient(circle 250px at ${mouseX.get()}px ${mouseY.get()}px, transparent 0%, rgba(15, 23, 42, 0.6) 100%)`
            }}
          />
        )}
      </AnimatePresence>

      {/* 主内容区域 */}
      <motion.div
        className="max-w-6xl w-full relative z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* 左侧：介绍文字 - 微缩宇宙版 */}
          <motion.div
            className="relative"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {/* 玻璃拟态背景 */}
            <div
              className="absolute inset-0 rounded-3xl noise-overlay overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
              }}
            >
              {/* 光晕层 - 用 opacity 动画替代 boxShadow 动画 */}
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  boxShadow: '0 12px 48px rgba(244, 162, 97, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* 全局聚光灯 - 混合效果 */}
            <motion.div
              className="absolute pointer-events-none z-0"
              style={{
                left: mouseX,
                top: mouseY,
                x: '-50%',
                y: '-50%',
                width: '400px',
                height: '400px',
                background: `radial-gradient(circle, ${spotlightColor} 0%, transparent 70%)`,
                filter: 'blur(50px)',
                transition: 'background 0.5s ease'
              }}
            />

            {/* 星星粒子 */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none text-xl z-0"
                style={{
                  left: mouseX,
                  top: mouseY,
                  filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 1)) drop-shadow(0 0 15px rgba(244, 162, 97, 0.8))'
                }}
                animate={{
                  x: Math.cos((i / 10) * Math.PI * 2) * 100,
                  y: Math.sin((i / 10) * Math.PI * 2) * 100,
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeOut'
                }}
              >
                ✨
              </motion.div>
            ))}

            {/* 内容区域 - 无框设计 */}
            <div className="relative z-10 p-8">
              {/* 标题 - 艺术创意版 */}
              <motion.div
                className="mb-6 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex flex-wrap items-baseline gap-2">
                  <motion.span
                    className="font-handwriting text-4xl text-warmOrange"
                    animate={{ rotate: [-2, 2, -2] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    欢迎
                  </motion.span>

                  <motion.span
                    className="font-handwriting text-3xl text-earthBrown/70"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  >
                    来到
                  </motion.span>

                  <motion.span
                    className="font-handwriting text-5xl text-sageGreen"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  >
                    我的
                  </motion.span>
                </div>

                <div className="flex items-center gap-3 mt-2">
                  <motion.span
                    className="font-handwriting text-6xl md:text-7xl text-warmOrange font-bold relative"
                    animate={{
                      rotate: [0, 1, 0, -1, 0],
                      textShadow: [
                        '2px 2px 0px rgba(139, 115, 85, 0.2)',
                        '3px 3px 0px rgba(139, 115, 85, 0.3)',
                        '2px 2px 0px rgba(139, 115, 85, 0.2)'
                      ]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    Z
                    <motion.span
                      className="text-sageGreen"
                      animate={{ color: ['#8B9D83', '#F4A261', '#8B9D83'] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      117
                    </motion.span>
                  </motion.span>

                  <motion.span
                    className="font-handwriting text-5xl md:text-6xl text-sageGreen relative"
                    style={{
                      background: 'linear-gradient(135deg, #8B9D83 0%, #F4A261 50%, #E76F51 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                    animate={{
                      rotate: [-1, 1, -1],
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{
                      rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                      backgroundPosition: { duration: 6, repeat: Infinity, ease: "linear" }
                    }}
                  >
                    星球
                  </motion.span>

                  <motion.span
                    className="text-4xl ml-10"
                    animate={{
                      opacity: [1, 0.3, 1],
                      scale: [1, 1.3, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    ✨
                  </motion.span>
                </div>
              </motion.div>

              {/* 悬浮标签 - 失重感 */}
              <div className="flex items-center gap-3 mb-6 flex-wrap relative">
                <span className="text-base text-earthBrown/80">一个爱做梦的</span>

                <motion.span
                  className="px-4 py-2 bg-white/60 backdrop-blur-md rounded-2xl font-handwriting text-xl text-warmOrange border border-white/60 shadow-xl cursor-pointer relative"
                  style={{
                    boxShadow: '0 4px 20px rgba(244, 162, 97, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                  }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{
                    scale: 1.15,
                    x: 8,
                    transition: { duration: 0.2 }
                  }}
                >
                  {/* 光晕层 */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{ boxShadow: '0 8px 30px rgba(244, 162, 97, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.6)' }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  INFP
                </motion.span>

                <motion.span
                  className="px-4 py-2 bg-white/60 backdrop-blur-md rounded-2xl text-base text-earthBrown/90 border border-white/60 shadow-xl cursor-pointer ml-4 relative"
                  style={{
                    boxShadow: '0 4px 20px rgba(139, 157, 131, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                  }}
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  whileHover={{
                    scale: 1.15,
                    x: -8,
                    transition: { duration: 0.2 }
                  }}
                >
                  {/* 光晕层 */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{ boxShadow: '0 8px 30px rgba(139, 157, 131, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.6)' }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  />
                  双鱼座 🐟
                </motion.span>
              </div>

              {/* 驯养之旅 */}
              <div className="mb-6 relative">
                <div className="flex items-center gap-2 text-base text-earthBrown/80 flex-wrap">
                  <span className="opacity-70">这里藏着我驯养的</span>

                  {/* 玫瑰 */}
                  <motion.span
                    className="inline-flex items-center gap-1 px-3 py-1 bg-warmOrange/10 rounded-full text-sm cursor-pointer relative"
                    whileHover={{ scale: 1.05 }}
                    onHoverStart={() => setRoseHovered(true)}
                    onHoverEnd={() => setRoseHovered(false)}
                    onClick={() => setRoseMode(!roseMode)}
                    animate={roseMode ? {
                      boxShadow: [
                        '0 0 0px rgba(231, 111, 81, 0)',
                        '0 0 20px rgba(231, 111, 81, 0.8)',
                        '0 0 0px rgba(231, 111, 81, 0)'
                      ]
                    } : {}}
                    transition={{
                      duration: 1.5,
                      repeat: roseMode ? Infinity : 0,
                      ease: 'easeInOut'
                    }}
                  >
                    🌹 <span className="font-semibold text-warmOrange">玫瑰</span>
                    {roseHovered && (
                      <>
                        {/* 内层强光晕 */}
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          initial={{ scale: 1, opacity: 0 }}
                          animate={{
                            scale: [1, 1.8, 1],
                            opacity: [0.6, 0.9, 0.6]
                          }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }}
                          style={{
                            background: 'radial-gradient(circle, rgba(231, 111, 81, 0.7) 0%, rgba(231, 111, 81, 0.3) 50%, transparent 70%)',
                            filter: 'blur(8px)'
                          }}
                        />
                        {/* 外层扩散光晕 */}
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          initial={{ scale: 1, opacity: 0 }}
                          animate={{
                            scale: [1, 2.5, 1],
                            opacity: [0.4, 0.7, 0.4]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: 0.3
                          }}
                          style={{
                            background: 'radial-gradient(circle, rgba(231, 111, 81, 0.5) 0%, transparent 70%)',
                            filter: 'blur(15px)'
                          }}
                        />
                      </>
                    )}
                  </motion.span>

                  {/* 日落 */}
                  <motion.span
                    className="inline-flex items-center gap-1 px-3 py-1 bg-sageGreen/10 rounded-full text-sm cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    onHoverStart={() => {
                      setSunsetHovered(true)
                      setSpotlightColor('rgba(244, 162, 97, 0.8)')
                    }}
                    onHoverEnd={() => {
                      setSunsetHovered(false)
                      setSpotlightColor('rgba(244, 162, 97, 0.3)')
                    }}
                    onClick={() => setSunsetMode(!sunsetMode)}
                    animate={sunsetMode ? {
                      boxShadow: [
                        '0 0 0px rgba(244, 162, 97, 0)',
                        '0 0 20px rgba(244, 162, 97, 0.8)',
                        '0 0 0px rgba(244, 162, 97, 0)'
                      ]
                    } : {}}
                    transition={{
                      duration: 1.5,
                      repeat: sunsetMode ? Infinity : 0,
                      ease: 'easeInOut'
                    }}
                  >
                    🌅 <span className="font-semibold text-sageGreen">日落</span>
                  </motion.span>

                  {/* 星星 */}
                  <motion.span
                    className="inline-flex items-center gap-1 px-3 py-1 bg-warmOrange/10 rounded-full text-sm cursor-pointer relative"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setStarMode(!starMode)}
                    animate={starMode ? {
                      boxShadow: [
                        '0 0 0px rgba(244, 162, 97, 0)',
                        '0 0 20px rgba(244, 162, 97, 0.6)',
                        '0 0 0px rgba(244, 162, 97, 0)'
                      ]
                    } : {}}
                    transition={{
                      duration: 1.5,
                      repeat: starMode ? Infinity : 0,
                      ease: 'easeInOut'
                    }}
                  >
                    ⭐ <span className="font-semibold text-warmOrange">星星</span>
                  </motion.span>
                </div>

                {/* 打字机效果展现故事 */}
                <AnimatePresence>
                  {storyRevealed && (
                    <motion.div
                      className="mt-4 text-sm text-earthBrown/70 relative z-30 p-4 rounded-xl transition-all duration-300 cursor-pointer"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        backgroundColor: storyHovered ? 'rgba(255,255,255,0.7)' : 'transparent',
                        backdropFilter: storyHovered ? 'blur(10px)' : 'none',
                        boxShadow: storyHovered ? '0 8px 32px rgba(244, 162, 97, 0.2)' : 'none',
                        scale: storyHovered ? 1.02 : 1
                      }}
                      exit={{ opacity: 0, y: -10 }}
                      onMouseEnter={() => setStoryHovered(true)}
                      onMouseLeave={() => setStoryHovered(false)}
                    >
                      <span className="font-bold text-base text-warmOrange">"黎碎亦有星"</span>
                      {' '}—— {displayedText}
                      {!typingDone && (
                        <motion.span
                          className="inline-block w-1 h-4 bg-warmOrange ml-1"
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 分隔线 */}
              <div className="h-px bg-gradient-to-r from-transparent via-earthBrown/15 to-transparent my-6" />

              {/* 拆分出的互动标签组件 */}
              <InteractiveTags
                tagHovered={tagHovered}
                setTagHovered={setTagHovered}
                playSound={playSound}
              />
            </div>
          </motion.div>

          {/* 拆分出的拍立得相框组件 */}
          <PolaroidFrame
            imageHovered={imageHovered}
            setImageHovered={setImageHovered}
            showVideo={showVideo}
            setShowVideo={setShowVideo}
            videoRef={videoRef}
            profilePhoto={profilePhoto}
            profileVideo={profileVideo}
          />

        </motion.div>

        {/* 底部装饰性手绘线条 */}
        <motion.div
          className="mt-16 h-1 bg-gradient-to-r from-transparent via-warmOrange to-transparent"
          style={{ filter: 'url(#pencil)' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        />
      </motion.div>

    </div>
  )
}
