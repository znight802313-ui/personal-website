import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useState, useRef } from 'react'
import { generatedAssets } from '../assets/generatedAssets'
import articlesBg from '../assets/images/漫游手记背景图.jpg'

const categoryColors = {
  '生活碎片': { bg: 'rgba(244,162,97,0.12)', text: '#F4A261', border: 'rgba(244,162,97,0.25)', glow: 'rgba(244,162,97,0.08)' },
  '技术思考': { bg: 'rgba(156,175,136,0.12)', text: '#7A9A6B', border: 'rgba(156,175,136,0.25)', glow: 'rgba(156,175,136,0.08)' },
  '短剧灵感': { bg: 'rgba(180,130,200,0.12)', text: '#A07AB8', border: 'rgba(180,130,200,0.25)', glow: 'rgba(180,130,200,0.08)' },
}

// 3D 倾斜卡片组件
function TiltCard({ children, className, style, catStyle, ...motionProps }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 300, damping: 30 })
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 })
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.article
      ref={ref}
      className={className}
      style={{
        ...style,
        rotateX,
        rotateY,
        transformPerspective: 800,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...motionProps}
    >
      {children}
      {/* 动态光泽层 — 跟随鼠标 */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [glareX, glareY],
            ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, ${catStyle.glow} 0%, transparent 60%)`
          ),
        }}
      />
    </motion.article>
  )
}

export default function Articles() {
  const [hoveredId, setHoveredId] = useState(null)

  const articles = [
    {
      id: 1,
      title: '在 214 国道上遇见的那些生命',
      category: '生活碎片',
      date: '2024.03.15',
      excerpt: '狼毒花开满山坡，黑颈鹤在湖边起舞，那一刻我明白了什么叫做生命的力量...',
      coverImage: generatedAssets.road214Scenery,
    },
    {
      id: 2,
      title: 'React 中的状态管理哲学',
      category: '技术思考',
      date: '2024.02.28',
      excerpt: '从 Redux 到 Zustand，从 Context 到 Jotai，我们真的需要这么多状态管理工具吗？',
      coverImage: generatedAssets.articleTechCover,
    },
    {
      id: 3,
      title: '短剧《平行时空的你》创作手记',
      category: '短剧灵感',
      date: '2024.01.20',
      excerpt: '如果在另一个时空，我们会做出不同的选择吗？这个问题困扰了我很久...',
      coverImage: generatedAssets.articleLifeCover,
    },
    {
      id: 4,
      title: '手作的温度：一件陶器的诞生',
      category: '生活碎片',
      date: '2023.12.10',
      excerpt: '从泥土到陶器，每一次触碰都是与自然的对话，每一个纹理都是时间的印记...',
      coverImage: generatedAssets.handmadePottery,
    },
    {
      id: 5,
      title: 'AI 视听创作的未来想象',
      category: '技术思考',
      date: '2023.11.05',
      excerpt: '当 AI 可以生成图像、视频、音乐，创作者的价值在哪里？我们又该如何定义艺术？',
      coverImage: generatedAssets.articleTechCover,
    },
    {
      id: 6,
      title: '蔡文姬的琴声与我的游戏人生',
      category: '生活碎片',
      date: '2023.10.18',
      excerpt: '在王者峡谷里，我找到了属于自己的节奏，胡笳琴的每一个音符都是治愈...',
      coverImage: generatedAssets.vinylRecord,
    },
  ]

  return (
    <div className="min-h-screen px-6 md:px-8 pt-32 pb-16 relative">
      {/* 固定背景层 */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url(${articlesBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform',
        }}
      />
      <div className="fixed inset-0 -z-10" style={{ backgroundColor: 'rgba(255, 248, 240, 0.75)' }} />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* 杂志风格双列布局 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {articles.map((article, i) => {
            const catStyle = categoryColors[article.category] || categoryColors['生活碎片']
            const isHovered = hoveredId === article.id
            return (
              <TiltCard
                key={article.id}
                catStyle={catStyle}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.18) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.55)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.6)',
                  marginTop: i % 2 === 1 ? '2.5rem' : '0',
                }}
                initial={{ opacity: 0, y: 60, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  delay: (i % 2) * 0.15,
                  type: 'spring',
                  stiffness: 220,
                  damping: 22,
                }}
                whileHover={{
                  y: -10,
                  boxShadow: `0 24px 64px rgba(0,0,0,0.12), 0 0 40px ${catStyle.glow}, inset 0 1px 0 rgba(255,255,255,0.6)`,
                  transition: { type: 'spring', stiffness: 300, damping: 22 },
                }}
                onHoverStart={() => setHoveredId(article.id)}
                onHoverEnd={() => setHoveredId(null)}
              >
                {/* 封面图 */}
                {article.coverImage && (
                  <div className="overflow-hidden h-48 md:h-56 relative">
                    <motion.img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      animate={{
                        scale: isHovered ? 1.08 : 1,
                        filter: isHovered ? 'brightness(1.05) saturate(1.1)' : 'brightness(1) saturate(1)',
                      }}
                      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                    {/* 底部渐变融合 */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-24"
                      style={{
                        background: 'linear-gradient(to top, rgba(255,255,255,0.5), transparent)',
                      }}
                    />
                    {/* 分类胶囊 */}
                    <motion.span
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-rounded font-medium"
                      style={{
                        background: catStyle.bg,
                        color: catStyle.text,
                        border: `1px solid ${catStyle.border}`,
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                      }}
                      animate={{
                        scale: isHovered ? 1.05 : 1,
                        boxShadow: isHovered ? `0 4px 16px ${catStyle.glow}` : '0 0px 0px transparent',
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      {article.category}
                    </motion.span>

                    {/* hover 时封面上浮现序号 */}
                    <motion.div
                      className="absolute bottom-4 right-4 font-handwriting text-5xl font-bold pointer-events-none"
                      style={{ color: catStyle.text }}
                      animate={{
                        opacity: isHovered ? 0.12 : 0.04,
                        y: isHovered ? -4 : 0,
                        scale: isHovered ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </motion.div>
                  </div>
                )}

                {/* 内容区域 */}
                <div className="p-5 md:p-6">
                  {/* 日期 */}
                  <p className="text-xs text-earthBrown/40 font-rounded tracking-wider mb-2 uppercase">
                    {article.date}
                  </p>

                  {/* 标题 */}
                  <motion.h3
                    className="font-handwriting text-lg md:text-xl text-earthBrown mb-3 leading-snug line-clamp-2"
                    animate={{
                      color: isHovered ? catStyle.text : '#8B6F47',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {article.title}
                  </motion.h3>

                  {/* 渐变分隔线 */}
                  <motion.div
                    className="h-px mb-3 origin-left"
                    style={{
                      background: `linear-gradient(90deg, ${catStyle.text}, transparent)`,
                      opacity: 0.35,
                    }}
                    animate={{
                      scaleX: isHovered ? 1.6 : 1,
                      opacity: isHovered ? 0.6 : 0.35,
                    }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />

                  {/* 摘要 */}
                  <p className="text-sm text-earthBrown/55 font-rounded leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* 阅读指示 — 滑入动画 */}
                  <motion.div
                    className="mt-4 flex items-center gap-2 text-xs font-rounded"
                    style={{ color: catStyle.text }}
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      x: isHovered ? 0 : -12,
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <span>阅读全文</span>
                    <motion.span
                      animate={{ x: isHovered ? [0, 4, 0] : 0 }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                </div>

                {/* hover 光扫效果 */}
                <motion.div
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  style={{
                    background: `linear-gradient(105deg, transparent 40%, ${catStyle.border} 50%, transparent 60%)`,
                  }}
                  animate={{
                    x: isHovered ? ['calc(-100%)', 'calc(200%)'] : 'calc(-100%)',
                  }}
                  transition={{
                    duration: 0.8,
                    ease: 'easeInOut',
                  }}
                />

                {/* hover 边框光晕 */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  animate={{
                    boxShadow: isHovered
                      ? `inset 0 0 0 1.5px ${catStyle.border}, 0 0 40px ${catStyle.glow}`
                      : 'inset 0 0 0 0px transparent, 0 0 0px transparent',
                  }}
                  transition={{ duration: 0.4 }}
                />
              </TiltCard>
            )
          })}
        </div>
      </div>
    </div>
  )
}
