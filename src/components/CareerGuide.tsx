'use client'

import { useState, useEffect, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  ChevronRight,
  Check,
  Circle,
  MapPin,
  Briefcase,
  Heart,
  Star,
  AlertTriangle,
  MessageSquare,
  Music2,
  Sparkles,
  Clock,
  Target,
  ArrowRight,
  BookOpen,
  LucideIcon,
  ExternalLink,
} from 'lucide-react'

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

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

const Task = ({ id, children, priority, completedTasks, toggleTask }: TaskProps) => (
  <motion.div
    onClick={() => toggleTask(id)}
    className={`flex items-start gap-4 p-4 rounded-lg cursor-pointer transition-all border ${
      completedTasks[id]
        ? 'bg-emerald-950/30 border-emerald-800/30 text-emerald-300'
        : priority === 'high'
          ? 'bg-amber-950/20 border-amber-700/30 hover:bg-amber-950/30'
          : 'bg-slate-800/30 border-slate-700/30 hover:bg-slate-800/50'
    }`}
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
  >
    <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
      completedTasks[id]
        ? 'bg-emerald-500 border-emerald-500'
        : priority === 'high'
          ? 'border-amber-500'
          : 'border-slate-500'
    }`}>
      {completedTasks[id] && <Check className="w-3 h-3 text-slate-900" strokeWidth={3} />}
    </div>
    <div className="flex-1">
      <span className={`${completedTasks[id] ? 'line-through opacity-60' : 'text-slate-200'}`}>{children}</span>
      {priority === 'high' && !completedTasks[id] && (
        <span className="ml-3 text-xs font-medium text-amber-400 uppercase tracking-wide">Priority</span>
      )}
    </div>
  </motion.div>
)

const Section = ({ id, icon: Icon, title, children, badge, expandedSections, toggleSection }: SectionProps) => {
  return (
    <motion.div
      className="border border-slate-700/50 rounded-xl overflow-hidden mb-4 bg-slate-900/50 backdrop-blur-sm"
      initial={false}
    >
      <button
        onClick={() => toggleSection(id)}
        className="w-full flex items-center gap-4 p-5 text-left transition-colors hover:bg-slate-800/50"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-800 border border-slate-700">
          <Icon className="w-5 h-5 text-slate-300" />
        </div>
        <span className="font-semibold text-slate-100 flex-1 text-lg">{title}</span>
        {badge && (
          <span className="text-xs font-medium text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
            {badge}
          </span>
        )}
        <motion.div
          animate={{ rotate: expandedSections[id] ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-slate-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {expandedSections[id] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 space-y-3 border-t border-slate-800">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const JobCard = ({ title, location, distance, urgent, note, type }: JobCardProps) => (
  <motion.div
    className={`p-5 rounded-lg border transition-all ${
      urgent
        ? 'border-amber-700/50 bg-amber-950/20'
        : 'border-slate-700/50 bg-slate-800/30'
    }`}
    whileHover={{ scale: 1.01, borderColor: urgent ? 'rgb(180 83 9 / 0.7)' : 'rgb(71 85 105 / 0.7)' }}
  >
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <h4 className="font-semibold text-slate-100">{title}</h4>
        <div className="flex items-center gap-2 text-sm text-slate-400 mt-2 flex-wrap">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
          <span className="text-slate-600">·</span>
          <span>{distance}</span>
          {type && (
            <>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300">{type}</span>
            </>
          )}
        </div>
        {note && <p className="text-sm text-slate-500 mt-3">{note}</p>}
      </div>
      {urgent && (
        <span className="px-3 py-1 bg-amber-900/50 text-amber-300 text-xs font-semibold rounded-full border border-amber-700/50 uppercase tracking-wide">
          Urgent
        </span>
      )}
    </div>
  </motion.div>
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
      if (saved) {
        setCompletedTasks(JSON.parse(saved))
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length)
    }, 15000)
    return () => clearInterval(timer)
  }, [tips.length])

  useEffect(() => {
    if (!isClient) return
    try {
      localStorage.setItem('ana-career-tasks', JSON.stringify(completedTasks))
    } catch {
      // Ignore localStorage errors
    }
  }, [completedTasks, isClient])

  const toggleTask = (id: string) => {
    setCompletedTasks((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

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
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Subtle gradient background */}
      <div className="fixed inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800/20 via-transparent to-transparent -z-10" />

      <div className="max-w-2xl mx-auto px-4 py-12 md:py-16">
        {/* Header */}
        <motion.header
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-800 border border-slate-700 rounded-2xl mb-6">
            <Music2 className="w-8 h-8 text-slate-300" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
            Career Transition Guide
          </h1>
          <p className="text-slate-400 text-lg">Your roadmap to full-time worship ministry</p>
        </motion.header>

        {/* Rotating Insight */}
        <motion.div
          className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 mb-8 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-900/30 border border-amber-700/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentTip}
                className="text-slate-300 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {tips[currentTip]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Progress */}
        <motion.div
          className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium text-slate-300">Progress</span>
            <span className="text-sm text-slate-400">
              {completedCount} of {totalTasks} completed
            </span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          {progress > 0 && (
            <p className="text-center text-slate-500 text-sm mt-4">
              {progress === 100
                ? 'Preparation complete. Trust the process.'
                : progress >= 75
                  ? 'Excellent progress. Final steps ahead.'
                  : progress >= 50
                    ? 'Solid momentum. Keep building.'
                    : progress >= 25
                      ? 'Good foundation established.'
                      : 'Every completed task matters.'}
            </p>
          )}
        </motion.div>

        {/* Weekly Focus */}
        <Section
          id="weekly"
          icon={Target}
          title={`This Week: ${weeklyFocus.focus}`}
          badge={`Week ${Math.min(Math.max(currentWeek, 1), 6)}`}
          {...sectionProps}
        >
          <div className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-5 mb-4">
            <p className="text-slate-300 font-medium mb-4">Current priorities:</p>
            <ul className="space-y-3">
              {weeklyFocus.tasks.map((task, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-400">
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                  {task}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-start gap-3 p-4 bg-amber-950/20 border border-amber-800/30 rounded-lg">
            <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-200 font-medium">March 1 Target</p>
              <p className="text-amber-200/70 text-sm mt-1">
                Maintain focus without rushing discernment. The right fit matters more than speed.
              </p>
            </div>
          </div>
        </Section>

        {/* Welcome Section */}
        <Section id="welcome" icon={Heart} title="Welcome" {...sectionProps}>
          <div className="space-y-4 text-slate-400 leading-relaxed">
            <p>This guide was created to support your transition from education to full-time worship ministry.</p>
            <p>
              <span className="text-slate-200">Important context:</span> You bring six years of consistent worship leadership experience.
              The environment is changing, but the calling you&apos;ve been cultivating is not new.
            </p>
            <p>
              Track your progress through this interactive checklist. Your data saves automatically and persists between sessions.
            </p>
            <div className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-5 mt-6">
              <p className="text-slate-300 font-medium mb-3">How to use this guide:</p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-slate-600" /> Expand sections to explore each topic</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-slate-600" /> Check off tasks as you complete them</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-slate-600" /> Review weekly to maintain momentum</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-slate-600" /> Progress is saved automatically</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Strengths */}
        <Section id="strengths" icon={Star} title="Your Qualifications" badge="Reference" {...sectionProps}>
          <p className="text-slate-400 mb-5">When self-doubt surfaces, review these concrete qualifications:</p>
          <div className="space-y-3">
            {[
              { title: 'Consistent Leadership', desc: 'Six years of weekly worship leading—not occasional fill-ins' },
              { title: 'Team Development', desc: 'Recruited, trained, and developed student worship teams' },
              { title: 'Age Range Flexibility', desc: 'Experience leading elementary through high school' },
              { title: 'Instrumental Versatility', desc: 'Proficiency in both guitar and piano leadership' },
              { title: 'Formal Training', desc: 'Musical theatre degree with vocal and performance training' },
              { title: 'Global Perspective', desc: 'International missions experience in Italy and Guatemala' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-slate-800/30 border border-slate-700/30 rounded-lg">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <span className="text-slate-200 font-medium">{item.title}</span>
                  <span className="text-slate-500"> — {item.desc}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-5 bg-slate-800/30 border border-slate-700/30 rounded-lg">
            <p className="text-slate-400 italic">
              &quot;Experience duration exceeds many currently serving in titled positions. The credential gap is administrative, not substantive.&quot;
            </p>
          </div>
        </Section>

        {/* Reframe */}
        <Section id="reframe" icon={MessageSquare} title="Translating Your Experience" {...sectionProps}>
          <p className="text-slate-400 mb-5">When communicating with church search committees, use language that resonates with their context:</p>
          <div className="space-y-4">
            {[
              { from: 'Led chapel services', to: 'Planned and led weekly corporate worship for 200-500 attendees' },
              { from: 'Ran the student praise band', to: 'Recruited, auditioned, trained, and directed volunteer worship teams' },
              { from: 'Taught music', to: 'Discipled musicians in both craft and spiritual formation' },
              { from: 'Worked with the principal', to: 'Partnered with senior leadership to align worship with organizational vision' },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-slate-800/30 border border-slate-700/30 rounded-lg">
                <p className="text-slate-500 text-sm mb-2">Instead of: &quot;{item.from}&quot;</p>
                <p className="text-slate-200">→ &quot;{item.to}&quot;</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Task id="practice-language" {...taskProps}>
              Practice articulating these translations aloud
            </Task>
          </div>
        </Section>

        {/* What They Want */}
        <Section id="lookingFor" icon={Briefcase} title="What Churches Prioritize" {...sectionProps}>
          <p className="text-slate-400 mb-5">Search committees typically evaluate candidates in this order:</p>
          <div className="space-y-3">
            {[
              { num: 1, title: 'Spiritual Maturity', desc: 'Minister first, musician second' },
              { num: 2, title: 'Team Leadership', desc: 'Ability to build, lead, and pastor volunteers' },
              { num: 3, title: 'Theological Alignment', desc: 'Shared convictions about worship philosophy' },
              { num: 4, title: 'Musical Competence', desc: 'Confident leadership from primary instrument' },
              { num: 5, title: 'Collaborative Spirit', desc: 'Healthy working relationship with senior pastor' },
              { num: 6, title: 'Humility', desc: 'Self-awareness without self-promotion' },
            ].map((item) => (
              <div key={item.num} className="flex items-start gap-4 p-4 bg-slate-800/30 border border-slate-700/30 rounded-lg">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-slate-300 font-semibold text-sm">
                  {item.num}
                </span>
                <div>
                  <span className="text-slate-200 font-medium">{item.title}</span>
                  <span className="text-slate-500"> — {item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Interview Prep */}
        <Section id="interview" icon={BookOpen} title="Interview Preparation" {...sectionProps}>
          <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-5 mb-5">
            <p className="text-slate-300 font-medium mb-4">Anticipate these questions:</p>
            <ul className="space-y-3 text-slate-400">
              {[
                'What is your theology of worship?',
                'How do you approach traditional vs. contemporary balance?',
                'Describe a challenging team situation and your response.',
                'How do you approach discipleship within worship ministry?',
                'Why are you transitioning from education to church ministry?',
              ].map((q, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-slate-600">•</span>
                  {q}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-5 mb-5">
            <p className="text-slate-300 font-medium mb-4">Questions to ask them:</p>
            <ul className="space-y-3 text-slate-400">
              {[
                'What does a typical week look like in this role?',
                'How does worship planning collaboration work with senior leadership?',
                'What is the current state of the worship ministry and volunteer team?',
                'How would you define success in this role after one year?',
                'How does the church navigate worship style disagreements?',
              ].map((q, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-slate-600">•</span>
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
        <Section id="redFlags" icon={AlertTriangle} title="Warning Signs" {...sectionProps}>
          <p className="text-slate-400 mb-5">Maintain discernment despite urgency. These indicate potential problems:</p>
          <div className="space-y-3">
            {[
              'Vague role expectations or "we\'ll figure it out" mentality',
              'High turnover—always inquire about predecessor tenure',
              'Senior pastor micromanagement of worship decisions',
              'No budget allocated for equipment, training, or team development',
              'Congregation deeply divided on worship style',
              'Below-market compensation justified by "ministry mindset" framing',
            ].map((flag, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-red-950/20 border border-red-900/30 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-red-200/80">{flag}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 p-4 bg-slate-800/30 border border-slate-700/30 rounded-lg">
            <p className="text-slate-400 text-sm">
              A poor fit will create frustration faster than your current situation. Patient discernment serves long-term calling.
            </p>
          </div>
        </Section>

        {/* Practical Action Items */}
        <Section id="practical" icon={Check} title="Action Checklist" {...sectionProps}>
          <p className="text-slate-400 mb-5">Complete these to be fully prepared:</p>

          <p className="font-medium text-slate-300 mt-6 mb-3 text-sm uppercase tracking-wide">Materials</p>
          <div className="space-y-2">
            <Task id="resume" priority="high" {...taskProps}>Finalize one-page resume</Task>
            <Task id="demo" {...taskProps}>Record 3-4 song worship demo (hymn, modern, upbeat, reflective)</Task>
            <Task id="video" priority="high" {...taskProps}>Obtain video of leading congregational worship</Task>
            <Task id="theology" {...taskProps}>Write theology of worship statement</Task>
          </div>

          <p className="font-medium text-slate-300 mt-8 mb-3 text-sm uppercase tracking-wide">References</p>
          <div className="space-y-2">
            <Task id="ref-pastor" {...taskProps}>Secure pastoral reference</Task>
            <Task id="ref-worship" {...taskProps}>Secure fellow worship leader reference</Task>
            <Task id="ref-disciple" {...taskProps}>Secure reference from someone you&apos;ve mentored</Task>
          </div>

          <p className="font-medium text-slate-300 mt-8 mb-3 text-sm uppercase tracking-wide">Applications</p>
          <div className="space-y-2">
            <Task id="apply-legacy" priority="high" {...taskProps}>Submit Legacy Church application</Task>
            <Task id="apply-3" {...taskProps}>Submit applications to 3+ additional positions</Task>
            <Task id="alerts" {...taskProps}>Configure job alerts on Indeed and ChurchStaffing</Task>
          </div>

          <p className="font-medium text-slate-300 mt-8 mb-3 text-sm uppercase tracking-wide">Research</p>
          <div className="space-y-2">
            <Task id="salary" {...taskProps}>Research salary expectations ($40k-$65k NC full-time range)</Task>
            <Task id="linkedin" {...taskProps}>Update LinkedIn for worship ministry positioning</Task>
          </div>
        </Section>

        {/* Legacy Church */}
        <Section id="legacy" icon={Heart} title="Legacy Church Considerations" {...sectionProps}>
          <p className="text-slate-400 mb-5">As your home church, this opportunity has distinct advantages:</p>
          <div className="space-y-2 mb-6">
            {[
              'Existing knowledge of culture, congregation, and leadership',
              'Demonstrated character over time, not just interview presentation',
              'Established relationships with potential team members',
              'Authentic connection to the church&apos;s mission',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-emerald-950/20 border border-emerald-900/30 rounded-lg">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-1" />
                <span className="text-emerald-200/80">{item}</span>
              </div>
            ))}
          </div>

          <p className="text-slate-400 mb-4 font-medium">Navigate these dynamics:</p>
          <div className="space-y-2">
            {[
              'Relational dynamics shift when transitioning to staff',
              'Some may need time adjusting to your leadership role',
              'Conduct thorough expectation conversations before acceptance',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-amber-950/20 border border-amber-900/30 rounded-lg">
                <span className="text-amber-400 flex-shrink-0">→</span>
                <span className="text-amber-200/80">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 p-4 bg-slate-800/30 border border-slate-700/30 rounded-lg">
            <p className="text-slate-400 text-sm">
              Home church placement isn&apos;t inherently problematic—it&apos;s advantageous when approached with maturity and clear expectations.
            </p>
          </div>
        </Section>

        {/* Job Listings */}
        <Section id="jobs" icon={MapPin} title="Current Openings" badge="16 positions" {...sectionProps}>
          <p className="text-slate-400 mb-5">Organized by distance from Charlotte:</p>

          <div className="mb-6">
            <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
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
            <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Surrounding Area (15-40 mi)
            </h4>
            <div className="space-y-3">
              <JobCard title="Music Director — New Hope Presbyterian" location="Gastonia, NC" distance="~20 mi" type="Full-Time" />
              <JobCard title="Worship Pastor — Impact Church" location="Rock Hill, SC" distance="~23 mi" type="Full-Time" note="Across state line—easy commute" />
              <JobCard title="Associate Pastor of Worship — First Reformed" location="Landis, NC" distance="~26 mi" type="Full-Time" />
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Wider NC (Relocation Required)
            </h4>
            <div className="space-y-3">
              <JobCard title="Director of Modern Worship and Youth — Trinity Reformed" location="Conover, NC" distance="~50 mi" note="Combined worship + youth role" />
              <JobCard title="Worship Pastor — Bethany Baptist" location="Wendell, NC" distance="~140 mi" />
              <JobCard title="Pastor for Music and Worship — First Baptist" location="Asheville, NC" distance="~120 mi" />
            </div>
          </div>

          <div className="p-5 bg-slate-800/30 border border-slate-700/30 rounded-lg">
            <p className="text-slate-300 font-medium mb-3">Job search resources:</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2"><ExternalLink className="w-3 h-3" /> ChurchStaffing.com — NC church positions</li>
              <li className="flex items-center gap-2"><ExternalLink className="w-3 h-3" /> JustChurchJobs.com — Regional listings</li>
              <li className="flex items-center gap-2"><ExternalLink className="w-3 h-3" /> Indeed.com — &quot;worship pastor&quot; + location</li>
              <li className="flex items-center gap-2"><ExternalLink className="w-3 h-3" /> metrolina.org/job-listings — Charlotte Baptist</li>
            </ul>
          </div>

          <div className="mt-4">
            <Task id="set-alerts" {...taskProps}>Configure job alerts on primary platforms</Task>
          </div>
        </Section>

        {/* Final Section */}
        <motion.div
          className="mt-8 p-6 bg-slate-800/30 border border-slate-700/30 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h4 className="font-semibold text-slate-200 mb-4 flex items-center gap-3">
            <ArrowRight className="w-5 h-5 text-slate-500" />
            Before closing this session
          </h4>
          <div className="space-y-2">
            <Task id="read-all" {...taskProps}>Review all sections at least once</Task>
            <Task id="pray" {...taskProps}>Discern which positions to prioritize</Task>
            <Task id="one-thing" {...taskProps}>Complete one action item today</Task>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-800 text-center">
          <p className="text-slate-600 text-sm">
            Created with care by Will + Claude
          </p>
        </footer>
      </div>
    </div>
  )
}
