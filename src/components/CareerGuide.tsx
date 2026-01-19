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
  Home,
  FileText,
  Users,
  Search,
  Menu,
  X,
  ChevronRight,
  Flame,
  TrendingUp,
  Calendar,
} from 'lucide-react'

// Floating Orbs - signature background effect
function FloatingOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute w-[600px] h-[600px] -top-48 -right-48 rounded-full bg-amber-500/10 blur-[120px] animate-float-slow" />
      <div className="absolute w-[500px] h-[500px] -bottom-32 -left-32 rounded-full bg-teal-500/8 blur-[100px] animate-float-reverse" />
      <div className="absolute w-[300px] h-[300px] top-1/2 right-1/4 rounded-full bg-rose-500/6 blur-[80px] animate-morph" />
      <div className="absolute w-[200px] h-[200px] top-1/4 left-1/3 rounded-full bg-amber-400/5 blur-[60px] animate-float" />
    </div>
  )
}

// FadeIn component with blur
function FadeIn({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

// Magnetic hover effect
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
    x.set((e.clientX - centerX) * 0.03)
    y.set((e.clientY - centerY) * 0.03)
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

// Types
type ViewType = 'dashboard' | 'preparation' | 'jobs' | 'checklist' | 'resources'
type AccentColor = 'amber' | 'teal' | 'rose' | 'violet'

interface NavItem {
  id: ViewType
  label: string
  icon: LucideIcon
  badge?: string
}

interface TaskProps {
  id: string
  children: ReactNode
  priority?: 'high' | 'normal'
  completedTasks: Record<string, boolean>
  toggleTask: (id: string) => void
}

interface JobCardProps {
  title: string
  location: string
  distance: string
  urgent?: boolean
  note?: string
  type?: string
}

// Task Component
const Task = ({ id, children, priority, completedTasks, toggleTask }: TaskProps) => (
  <motion.div
    onClick={() => toggleTask(id)}
    className={`group relative flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all border backdrop-blur-sm overflow-hidden ${
      completedTasks[id]
        ? 'bg-teal-500/10 border-teal-500/20'
        : priority === 'high'
          ? 'bg-amber-500/5 border-amber-500/20 hover:bg-amber-500/10'
          : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
    }`}
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    tabIndex={0}
    role="checkbox"
    aria-checked={completedTasks[id]}
  >
    <div className={`relative flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 transition-all ${
      completedTasks[id]
        ? 'bg-teal-500 border-teal-500'
        : priority === 'high'
          ? 'border-amber-400/60'
          : 'border-stone-500/40'
    }`}>
      {completedTasks[id] && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
    </div>
    <div className="relative flex-1">
      <span className={`leading-relaxed text-sm ${completedTasks[id] ? 'line-through text-stone-500' : 'text-stone-300'}`}>{children}</span>
      {priority === 'high' && !completedTasks[id] && (
        <span className="ml-2 px-2 py-0.5 text-[10px] font-bold text-amber-300 bg-amber-500/20 rounded-full uppercase tracking-wider">
          Priority
        </span>
      )}
    </div>
  </motion.div>
)

// Job Card Component
const JobCard = ({ title, location, distance, urgent, note, type }: JobCardProps) => (
  <MagneticCard>
    <motion.div
      className={`p-4 rounded-2xl border backdrop-blur-sm transition-all ${
        urgent
          ? 'border-amber-500/30 bg-amber-500/5'
          : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]'
      }`}
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-stone-200 text-sm truncate">{title}</h4>
          <div className="flex items-center gap-2 text-xs text-stone-500 mt-1.5 flex-wrap">
            <MapPin className="w-3 h-3" />
            <span>{location}</span>
            <span className="text-stone-700">·</span>
            <span>{distance}</span>
            {type && (
              <>
                <span className="text-stone-700">·</span>
                <span className="text-stone-400">{type}</span>
              </>
            )}
          </div>
          {note && <p className="text-xs text-stone-600 mt-2">{note}</p>}
        </div>
        {urgent && (
          <span className="flex-shrink-0 px-2 py-1 bg-amber-500/20 text-amber-300 text-[10px] font-bold rounded-full uppercase">
            Urgent
          </span>
        )}
      </div>
    </motion.div>
  </MagneticCard>
)

// Stat Card Component
function StatCard({ icon: Icon, label, value, color, onClick }: {
  icon: LucideIcon
  label: string
  value: string | number
  color: AccentColor
  onClick?: () => void
}) {
  const colors = {
    amber: 'from-amber-500/20 to-amber-600/10 border-amber-500/20 text-amber-400',
    teal: 'from-teal-500/20 to-teal-600/10 border-teal-500/20 text-teal-400',
    rose: 'from-rose-500/20 to-rose-600/10 border-rose-500/20 text-rose-400',
    violet: 'from-violet-500/20 to-violet-600/10 border-violet-500/20 text-violet-400',
  }

  return (
    <MagneticCard className="h-full">
      <motion.div
        className={`glass-card rounded-2xl p-5 h-full ${onClick ? 'cursor-pointer' : ''}`}
        whileHover={{ y: -3, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        onClick={onClick}
      >
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colors[color]} border flex items-center justify-center mb-3`}>
          <Icon className="w-5 h-5" />
        </div>
        <p className="text-2xl font-bold text-stone-100">{value}</p>
        <p className="text-sm text-stone-500 mt-1">{label}</p>
      </motion.div>
    </MagneticCard>
  )
}

// Quick Action Card
function QuickAction({ icon: Icon, label, description, color, onClick }: {
  icon: LucideIcon
  label: string
  description: string
  color: AccentColor
  onClick: () => void
}) {
  const colors = {
    amber: 'hover:border-amber-500/30 group-hover:text-amber-400',
    teal: 'hover:border-teal-500/30 group-hover:text-teal-400',
    rose: 'hover:border-rose-500/30 group-hover:text-rose-400',
    violet: 'hover:border-violet-500/30 group-hover:text-violet-400',
  }

  return (
    <motion.button
      className={`group glass-card rounded-2xl p-4 text-left w-full border border-white/[0.06] ${colors[color]} transition-all`}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-stone-500 transition-colors" />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-stone-200 text-sm">{label}</p>
          <p className="text-xs text-stone-500 truncate">{description}</p>
        </div>
        <ChevronRight className="w-4 h-4 text-stone-600 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.button>
  )
}

// Sidebar Navigation
function Sidebar({
  currentView,
  setCurrentView,
  progress,
  isOpen,
  setIsOpen
}: {
  currentView: ViewType
  setCurrentView: (view: ViewType) => void
  progress: number
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}) {
  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'preparation', label: 'Preparation', icon: FileText },
    { id: 'jobs', label: 'Job Openings', icon: Search, badge: '16' },
    { id: 'checklist', label: 'Action Items', icon: Check },
    { id: 'resources', label: 'Resources', icon: BookOpen },
  ]

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed top-0 left-0 h-full w-72 bg-stone-950/95 backdrop-blur-xl border-r border-white/[0.06] z-50 flex flex-col
          lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative transition-transform duration-300`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 flex items-center justify-center">
              <Music className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h1 className="font-bold text-stone-100">Career Guide</h1>
              <p className="text-xs text-stone-500">Worship Ministry</p>
            </div>
          </div>
          <button
            className="lg:hidden absolute top-6 right-4 p-2 text-stone-400 hover:text-stone-200"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress */}
        <div className="p-4 mx-4 mt-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-stone-400">Progress</span>
            <span className="text-xs text-stone-500">{progress}%</span>
          </div>
          <div className="h-2 bg-stone-800/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => {
                setCurrentView(item.id)
                setIsOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                currentView === item.id
                  ? 'bg-white/[0.08] text-stone-100'
                  : 'text-stone-400 hover:bg-white/[0.04] hover:text-stone-200'
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <item.icon className="w-5 h-5" />
              <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
              {item.badge && (
                <span className="px-2 py-0.5 text-[10px] font-bold bg-teal-500/20 text-teal-400 rounded-full">
                  {item.badge}
                </span>
              )}
            </motion.button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
            <Clock className="w-4 h-4 text-amber-400" />
            <div>
              <p className="text-xs font-medium text-amber-200">Target: March 1</p>
              <p className="text-[10px] text-amber-200/50">Stay focused</p>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  )
}

// Dashboard View
function DashboardView({
  completedTasks,
  totalTasks,
  setCurrentView,
  tips,
  currentTip
}: {
  completedTasks: Record<string, boolean>
  totalTasks: number
  setCurrentView: (view: ViewType) => void
  tips: string[]
  currentTip: number
}) {
  const completedCount = Object.values(completedTasks).filter(Boolean).length
  const progress = Math.round((completedCount / totalTasks) * 100)

  const getWeeklyFocus = () => {
    const startDate = new Date('2026-01-19')
    const now = new Date()
    const week = Math.ceil((now.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1
    const weeks = [
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
  const currentWeek = Math.min(Math.max(Math.ceil((new Date().getTime() - new Date('2026-01-19').getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1, 1), 6)

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <FadeIn>
        <div className="glass-card rounded-3xl p-6 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-amber-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-stone-100 mb-1">Welcome back</h2>
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentTip}
                  className="text-stone-400 text-sm leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  {tips[currentTip]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Stats Grid */}
      <FadeIn delay={0.1}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Check}
            label="Tasks Done"
            value={`${completedCount}/${totalTasks}`}
            color="teal"
            onClick={() => setCurrentView('checklist')}
          />
          <StatCard
            icon={TrendingUp}
            label="Progress"
            value={`${progress}%`}
            color="amber"
          />
          <StatCard
            icon={Search}
            label="Open Positions"
            value="16"
            color="violet"
            onClick={() => setCurrentView('jobs')}
          />
          <StatCard
            icon={Calendar}
            label="Current Week"
            value={currentWeek}
            color="rose"
          />
        </div>
      </FadeIn>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Focus */}
        <FadeIn delay={0.2}>
          <div className="glass-card rounded-3xl p-6 h-full">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500/20 to-teal-600/10 border border-teal-500/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-teal-400" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-100">Week {currentWeek}: {weeklyFocus.focus}</h3>
                <p className="text-xs text-stone-500">Current priorities</p>
              </div>
            </div>
            <div className="space-y-3">
              {weeklyFocus.tasks.map((task, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span className="text-sm text-stone-300">{task}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Quick Actions */}
        <FadeIn delay={0.3}>
          <div className="glass-card rounded-3xl p-6 h-full">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 flex items-center justify-center">
                <Flame className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-100">Quick Actions</h3>
                <p className="text-xs text-stone-500">Jump to sections</p>
              </div>
            </div>
            <div className="space-y-2">
              <QuickAction
                icon={FileText}
                label="Review Materials"
                description="Resume, demo, references"
                color="teal"
                onClick={() => setCurrentView('preparation')}
              />
              <QuickAction
                icon={Search}
                label="Browse Jobs"
                description="16 open positions"
                color="violet"
                onClick={() => setCurrentView('jobs')}
              />
              <QuickAction
                icon={Check}
                label="Action Checklist"
                description={`${completedCount} of ${totalTasks} complete`}
                color="amber"
                onClick={() => setCurrentView('checklist')}
              />
              <QuickAction
                icon={BookOpen}
                label="Interview Prep"
                description="Questions & talking points"
                color="rose"
                onClick={() => setCurrentView('resources')}
              />
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Priority Position */}
      <FadeIn delay={0.4}>
        <div className="glass-card rounded-3xl p-6 border-amber-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 flex items-center justify-center">
                <Heart className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-100">Priority Target</h3>
                <p className="text-xs text-stone-500">Home church opportunity</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-full">
              Primary
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <h4 className="font-medium text-stone-200">Pastor of Worship Ministries — Legacy Church</h4>
            <div className="flex items-center gap-2 text-sm text-stone-500 mt-2">
              <MapPin className="w-4 h-4" />
              <span>Gastonia, NC</span>
              <span className="text-stone-700">·</span>
              <span>Home church</span>
              <span className="text-stone-700">·</span>
              <span className="text-stone-400">Full-Time</span>
            </div>
            <p className="text-sm text-stone-500 mt-3">Existing relationships + demonstrated character over years of involvement</p>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}

// Preparation View
function PreparationView({ completedTasks, toggleTask }: { completedTasks: Record<string, boolean>; toggleTask: (id: string) => void }) {
  const taskProps = { completedTasks, toggleTask }

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl font-bold text-stone-100">Preparation</h2>
        </div>
        <p className="text-stone-400">Materials and qualifications to prepare before applying.</p>
      </FadeIn>

      {/* Qualifications */}
      <FadeIn delay={0.1}>
        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 flex items-center justify-center">
              <Star className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="font-semibold text-stone-100">Your Qualifications</h3>
          </div>
          <p className="text-stone-400 text-sm mb-4">When self-doubt surfaces, review these:</p>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { title: 'Consistent Leadership', desc: 'Six years of weekly worship leading' },
              { title: 'Team Development', desc: 'Recruited and trained student teams' },
              { title: 'Age Range Flexibility', desc: 'Elementary through high school' },
              { title: 'Instrumental Versatility', desc: 'Guitar and piano leadership' },
              { title: 'Formal Training', desc: 'Musical theatre degree' },
              { title: 'Global Perspective', desc: 'Missions in Italy and Guatemala' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3 p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <span className="text-stone-200 text-sm font-medium">{item.title}</span>
                  <p className="text-stone-500 text-xs mt-0.5">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Materials Checklist */}
      <FadeIn delay={0.2}>
        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500/20 to-teal-600/10 border border-teal-500/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-teal-400" />
            </div>
            <h3 className="font-semibold text-stone-100">Application Materials</h3>
          </div>
          <div className="space-y-2">
            <Task id="resume" priority="high" {...taskProps}>Finalize one-page resume</Task>
            <Task id="demo" {...taskProps}>Record 3-4 song worship demo</Task>
            <Task id="video" priority="high" {...taskProps}>Obtain video of leading congregational worship</Task>
            <Task id="theology" {...taskProps}>Write theology of worship statement</Task>
          </div>
        </div>
      </FadeIn>

      {/* References */}
      <FadeIn delay={0.3}>
        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-violet-600/10 border border-violet-500/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-violet-400" />
            </div>
            <h3 className="font-semibold text-stone-100">References</h3>
          </div>
          <div className="space-y-2">
            <Task id="ref-pastor" {...taskProps}>Secure pastoral reference</Task>
            <Task id="ref-worship" {...taskProps}>Secure fellow worship leader reference</Task>
            <Task id="ref-disciple" {...taskProps}>Secure reference from someone you&apos;ve mentored</Task>
          </div>
        </div>
      </FadeIn>

      {/* Language Translation */}
      <FadeIn delay={0.4}>
        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500/20 to-rose-600/10 border border-rose-500/20 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-rose-400" />
            </div>
            <h3 className="font-semibold text-stone-100">Translating Your Experience</h3>
          </div>
          <p className="text-stone-400 text-sm mb-4">Use language that resonates with search committees:</p>
          <div className="space-y-3">
            {[
              { from: 'Led chapel services', to: 'Planned and led weekly corporate worship for 200-500 attendees' },
              { from: 'Ran the student praise band', to: 'Recruited, auditioned, trained, and directed volunteer worship teams' },
              { from: 'Taught music', to: 'Discipled musicians in both craft and spiritual formation' },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl">
                <p className="text-stone-500 text-xs mb-2">Instead of: &quot;{item.from}&quot;</p>
                <p className="text-stone-200 text-sm flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>&quot;{item.to}&quot;</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  )
}

// Jobs View
function JobsView() {
  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl font-bold text-stone-100">Job Openings</h2>
          <span className="px-2 py-1 text-xs font-medium bg-teal-500/20 text-teal-400 rounded-full">16 positions</span>
        </div>
        <p className="text-stone-400">Current worship ministry positions organized by distance from Charlotte.</p>
      </FadeIn>

      {/* Charlotte Metro */}
      <FadeIn delay={0.1}>
        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-teal-400 rounded-full" />
            <h3 className="font-semibold text-stone-200">Charlotte Metro (0-15 mi)</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <JobCard
              title="Pastor of Worship Ministries — Legacy Church"
              location="Gastonia, NC"
              distance="Home church"
              type="Full-Time"
              note="Primary target"
            />
            <JobCard title="Worship Pastor — ONE39 Church" location="Charlotte, NC" distance="~5 mi" type="Full-Time" />
            <JobCard title="Director of Contemporary Music — Covenant Presbyterian" location="Charlotte, NC" distance="~8 mi" type="Full-Time" />
            <JobCard title="Worship Leader/Coordinator — Revelation Truth Center" location="West Charlotte, NC" distance="~10 mi" />
            <JobCard
              title="Minister of Music — Mt. Lebanon Baptist"
              location="Mint Hill, NC"
              distance="~12 mi"
              urgent={true}
              note="Minister retiring May 2026"
            />
            <JobCard title="Part-Time Worship Leader — Wilson Grove Baptist" location="Mint Hill, NC" distance="~12 mi" type="Part-Time" />
            <JobCard title="Director of Worship — Huntersville Presbyterian" location="Huntersville, NC" distance="~13 mi" />
          </div>
        </div>
      </FadeIn>

      {/* Surrounding Area */}
      <FadeIn delay={0.2}>
        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-violet-400 rounded-full" />
            <h3 className="font-semibold text-stone-200">Surrounding Area (15-40 mi)</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <JobCard title="Music Director — New Hope Presbyterian" location="Gastonia, NC" distance="~20 mi" type="Full-Time" />
            <JobCard title="Worship Pastor — Impact Church" location="Rock Hill, SC" distance="~23 mi" type="Full-Time" note="Across state line" />
            <JobCard title="Associate Pastor of Worship — First Reformed" location="Landis, NC" distance="~26 mi" type="Full-Time" />
          </div>
        </div>
      </FadeIn>

      {/* Wider NC */}
      <FadeIn delay={0.3}>
        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-rose-400 rounded-full" />
            <h3 className="font-semibold text-stone-200">Wider NC (Relocation)</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <JobCard title="Director of Modern Worship and Youth — Trinity Reformed" location="Conover, NC" distance="~50 mi" note="Combined worship + youth" />
            <JobCard title="Worship Pastor — Bethany Baptist" location="Wendell, NC" distance="~140 mi" />
            <JobCard title="Pastor for Music and Worship — First Baptist" location="Asheville, NC" distance="~120 mi" />
          </div>
        </div>
      </FadeIn>

      {/* Resources */}
      <FadeIn delay={0.4}>
        <div className="glass-card rounded-3xl p-6">
          <h3 className="font-semibold text-stone-200 mb-4">Job Search Resources</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              'ChurchStaffing.com',
              'JustChurchJobs.com',
              'Indeed.com — "worship pastor"',
              'metrolina.org/job-listings',
            ].map((site, i) => (
              <a
                key={i}
                href="#"
                className="flex items-center gap-2 p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl text-sm text-stone-400 hover:text-stone-200 hover:bg-white/[0.04] transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                {site}
              </a>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  )
}

// Checklist View
function ChecklistView({ completedTasks, toggleTask }: { completedTasks: Record<string, boolean>; toggleTask: (id: string) => void }) {
  const taskProps = { completedTasks, toggleTask }

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl font-bold text-stone-100">Action Checklist</h2>
        </div>
        <p className="text-stone-400">Complete these items to be fully prepared for your transition.</p>
      </FadeIn>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Materials */}
        <FadeIn delay={0.1}>
          <div className="glass-card rounded-3xl p-6 h-full">
            <h3 className="font-semibold text-stone-200 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-400" />
              Materials
            </h3>
            <div className="space-y-2">
              <Task id="resume" priority="high" {...taskProps}>Finalize one-page resume</Task>
              <Task id="demo" {...taskProps}>Record 3-4 song worship demo</Task>
              <Task id="video" priority="high" {...taskProps}>Obtain video of leading congregation</Task>
              <Task id="theology" {...taskProps}>Write theology of worship statement</Task>
            </div>
          </div>
        </FadeIn>

        {/* References */}
        <FadeIn delay={0.15}>
          <div className="glass-card rounded-3xl p-6 h-full">
            <h3 className="font-semibold text-stone-200 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-violet-400" />
              References
            </h3>
            <div className="space-y-2">
              <Task id="ref-pastor" {...taskProps}>Secure pastoral reference</Task>
              <Task id="ref-worship" {...taskProps}>Secure fellow worship leader reference</Task>
              <Task id="ref-disciple" {...taskProps}>Secure reference from someone you&apos;ve mentored</Task>
            </div>
          </div>
        </FadeIn>

        {/* Applications */}
        <FadeIn delay={0.2}>
          <div className="glass-card rounded-3xl p-6 h-full">
            <h3 className="font-semibold text-stone-200 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-amber-400" />
              Applications
            </h3>
            <div className="space-y-2">
              <Task id="apply-legacy" priority="high" {...taskProps}>Submit Legacy Church application</Task>
              <Task id="apply-3" {...taskProps}>Submit applications to 3+ additional positions</Task>
              <Task id="alerts" {...taskProps}>Configure job alerts on Indeed and ChurchStaffing</Task>
            </div>
          </div>
        </FadeIn>

        {/* Research */}
        <FadeIn delay={0.25}>
          <div className="glass-card rounded-3xl p-6 h-full">
            <h3 className="font-semibold text-stone-200 mb-4 flex items-center gap-2">
              <Search className="w-5 h-5 text-rose-400" />
              Research
            </h3>
            <div className="space-y-2">
              <Task id="salary" {...taskProps}>Research salary expectations ($40k-$65k NC range)</Task>
              <Task id="linkedin" {...taskProps}>Update LinkedIn for worship ministry positioning</Task>
              <Task id="practice-language" {...taskProps}>Practice articulating experience translations</Task>
            </div>
          </div>
        </FadeIn>

        {/* Interview Prep */}
        <FadeIn delay={0.3}>
          <div className="glass-card rounded-3xl p-6 h-full">
            <h3 className="font-semibold text-stone-200 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-teal-400" />
              Interview Prep
            </h3>
            <div className="space-y-2">
              <Task id="write-theology" {...taskProps}>Write theology of worship document (1 page)</Task>
              <Task id="prep-story" {...taskProps}>Prepare challenging team situation narrative</Task>
              <Task id="why-leaving" {...taskProps}>Articulate education-to-ministry transition rationale</Task>
            </div>
          </div>
        </FadeIn>

        {/* Final Steps */}
        <FadeIn delay={0.35}>
          <div className="glass-card rounded-3xl p-6 h-full">
            <h3 className="font-semibold text-stone-200 mb-4 flex items-center gap-2">
              <ArrowRight className="w-5 h-5 text-amber-400" />
              Before You Close
            </h3>
            <div className="space-y-2">
              <Task id="read-all" {...taskProps}>Review all sections at least once</Task>
              <Task id="pray" {...taskProps}>Discern which positions to prioritize</Task>
              <Task id="one-thing" {...taskProps}>Complete one action item today</Task>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}

// Resources View
function ResourcesView() {
  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl font-bold text-stone-100">Resources</h2>
        </div>
        <p className="text-stone-400">Reference materials for interviews and decision-making.</p>
      </FadeIn>

      {/* What Churches Want */}
      <FadeIn delay={0.1}>
        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500/20 to-teal-600/10 border border-teal-500/20 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-teal-400" />
            </div>
            <h3 className="font-semibold text-stone-100">What Churches Prioritize</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { num: 1, title: 'Spiritual Maturity', desc: 'Minister first, musician second' },
              { num: 2, title: 'Team Leadership', desc: 'Build, lead, and pastor volunteers' },
              { num: 3, title: 'Theological Alignment', desc: 'Shared worship philosophy' },
              { num: 4, title: 'Musical Competence', desc: 'Confident instrument leadership' },
              { num: 5, title: 'Collaborative Spirit', desc: 'Healthy relationship with senior pastor' },
              { num: 6, title: 'Humility', desc: 'Self-awareness without self-promotion' },
            ].map((item) => (
              <div key={item.num} className="flex items-start gap-3 p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl">
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold text-xs">
                  {item.num}
                </span>
                <div>
                  <span className="text-stone-200 text-sm font-medium">{item.title}</span>
                  <p className="text-stone-500 text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Interview Questions */}
      <div className="grid lg:grid-cols-2 gap-6">
        <FadeIn delay={0.2}>
          <div className="glass-card rounded-3xl p-6 h-full">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-violet-600/10 border border-violet-500/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-violet-400" />
              </div>
              <h3 className="font-semibold text-stone-100">Questions They&apos;ll Ask</h3>
            </div>
            <ul className="space-y-3">
              {[
                'What is your theology of worship?',
                'How do you approach traditional vs. contemporary balance?',
                'Describe a challenging team situation and your response.',
                'How do you approach discipleship within worship ministry?',
                'Why are you transitioning from education to church ministry?',
              ].map((q, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-stone-400">
                  <span className="text-violet-400 mt-0.5">•</span>
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.25}>
          <div className="glass-card rounded-3xl p-6 h-full">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="font-semibold text-stone-100">Questions to Ask Them</h3>
            </div>
            <ul className="space-y-3">
              {[
                'What does a typical week look like in this role?',
                'How does worship planning collaboration work with senior leadership?',
                'What is the current state of the worship ministry and volunteer team?',
                'How would you define success in this role after one year?',
                'How does the church navigate worship style disagreements?',
              ].map((q, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-stone-400">
                  <span className="text-amber-400 mt-0.5">•</span>
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>

      {/* Warning Signs */}
      <FadeIn delay={0.3}>
        <div className="glass-card rounded-3xl p-6 border-rose-500/10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500/20 to-rose-600/10 border border-rose-500/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
            </div>
            <h3 className="font-semibold text-stone-100">Warning Signs</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              'Vague role expectations or "we\'ll figure it out" mentality',
              'High turnover—always inquire about predecessor tenure',
              'Senior pastor micromanagement of worship decisions',
              'No budget for equipment, training, or team development',
              'Congregation deeply divided on worship style',
              'Below-market pay justified by "ministry mindset"',
            ].map((flag, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-rose-500/5 border border-rose-500/10 rounded-xl">
                <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span className="text-rose-200/80 text-sm">{flag}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Legacy Church */}
      <FadeIn delay={0.4}>
        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 flex items-center justify-center">
              <Heart className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="font-semibold text-stone-100">Legacy Church Considerations</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-stone-400 text-sm mb-3">Advantages:</p>
              <div className="space-y-2">
                {[
                  'Existing knowledge of culture and leadership',
                  'Demonstrated character over time',
                  'Established relationships with team members',
                  'Authentic connection to the mission',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                    <span className="text-teal-200/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-stone-400 text-sm mb-3">Navigate carefully:</p>
              <div className="space-y-2">
                {[
                  'Relational dynamics shift when transitioning to staff',
                  'Some may need time adjusting to your leadership',
                  'Conduct thorough expectation conversations',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <ArrowRight className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="text-amber-200/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}

// Main Component
export default function CareerGuide() {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({})
  const [currentView, setCurrentView] = useState<ViewType>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentTip, setCurrentTip] = useState(0)
  const [isClient, setIsClient] = useState(false)

  const tips = [
    "Six years of consistent worship leadership is significant experience—that's not a starting point, it's a foundation.",
    "Your musical theatre training provides stage presence and vocal technique that many worship leaders spend years developing.",
    "Building student worship teams from scratch demonstrates the exact skills churches need.",
    "Legacy Church has observed your character over years. That continuity of witness matters deeply.",
    "Each application, regardless of outcome, refines your presentation and clarifies your calling.",
  ]

  const totalTasks = 24

  useEffect(() => {
    setIsClient(true)
    try {
      const saved = localStorage.getItem('ana-career-tasks')
      if (saved) setCompletedTasks(JSON.parse(saved))
    } catch { /* ignore */ }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTip((prev) => (prev + 1) % tips.length), 12000)
    return () => clearInterval(timer)
  }, [tips.length])

  useEffect(() => {
    if (!isClient) return
    try { localStorage.setItem('ana-career-tasks', JSON.stringify(completedTasks)) } catch { /* ignore */ }
  }, [completedTasks, isClient])

  const toggleTask = (id: string) => setCompletedTasks((prev) => ({ ...prev, [id]: !prev[id] }))

  const completedCount = Object.values(completedTasks).filter(Boolean).length
  const progress = Math.round((completedCount / totalTasks) * 100)

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView completedTasks={completedTasks} totalTasks={totalTasks} setCurrentView={setCurrentView} tips={tips} currentTip={currentTip} />
      case 'preparation':
        return <PreparationView completedTasks={completedTasks} toggleTask={toggleTask} />
      case 'jobs':
        return <JobsView />
      case 'checklist':
        return <ChecklistView completedTasks={completedTasks} toggleTask={toggleTask} />
      case 'resources':
        return <ResourcesView />
      default:
        return <DashboardView completedTasks={completedTasks} totalTasks={totalTasks} setCurrentView={setCurrentView} tips={tips} currentTip={currentTip} />
    }
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <FloatingOrbs />

      {/* Grid pattern */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Breathing gradient */}
      <div className="fixed inset-0 -z-10 animate-breathe">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/5 via-transparent to-teal-900/5" />
      </div>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar
          currentView={currentView}
          setCurrentView={setCurrentView}
          progress={progress}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          {/* Mobile Header */}
          <header className="lg:hidden sticky top-0 z-30 bg-stone-950/80 backdrop-blur-xl border-b border-white/[0.06] px-4 py-3">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 -ml-2 text-stone-400 hover:text-stone-200"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-2">
                <Music className="w-5 h-5 text-amber-400" />
                <span className="font-semibold text-stone-100">Career Guide</span>
              </div>
              <div className="w-10" />
            </div>
          </header>

          {/* Content Area */}
          <div className="p-6 lg:p-10 max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderView()}
              </motion.div>
            </AnimatePresence>

            {/* Footer */}
            <footer className="mt-16 pt-8 border-t border-white/[0.06] text-center">
              <p className="text-stone-600 text-sm">Created with care by Will + Claude</p>
            </footer>
          </div>
        </main>
      </div>

      {/* Global Styles */}
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
        .animate-float-slow { animation: float-slow 12s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 14s ease-in-out infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-morph { animation: morph 10s ease-in-out infinite; }
        .animate-breathe { animation: breathe 8s ease-in-out infinite; }

        .glass-card {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
      `}</style>
    </div>
  )
}
