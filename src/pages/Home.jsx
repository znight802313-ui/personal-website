import { motion, useMotionValue, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef, useMemo } from 'react'
import { generatedAssets } from '../assets/generatedAssets'
import profilePhoto from '../assets/images/小王子风格照片.png'

// 导入音效文件
import gameSound from '../assets/sounds/game.wav'
import roadSound from '../assets/sounds/road.mp3'
import photoSound from '../assets/sounds/photo.mp3'
import spicySound from '../assets/sounds/spicy.wav'

// 导入视频文件
import profileVideo from '../assets/videos/profile.mp4'

// 导入拆分的组件
import { ScatteredElement } from '../components/Home/AnimElements'
import BackgroundEffects from '../components/Home/BackgroundEffects'
import InteractiveTags from '../components/Home/InteractiveTags'
import PolaroidFrame from '../components/Home/PolaroidFrame'
import AudioController from '../components/Home/AudioController'

export default function Home({ hasEnteredFromParent = false, onEnter }) {
  // 入场动画状态 - 使用父组件传入的状态
  const [hasEntered, setHasEntered] = useState(hasEnteredFromParent)
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 })

  // 当父组件状态变化时同步
  useEffect(() => {
    setHasEntered(hasEnteredFromParent)
  }, [hasEnteredFromParent])

  const [imageHovered, setImageHovered] = useState(false)
  const [tagHovered, setTagHovered] = useState(null)
  const [storyRevealed, setStoryRevealed] = useState(true)
  const [displayedText, setDisplayedText] = useState('')
  const [roseHovered, setRoseHovered] = useState(false)
  const [sunsetHovered, setSunsetHovered] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [previousVolume, setPreviousVolume] = useState(0.5)
  const [showVolumeControl, setShowVolumeControl] = useState(false)

  // 页面特效状态
  const [roseMode, setRoseMode] = useState(false)
  const [sunsetMode, setSunsetMode] = useState(false)
  const [starMode, setStarMode] = useState(false)

  const videoRef = useRef(null)
  const hideTimeoutRef = useRef(null)

  // 创建音频对象引用
  const audioRefs = useRef({
    game: null,
    road: null,
    photo: null,
    spicy: null
  })

  // 生成随机初始位置（只计算一次）
  const randomPositions = useMemo(() => ({
    // 左侧文本框
    textBox: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, rotate: Math.random() * 60 - 30 },

    // 标题文字
    welcome1: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, rotate: Math.random() * 60 - 30 },
    welcome2: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, rotate: Math.random() * 60 - 30 },
    welcome3: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, rotate: Math.random() * 60 - 30 },
    title1: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, rotate: Math.random() * 60 - 30 },
    title2: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, rotate: Math.random() * 60 - 30 },
    titleStar: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, rotate: Math.random() * 360 },

    // 标签
    infp: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, rotate: Math.random() * 60 - 30 },
    pisces: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, rotate: Math.random() * 60 - 30 },

    // 驯养之旅
    rose: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, rotate: Math.random() * 60 - 30 },
    sunset: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, rotate: Math.random() * 60 - 30 },
    star: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, rotate: Math.random() * 60 - 30 },

    // 个性标签
    tag1: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, rotate: Math.random() * 60 - 30 },
    tag2: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, rotate: Math.random() * 60 - 30 },
    tag3: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, rotate: Math.random() * 60 - 30 },
    tag4: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, rotate: Math.random() * 60 - 30 },

    // 照片
    photo: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, rotate: Math.random() * 60 - 30 },
  }), [])

  // 页面点击处理
  const handlePageClick = (e) => {
    if (!hasEntered) {
      setClickPosition({ x: e.clientX, y: e.clientY })
      setHasEntered(true)

      // 通知父组件
      if (onEnter) {
        onEnter()
      }

      // 播放音效
      if (audioRefs.current.game) {
        audioRefs.current.game.currentTime = 0
        audioRefs.current.game.play()
      }
    }
  }

  // 初始化音频对象
  useEffect(() => {
    audioRefs.current.game = new Audio(gameSound)
    audioRefs.current.road = new Audio(roadSound)
    audioRefs.current.photo = new Audio(photoSound)
    audioRefs.current.spicy = new Audio(spicySound)

    // 设置音量
    Object.values(audioRefs.current).forEach(audio => {
      if (audio) audio.volume = volume
    })
  }, [])

  // 更新所有音频和视频的音量
  useEffect(() => {
    Object.values(audioRefs.current).forEach(audio => {
      if (audio) audio.volume = volume
    })
    if (videoRef.current) {
      videoRef.current.volume = volume
    }
  }, [volume])

  // 处理音量控制面板的显示/隐藏
  const handleVolumeControlEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
      hideTimeoutRef.current = null
    }
    setShowVolumeControl(true)
  }

  const handleVolumeControlLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setShowVolumeControl(false)
    }, 1000)
  }

  // 切换静音
  const toggleMute = () => {
    if (volume > 0) {
      setPreviousVolume(volume)
      setVolume(0)
    } else {
      setVolume(previousVolume > 0 ? previousVolume : 0.5)
    }
  }

  // 音效播放函数
  const playSound = (type) => {
    try {
      const audio = audioRefs.current[type]
      if (audio) {
        // 重置播放位置
        audio.currentTime = 0
        audio.play().catch(error => {
          console.log('音效播放失败:', error)
        })
      }
    } catch (error) {
      console.log('音效播放失败:', error)
    }
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
      let index = 0
      const timer = setInterval(() => {
        if (index <= fullStory.length) {
          setDisplayedText(fullStory.slice(0, index))
          index++
        } else {
          clearInterval(timer)
        }
      }, 80)
      return () => clearInterval(timer)
    } else {
      setDisplayedText('')
    }
  }, [storyRevealed])

  // 鼠标移动处理
  const handleMouseMove = (e) => {
    // Global mouse tracking
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-8 pt-32 pb-16 relative overflow-hidden"
      style={{
        backgroundImage: `url(${generatedAssets.homeBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        cursor: !hasEntered ? 'pointer' : 'default'
      }}
      onClick={handlePageClick}
      onMouseMove={handleMouseMove}
    >
      <BackgroundEffects 
        hasEntered={hasEntered} 
        sunsetMode={sunsetMode} 
        roseMode={roseMode} 
        starMode={starMode}
      />

      {/* 点击波纹效果 */}
      <AnimatePresence>
        {hasEntered && (
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              left: clickPosition.x,
              top: clickPosition.y,
              width: '20px',
              height: '20px',
              x: '-50%',
              y: '-50%',
              border: '2px solid rgba(244, 162, 97, 0.8)',
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 50, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

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
          <ScatteredElement randomPos={randomPositions.textBox} delay={0.05} hasEntered={hasEntered}>
            <motion.div
              className="relative"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
            {/* 玻璃拟态背景 */}
            <motion.div
              className="absolute inset-0 rounded-3xl noise-overlay overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
              }}
              animate={{
                boxShadow: [
                  '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                  '0 12px 48px rgba(244, 162, 97, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                  '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

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
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none text-xl z-0"
                style={{
                  left: mouseX,
                  top: mouseY,
                  filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 1)) drop-shadow(0 0 15px rgba(244, 162, 97, 0.8))'
                }}
                animate={{
                  x: Math.cos((i / 20) * Math.PI * 2) * 100,
                  y: Math.sin((i / 20) * Math.PI * 2) * 100,
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
                  <ScatteredElement randomPos={randomPositions.welcome1} delay={0.1} hasEntered={hasEntered}>
                    <motion.span
                      className="font-handwriting text-4xl text-warmOrange"
                      animate={hasEntered ? { rotate: [-2, 2, -2] } : {}}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      欢迎
                    </motion.span>
                  </ScatteredElement>

                  <ScatteredElement randomPos={randomPositions.welcome2} delay={0.15} hasEntered={hasEntered}>
                    <motion.span
                      className="font-handwriting text-3xl text-earthBrown/70"
                      animate={hasEntered ? { y: [0, -5, 0] } : {}}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                    >
                      来到
                    </motion.span>
                  </ScatteredElement>

                  <ScatteredElement randomPos={randomPositions.welcome3} delay={0.2} hasEntered={hasEntered}>
                    <motion.span
                      className="font-handwriting text-5xl text-sageGreen"
                      animate={hasEntered ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                    >
                      我的
                    </motion.span>
                  </ScatteredElement>
                </div>

                <div className="flex items-center gap-3 mt-2">
                  <ScatteredElement randomPos={randomPositions.title1} delay={0.25} hasEntered={hasEntered}>
                    <motion.span
                      className="font-handwriting text-6xl md:text-7xl text-warmOrange font-bold relative"
                      animate={hasEntered ? {
                        rotate: [0, 1, 0, -1, 0],
                        textShadow: [
                          '2px 2px 0px rgba(139, 115, 85, 0.2)',
                          '3px 3px 0px rgba(139, 115, 85, 0.3)',
                          '2px 2px 0px rgba(139, 115, 85, 0.2)'
                        ]
                      } : {}}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      Z
                      <motion.span
                        className="text-sageGreen"
                        animate={hasEntered ? { color: ['#8B9D83', '#F4A261', '#8B9D83'] } : {}}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        117
                      </motion.span>
                    </motion.span>
                  </ScatteredElement>

                  <ScatteredElement randomPos={randomPositions.title2} delay={0.3} hasEntered={hasEntered}>
                    <motion.span
                      className="font-handwriting text-5xl md:text-6xl text-sageGreen relative"
                      style={{
                        background: 'linear-gradient(135deg, #8B9D83 0%, #F4A261 50%, #E76F51 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                      animate={hasEntered ? {
                        rotate: [-1, 1, -1],
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                      } : {}}
                      transition={{
                        rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                        backgroundPosition: { duration: 6, repeat: Infinity, ease: "linear" }
                      }}
                    >
                      星球
                    </motion.span>
                  </ScatteredElement>

                  <ScatteredElement randomPos={randomPositions.titleStar} delay={0.35} hasEntered={hasEntered}>
                    <motion.span
                      className="text-4xl ml-10"
                      animate={hasEntered ? {
                        opacity: [1, 0.3, 1],
                        scale: [1, 1.3, 1]
                      } : {}}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      ✨
                    </motion.span>
                  </ScatteredElement>
                </div>
              </motion.div>

              {/* 悬浮标签 - 失重感 */}
              <div className="flex items-center gap-3 mb-6 flex-wrap relative">
                <span className="text-base text-earthBrown/80">一个爱做梦的</span>

                <ScatteredElement randomPos={randomPositions.infp} delay={0.4} hasEntered={hasEntered}>
                  <motion.span
                    className="px-4 py-2 bg-white/60 backdrop-blur-md rounded-2xl font-handwriting text-xl text-warmOrange border border-white/60 shadow-xl cursor-pointer"
                    style={{
                      boxShadow: '0 4px 20px rgba(244, 162, 97, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                    }}
                    animate={hasEntered ? {
                      y: [0, -10, 0],
                      boxShadow: [
                        '0 4px 20px rgba(244, 162, 97, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                        '0 8px 30px rgba(244, 162, 97, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                        '0 4px 20px rgba(244, 162, 97, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                      ]
                    } : {}}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    whileHover={{
                      scale: 1.15,
                      x: 8,
                      boxShadow: '0 12px 40px rgba(244, 162, 97, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.7)',
                      transition: { duration: 0.2 }
                    }}
                  >
                    INFP
                  </motion.span>
                </ScatteredElement>

                <ScatteredElement randomPos={randomPositions.pisces} delay={0.45} hasEntered={hasEntered}>
                  <motion.span
                    className="px-4 py-2 bg-white/60 backdrop-blur-md rounded-2xl text-base text-earthBrown/90 border border-white/60 shadow-xl cursor-pointer ml-4"
                    style={{
                      boxShadow: '0 4px 20px rgba(139, 157, 131, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                    }}
                    animate={hasEntered ? {
                      y: [0, -12, 0],
                      boxShadow: [
                        '0 4px 20px rgba(139, 157, 131, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                        '0 8px 30px rgba(139, 157, 131, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                        '0 4px 20px rgba(139, 157, 131, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                      ]
                    } : {}}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.5
                    }}
                    whileHover={{
                      scale: 1.15,
                      x: -8,
                      boxShadow: '0 12px 40px rgba(139, 157, 131, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.7)',
                      transition: { duration: 0.2 }
                    }}
                  >
                    双鱼座 🐟
                  </motion.span>
                </ScatteredElement>
              </div>

              {/* 驯养之旅 */}
              <div className="mb-6 relative">
                <div className="flex items-center gap-2 text-base text-earthBrown/80 flex-wrap">
                  <span className="opacity-70">这里藏着我驯养的</span>

                  {/* 玫瑰 */}
                  <ScatteredElement randomPos={randomPositions.rose} delay={0.5} hasEntered={hasEntered}>
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
                  </ScatteredElement>

                  {/* 日落 */}
                  <ScatteredElement randomPos={randomPositions.sunset} delay={0.55} hasEntered={hasEntered}>
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
                  </ScatteredElement>

                  {/* 星星 */}
                  <ScatteredElement randomPos={randomPositions.star} delay={0.6} hasEntered={hasEntered}>
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
                  </ScatteredElement>
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
                      <motion.span
                        className="inline-block w-1 h-4 bg-warmOrange ml-1"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 分隔线 */}
              <div className="h-px bg-gradient-to-r from-transparent via-earthBrown/15 to-transparent my-6" />

              {/* 拆分出的互动标签组件 */}
              <InteractiveTags 
                hasEntered={hasEntered}
                randomPositions={randomPositions}
                ScatteredElement={ScatteredElement}
                tagHovered={tagHovered}
                setTagHovered={setTagHovered}
                playSound={playSound}
              />
            </div>
          </motion.div>
          </ScatteredElement>

          {/* 拆分出的拍立得相框组件 */}
          <PolaroidFrame 
            hasEntered={hasEntered}
            randomPos={randomPositions.photo}
            ScatteredElement={ScatteredElement}
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

      {/* 拆分出的音量控制器组件 */}
      <AudioController 
        volume={volume}
        setVolume={setVolume}
        showVolumeControl={showVolumeControl}
        handleVolumeControlEnter={handleVolumeControlEnter}
        handleVolumeControlLeave={handleVolumeControlLeave}
        toggleMute={toggleMute}
      />
    </div>
  )
}
