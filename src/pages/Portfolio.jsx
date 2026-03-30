import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useState, useRef } from 'react'
import { generatedAssets } from '../assets/generatedAssets'
import portfolioBg from '../assets/images/宇宙成列背景图.jpg'

const typeColors = {
  'image':   { text: '#F4A261', bg: 'rgba(244,162,97,0.10)', border: 'rgba(244,162,97,0.20)', glow: 'rgba(244,162,97,0.06)' },
  'video':   { text: '#A07AB8', bg: 'rgba(180,130,200,0.10)', border: 'rgba(180,130,200,0.20)', glow: 'rgba(180,130,200,0.06)' },
  'music':   { text: '#5B9BD5', bg: 'rgba(91,155,213,0.10)', border: 'rgba(91,155,213,0.20)', glow: 'rgba(91,155,213,0.06)' },
  'product': { text: '#7A9A6B', bg: 'rgba(156,175,136,0.10)', border: 'rgba(156,175,136,0.20)', glow: 'rgba(156,175,136,0.06)' },
}

// 3D 倾斜卡片
function TiltCard({ children, className, style, ...motionProps }) {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleMouseLeave = () => { mx.set(0); my.set(0) }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, rotateX, rotateY, transformPerspective: 900, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}

export default function Portfolio() {
  const [hoveredWork, setHoveredWork] = useState(null)

  const works = [
    { id: 1, title: '狼毒花开', category: '摄影', description: '214 国道旁的狼毒花海', type: 'image', size: 'large', coverImage: generatedAssets.road214Scenery },
    { id: 2, title: '平行时空的你', category: 'AI 短剧', description: '一个关于选择与命运的故事', type: 'video', size: 'tall', coverImage: generatedAssets.articleLifeCover },
    { id: 3, title: '胡笳琴声', category: '音乐', description: '蔡文姬主题曲改编', type: 'music', size: 'normal', coverImage: generatedAssets.vinylRecord },
    { id: 4, title: '手作陶器系列', category: '产品网站', description: '手工陶器作品展示', type: 'product', size: 'normal', coverImage: generatedAssets.handmadePottery },
    { id: 5, title: '黑颈鹤的舞蹈', category: '摄影', description: '纳帕海湿地的精灵', type: 'image', size: 'large', coverImage: generatedAssets.blackNeckedCrane },
    { id: 6, title: '时光手账', category: 'AI 短剧', description: '用影像记录生活的温度', type: 'video', size: 'normal', coverImage: generatedAssets.campingTent },
    { id: 7, title: '漫游者工作室', category: '产品网站', description: '个人创意工作室官网', type: 'product', size: 'tall', coverImage: generatedAssets.articleTechCover },
    { id: 8, title: '雪山之巅', category: '摄影', description: '梅里雪山日照金山', type: 'image', size: 'large', coverImage: generatedAssets.snowMountain },
  ]

  const getSizeClass = (size) => {
    switch (size) {
      case 'large': return 'md:col-span-2 md:row-span-2'
      case 'tall': return 'md:row-span-2'
      default: return ''
    }
  }

  return (
    <div className="min-h-screen px-6 md:px-8 pt-32 pb-16 relative">
      {/* 固定背景层 */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url(${portfolioBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform',
        }}
      />
      <div className="fixed inset-0 -z-10" style={{ backgroundColor: 'rgba(255, 248, 240, 0.75)' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* 瀑布流网格 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[220px]">
          {works.map((work, i) => {
            const tc = typeColors[work.type] || typeColors.image
            const isHovered = hoveredWork === work.id
            return (
              <TiltCard
                key={work.id}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer ${getSizeClass(work.size)}`}
                style={{
                  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                }}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 240, damping: 22 }}
                whileHover={{
                  y: -8,
                  boxShadow: `0 24px 64px rgba(0,0,0,0.14), 0 0 50px ${tc.glow}`,
                  transition: { type: 'spring', stiffness: 300, damping: 22 },
                }}
                onHoverStart={() => setHoveredWork(work.id)}
                onHoverEnd={() => setHoveredWork(null)}
              >
                {/* 封面图 — 默认展示 */}
                <motion.img
                  src={work.coverImage}
                  alt={work.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  animate={{
                    scale: isHovered ? 1.08 : 1,
                    filter: isHovered ? 'brightness(0.75) saturate(1.15)' : 'brightness(0.92) saturate(1)',
                  }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                />

                {/* 常驻底部渐变 + 标题 */}
                <div className="absolute inset-0 flex flex-col justify-end">
                  <div
                    className="p-5 md:p-6"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
                    }}
                  >
                    {/* 分类胶囊 */}
                    <motion.span
                      className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-rounded font-medium mb-2"
                      style={{
                        background: 'rgba(255,255,255,0.15)',
                        color: 'rgba(255,255,255,0.85)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(8px)',
                      }}
                      animate={{
                        background: isHovered ? tc.bg : 'rgba(255,255,255,0.15)',
                        color: isHovered ? tc.text : 'rgba(255,255,255,0.85)',
                        borderColor: isHovered ? tc.border : 'rgba(255,255,255,0.2)',
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {work.category}
                    </motion.span>

                    {/* 标题 */}
                    <h3 className="font-handwriting text-xl md:text-2xl text-white mb-1 drop-shadow-lg">
                      {work.title}
                    </h3>

                    {/* 描述 — hover 时展开 */}
                    <motion.p
                      className="text-sm text-white/70 font-rounded drop-shadow overflow-hidden"
                      animate={{
                        height: isHovered ? 'auto' : 0,
                        opacity: isHovered ? 1 : 0,
                        marginTop: isHovered ? 4 : 0,
                      }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      {work.description}
                    </motion.p>

                    {/* 分隔线 — hover 延展 */}
                    <motion.div
                      className="h-px origin-left mt-3"
                      style={{ background: `linear-gradient(90deg, ${tc.text}, transparent)` }}
                      animate={{
                        scaleX: isHovered ? 1 : 0.3,
                        opacity: isHovered ? 0.7 : 0.25,
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* 序号水印 */}
                <motion.div
                  className="absolute top-4 right-5 font-handwriting text-4xl font-bold text-white/10 pointer-events-none"
                  animate={{
                    opacity: isHovered ? 0.2 : 0.06,
                    scale: isHovered ? 1.15 : 1,
                    y: isHovered ? -3 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </motion.div>

                {/* 光扫效果 */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)`,
                  }}
                  animate={{
                    x: isHovered ? ['calc(-100%)', 'calc(200%)'] : 'calc(-100%)',
                  }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                />

                {/* hover 边框 */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  animate={{
                    boxShadow: isHovered
                      ? `inset 0 0 0 1.5px ${tc.border}`
                      : 'inset 0 0 0 0px transparent',
                  }}
                  transition={{ duration: 0.3 }}
                />
              </TiltCard>
            )
          })}
        </div>
      </div>
    </div>
  )
}
