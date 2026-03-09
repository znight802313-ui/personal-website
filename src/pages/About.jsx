import { motion } from 'framer-motion'
import { useState } from 'react'
import { generatedAssets } from '../assets/generatedAssets'

export default function About() {
  const [expandedMilestone, setExpandedMilestone] = useState(null)

  const skills = [
    { name: '脑洞', value: 100 },
    { name: '共情力', value: 90 },
    { name: '审美', value: 95 },
    { name: '执行力', value: 75 },
    { name: '技术力', value: 85 },
    { name: '拖延症', value: 50 },
  ]

  const lifeStatus = [
    { icon: generatedAssets.vinylRecord, title: '听歌', subtitle: '正在播放', color: 'bg-pink-100', detail: 'Lana Del Rey - Young and Beautiful', isImage: true },
    { icon: '🎮', title: '游戏', subtitle: '王者荣耀', color: 'bg-purple-100', detail: '蔡文姬 · 胡笳琴' },
    { icon: generatedAssets.campingTent, title: '旅游', subtitle: '下一站', color: 'bg-blue-100', detail: '214 国道 · 滇藏线', isImage: true },
    { icon: '📚', title: '阅读', subtitle: '最近在读', color: 'bg-green-100', detail: '《人类简史》' },
  ]

  const milestones = [
    { year: '2020', title: '踏入 AI 视听领域', description: '开始探索人工智能与视听艺术的交叉点，发现了技术与创意结合的无限可能。', image: null },
    { year: '2021', title: '手作文化主理人', description: '创立手作工作室，用双手传递温度，让每一件作品都充满故事。', image: generatedAssets.handmadePottery },
    { year: '2022', title: '短剧编剧之路', description: '开始尝试短剧创作，用镜头语言讲述生活中的小确幸与大情怀。', image: null },
    { year: '2023', title: '游戏世界漫游', description: '在虚拟世界中找到另一个自己，蔡文姬的琴声成为心灵的慰藉。', image: null },
    { year: '2024', title: '214 国道之旅', description: '沿着滇藏线一路向北，遇见狼毒花、黑颈鹤，和那些说不完的故事。', image: generatedAssets.road214Scenery },
  ]

  return (
    <div className="min-h-screen px-8 pt-32 pb-16">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="font-handwriting text-5xl text-center text-warmOrange mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          灵魂解剖 ✨
        </motion.h1>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* 右侧：RPG 角色卡 */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* 塔罗牌风格卡片 */}
              <motion.div
                className="w-full max-w-md bg-gradient-to-br from-warmOrange/10 to-sageGreen/10 p-8 rounded-3xl shadow-2xl"
                style={{ filter: 'url(#rough)' }}
                whileHover={{ scale: 1.02, rotate: 1 }}
              >
                {/* Q版小人占位符 */}
                <div className="w-48 h-48 mx-auto mb-6 bg-white rounded-full flex items-center justify-center text-8xl">
                  🧙‍♀️
                </div>

                <h2 className="font-handwriting text-3xl text-center text-warmOrange mb-2">
                  漫游者
                </h2>
                <p className="text-center text-earthBrown/70 mb-6 font-rounded">
                  AI 视听魔法师 / 手作文化主理人
                </p>

                {/* 技能雷达图 */}
                <div className="bg-white/50 p-6 rounded-2xl">
                  <h3 className="font-handwriting text-xl text-center mb-4 text-earthBrown">
                    技能点分布
                  </h3>
                  <div className="space-y-3">
                    {skills.map((skill, i) => (
                      <motion.div
                        key={skill.name}
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                      >
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-rounded">{skill.name}</span>
                          <span className="text-sm font-rounded text-warmOrange">{skill.value}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-warmOrange to-sageGreen"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.value}%` }}
                            transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* 装饰性星星 */}
              <motion.span
                className="absolute -top-4 -right-4 text-4xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                ✨
              </motion.span>
            </div>
          </motion.div>

          {/* 左侧：自我介绍 & 生活状态 */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Slogan */}
            <div className="relative p-6 bg-white rounded-2xl shadow-lg">
              <div className="absolute -top-2 -left-2 w-full h-full bg-warmOrange/20 rounded-2xl -z-10" style={{ filter: 'url(#rough)' }} />
              <p className="font-handwriting text-2xl text-earthBrown leading-relaxed">
                "在<span className="bg-warmOrange/30 px-2">理性的代码</span>与
                <span className="bg-sageGreen/30 px-2">感性的艺术</span>之间流浪"
              </p>
            </div>

            {/* 今日生活状态卡片群 */}
            <div className="grid grid-cols-2 gap-4">
              {lifeStatus.map((status, i) => (
                <motion.div
                  key={status.title}
                  className={`sticky-note ${status.color} p-4 rounded-lg transform hover:scale-105 transition-transform cursor-pointer overflow-hidden relative`}
                  initial={{ rotate: -5 + i * 3, y: 20, opacity: 0 }}
                  animate={{ rotate: -2 + i * 1.5, y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  whileHover={{ rotate: 0, y: -5 }}
                >
                  {status.isImage ? (
                    <div className="w-16 h-16 mb-2 rounded-lg overflow-hidden">
                      <img src={status.icon} alt={status.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="text-4xl mb-2">{status.icon}</div>
                  )}
                  <h3 className="font-handwriting text-lg text-earthBrown">{status.title}</h3>
                  <p className="text-sm text-earthBrown/70">{status.subtitle}</p>
                  <p className="text-xs text-earthBrown/60 mt-2 font-rounded">{status.detail}</p>
                </motion.div>
              ))}
            </div>

            {/* 个人特质标签 */}
            <div className="flex flex-wrap gap-3">
              {['双鱼座 🐟', 'ENFP 🌈', '理想主义者 ✨', '自然爱好者 🌿'].map((tag, i) => (
                <motion.span
                  key={tag}
                  className="px-4 py-2 bg-white rounded-full shadow-md font-handwriting text-earthBrown"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + i * 0.1, type: 'spring' }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 历史人生时间节点 - 蜿蜒公路 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="relative"
        >
          <h2 className="font-handwriting text-3xl text-center text-sageGreen mb-12">
            人生旅途 🛤️
          </h2>

          <div className="relative">
            {/* 蜿蜒的路径线 */}
            <svg className="absolute inset-0 w-full h-full -z-10" style={{ filter: 'url(#pencil)' }}>
              <path
                d="M 50 50 Q 200 100, 350 50 T 650 50 Q 800 100, 950 50"
                stroke="#9CAF88"
                strokeWidth="4"
                fill="none"
                strokeDasharray="10,5"
              />
            </svg>

            {/* 时间节点 */}
            <div className="space-y-8">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={milestone.year}
                  className={`flex items-start gap-6 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  initial={{ x: i % 2 === 0 ? -50 : 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1 + i * 0.2 }}
                >
                  {/* 路牌 */}
                  <motion.div
                    className="flex-shrink-0 w-24 h-24 bg-warmOrange text-white rounded-lg flex flex-col items-center justify-center cursor-pointer shadow-lg"
                    style={{ filter: 'url(#rough)' }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    onClick={() => setExpandedMilestone(expandedMilestone === i ? null : i)}
                  >
                    <span className="font-handwriting text-2xl">{milestone.year}</span>
                    <span className="text-xs">📍</span>
                  </motion.div>

                  {/* 内容卡片 */}
                  <motion.div
                    className="flex-1 bg-white p-6 rounded-2xl shadow-lg overflow-hidden"
                    initial={false}
                    animate={{
                      height: expandedMilestone === i ? 'auto' : '80px',
                    }}
                  >
                    <h3 className="font-handwriting text-xl text-earthBrown mb-2">
                      {milestone.title}
                    </h3>
                    {expandedMilestone === i && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <p className="text-earthBrown/70 font-rounded mb-4">
                          {milestone.description}
                        </p>
                        {milestone.image && (
                          <div className="mt-4 rounded-lg overflow-hidden">
                            <img
                              src={milestone.image}
                              alt={milestone.title}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                          </div>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
