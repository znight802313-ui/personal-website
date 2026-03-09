import { motion } from 'framer-motion'
import { useState } from 'react'
import { generatedAssets } from '../assets/generatedAssets'

export default function Portfolio() {
  const [hoveredWork, setHoveredWork] = useState(null)

  const works = [
    {
      id: 1,
      type: 'image',
      title: '狼毒花开',
      category: '摄影',
      description: '214 国道旁的狼毒花海',
      color: 'from-pink-200 to-pink-300',
      icon: '🌸',
      size: 'large',
      coverImage: generatedAssets.road214Scenery,
    },
    {
      id: 2,
      type: 'video',
      title: '平行时空的你',
      category: 'AI 短剧',
      description: '一个关于选择与命运的故事',
      color: 'from-purple-200 to-purple-300',
      icon: '🎬',
      size: 'medium',
      coverImage: generatedAssets.articleLifeCover,
    },
    {
      id: 3,
      type: 'music',
      title: '胡笳琴声',
      category: '音乐',
      description: '蔡文姬主题曲改编',
      color: 'from-blue-200 to-blue-300',
      icon: '🎵',
      size: 'small',
      coverImage: generatedAssets.vinylRecord,
    },
    {
      id: 4,
      type: 'product',
      title: '手作陶器系列',
      category: '产品网站',
      description: '手工陶器作品展示',
      color: 'from-amber-200 to-amber-300',
      icon: '🏺',
      size: 'medium',
      coverImage: generatedAssets.handmadePottery,
    },
    {
      id: 5,
      type: 'image',
      title: '黑颈鹤的舞蹈',
      category: '摄影',
      description: '纳帕海湿地的精灵',
      color: 'from-teal-200 to-teal-300',
      icon: '🦅',
      size: 'large',
      coverImage: generatedAssets.blackNeckedCrane,
    },
    {
      id: 6,
      type: 'video',
      title: '时光手账',
      category: 'AI 短剧',
      description: '用影像记录生活的温度',
      color: 'from-rose-200 to-rose-300',
      icon: '📹',
      size: 'medium',
      coverImage: generatedAssets.campingTent,
    },
    {
      id: 7,
      type: 'product',
      title: '漫游者工作室',
      category: '产品网站',
      description: '个人创意工作室官网',
      color: 'from-green-200 to-green-300',
      icon: '💻',
      size: 'small',
      coverImage: generatedAssets.articleTechCover,
    },
    {
      id: 8,
      type: 'image',
      title: '雪山之巅',
      category: '摄影',
      description: '梅里雪山日照金山',
      color: 'from-cyan-200 to-cyan-300',
      icon: '🏔️',
      size: 'large',
      coverImage: generatedAssets.snowMountain,
    },
  ]

  const getSizeClass = (size) => {
    switch (size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2'
      case 'medium':
        return 'md:col-span-2'
      case 'small':
      default:
        return 'md:col-span-1'
    }
  }

  const getFrameStyle = (type) => {
    switch (type) {
      case 'image':
        return 'rounded-lg shadow-xl' // 木质相框
      case 'video':
        return 'rounded-none shadow-2xl' // 场记板
      case 'music':
        return 'rounded-full shadow-lg' // 留声机
      case 'product':
        return 'rounded-2xl shadow-xl' // 电脑屏幕
      default:
        return 'rounded-lg shadow-lg'
    }
  }

  return (
    <div
      className="min-h-screen px-8 pt-32 pb-16 relative"
      style={{
        backgroundImage: `url(${generatedAssets.portfolioWall})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* 半透明遮罩 */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h1
          className="font-handwriting text-5xl text-center text-warmOrange mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          宇宙陈列室 🎨
        </motion.h1>

        <motion.p
          className="text-center text-earthBrown/70 font-rounded mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          策展人的画廊，每一件作品都是灵魂的投影
        </motion.p>

        {/* 瀑布流画廊墙 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[200px]">
          {works.map((work, i) => (
            <motion.div
              key={work.id}
              className={`relative ${getSizeClass(work.size)}`}
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              onHoverStart={() => setHoveredWork(work.id)}
              onHoverEnd={() => setHoveredWork(null)}
            >
              {/* 作品框架 */}
              <motion.div
                className={`relative w-full h-full bg-gradient-to-br ${work.color} ${getFrameStyle(work.type)} overflow-hidden cursor-pointer`}
                style={{ filter: 'url(#rough)' }}
                whileHover={{ scale: 1.05, rotate: 2, zIndex: 10 }}
              >
                {/* 手绘草稿覆盖层 */}
                <motion.div
                  className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center"
                  initial={{ opacity: 1 }}
                  animate={{
                    opacity: hoveredWork === work.id ? 0 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-6xl mb-4">{work.icon}</span>
                  <div className="text-center px-4">
                    <h3 className="font-handwriting text-xl text-earthBrown mb-1">
                      {work.title}
                    </h3>
                    <p className="text-sm text-earthBrown/60 font-rounded">
                      {work.category}
                    </p>
                  </div>

                  {/* 手绘草稿线条 */}
                  <svg
                    className="absolute inset-0 w-full h-full opacity-10"
                    style={{ filter: 'url(#pencil)' }}
                  >
                    <line x1="10%" y1="20%" x2="90%" y2="20%" stroke="currentColor" strokeWidth="1" />
                    <line x1="10%" y1="40%" x2="90%" y2="40%" stroke="currentColor" strokeWidth="1" />
                    <line x1="10%" y1="60%" x2="90%" y2="60%" stroke="currentColor" strokeWidth="1" />
                    <line x1="10%" y1="80%" x2="90%" y2="80%" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </motion.div>

                {/* 彩色真实作品封面 */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredWork === work.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {work.coverImage && (
                    <img
                      src={work.coverImage}
                      alt={work.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center justify-end p-6">
                    <h3 className="font-handwriting text-2xl text-white text-center mb-2 drop-shadow-lg">
                      {work.title}
                    </h3>
                    <p className="text-sm text-white/90 font-rounded text-center drop-shadow mb-4">
                      {work.description}
                    </p>

                    {/* 查看详情按钮 */}
                    <motion.button
                      className="px-6 py-2 bg-white/90 rounded-full font-handwriting text-earthBrown"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      查看详情 →
                    </motion.button>
                  </div>
                </motion.div>

                {/* 特殊框架装饰 */}
                {work.type === 'video' && (
                  <div className="absolute top-0 left-0 right-0 h-8 bg-black/80 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-white text-xs font-handwriting ml-2">
                      {work.title}
                    </span>
                  </div>
                )}

                {work.type === 'music' && (
                  <motion.div
                    className="absolute inset-0 border-8 border-white/30 rounded-full"
                    animate={{ rotate: hoveredWork === work.id ? 360 : 0 }}
                    transition={{ duration: 2, ease: 'linear' }}
                  />
                )}

                {work.type === 'product' && (
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/50 to-transparent" />
                )}
              </motion.div>

              {/* 画框阴影 */}
              <div
                className="absolute inset-0 bg-black/10 rounded-lg -z-10"
                style={{
                  transform: 'translate(6px, 6px)',
                  filter: 'blur(8px)',
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* 底部装饰 */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p className="font-handwriting text-2xl text-earthBrown/60 mb-4">
            更多作品持续更新中...
          </p>
          <div className="flex justify-center gap-4">
            <span className="text-3xl">🎨</span>
            <span className="text-3xl">📸</span>
            <span className="text-3xl">🎬</span>
            <span className="text-3xl">🎵</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
