import { motion } from 'framer-motion'
import { useState } from 'react'
import { generatedAssets } from '../assets/generatedAssets'

export default function Articles() {
  const [hoveredArticle, setHoveredArticle] = useState(null)

  const articles = [
    {
      id: 1,
      title: '在 214 国道上遇见的那些生命',
      category: '生活碎片',
      date: '2024.03.15',
      excerpt: '狼毒花开满山坡，黑颈鹤在湖边起舞，那一刻我明白了什么叫做生命的力量...',
      color: 'from-pink-100 to-pink-200',
      bookmark: 'bg-pink-400',
      coverImage: generatedAssets.road214Scenery,
    },
    {
      id: 2,
      title: 'React 中的状态管理哲学',
      category: '技术思考',
      date: '2024.02.28',
      excerpt: '从 Redux 到 Zustand，从 Context 到 Jotai，我们真的需要这么多状态管理工具吗？',
      color: 'from-blue-100 to-blue-200',
      bookmark: 'bg-blue-400',
      coverImage: generatedAssets.articleTechCover,
    },
    {
      id: 3,
      title: '短剧《平行时空的你》创作手记',
      category: '短剧灵感',
      date: '2024.01.20',
      excerpt: '如果在另一个时空，我们会做出不同的选择吗？这个问题困扰了我很久...',
      color: 'from-purple-100 to-purple-200',
      bookmark: 'bg-purple-400',
      coverImage: generatedAssets.articleLifeCover,
    },
    {
      id: 4,
      title: '手作的温度：一件陶器的诞生',
      category: '生活碎片',
      date: '2023.12.10',
      excerpt: '从泥土到陶器，每一次触碰都是与自然的对话，每一个纹理都是时间的印记...',
      color: 'from-green-100 to-green-200',
      bookmark: 'bg-green-400',
      coverImage: generatedAssets.handmadePottery,
    },
    {
      id: 5,
      title: 'AI 视听创作的未来想象',
      category: '技术思考',
      date: '2023.11.05',
      excerpt: '当 AI 可以生成图像、视频、音乐，创作者的价值在哪里？我们又该如何定义艺术？',
      color: 'from-orange-100 to-orange-200',
      bookmark: 'bg-orange-400',
      coverImage: generatedAssets.articleTechCover,
    },
    {
      id: 6,
      title: '蔡文姬的琴声与我的游戏人生',
      category: '生活碎片',
      date: '2023.10.18',
      excerpt: '在王者峡谷里，我找到了属于自己的节奏，胡笳琴的每一个音符都是治愈...',
      color: 'from-yellow-100 to-yellow-200',
      bookmark: 'bg-yellow-400',
      coverImage: generatedAssets.vinylRecord,
    },
  ]

  return (
    <div className="min-h-screen px-8 pt-32 pb-16">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="font-handwriting text-5xl text-center text-warmOrange mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          思想档案馆 📮
        </motion.h1>

        <motion.p
          className="text-center text-earthBrown/70 font-rounded mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          深夜抽屉里的手稿，散落桌面的信封，每一篇都是灵魂的碎片
        </motion.p>

        {/* 文章信封网格 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ y: 50, opacity: 0, rotate: -5 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              onHoverStart={() => setHoveredArticle(article.id)}
              onHoverEnd={() => setHoveredArticle(null)}
              className="relative cursor-pointer"
            >
              {/* 信封主体 */}
              <motion.div
                className={`relative bg-gradient-to-br ${article.color} p-6 rounded-2xl shadow-lg overflow-hidden`}
                style={{ filter: 'url(#rough)' }}
                whileHover={{ y: -10, rotate: 2 }}
                animate={{
                  scale: hoveredArticle === article.id ? 1.02 : 1,
                }}
              >
                {/* 彩色书签 */}
                <div
                  className={`absolute top-0 right-8 w-8 h-16 ${article.bookmark} rounded-b-lg shadow-md`}
                  style={{ filter: 'url(#pencil)' }}
                >
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent border-t-white/30" />
                </div>

                {/* 信封开口动画 */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-16 bg-white/30"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    filter: 'url(#rough)',
                  }}
                  animate={{
                    y: hoveredArticle === article.id ? -10 : 0,
                    opacity: hoveredArticle === article.id ? 0.5 : 0.3,
                  }}
                />

                {/* 文章内容 */}
                <div className="relative z-10 pt-8">
                  {/* 封面图 */}
                  {article.coverImage && (
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-32 object-cover"
                      />
                    </div>
                  )}

                  {/* 分类标签 */}
                  <span className="inline-block px-3 py-1 bg-white/50 rounded-full text-xs font-handwriting text-earthBrown mb-3">
                    {article.category}
                  </span>

                  {/* 标题 */}
                  <h3 className="font-handwriting text-xl text-earthBrown mb-2 line-clamp-2">
                    {article.title}
                  </h3>

                  {/* 日期 */}
                  <p className="text-xs text-earthBrown/60 font-rounded mb-3">
                    {article.date}
                  </p>

                  {/* 摘要 */}
                  <p className="text-sm text-earthBrown/70 font-rounded line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* 阅读更多提示 */}
                  <motion.div
                    className="mt-4 flex items-center gap-2 text-earthBrown/80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredArticle === article.id ? 1 : 0 }}
                  >
                    <span className="text-sm font-handwriting">阅读更多</span>
                    <motion.span
                      animate={{ x: hoveredArticle === article.id ? 5 : 0 }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                </div>

                {/* 手绘装饰元素 */}
                <div className="absolute bottom-4 right-4 text-2xl opacity-20">
                  {article.category === '生活碎片' && '🌿'}
                  {article.category === '技术思考' && '💻'}
                  {article.category === '短剧灵感' && '🎬'}
                </div>
              </motion.div>

              {/* 信封阴影 */}
              <div
                className="absolute inset-0 bg-black/5 rounded-2xl -z-10"
                style={{
                  transform: 'translate(4px, 4px)',
                  filter: 'blur(4px)',
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* 底部装饰 */}
        <motion.div
          className="mt-20 flex justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="text-4xl">✉️</span>
          <span className="text-4xl">📝</span>
          <span className="text-4xl">📖</span>
        </motion.div>
      </div>
    </div>
  )
}
