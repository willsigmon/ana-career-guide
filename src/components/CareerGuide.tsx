'use client'

import { useState, useEffect, ReactNode, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import {
  ChevronDown,
  Check,
  MapPin,
  Briefcase,
  Heart,
  Star,
  AlertTriangle,
  MessageSquare,
  Sparkles,
  Clock,
  Target,
  ArrowRight,
  BookOpen,
  LucideIcon,
  ExternalLink,
  Music,
} from 'lucide-react'

// Floating Orbs - signature background effect
function FloatingOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Primary orb - warm amber/gold */}
      <div className="absolute w-[600px] h-[600px] -top-48 -right-48 rounded-full bg-amber-500/10 blur-[120px] animate-float-slow" />
      {/* Secondary orb - teal accent */}
      <div className="absolute w-[500px] h-[500px] -bottom-32 -left-32 rounded-full bg-teal-500/8 blur-[100px] animate-float-reverse" />
      {/* Tertiary orb - warm rose */}
      <div className="absolute w-[300px] h-[300px] top-1/2 right-1/4 rounded-full bg-rose-500/6 blur-[80px] animate-morph" />
      {/* Small accent */}
      <div className="absolute w-[200px] h-[200px] top-1/4 left-1/3 rounded-full bg-amber-400/5 blur-[60px] animate-float" />
    </div>
  )
}

// Floating particles for sections
function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{ left: number; top: number; duration: number; delay: number }>>([])

  useEffect(() => {
    setParticles(
      [...Array(12)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      }))
    )
  }, [])

  if (particles.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-amber-400/20 rounded-full"
          style={{ left: `${particle.left}%`, top: `${particle.top}%` }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// FadeIn component with blur - sigstack style
function FadeIn({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: '-30px' }}
    >
      {children}
    </motion.div>
  )
}

// Magnetic hover effect for interactive elements
function MagneticCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.05)
    y.set((e.clientY - centerY) * 0.05)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}

interface TaskProps {
  id: string
  children: ReactNode
  priority?: 'high' | 'normal'
  completedTasks: Record<string, boolean>
  toggleTask: (id: string) => void
}

interface SectionProps {
  id: string
  icon: LucideIcon
  title: string
  children: ReactNode
  badge?: string
  expandedSections: Record<string, boolean>
  toggleSection: (section: string) => void
  accentColor?: 'amber' | 'teal' | 'rose' | 'violet'
}

interface JobCardProps {
  title: string
  location: string
  distance: string
  urgent?: boolean
  note?: string
  type?: string
}

interface WeeklyFocus {
  week: number
  focus: string
  tasks: string[]
}

