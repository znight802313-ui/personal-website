import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { useState, useRef, useEffect, useCallback } from 'react'
import { generatedAssets } from '../assets/generatedAssets'
import aboutBg from '../assets/images/我的档案背景图.jpeg'
import avatarImg from '../assets/images/头像.jpg'
import imgChatuAgent from '../assets/images/插图智能体.png'
import imgJubenAgent from '../assets/images/剧本智能体.png'
import imgNovelAgent from '../assets/images/小说智能体.png'
import imgScriptAgent from '../assets/images/脚本智能体.png'
import imgXiaojing1 from '../assets/images/小经图片1.jpg'
import imgXiaojing2 from '../assets/images/小经图片2.jpg'
import imgXiaojing3 from '../assets/images/小经图片3.png'
import imgXiaojing4 from '../assets/images/小经图片4.jpg'
import imgDigitalHero1 from '../assets/images/数字英雄1.jpg'
import imgDigitalHero2 from '../assets/images/数字英雄2.jpg'
import imgMusic from '../assets/images/音乐.jpg'
import imgDriving from '../assets/images/自驾游.jpg'
import idealSong from '../assets/sounds/陈鸿宇-理想三旬.mp3'

export default function About({ volume = 0.5 }) {
  const [expandedMilestone, setExpandedMilestone] = useState(0)
  const [hoveredAbility, setHoveredAbility] = useState(null)
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [lightboxImg, setLightboxImg] = useState(null)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [musicProgress, setMusicProgress] = useState(0)
  const [musicHovered, setMusicHovered] = useState(false)
  const audioRef = useRef(null)
  const progressTimer = useRef(null)

  // 音乐播放器逻辑
  const toggleMusic = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(idealSong)
      audioRef.current.volume = volume
      audioRef.current.addEventListener('ended', () => {
        setMusicPlaying(false)
        setMusicProgress(0)
      })
    }
    if (musicPlaying) {
      audioRef.current.pause()
      clearInterval(progressTimer.current)
    } else {
      audioRef.current.play()
      progressTimer.current = setInterval(() => {
        if (audioRef.current) {
          setMusicProgress((audioRef.current.currentTime / audioRef.current.duration) * 100 || 0)
        }
      }, 200)
    }
    setMusicPlaying(!musicPlaying)
  }, [musicPlaying, volume])

  // 音量同步
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  useEffect(() => {
    return () => {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null }
      clearInterval(progressTimer.current)
    }
  }, [])

  // ========== 数据定义 ==========
  const skills = [
    { name: 'AI产品设计', value: 95 },
    { name: '内容洞察', value: 90 },
    { name: '项目管理', value: 88 },
    { name: 'Vibe Coding', value: 90 },
    { name: '数据分析', value: 85 },
    { name: '创意脑洞', value: 95 },
    { name: '激情', value: 100 },
  ]

  const lifeStatus = [
    { icon: imgMusic, title: '听歌', subtitle: '最近在听', color: 'from-pink-200/60 to-pink-100/40', detail: '陈鸿宇 · 理想三旬', isImage: true },
    { icon: '🎮', title: '游戏', subtitle: '王者荣耀', color: 'from-purple-200/60 to-purple-100/40', detail: '射手 · 打野' },
    { icon: imgDriving, title: '自驾游', subtitle: '下一站', color: 'from-blue-200/60 to-blue-100/40', detail: '青甘线', isImage: true },
    { icon: '📖', title: '小说', subtitle: '最近在追', color: 'from-green-200/60 to-green-100/40', detail: '我在风花雪月里等你' },
    { icon: '🎬', title: '动漫', subtitle: '最近在追', color: 'from-orange-200/60 to-orange-100/40', detail: '凡人修仙传 · 剑来' },
  ]

  const milestones = [
    {
      period: '2023.09 - 至今',
      company: '百度',
      role: 'AI产品经理 · 数字阅读业务部',
      icon: '⭐',
      highlight: true,
      description: 'AI全链路内容生产专家。主导业务向AI富媒体战略转型，构建日均34万+内容生产的AIGC平台，推动多模态内容创新实现百万级DAU突破，跑通长篇AI短剧工业化生产SOP。',
      achievements: [
        'AI短剧工业化生产体系（核心项目）：负责小说侧AI短剧生产平台从0到1策略搭建，开发第一人称解说+第三人称演绎AI漫剧自动化产线，实现人物站位、微表情及首尾帧推演的精细化控制',
        '画风与一致性攻坚：针对不同题材"画风单一"痛点，参与训练部署多款LoRA画风模型；通过Pipeline优化（角色场景多视图素材档案、剧情匹配运镜指令词），减少50%画面畸形和穿模问题',
        '产能与剧本改编提效：人机协同效率从1人1天1集提升至5-10集；通过Vibe Coding搭建"小说解构→事件重组→分集生成→剧本审查"长篇改编闭环，可商业化剧本生成提效5倍+',
        'AI物料中台：扩充视频产能至日产4000条，迭代爆款仿写及封面策略（CTR提升2.3%），端外投流ROI从0.6稳定至1.0，端内DAU达70W',
        'AI图文生产体系：搭建融合10个大模型+4个多模态模型的AI生产平台，日产30万文本+4万图片，CTR反超人工0.67pct，季度节省人力成本80万+',
        '社区与内容矩阵：搭建AI驱动社区互动模型，小说段评渗透率增长263%；从0到1搭建小说推文全自动化生产流程',
      ],
      tags: ['AIGC', 'AI短剧', '大模型', 'LoRA', 'Workflow'],
    },
    {
      period: '2022.07 - 2023.06',
      company: '戏仔网络',
      role: '产品经理',
      icon: '🌿',
      highlight: false,
      description: '主导手游智能供需匹配账号交易平台从0到1全流程规划与落地。优化首页体验使1分钟内流失率下降18%，智能推荐带动订单量环比增长50%，创新蹲号功能月均贡献6%营收增长。',
      tags: ['从0到1', '流失率↓18%', '订单量↑50%'],
    },
    {
      period: '2022.01 - 2022.05',
      company: '上海数乘科技',
      role: '产品专员',
      icon: '🌱',
      highlight: false,
      description: '负责NIKE代工厂数据中台核心模块设计，打通供应链壁垒、优化内部协作，成功交付系统V1.0版本，推动传统制造业数字化升级。',
      tags: ['数据中台', '供应链', '数字化'],
    },
  ]

  const awards = [
    { icon: '🏆', title: '数字英雄第二季全国总冠军', sub: '最佳设计交互奖 · 最佳主题创意奖', gold: true },
    { icon: '⭐', title: '百度"潜力新秀"个人奖', sub: '2025年Q1垂类搜索', gold: false },
    { icon: '⭐', title: '百度"精益求精"个人奖', sub: '2025年Q4', gold: false },
    { icon: '🎯', title: '腾讯light-AI比赛入围奖', sub: '全国总决赛前八名', gold: false },
    { icon: '📊', title: 'CDA数据分析师', sub: 'Level 1 认证', gold: false },
  ]

  // 右侧副业/能力探索 — 单条目，挂载多个子项目截图
  const explorations = [
    {
      year: 2026,
      title: 'Vibe Coding · AI-Agent 全栈开发',
      desc: '利用 Vibe Coding 独立跑通多个 AI-Agent 开发全流程，涵盖小说创作、剧本改编、插图生成等场景',
      link: 'https://www.lisui.online/novel',
      projects: [
        { name: '小说智能体', image: imgNovelAgent },
        { name: '剧本智能体', image: imgJubenAgent },
        { name: '插图智能体', image: imgChatuAgent },
        { name: '脚本智能体', image: imgScriptAgent },
      ],
    },
    {
      year: 2025,
      title: 'AI创作IP形象「小经」',
      desc: '利用AI创作原创IP形象"小经"，获得香格里拉礼物优秀奖，线下售卖200+订单，超百人粉丝群',
      link: 'https://hcnigi1upsb5.feishu.cn/wiki/OlLqwOFwFiju3rk6m09cHXyknTc',
      shopLink: 'http://xhslink.com/o/5UGNSXXd6Ja',
      projects: [
        { name: '小经图片1', image: imgXiaojing1 },
        { name: '小经图片2', image: imgXiaojing2 },
        { name: '小经图片3', image: imgXiaojing3 },
        { name: '小经图片4', image: imgXiaojing4 },
      ],
    },
    {
      year: 2025,
      title: '首个AI剧情视频',
      desc: '独立制作AI剧情短视频，获得9000+点赞和5000+转发',
      link: 'https://v.douyin.com/rBdJobbzFXI/',
    },
    {
      year: 2022,
      title: '数字英雄全国冠军',
      desc: '第一次参加综艺节目录制和互联网竞赛，取得了冠军和2w个人奖金',
      link: 'https://www.mgtv.com/h/400140.html',
      projects: [
        { name: '数字英雄1', image: imgDigitalHero1 },
        { name: '数字英雄2', image: imgDigitalHero2 },
      ],
    },
  ]

  // ========== 渲染 ==========
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* ===== 固定背景层 ===== */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url(${aboutBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform',
        }}
      />
      {/* 半透明遮罩 */}
      <div className="fixed inset-0 -z-10" style={{ backgroundColor: 'rgba(255, 248, 240, 0.75)' }} />

      {/* ===== 漂浮装饰元素 ===== */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* 星球 */}
        <motion.div
          className="absolute top-16 left-12 text-5xl opacity-20"
          animate={{ rotate: [0, 360], y: [0, -8, 0, 8, 0] }}
          transition={{ rotate: { duration: 30, repeat: Infinity, ease: 'linear' }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
        >🪐</motion.div>
        {/* 月亮 */}
        <motion.div
          className="absolute top-20 right-16 text-4xl opacity-15"
          animate={{ scale: [1, 1.15, 1], rotate: [0, 10, 0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >🌙</motion.div>
        {/* 狐狸 */}
        <motion.div
          className="absolute bottom-32 right-20 text-4xl opacity-15"
          animate={{ x: [0, 10, 0, -10, 0], rotate: [0, 3, 0, -3, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >🦊</motion.div>
        {/* 玫瑰 */}
        <motion.div
          className="absolute bottom-24 left-20 text-4xl opacity-20"
          animate={{ rotate: [0, 5, 0, -5, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >🌹</motion.div>
        {/* 闪烁星星 */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute text-xl"
            style={{ top: `${12 + i * 18}%`, left: `${20 + i * 15}%` }}
            animate={{ opacity: [0.1, 0.35, 0.1], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
          >✨</motion.div>
        ))}
        {/* 落叶粒子 */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`leaf-${i}`}
            className="absolute text-2xl"
            style={{ left: `${i * 25 + 10}%`, top: '-5%' }}
            animate={{ y: ['0vh', '110vh'], x: [0, 30, -20, 40, 0], rotate: [0, 180, 360, 540, 720], opacity: [0, 0.5, 0.5, 0.5, 0] }}
            transition={{ duration: 18 + i * 3, delay: i * 3, repeat: Infinity, ease: 'linear' }}
          >🍂</motion.div>
        ))}
      </div>

      {/* ===== 主内容区域 ===== */}
      <div className="relative z-10 px-8 pt-40 pb-16">
        <div className="max-w-7xl mx-auto">

          {/* ===== 角色卡 - 横向全宽布局 ===== */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-12"
          >
            <div
              className="relative p-8 md:p-10 rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 100%)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.5)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
              }}
            >
              {/* 呼吸光晕 */}
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ boxShadow: '0 16px 60px rgba(244,162,97,0.15), inset 0 1px 0 rgba(255,255,255,0.5)' }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />

              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                {/* 头像 + 基本信息 */}
                <motion.div
                  className="flex flex-col items-center flex-shrink-0"
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <div className="relative w-36 h-36 mb-4 group cursor-pointer">
                    {/* 旋转光环 */}
                    <motion.div
                      className="absolute -inset-2 rounded-full"
                      style={{ background: 'conic-gradient(from 0deg, transparent, rgba(244,162,97,0.4), transparent, rgba(156,175,136,0.4), transparent)' }}
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    />
                    {/* 悬浮外圈脉冲 */}
                    <motion.div
                      className="absolute -inset-4 rounded-full pointer-events-none"
                      style={{ border: '1.5px solid rgba(244,162,97,0.2)' }}
                      whileHover={{ scale: 1.15, opacity: 0 }}
                      transition={{ duration: 0.8 }}
                    />
                    <motion.img
                      src={avatarImg}
                      alt="头像"
                      className="absolute inset-0 w-full h-full rounded-full object-cover shadow-lg"
                      whileHover={{ scale: 1.08, boxShadow: '0 8px 30px rgba(244,162,97,0.3)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    />
                  </div>
                  <h2 className="text-3xl text-warmOrange mb-1" style={{ fontFamily: '"ZCOOL XiaoWei", serif' }}>曾卫国</h2>
                  <p className="text-earthBrown/60 font-rounded text-sm">小说AI剧策略产品经理</p>
                </motion.div>

                {/* Slogan + 特质标签 */}
                <div className="flex-1 space-y-5">
                  {/* Slogan */}
                  <motion.div
                    className="relative p-5 rounded-2xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
                      border: '1px solid rgba(255,255,255,0.4)',
                    }}
                    whileHover={{ scale: 1.01, boxShadow: '0 12px 40px rgba(244,162,97,0.12)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <p className="font-handwriting text-2xl text-earthBrown leading-relaxed">
                      "须知少时<span className="px-1.5 mx-0.5 rounded" style={{ background: 'linear-gradient(135deg, rgba(255,155,113,0.25), rgba(255,155,113,0.08))' }}>凌云志</span>，曾许人间<span className="px-1.5 mx-0.5 rounded" style={{ background: 'linear-gradient(135deg, rgba(156,175,136,0.25), rgba(156,175,136,0.08))' }}>第一流</span>"
                    </p>
                    <motion.span
                      className="inline-block w-0.5 h-5 bg-warmOrange ml-1 align-middle"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  </motion.div>

                  {/* 核心能力 */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { icon: '🚀', title: 'AI工程化落地', desc: '深耕AI应用，主导大模型微调、Prompt工程及Workflow架构，将技术转化为商业生产力', color: 'rgba(255,155,113,0.15)', accent: '#FF9B71' },
                      { icon: '🎯', title: '产品0→1孵化', desc: '多次操盘产品全生命周期，精准把握核心需求，实现业务指标阶段性显著增长', color: 'rgba(156,175,136,0.15)', accent: '#9CAF88' },
                      { icon: '🎬', title: 'AI多模态内容', desc: '主导长篇剧本AI改编及多模态生成矩阵，实现AI短剧从"勉强能看"到"可消费"的跨越', color: 'rgba(244,162,97,0.15)', accent: '#F4A261' },
                      { icon: '⚡', title: '前沿技术实践', desc: '积极拥抱Vibe Coding、Open Claw等前沿工具，个人跑通多个AI-Agent开发全流程', color: 'rgba(139,111,71,0.1)', accent: '#8B6F47' },
                    ].map((item, i) => (
                      <motion.div
                        key={item.title}
                        className="relative p-3 rounded-xl font-rounded overflow-hidden cursor-pointer"
                        style={{
                          background: hoveredAbility === i
                            ? `linear-gradient(135deg, ${item.color}, rgba(255,255,255,0.35))`
                            : 'rgba(255,255,255,0.3)',
                          border: `1px solid ${hoveredAbility === i ? item.accent + '40' : 'rgba(255,255,255,0.4)'}`,
                        }}
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 300, damping: 20 }}
                        whileHover={{ scale: 1.04, y: -4, boxShadow: `0 12px 32px ${item.accent}20` }}
                        whileTap={{ scale: 0.98 }}
                        onHoverStart={() => setHoveredAbility(i)}
                        onHoverEnd={() => setHoveredAbility(null)}
                      >
                        {/* 悬浮光扫效果 */}
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: `linear-gradient(105deg, transparent 40%, ${item.accent}15 50%, transparent 60%)`,
                          }}
                          initial={{ x: '-100%' }}
                          animate={hoveredAbility === i ? { x: '100%' } : { x: '-100%' }}
                          transition={{ duration: 0.6, ease: 'easeInOut' }}
                        />
                        <div className="flex items-center gap-1.5 mb-1 relative">
                          <motion.span
                            className="text-base"
                            animate={hoveredAbility === i ? { scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] } : { scale: 1, rotate: 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            {item.icon}
                          </motion.span>
                          <span className="text-sm font-medium text-earthBrown">{item.title}</span>
                        </div>
                        <motion.p
                          className="text-xs text-earthBrown/60 leading-relaxed relative"
                          animate={hoveredAbility === i ? { color: 'rgba(139,111,71,0.8)' } : { color: 'rgba(139,111,71,0.6)' }}
                        >
                          {item.desc}
                        </motion.p>
                        {/* 底部进度指示条 */}
                        <motion.div
                          className="absolute bottom-0 left-0 h-0.5 rounded-full"
                          style={{ background: `linear-gradient(90deg, ${item.accent}, transparent)` }}
                          initial={{ width: '0%' }}
                          animate={hoveredAbility === i ? { width: '100%' } : { width: '0%' }}
                          transition={{ duration: 0.4, ease: 'easeOut' }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* 技能条 */}
                <div className="w-full md:w-72 flex-shrink-0 bg-white/25 backdrop-blur-sm p-5 rounded-2xl border border-white/30">
                  <h3 className="font-handwriting text-lg text-center mb-3 text-earthBrown">技能点分布</h3>
                  <div className="space-y-2.5">
                    {skills.map((skill, i) => (
                      <motion.div
                        key={skill.name}
                        className="relative cursor-pointer"
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.06 }}
                        onHoverStart={() => setHoveredSkill(i)}
                        onHoverEnd={() => setHoveredSkill(null)}
                        whileHover={{ x: 3 }}
                      >
                        <div className="flex justify-between mb-0.5">
                          <span className="text-xs font-rounded text-earthBrown/70">{skill.name}</span>
                          <motion.span
                            className="text-xs font-rounded font-medium"
                            animate={hoveredSkill === i ? { scale: 1.2, color: '#FF9B71' } : { scale: 1, color: '#FF9B71' }}
                          >
                            {skill.value}%
                          </motion.span>
                        </div>
                        <div className="h-2 bg-white/40 rounded-full overflow-hidden relative">
                          <motion.div
                            className="h-full rounded-full relative"
                            style={{ background: 'linear-gradient(90deg, #FF9B71, #9CAF88)', boxShadow: hoveredSkill === i ? '0 0 12px rgba(244,162,97,0.5)' : '0 0 6px rgba(244,162,97,0.3)' }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.value}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + i * 0.06, duration: 0.7, ease: 'easeOut' }}
                          >
                            {/* 流光效果 */}
                            <motion.div
                              className="absolute inset-0 rounded-full"
                              style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)' }}
                              animate={hoveredSkill === i ? { x: ['-100%', '100%'] } : {}}
                              transition={{ duration: 0.8, ease: 'easeInOut' }}
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 装饰星星 */}
            <motion.span
              className="absolute -top-2 right-1/4 text-3xl pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >✨</motion.span>
          </motion.div>

          {/* 分隔线 */}
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-warmOrange/30 to-transparent my-12"
            style={{ filter: 'url(#pencil)' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />

          {/* ===== 职业旅途 — 左工作 / 中时间轴 / 右探索 ===== */}
          <div className="mb-4 -mt-6">
            {/* 下滑引导箭头 — 双层 SVG chevron */}
            <div className="flex flex-col items-center -mb-1">
              {[0, 0.3].map((delay, i) => (
                <motion.svg
                  key={i}
                  width="28" height="14" viewBox="0 0 28 14"
                  className={i === 1 ? '-mt-2' : ''}
                  animate={{ y: [0, 4, 0], opacity: [0.35, 0.7, 0.35] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay }}
                >
                  <defs>
                    <linearGradient id={`chevGrad${i}`} x1="0" y1="0" x2="28" y2="14" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#9CAF88" />
                      <stop offset="100%" stopColor="#FF9B71" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M4 3 L14 11 L24 3"
                    fill="none"
                    stroke={`url(#chevGrad${i})`}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              ))}
            </div>

            {/* 标题 */}
            <div className="flex items-center justify-center gap-6 mb-10">
              <div
                className="h-px flex-1 max-w-[120px]"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(156,175,136,0.5))' }}
              />
              <motion.h2
                className="font-handwriting text-4xl text-center relative"
                style={{
                  background: 'linear-gradient(135deg, #8B6F47 0%, #9CAF88 50%, #FF9B71 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% 200%',
                }}
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                人生漫漫
                <div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                  style={{ background: 'linear-gradient(90deg, #FF9B71, #9CAF88)' }}
                />
              </motion.h2>
              <div
                className="h-px flex-1 max-w-[120px]"
                style={{ background: 'linear-gradient(90deg, rgba(156,175,136,0.5), transparent)' }}
              />
            </div>

            {/* 桌面端：三栏布局 */}
            <div className="hidden md:block">
              {(() => {
                // 合并年份，倒序
                const getDisplayYear = (m) => m.period.includes('至今') ? 2026 : parseInt(m.period)
                const years = [...new Set([
                  ...milestones.map(m => getDisplayYear(m)),
                  ...explorations.map(e => e.year),
                ])].sort((a, b) => b - a)

                return (
                  <div className="relative">
                    {/* 中间竖线 */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
                      style={{
                        background: 'linear-gradient(to bottom, rgba(156,175,136,0.1), rgba(156,175,136,0.5) 20%, rgba(255,155,113,0.4) 50%, rgba(156,175,136,0.5) 80%, rgba(156,175,136,0.1))',
                        filter: 'url(#pencil)',
                      }}
                    />
                    {/* 竖线发光层 */}
                    <motion.div
                      className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px pointer-events-none"
                      style={{
                        background: 'linear-gradient(to bottom, transparent, rgba(255,155,113,0.3) 50%, transparent)',
                        filter: 'blur(3px)',
                      }}
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    />

                    <div className="space-y-10">
                      {years.map((year, yi) => {
                        const leftItems = milestones.filter(m => getDisplayYear(m) === year)
                        const rightItems = explorations.filter(e => e.year === year)
                        const maxLen = Math.max(leftItems.length, rightItems.length, 1)

                        return (
                          <div key={year}>
                            {/* 年份节点 */}
                            <div className="flex justify-center mb-6">
                              <motion.div
                                className="relative z-10 px-6 py-2.5 rounded-full font-handwriting text-xl"
                                style={{
                                  background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.5))',
                                  backdropFilter: 'blur(16px)',
                                  border: '1px solid rgba(255,255,255,0.7)',
                                  boxShadow: '0 4px 20px rgba(0,0,0,0.08), 0 0 0 1px rgba(156,175,136,0.1)',
                                  color: '#8B6F47',
                                }}
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: yi * 0.1, type: 'spring', stiffness: 300 }}
                                whileHover={{ scale: 1.1, boxShadow: '0 8px 30px rgba(244,162,97,0.2)' }}
                              >
                                {/* 节点发光脉冲 */}
                                <motion.div
                                  className="absolute inset-0 rounded-full pointer-events-none"
                                  style={{ boxShadow: '0 0 20px rgba(156,175,136,0.2)' }}
                                  animate={{ opacity: [0, 0.6, 0] }}
                                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: yi * 0.5 }}
                                />
                                {year}
                              </motion.div>
                            </div>

                            {/* 左右卡片行 */}
                            {Array.from({ length: maxLen }).map((_, ri) => (
                              <div key={ri} className="grid grid-cols-[1fr_48px_1fr] gap-4 mb-6 items-start">
                                {/* 左侧 - 工作 */}
                                <div className="flex justify-end">
                                  {leftItems[ri] ? (() => {
                                    const milestone = leftItems[ri]
                                    const mIndex = milestones.indexOf(milestone)
                                    return (
                                      <motion.div
                                        className={`relative rounded-2xl overflow-hidden cursor-pointer w-full max-w-lg ${milestone.highlight ? 'ring-1 ring-warmOrange/20' : ''}`}
                                        style={{
                                          background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 100%)',
                                          backdropFilter: 'blur(16px)',
                                          border: '1px solid rgba(255,255,255,0.5)',
                                          boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
                                        }}
                                        initial={{ x: -50, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1, duration: 0.5 }}
                                        onClick={() => setExpandedMilestone(expandedMilestone === mIndex ? null : mIndex)}
                                        whileHover={{
                                          y: -4,
                                          boxShadow: milestone.highlight
                                            ? '0 20px 50px rgba(244,162,97,0.15), 0 0 0 1px rgba(244,162,97,0.1)'
                                            : '0 20px 50px rgba(0,0,0,0.1), 0 0 0 1px rgba(156,175,136,0.15)',
                                          transition: { type: 'spring', stiffness: 300, damping: 20 }
                                        }}
                                      >
                                        {milestone.highlight && (
                                          <motion.div
                                            className="absolute top-0 left-0 right-0 h-1"
                                            style={{ background: 'linear-gradient(90deg, #FF9B71, #9CAF88, #FF9B71)', backgroundSize: '200% 100%' }}
                                            animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                                          />
                                        )}
                                        <div className="p-5">
                                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                                            <span className={`px-3 py-1 rounded-lg font-handwriting text-sm ${milestone.highlight ? 'bg-warmOrange/20 text-warmOrange' : 'bg-sageGreen/10 text-earthBrown/70'}`}>
                                              {milestone.period}
                                            </span>
                                            <div>
                                              <h3 className="font-handwriting text-lg text-earthBrown">
                                                {milestone.company}
                                                {milestone.highlight && <span className="ml-1 text-warmOrange text-sm">⭐</span>}
                                              </h3>
                                              <p className="text-xs text-earthBrown/50 font-rounded">{milestone.role}</p>
                                            </div>
                                          </div>
                                          <p className="text-earthBrown/70 font-rounded text-sm leading-relaxed">{milestone.description}</p>

                                          <AnimatePresence>
                                            {expandedMilestone === mIndex && milestone.achievements && (
                                              <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="mt-3 space-y-2 overflow-hidden"
                                              >
                                                {milestone.achievements.map((achievement, j) => (
                                                  <motion.div
                                                    key={j}
                                                    className="flex items-start gap-2 text-sm text-earthBrown/80 font-rounded p-2 rounded-lg bg-white/30"
                                                    initial={{ x: -20, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    transition={{ delay: j * 0.08 }}
                                                  >
                                                    <span className="text-warmOrange mt-0.5 flex-shrink-0">▸</span>
                                                    <span>{achievement}</span>
                                                  </motion.div>
                                                ))}
                                              </motion.div>
                                            )}
                                          </AnimatePresence>

                                          <div className="flex flex-wrap gap-2 mt-3">
                                            {milestone.tags.map(tag => (
                                              <span
                                                key={tag}
                                                className={`px-2.5 py-0.5 rounded-full text-xs font-rounded ${milestone.highlight ? 'bg-warmOrange/10 text-warmOrange border border-warmOrange/20' : 'bg-sageGreen/10 text-sageGreen border border-sageGreen/20'}`}
                                              >
                                                {tag}
                                              </span>
                                            ))}
                                            {milestone.achievements && (
                                              <span className="px-2.5 py-0.5 rounded-full text-xs font-rounded text-earthBrown/40 border border-earthBrown/10">
                                                {expandedMilestone === mIndex ? '收起 ▴' : '展开详情 ▾'}
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </motion.div>
                                    )
                                  })() : <div />}
                                </div>

                                {/* 中间连接点 */}
                                <div className="flex justify-center pt-6">
                                  <motion.div
                                    className="w-3 h-3 rounded-full relative"
                                    style={{
                                      background: (leftItems[ri]?.highlight) ? 'linear-gradient(135deg, #FF9B71, #F4A261)' : 'linear-gradient(135deg, #9CAF88, #b8c9a8)',
                                      boxShadow: (leftItems[ri]?.highlight) ? '0 0 12px rgba(244,162,97,0.5)' : '0 0 8px rgba(156,175,136,0.3)',
                                      border: '2px solid rgba(255,255,255,0.7)',
                                    }}
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: 'spring', stiffness: 400, delay: 0.2 }}
                                  >
                                    <motion.div
                                      className="absolute inset-0 rounded-full"
                                      style={{ boxShadow: (leftItems[ri]?.highlight) ? '0 0 16px rgba(244,162,97,0.4)' : '0 0 12px rgba(156,175,136,0.3)' }}
                                      animate={{ opacity: [0, 0.8, 0], scale: [1, 1.8, 1] }}
                                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                    />
                                  </motion.div>
                                </div>

                                {/* 右侧 - 探索 */}
                                <div className="flex justify-start">
                                  {rightItems[ri] ? (
                                    <motion.div
                                      className="relative rounded-2xl overflow-hidden w-full max-w-lg"
                                      style={{
                                        background: 'linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 100%)',
                                        backdropFilter: 'blur(12px)',
                                        border: '1px solid rgba(255,255,255,0.4)',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                      }}
                                      initial={{ x: 50, opacity: 0 }}
                                      whileInView={{ x: 0, opacity: 1 }}
                                      viewport={{ once: true }}
                                      transition={{ delay: 0.2, duration: 0.5 }}
                                      whileHover={{ y: -4, boxShadow: '0 20px 50px rgba(156,175,136,0.18), 0 0 0 1px rgba(156,175,136,0.1)', transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                                    >
                                      <div className="p-5">
                                        <h3 className="font-handwriting text-lg text-earthBrown mb-1">{rightItems[ri].title}</h3>
                                        <p className="text-xs text-earthBrown/55 font-rounded leading-relaxed mb-2">{rightItems[ri].desc}</p>
                                        {/* 链接 */}
                                        {(rightItems[ri].link || rightItems[ri].shopLink) && (
                                          <div className="flex flex-wrap gap-3 mb-3">
                                            {rightItems[ri].link && (
                                              <a
                                                href={rightItems[ri].link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs font-rounded text-warmOrange hover:underline transition-colors"
                                                onClick={(e) => e.stopPropagation()}
                                              >
                                                查看详情 →
                                              </a>
                                            )}
                                            {rightItems[ri].shopLink && (
                                              <a
                                                href={rightItems[ri].shopLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs font-rounded text-sageGreen hover:underline transition-colors"
                                                onClick={(e) => e.stopPropagation()}
                                              >
                                                小红书 →
                                              </a>
                                            )}
                                          </div>
                                        )}
                                        {/* 子项目截图网格 */}
                                        {rightItems[ri].projects && (
                                          <div className="grid grid-cols-2 gap-2">
                                            {rightItems[ri].projects.map((proj) => (
                                              <motion.div
                                                key={proj.name}
                                                className="relative rounded-lg overflow-hidden cursor-pointer group/thumb"
                                                style={{ border: '1px solid rgba(255,255,255,0.5)' }}
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                                onClick={() => setLightboxImg(proj.image)}
                                              >
                                                <img
                                                  src={proj.image}
                                                  alt={proj.name}
                                                  className="w-full h-20 object-cover object-top"
                                                />
                                                <div className="absolute inset-0 bg-earthBrown/0 group-hover/thumb:bg-earthBrown/20 transition-colors duration-300 flex items-center justify-center">
                                                  <span className="text-white text-xs font-rounded opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 bg-earthBrown/50 px-2 py-0.5 rounded-full backdrop-blur-sm">
                                                    {proj.name}
                                                  </span>
                                                </div>
                                              </motion.div>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    </motion.div>
                                  ) : <div />}
                                </div>
                              </div>
                            ))}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })()}
            </div>

            {/* 移动端：单列布局 */}
            <div className="md:hidden relative">
              <div
                className="absolute left-8 top-0 bottom-0 w-0.5"
                style={{
                  background: 'repeating-linear-gradient(to bottom, #9CAF88 0px, #9CAF88 8px, transparent 8px, transparent 14px)',
                  filter: 'url(#pencil)',
                }}
              />
              <div className="space-y-8">
                {milestones.map((milestone, i) => (
                  <motion.div
                    key={milestone.period}
                    className="relative pl-20"
                    initial={{ x: 30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <motion.div
                      className="absolute left-4 top-6 w-9 h-9 rounded-full flex items-center justify-center text-base z-10"
                      style={{
                        background: milestone.highlight ? 'linear-gradient(135deg, #FF9B71, #F4A261)' : 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(156,175,136,0.3))',
                        boxShadow: milestone.highlight ? '0 0 16px rgba(244,162,97,0.5)' : '0 2px 8px rgba(0,0,0,0.1)',
                        border: '2px solid rgba(255,255,255,0.6)',
                      }}
                    >
                      {milestone.icon}
                    </motion.div>
                    <motion.div
                      className={`relative rounded-2xl overflow-hidden cursor-pointer ${milestone.highlight ? 'ring-1 ring-warmOrange/20' : ''}`}
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 100%)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255,255,255,0.5)',
                      }}
                      onClick={() => setExpandedMilestone(expandedMilestone === i ? null : i)}
                    >
                      {milestone.highlight && (
                        <motion.div
                          className="absolute top-0 left-0 right-0 h-1"
                          style={{ background: 'linear-gradient(90deg, #FF9B71, #9CAF88, #FF9B71)', backgroundSize: '200% 100%' }}
                          animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
                          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                        />
                      )}
                      <div className="p-5">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className={`px-3 py-1 rounded-lg font-handwriting text-sm ${milestone.highlight ? 'bg-warmOrange/20 text-warmOrange' : 'bg-sageGreen/10 text-earthBrown/70'}`}>
                            {milestone.period}
                          </span>
                          <div>
                            <h3 className="font-handwriting text-lg text-earthBrown">{milestone.company}</h3>
                            <p className="text-xs text-earthBrown/50 font-rounded">{milestone.role}</p>
                          </div>
                        </div>
                        <p className="text-earthBrown/70 font-rounded text-sm leading-relaxed">{milestone.description}</p>
                        <AnimatePresence>
                          {expandedMilestone === i && milestone.achievements && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 space-y-2 overflow-hidden"
                            >
                              {milestone.achievements.map((achievement, j) => (
                                <motion.div
                                  key={j}
                                  className="flex items-start gap-2 text-sm text-earthBrown/80 font-rounded p-2 rounded-lg bg-white/30"
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: j * 0.08 }}
                                >
                                  <span className="text-warmOrange mt-0.5 flex-shrink-0">▸</span>
                                  <span>{achievement}</span>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {milestone.tags.map(tag => (
                            <span key={tag} className={`px-2.5 py-0.5 rounded-full text-xs font-rounded ${milestone.highlight ? 'bg-warmOrange/10 text-warmOrange border border-warmOrange/20' : 'bg-sageGreen/10 text-sageGreen border border-sageGreen/20'}`}>
                              {tag}
                            </span>
                          ))}
                          {milestone.achievements && (
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-rounded text-earthBrown/40 border border-earthBrown/10">
                              {expandedMilestone === i ? '收起 ▴' : '展开详情 ▾'}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* 分隔线 */}
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-sageGreen/30 to-transparent my-12"
            style={{ filter: 'url(#pencil)' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />

          {/* ===== 荣誉墙 ===== */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="font-handwriting text-3xl text-center text-warmOrange mb-12">
              荣誉墙 🏆
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {awards.map((award, i) => (
                <motion.div
                  key={award.title}
                  className="relative p-5 rounded-2xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 100%)',
                    backdropFilter: 'blur(12px)',
                    border: award.gold ? '1px solid rgba(244,162,97,0.3)' : '1px solid rgba(255,255,255,0.4)',
                    boxShadow: award.gold ? '0 8px 32px rgba(244,162,97,0.12)' : '0 4px 16px rgba(0,0,0,0.05)',
                  }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, type: 'spring', stiffness: 200 }}
                  whileHover={{ y: -5, scale: 1.03, boxShadow: '0 16px 40px rgba(244,162,97,0.15)' }}
                >
                  {/* 冠军卡片金色光晕 */}
                  {award.gold && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{ boxShadow: 'inset 0 0 30px rgba(244,162,97,0.15)' }}
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                  <div className="text-3xl mb-3">{award.icon}</div>
                  <h3 className="font-handwriting text-base text-earthBrown mb-1">{award.title}</h3>
                  <p className="text-xs text-earthBrown/50 font-rounded">{award.sub}</p>
                  {/* 角落闪烁星星 */}
                  <motion.span
                    className="absolute top-3 right-3 text-sm"
                    animate={{ opacity: [0.2, 0.6, 0.2], scale: [0.8, 1.1, 0.8] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
                  >✨</motion.span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 分隔线 */}
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-warmOrange/20 to-transparent my-8"
            style={{ filter: 'url(#pencil)' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />

          {/* ===== 兴趣爱好 & 生活状态 ===== */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="pb-8"
          >
            <h2 className="font-handwriting text-3xl text-center text-sageGreen mb-8">
              兴趣爱好 🎯
            </h2>

            {/* 生活状态卡片 */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mb-6">
              {lifeStatus.map((status, i) => {
                const isMusic = status.title === '听歌'
                const flipped = isMusic && (musicHovered || musicPlaying)
                return (
                <motion.div
                  key={status.title}
                  className="relative cursor-pointer"
                  style={{ perspective: 800 }}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                  onMouseEnter={() => isMusic && setMusicHovered(true)}
                  onMouseLeave={() => isMusic && setMusicHovered(false)}
                >
                  <motion.div
                    className="relative w-full"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{ rotateY: flipped ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                  >
                    {/* 正面 — 原卡片 */}
                    <div
                      className="group relative rounded-2xl overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 100%)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255,255,255,0.4)',
                        backfaceVisibility: 'hidden',
                      }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${status.color} rounded-2xl`} />
                      <div className="relative p-5">
                        {status.isImage ? (
                          <motion.div
                            className="w-16 h-16 mb-3 rounded-xl overflow-hidden shadow-lg"
                            whileHover={{ rotate: [0, -5, 5, 0] }}
                            transition={{ duration: 0.4 }}
                          >
                            <img src={status.icon} alt={status.title} className="w-full h-full object-cover" />
                          </motion.div>
                        ) : (
                          <motion.div
                            className="text-4xl mb-3"
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                          >{status.icon}</motion.div>
                        )}
                        <h3 className="font-handwriting text-xl text-earthBrown mb-1">{status.title}</h3>
                        <p className="text-sm text-earthBrown/60 font-rounded">{status.subtitle}</p>
                        <p className="text-xs text-earthBrown/45 mt-2 font-rounded">{status.detail}</p>
                      </div>
                    </div>

                    {/* 背面 — 音乐播放器（仅听歌卡片） */}
                    {isMusic && (
                      <div
                        className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,240,230,0.9) 0%, rgba(255,220,200,0.85) 100%)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255,255,255,0.5)',
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                        }}
                      >
                        <div className="flex flex-col items-center gap-2 p-4 w-full">
                          {/* 旋转唱片 */}
                          <motion.div
                            className="w-14 h-14 rounded-full overflow-hidden shadow-lg ring-2 ring-white/40"
                            animate={musicPlaying ? { rotate: 360 } : {}}
                            transition={musicPlaying ? { duration: 3, repeat: Infinity, ease: 'linear' } : {}}
                          >
                            <img src={imgMusic} alt="album" className="w-full h-full object-cover" />
                          </motion.div>
                          <div className="text-center">
                            <p className="text-sm font-handwriting text-earthBrown">理想三旬</p>
                            <p className="text-[10px] text-earthBrown/50 font-rounded">陈鸿宇</p>
                          </div>
                          {/* 播放/暂停 */}
                          <motion.button
                            className="w-9 h-9 rounded-full flex items-center justify-center shadow-md"
                            style={{ background: 'linear-gradient(135deg, #FF9B71, #F4A261)' }}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => { e.stopPropagation(); toggleMusic() }}
                          >
                            {musicPlaying ? (
                              <svg width="10" height="12" viewBox="0 0 10 12" fill="white">
                                <rect x="1" y="0" width="3" height="12" rx="1" />
                                <rect x="6" y="0" width="3" height="12" rx="1" />
                              </svg>
                            ) : (
                              <svg width="10" height="12" viewBox="0 0 10 12" fill="white">
                                <path d="M1 1 L9 6 L1 11Z" />
                              </svg>
                            )}
                          </motion.button>
                          {/* 进度条 */}
                          <div className="w-4/5 h-1 rounded-full bg-earthBrown/10 overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ width: `${musicProgress}%`, background: 'linear-gradient(90deg, #FF9B71, #F4A261)' }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
                )
              })}
            </div>
          </motion.div>

        </div>
      </div>

      {/* 图片灯箱 */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
          >
            <motion.img
              src={lightboxImg}
              alt="项目预览"
              className="max-w-[90vw] max-h-[85vh] rounded-2xl shadow-2xl object-contain"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            />
            <span className="absolute top-6 right-6 text-white/70 text-sm font-rounded hover:text-white transition-colors">
              点击空白处关闭
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