const Task = ({ id, children, priority, completedTasks, toggleTask }: TaskProps) => (
  <motion.div
    onClick={() => toggleTask(id)}
    className={`group relative flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all border backdrop-blur-sm overflow-hidden ${
      completedTasks[id]
        ? 'bg-teal-500/10 border-teal-500/20'
        : priority === 'high'
          ? 'bg-amber-500/5 border-amber-500/20 hover:bg-amber-500/10'
          : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06]'
    }`}
    whileHover={{ scale: 1.01, y: -2 }}
    whileTap={{ scale: 0.99 }}
    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
  >
    {/* Shimmer on hover */}
    <motion.div
      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 opacity-0 group-hover:opacity-100"
      whileHover={{ translateX: '200%' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    />

    <div className={`relative flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 transition-all ${
      completedTasks[id]
        ? 'bg-teal-500 border-teal-500 shadow-lg shadow-teal-500/30'
        : priority === 'high'
          ? 'border-amber-400/60'
          : 'border-stone-500/40'
    }`}>
      {completedTasks[id] && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
    </div>
    <div className="relative flex-1">
      <span className={`leading-relaxed ${completedTasks[id] ? 'line-through text-stone-500' : 'text-stone-200'}`}>{children}</span>
      {priority === 'high' && !completedTasks[id] && (
        <span className="ml-3 px-2 py-0.5 text-[10px] font-bold text-amber-300 bg-amber-500/20 rounded-full uppercase tracking-wider">
          Priority
        </span>
      )}
    </div>
  </motion.div>
)

const Section = ({ id, icon: Icon, title, children, badge, expandedSections, toggleSection, accentColor = 'amber' }: SectionProps) => {
  const colors = {
    amber: { bg: 'from-amber-500/20 to-amber-600/10', icon: 'text-amber-400', border: 'border-amber-500/20' },
    teal: { bg: 'from-teal-500/20 to-teal-600/10', icon: 'text-teal-400', border: 'border-teal-500/20' },
    rose: { bg: 'from-rose-500/20 to-rose-600/10', icon: 'text-rose-400', border: 'border-rose-500/20' },
    violet: { bg: 'from-violet-500/20 to-violet-600/10', icon: 'text-violet-400', border: 'border-violet-500/20' },
  }
  const color = colors[accentColor]

  return (
    <FadeIn>
      <motion.div
        className="glass-card rounded-3xl overflow-hidden mb-5"
        initial={false}
        whileHover={{ y: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <button
          onClick={() => toggleSection(id)}
          className="w-full flex items-center gap-4 p-6 text-left transition-all hover:bg-white/[0.02]"
        >
          <div className={`flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${color.bg} border ${color.border}`}>
            <Icon className={`w-5 h-5 ${color.icon}`} />
          </div>
          <span className="font-semibold text-stone-100 flex-1 text-lg">{title}</span>
          {badge && (
            <span className="text-xs font-medium text-stone-400 bg-white/[0.06] px-3 py-1.5 rounded-full border border-white/[0.08]">
              {badge}
            </span>
          )}
          <motion.div
            animate={{ rotate: expandedSections[id] ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <ChevronDown className="w-5 h-5 text-stone-500" />
          </motion.div>
        </button>
        <AnimatePresence>
          {expandedSections[id] && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pt-2 space-y-4">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </FadeIn>
  )
}

const JobCard = ({ title, location, distance, urgent, note, type }: JobCardProps) => (
  <MagneticCard>
    <motion.div
      className={`p-5 rounded-2xl border backdrop-blur-sm transition-all ${
        urgent
          ? 'border-amber-500/30 bg-amber-500/5'
          : 'border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05]'
      }`}
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h4 className="font-semibold text-stone-100">{title}</h4>
          <div className="flex items-center gap-2 text-sm text-stone-400 mt-2 flex-wrap">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
            <span className="text-stone-600">·</span>
            <span>{distance}</span>
            {type && (
              <>
                <span className="text-stone-600">·</span>
                <span className="text-stone-300">{type}</span>
              </>
            )}
          </div>
          {note && <p className="text-sm text-stone-500 mt-3">{note}</p>}
        </div>
        {urgent && (
          <span className="px-3 py-1 bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-300 text-xs font-bold rounded-full border border-amber-500/30 uppercase tracking-wide">
            Urgent
          </span>
        )}
      </div>
    </motion.div>
  </MagneticCard>
)

export default function CareerGuide() {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({})
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    welcome: true,
    strengths: false,
    reframe: false,
    lookingFor: false,
    interview: false,
    redFlags: false,
    practical: false,
    legacy: false,
    jobs: false,
    weekly: false,
  })
  const [currentTip, setCurrentTip] = useState(0)
  const [isClient, setIsClient] = useState(false)

  const tips = [
    "Six years of consistent worship leadership is significant experience—that's not a starting point, it's a foundation.",
    "Your musical theatre training provides stage presence and vocal technique that many worship leaders spend years developing.",
    "Building student worship teams from scratch demonstrates the exact skills churches need: recruitment, training, and development.",
    "The timeline to March 1st is intentional. Six focused weeks can accomplish remarkable things.",
    "Legacy Church has observed your character over years. That continuity of witness matters deeply to church leadership.",
    "Each application, regardless of outcome, refines your presentation and clarifies your calling.",
    "Seeking alignment between your gifts and vocation isn't abandonment—it's stewardship.",
  ]

  useEffect(() => {
    setIsClient(true)
    try {
      const saved = localStorage.getItem('ana-career-tasks')
      if (saved) setCompletedTasks(JSON.parse(saved))
    } catch { /* ignore */ }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTip((prev) => (prev + 1) % tips.length), 15000)
    return () => clearInterval(timer)
  }, [tips.length])

  useEffect(() => {
    if (!isClient) return
    try { localStorage.setItem('ana-career-tasks', JSON.stringify(completedTasks)) } catch { /* ignore */ }
  }, [completedTasks, isClient])

  const toggleTask = (id: string) => setCompletedTasks((prev) => ({ ...prev, [id]: !prev[id] }))
  const toggleSection = (section: string) => setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))

  const completedCount = Object.values(completedTasks).filter(Boolean).length
  const totalTasks = 24
  const progress = Math.round((completedCount / totalTasks) * 100)

  const getWeeklyFocus = (): WeeklyFocus => {
    const startDate = new Date('2026-01-19')
    const now = new Date()
    const week = Math.ceil((now.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1
    const weeks: WeeklyFocus[] = [
      { week: 1, focus: 'Resume & Applications', tasks: ['Finalize resume', 'Apply to Legacy Church', 'Apply to 2-3 other positions'] },
      { week: 2, focus: 'Demo & Materials', tasks: ['Record worship demo', 'Get video of leading congregation', 'Write theology of worship'] },
      { week: 3, focus: 'Network & Follow Up', tasks: ['Follow up on applications', 'Reach out to references', 'Connect with church contacts'] },
      { week: 4, focus: 'Interview Prep', tasks: ['Practice interview answers', 'Prepare questions to ask', 'Research each church deeply'] },
      { week: 5, focus: 'Interviews & Decisions', tasks: ['Attend interviews', 'Send thank you notes', 'Pray and discern'] },
      { week: 6, focus: 'Final Steps', tasks: ['Negotiate if needed', 'Give notice at school', 'Prepare for transition'] },
    ]
    return weeks[Math.min(Math.max(week - 1, 0), 5)]
  }

  const weeklyFocus = getWeeklyFocus()
  const currentWeek = Math.ceil((new Date().getTime() - new Date('2026-01-19').getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1
  const taskProps = { completedTasks, toggleTask }
  const sectionProps = { expandedSections, toggleSection }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 relative overflow-hidden">
      {/* Animated Background */}
      <FloatingOrbs />

      {/* Grid pattern overlay */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Breathing gradient overlay */}
      <div className="fixed inset-0 -z-10 animate-breathe">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/5 via-transparent to-teal-900/5" />
      </div>

      <div className="relative max-w-2xl mx-auto px-5 py-16 md:py-20">
        {/* Header */}
        <motion.header
          className="text-center mb-14 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <FloatingParticles />

          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 mb-8 relative"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Music className="w-9 h-9 text-amber-400" />
            {/* Glow */}
            <div className="absolute inset-0 rounded-3xl bg-amber-500/20 blur-xl -z-10 animate-pulse-glow" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-stone-100 via-amber-100 to-stone-200 bg-clip-text text-transparent">
              Career Guide
            </span>
          </h1>
          <p className="text-stone-400 text-lg">Your roadmap to full-time worship ministry</p>
        </motion.header>

        {/* Rotating Insight - Glass card */}
        <FadeIn delay={0.1}>
          <div className="glass-card rounded-3xl p-6 mb-8 relative overflow-hidden">
            {/* Animated gradient border effect */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentTip}
                  className="text-stone-300 leading-relaxed"
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                  transition={{ duration: 0.4 }}
                >
                  {tips[currentTip]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </FadeIn>

        {/* Progress */}
        <FadeIn delay={0.2}>
          <div className="glass-card rounded-3xl p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium text-stone-300">Progress</span>
              <span className="text-sm text-stone-500">
                {completedCount} of {totalTasks}
              </span>
            </div>
            <div className="h-3 bg-stone-800/50 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                className="h-full bg-gradient-to-r from-teal-500 via-teal-400 to-emerald-400 rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
                />
              </motion.div>
            </div>
            {progress > 0 && (
              <motion.p
                className="text-center text-stone-500 text-sm mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {progress === 100
                  ? 'Preparation complete. Trust the process.'
                  : progress >= 75 ? 'Excellent progress. Final steps ahead.'
                  : progress >= 50 ? 'Solid momentum. Keep building.'
                  : progress >= 25 ? 'Good foundation established.'
                  : 'Every completed task matters.'}
              </motion.p>
            )}
          </div>
        </FadeIn>

        {/* Weekly Focus */}
        <Section
          id="weekly"
          icon={Target}
          title={`This Week: ${weeklyFocus.focus}`}
          badge={`Week ${Math.min(Math.max(currentWeek, 1), 6)}`}
          accentColor="teal"
          {...sectionProps}
        >
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 mb-4">
            <p className="text-stone-300 font-medium mb-4">Current priorities:</p>
            <ul className="space-y-3">
              {weeklyFocus.tasks.map((task, i) => (
                <li key={i} className="flex items-center gap-3 text-stone-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  {task}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-start gap-4 p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl">
            <Clock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-200 font-medium">March 1 Target</p>
              <p className="text-amber-200/60 text-sm mt-1">
                Maintain focus without rushing discernment. The right fit matters more than speed.
              </p>
            </div>
          </div>
        </Section>

        {/* Welcome Section */}
        <Section id="welcome" icon={Heart} title="Welcome" accentColor="rose" {...sectionProps}>
          <div className="space-y-4 text-stone-400 leading-relaxed">
            <p>This guide was created to support your transition from education to full-time worship ministry.</p>
            <p>
              <span className="text-stone-200">Important context:</span> You bring six years of consistent worship leadership experience.
              The environment is changing, but the calling you&apos;ve been cultivating is not new.
            </p>
            <p>Track your progress through this interactive checklist. Your data saves automatically.</p>
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 mt-6">
              <p className="text-stone-300 font-medium mb-4">How to use this guide:</p>
              <ul className="space-y-3 text-sm text-stone-400">
                {[
                  'Expand sections to explore each topic',
                  'Check off tasks as you complete them',
                  'Review weekly to maintain momentum',
                  'Progress is saved automatically',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-teal-400" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Strengths */}
        <Section id="strengths" icon={Star} title="Your Qualifications" badge="Reference" accentColor="amber" {...sectionProps}>
          <p className="text-stone-400 mb-5">When self-doubt surfaces, review these concrete qualifications:</p>
          <div className="space-y-3">
            {[
              { title: 'Consistent Leadership', desc: 'Six years of weekly worship leading—not occasional fill-ins' },
              { title: 'Team Development', desc: 'Recruited, trained, and developed student worship teams' },
              { title: 'Age Range Flexibility', desc: 'Experience leading elementary through high school' },
              { title: 'Instrumental Versatility', desc: 'Proficiency in both guitar and piano leadership' },
              { title: 'Formal Training', desc: 'Musical theatre degree with vocal and performance training' },
              { title: 'Global Perspective', desc: 'International missions experience in Italy and Guatemala' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-4 p-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-amber-500/30" />
                <div>
                  <span className="text-stone-200 font-medium">{item.title}</span>
                  <span className="text-stone-500"> — {item.desc}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Reframe */}
        <Section id="reframe" icon={MessageSquare} title="Translating Your Experience" accentColor="violet" {...sectionProps}>
          <p className="text-stone-400 mb-5">Use language that resonates with church search committees:</p>
          <div className="space-y-4">
            {[
              { from: 'Led chapel services', to: 'Planned and led weekly corporate worship for 200-500 attendees' },
              { from: 'Ran the student praise band', to: 'Recruited, auditioned, trained, and directed volunteer worship teams' },
              { from: 'Taught music', to: 'Discipled musicians in both craft and spiritual formation' },
              { from: 'Worked with the principal', to: 'Partnered with senior leadership to align worship with organizational vision' },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl">
                <p className="text-stone-500 text-sm mb-2">Instead of: &quot;{item.from}&quot;</p>
                <p className="text-stone-200 flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-violet-400" />
                  &quot;{item.to}&quot;
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Task id="practice-language" {...taskProps}>Practice articulating these translations aloud</Task>
          </div>
        </Section>

        {/* What They Want */}
        <Section id="lookingFor" icon={Briefcase} title="What Churches Prioritize" accentColor="teal" {...sectionProps}>
          <p className="text-stone-400 mb-5">Search committees typically evaluate candidates in this order:</p>
          <div className="space-y-3">
            {[
              { num: 1, title: 'Spiritual Maturity', desc: 'Minister first, musician second' },
              { num: 2, title: 'Team Leadership', desc: 'Ability to build, lead, and pastor volunteers' },
              { num: 3, title: 'Theological Alignment', desc: 'Shared convictions about worship philosophy' },
              { num: 4, title: 'Musical Competence', desc: 'Confident leadership from primary instrument' },
              { num: 5, title: 'Collaborative Spirit', desc: 'Healthy working relationship with senior pastor' },
              { num: 6, title: 'Humility', desc: 'Self-awareness without self-promotion' },
            ].map((item) => (
              <div key={item.num} className="flex items-start gap-4 p-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl">
                <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500/20 to-teal-600/10 border border-teal-500/20 flex items-center justify-center text-teal-400 font-bold text-sm">
                  {item.num}
                </span>
                <div>
                  <span className="text-stone-200 font-medium">{item.title}</span>
                  <span className="text-stone-500"> — {item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Interview Prep */}
        <Section id="interview" icon={BookOpen} title="Interview Preparation" accentColor="violet" {...sectionProps}>
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 mb-5">
            <p className="text-stone-300 font-medium mb-4">Anticipate these questions:</p>
            <ul className="space-y-3 text-stone-400">
              {[
                'What is your theology of worship?',
                'How do you approach traditional vs. contemporary balance?',
                'Describe a challenging team situation and your response.',
                'How do you approach discipleship within worship ministry?',
                'Why are you transitioning from education to church ministry?',
              ].map((q, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-violet-400">•</span>
                  {q}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 mb-5">
            <p className="text-stone-300 font-medium mb-4">Questions to ask them:</p>
            <ul className="space-y-3 text-stone-400">
              {[
                'What does a typical week look like in this role?',
                'How does worship planning collaboration work with senior leadership?',
                'What is the current state of the worship ministry and volunteer team?',
                'How would you define success in this role after one year?',
                'How does the church navigate worship style disagreements?',
              ].map((q, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-violet-400">•</span>
                  {q}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <Task id="write-theology" {...taskProps}>Write theology of worship document (1 page)</Task>
            <Task id="prep-story" {...taskProps}>Prepare challenging team situation narrative</Task>
            <Task id="why-leaving" {...taskProps}>Articulate education-to-ministry transition rationale</Task>
          </div>
        </Section>

        {/* Red Flags */}
        <Section id="redFlags" icon={AlertTriangle} title="Warning Signs" accentColor="rose" {...sectionProps}>
          <p className="text-stone-400 mb-5">Maintain discernment despite urgency:</p>
          <div className="space-y-3">
            {[
              'Vague role expectations or "we\'ll figure it out" mentality',
              'High turnover—always inquire about predecessor tenure',
              'Senior pastor micromanagement of worship decisions',
              'No budget allocated for equipment, training, or team development',
              'Congregation deeply divided on worship style',
              'Below-market compensation justified by "ministry mindset" framing',
            ].map((flag, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-rose-500/5 border border-rose-500/20 rounded-2xl">
                <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <span className="text-rose-200/80">{flag}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Practical Action Items */}
        <Section id="practical" icon={Check} title="Action Checklist" accentColor="teal" {...sectionProps}>
          <p className="text-stone-400 mb-5">Complete these to be fully prepared:</p>

          <p className="font-medium text-stone-300 mt-6 mb-3 text-sm uppercase tracking-wide">Materials</p>
          <div className="space-y-2">
            <Task id="resume" priority="high" {...taskProps}>Finalize one-page resume</Task>
            <Task id="demo" {...taskProps}>Record 3-4 song worship demo</Task>
            <Task id="video" priority="high" {...taskProps}>Obtain video of leading congregational worship</Task>
            <Task id="theology" {...taskProps}>Write theology of worship statement</Task>
          </div>

          <p className="font-medium text-stone-300 mt-8 mb-3 text-sm uppercase tracking-wide">References</p>
          <div className="space-y-2">
            <Task id="ref-pastor" {...taskProps}>Secure pastoral reference</Task>
            <Task id="ref-worship" {...taskProps}>Secure fellow worship leader reference</Task>
            <Task id="ref-disciple" {...taskProps}>Secure reference from someone you&apos;ve mentored</Task>
          </div>

          <p className="font-medium text-stone-300 mt-8 mb-3 text-sm uppercase tracking-wide">Applications</p>
          <div className="space-y-2">
            <Task id="apply-legacy" priority="high" {...taskProps}>Submit Legacy Church application</Task>
            <Task id="apply-3" {...taskProps}>Submit applications to 3+ additional positions</Task>
            <Task id="alerts" {...taskProps}>Configure job alerts on Indeed and ChurchStaffing</Task>
          </div>

          <p className="font-medium text-stone-300 mt-8 mb-3 text-sm uppercase tracking-wide">Research</p>
          <div className="space-y-2">
            <Task id="salary" {...taskProps}>Research salary expectations ($40k-$65k NC range)</Task>
            <Task id="linkedin" {...taskProps}>Update LinkedIn for worship ministry positioning</Task>
          </div>
        </Section>

        {/* Legacy Church */}
        <Section id="legacy" icon={Heart} title="Legacy Church Considerations" accentColor="rose" {...sectionProps}>
          <p className="text-stone-400 mb-5">As your home church, this opportunity has distinct advantages:</p>
          <div className="space-y-2 mb-6">
            {[
              'Existing knowledge of culture, congregation, and leadership',
              'Demonstrated character over time, not just interview presentation',
              'Established relationships with potential team members',
              'Authentic connection to the church\'s mission',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-teal-500/5 border border-teal-500/20 rounded-xl">
                <Check className="w-4 h-4 text-teal-400 flex-shrink-0 mt-1" />
                <span className="text-teal-200/80">{item}</span>
              </div>
            ))}
          </div>

          <p className="text-stone-400 mb-4 font-medium">Navigate these dynamics:</p>
          <div className="space-y-2">
            {[
              'Relational dynamics shift when transitioning to staff',
              'Some may need time adjusting to your leadership role',
              'Conduct thorough expectation conversations before acceptance',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                <ArrowRight className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1" />
                <span className="text-amber-200/80">{item}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Job Listings */}
        <Section id="jobs" icon={MapPin} title="Current Openings" badge="16 positions" accentColor="teal" {...sectionProps}>
          <p className="text-stone-400 mb-5">Organized by distance from Charlotte:</p>

          <div className="mb-6">
            <h4 className="text-sm font-medium text-stone-500 uppercase tracking-wide mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-teal-400 rounded-full shadow-lg shadow-teal-500/30"></span>
              Charlotte Metro (0-15 mi)
            </h4>
            <div className="space-y-3">
              <JobCard
                title="Pastor of Worship Ministries — Legacy Church"
                location="Gastonia, NC"
                distance="Home church"
                type="Full-Time"
                note="Primary target → livelegacy.org/job"
              />
              <JobCard title="Worship Pastor — ONE39 Church" location="Charlotte, NC" distance="~5 mi" type="Full-Time" />
              <JobCard title="Director of Contemporary Music — Covenant Presbyterian" location="Charlotte, NC" distance="~8 mi" type="Full-Time" />
              <JobCard title="Worship Leader/Coordinator — Revelation Truth Center" location="West Charlotte, NC" distance="~10 mi" />
              <JobCard
                title="Minister of Music — Mt. Lebanon Baptist"
                location="Mint Hill, NC"
                distance="~12 mi"
                urgent={true}
                note="Current minister retiring May 2026"
              />
              <JobCard title="Part-Time Worship Leader — Wilson Grove Baptist" location="Mint Hill, NC" distance="~12 mi" type="Part-Time" />
              <JobCard title="Director of Worship — Huntersville Presbyterian" location="Huntersville, NC" distance="~13 mi" />
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-medium text-stone-500 uppercase tracking-wide mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-violet-400 rounded-full shadow-lg shadow-violet-500/30"></span>
              Surrounding Area (15-40 mi)
            </h4>
            <div className="space-y-3">
              <JobCard title="Music Director — New Hope Presbyterian" location="Gastonia, NC" distance="~20 mi" type="Full-Time" />
              <JobCard title="Worship Pastor — Impact Church" location="Rock Hill, SC" distance="~23 mi" type="Full-Time" note="Across state line" />
              <JobCard title="Associate Pastor of Worship — First Reformed" location="Landis, NC" distance="~26 mi" type="Full-Time" />
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-medium text-stone-500 uppercase tracking-wide mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-rose-400 rounded-full shadow-lg shadow-rose-500/30"></span>
              Wider NC (Relocation)
            </h4>
            <div className="space-y-3">
              <JobCard title="Director of Modern Worship and Youth — Trinity Reformed" location="Conover, NC" distance="~50 mi" note="Combined worship + youth" />
              <JobCard title="Worship Pastor — Bethany Baptist" location="Wendell, NC" distance="~140 mi" />
              <JobCard title="Pastor for Music and Worship — First Baptist" location="Asheville, NC" distance="~120 mi" />
            </div>
          </div>

          <div className="p-5 bg-white/[0.03] border border-white/[0.08] rounded-2xl">
            <p className="text-stone-300 font-medium mb-3">Job search resources:</p>
            <ul className="space-y-2 text-sm text-stone-400">
              <li className="flex items-center gap-2"><ExternalLink className="w-3 h-3" /> ChurchStaffing.com</li>
              <li className="flex items-center gap-2"><ExternalLink className="w-3 h-3" /> JustChurchJobs.com</li>
              <li className="flex items-center gap-2"><ExternalLink className="w-3 h-3" /> Indeed.com — &quot;worship pastor&quot;</li>
              <li className="flex items-center gap-2"><ExternalLink className="w-3 h-3" /> metrolina.org/job-listings</li>
            </ul>
          </div>

          <div className="mt-4">
            <Task id="set-alerts" {...taskProps}>Configure job alerts on primary platforms</Task>
          </div>
        </Section>

        {/* Final Section */}
        <FadeIn delay={0.1}>
          <div className="glass-card rounded-3xl p-6 mt-8">
            <h4 className="font-semibold text-stone-200 mb-4 flex items-center gap-3">
              <ArrowRight className="w-5 h-5 text-amber-400" />
              Before closing this session
            </h4>
            <div className="space-y-2">
              <Task id="read-all" {...taskProps}>Review all sections at least once</Task>
              <Task id="pray" {...taskProps}>Discern which positions to prioritize</Task>
              <Task id="one-thing" {...taskProps}>Complete one action item today</Task>
            </div>
          </div>
        </FadeIn>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-white/[0.06] text-center">
          <p className="text-stone-600 text-sm">
            Created with care by Will + Claude
          </p>
        </footer>
      </div>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.05); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translate(0, 0) scale(1.1); }
          50% { transform: translate(-20px, 30px) scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes morph {
          0%, 100% { transform: scale(1) rotate(0deg); border-radius: 60% 40% 30% 70%/60% 30% 70% 40%; }
          50% { transform: scale(1.1) rotate(5deg); border-radius: 30% 60% 70% 40%/50% 60% 30% 60%; }
        }
        @keyframes breathe {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-float-slow { animation: float-slow 12s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 14s ease-in-out infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-morph { animation: morph 10s ease-in-out infinite; }
        .animate-breathe { animation: breathe 8s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }

        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
      `}</style>
    </div>
  )
}
