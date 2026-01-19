'use client'

import { useState, useEffect, ReactNode } from 'react'
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  MapPin,
  Briefcase,
  Heart,
  Star,
  AlertTriangle,
  MessageSquare,
  Music,
  Sparkles,
  Clock,
  Target,
  Send,
  BookOpen,
  LucideIcon,
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
  color?: 'amber' | 'blue' | 'green' | 'purple' | 'red' | 'pink' | 'teal' | 'indigo'
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

const Task = ({ id, children, priority, completedTasks, toggleTask }: TaskProps) => (
  <div
    onClick={() => toggleTask(id)}
    className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all ${
      completedTasks[id]
        ? 'bg-green-50 text-green-800'
        : priority === 'high'
          ? 'bg-amber-50 hover:bg-amber-100 border-l-4 border-amber-400'
          : 'bg-gray-50 hover:bg-gray-100'
    }`}
  >
    {completedTasks[id] ? (
      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
    ) : (
      <Circle className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
    )}
    <div className="flex-1">
      <span className={completedTasks[id] ? 'line-through opacity-75' : ''}>{children}</span>
      {priority === 'high' && !completedTasks[id] && (
        <span className="ml-2 text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded">Priority</span>
      )}
    </div>
  </div>
)

const colorClasses = {
  amber: { bg: 'bg-amber-50', hover: 'hover:bg-amber-100', text: 'text-amber-600' },
  blue: { bg: 'bg-blue-50', hover: 'hover:bg-blue-100', text: 'text-blue-600' },
  green: { bg: 'bg-green-50', hover: 'hover:bg-green-100', text: 'text-green-600' },
  purple: { bg: 'bg-purple-50', hover: 'hover:bg-purple-100', text: 'text-purple-600' },
  red: { bg: 'bg-red-50', hover: 'hover:bg-red-100', text: 'text-red-600' },
  pink: { bg: 'bg-pink-50', hover: 'hover:bg-pink-100', text: 'text-pink-600' },
  teal: { bg: 'bg-teal-50', hover: 'hover:bg-teal-100', text: 'text-teal-600' },
  indigo: { bg: 'bg-indigo-50', hover: 'hover:bg-indigo-100', text: 'text-indigo-600' },
}

const Section = ({ id, icon: Icon, title, children, color = 'indigo', badge, expandedSections, toggleSection }: SectionProps) => {
  const colors = colorClasses[color]

  return (
    <div className="border rounded-xl overflow-hidden mb-4 shadow-sm">
      <button
        onClick={() => toggleSection(id)}
        className={`w-full flex items-center gap-3 p-4 text-left transition-colors ${colors.bg} ${colors.hover}`}
      >
        {expandedSections[id] ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        <Icon className={`w-5 h-5 ${colors.text}`} />
        <span className="font-semibold text-gray-800 flex-1">{title}</span>
        {badge && <span className="text-xs bg-white px-2 py-1 rounded-full text-gray-600">{badge}</span>}
      </button>
      {expandedSections[id] && (
        <div className="p-4 bg-white space-y-2">
          {children}
        </div>
      )}
    </div>
  )
}

const JobCard = ({ title, location, distance, urgent, note, type }: JobCardProps) => (
  <div className={`p-4 rounded-lg border ${urgent ? 'border-amber-300 bg-amber-50' : 'border-gray-200 bg-gray-50'}`}>
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1 flex-wrap">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
          <span className="text-gray-400">•</span>
          <span>{distance}</span>
          {type && (
            <>
              <span className="text-gray-400">•</span>
              <span className="text-indigo-600">{type}</span>
            </>
          )}
        </div>
        {note && <p className="text-sm text-gray-600 mt-2 italic">{note}</p>}
      </div>
      {urgent && (
        <span className="px-2 py-1 bg-amber-200 text-amber-800 text-xs font-medium rounded flex-shrink-0">URGENT</span>
      )}
    </div>
  </div>
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
  const [showEncouragement, setShowEncouragement] = useState(false)
  const [isClient, setIsClient] = useState(false)

  const tips = [
    "You've been leading worship for 6+ years – that's not nothing, that's a calling being refined.",
    "Your musical theatre background gives you stage presence most worship leaders have to learn the hard way.",
    "Leading student bands means you already know how to develop volunteers from scratch.",
    "March 1 is your target – that's 6 weeks. You can do a lot in 6 weeks.",
    "Legacy Church knows you. That's not nepotism – that's them seeing your character for years.",
    "Every 'no' gets you closer to the right 'yes.' Churches aren't rejecting you, they're redirecting you.",
    "Your desire to leave your school isn't running away – it's running toward what God has for you.",
  ]

  const encouragements = ["You're making progress!", "Keep going, Ana!", "One step at a time!", "You've got this!", "Amazing work!"]

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
    }, 12000)
    return () => clearInterval(timer)
  }, [tips.length])

  useEffect(() => {
    if (!isClient) return
    try {
      localStorage.setItem('ana-career-tasks', JSON.stringify(completedTasks))
    } catch {
      // Ignore localStorage errors
    }
    const completed = Object.values(completedTasks).filter(Boolean).length
    if (completed > 0 && completed % 3 === 0) {
      setShowEncouragement(true)
      setTimeout(() => setShowEncouragement(false), 3000)
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
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Encouragement Toast */}
        {showEncouragement && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce-gentle z-50">
            {encouragements[Math.floor(Math.random() * encouragements.length)]}
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <Music className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Ana&apos;s Career Guide</h1>
          <p className="text-gray-600">Your roadmap to full-time worship ministry</p>
        </div>

        {/* Rotating Tip */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4 rounded-xl mb-6 shadow-md">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 flex-shrink-0 mt-1" />
            <p className="text-sm md:text-base">{tips[currentTip]}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">Your Progress</span>
            <span className="text-indigo-600 font-semibold">
              {completedCount} / {totalTasks}
            </span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          {progress === 100 && (
            <p className="text-center text-green-600 font-medium mt-3">You&apos;re fully prepared! Now trust God&apos;s timing.</p>
          )}
          {progress > 0 && progress < 100 && (
            <p className="text-center text-gray-500 text-sm mt-2">
              {progress < 30
                ? 'Great start! Keep building momentum.'
                : progress < 60
                  ? "You're making real progress!"
                  : progress < 90
                    ? 'Almost there! Finish strong.'
                    : 'So close! Just a few more to go.'}
            </p>
          )}
        </div>

        {/* Weekly Focus */}
        <Section id="weekly" icon={Target} title={`This Week: ${weeklyFocus.focus}`} color="indigo" badge={`Week ${Math.min(Math.max(currentWeek, 1), 6)}`} {...sectionProps}>
          <div className="bg-indigo-50 p-4 rounded-lg mb-4">
            <p className="text-indigo-800 font-medium mb-3">Your focus this week:</p>
            <ul className="space-y-2">
              {weeklyFocus.tasks.map((task, i) => (
                <li key={i} className="flex items-center gap-2 text-indigo-700">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full" />
                  {task}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-400">
            <p className="text-amber-800 font-medium flex items-center gap-2">
              <Clock className="w-4 h-4" />
              March 1 Goal: ~6 weeks away
            </p>
            <p className="text-amber-700 text-sm mt-1">
              Stay focused but don&apos;t rush God&apos;s process. The right fit matters more than the fast fit.
            </p>
          </div>
        </Section>

        {/* Welcome Section */}
        <Section id="welcome" icon={Heart} title="Hey Ana" color="pink" {...sectionProps}>
          <div className="space-y-4 text-gray-700">
            <p>Will asked me to put this together for you, and I&apos;m genuinely excited about what&apos;s ahead for you.</p>
            <p>
              Here&apos;s what I want you to know upfront: <strong>you&apos;re not starting from zero.</strong> You&apos;ve been doing worship ministry
              for six years. The setting is changing, but the calling isn&apos;t new.
            </p>
            <p>
              This guide is interactive – check things off as you go, and I&apos;ll be here cheering you on. Let&apos;s get you into
              full-time ministry by March.
            </p>
            <div className="bg-pink-50 p-4 rounded-lg mt-4">
              <p className="text-pink-800 font-medium">How to use this guide:</p>
              <ul className="text-pink-700 text-sm mt-2 space-y-1">
                <li>• Tap sections to expand them</li>
                <li>• Check off tasks as you complete them</li>
                <li>• Come back daily to stay on track</li>
                <li>• Your progress is saved automatically</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Strengths */}
        <Section id="strengths" icon={Star} title="Your Superpowers" color="amber" badge="Read this when you doubt yourself" {...sectionProps}>
          <p className="text-gray-600 mb-4">When imposter syndrome hits, come back here:</p>
          <div className="space-y-3">
            {[
              { text: '6+ years of weekly worship leading', desc: 'not occasional fill-ins, consistent leadership' },
              { text: "You've built teams from scratch", desc: 'recruited students, trained them, watched them grow' },
              { text: 'Elementary through high school', desc: 'you can lead any age group' },
              { text: 'Guitar AND piano', desc: 'that flexibility is rare and valuable' },
              { text: 'Musical theatre degree from Anderson', desc: 'trained vocalist, stage presence, performance confidence' },
              { text: 'Italy and Guatemala missions', desc: 'your heart is bigger than one church' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                <span className="text-amber-500 text-lg">✦</span>
                <div>
                  <strong>{item.text}</strong> – {item.desc}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-white border-2 border-amber-200 rounded-lg">
            <p className="text-amber-800 italic">
              &quot;Ana has been leading worship longer than many worship pastors have been in their current role. She just hasn&apos;t
              had the title yet.&quot;
            </p>
          </div>
        </Section>

        {/* Reframe */}
        <Section id="reframe" icon={MessageSquare} title="Translate Your Experience" color="blue" {...sectionProps}>
          <p className="text-gray-600 mb-4">When talking to search committees, use church language:</p>
          <div className="space-y-3 text-sm">
            {[
              { instead: 'I led chapel services', say: 'I planned and led weekly corporate worship for 200-500 people' },
              { instead: 'I ran the student praise band', say: 'I recruited, auditioned, trained, and directed volunteer worship teams' },
              { instead: 'I taught music', say: 'I discipled musicians in their craft and spiritual formation' },
              { instead: 'I worked with the principal', say: 'I partnered with senior leadership to align worship with organizational vision' },
            ].map((item, i) => (
              <div key={i} className="p-3 bg-blue-50 rounded-lg">
                <div className="text-gray-500 mb-1">Instead of: &quot;{item.instead}&quot;</div>
                <div className="font-medium text-blue-800">Say: &quot;{item.say}&quot;</div>
              </div>
            ))}
          </div>
          <Task id="practice-language" {...taskProps}>
            Practice saying these out loud 3 times
          </Task>
        </Section>

        {/* What They Want */}
        <Section id="lookingFor" icon={Briefcase} title="What Churches Actually Want" color="green" {...sectionProps}>
          <p className="text-gray-600 mb-4">In priority order – lead with #1 and #2:</p>
          <ol className="space-y-2">
            {[
              { title: 'Spiritual maturity & pastoral heart', desc: 'they want a minister first, musician second. You have this.' },
              { title: 'Team leadership', desc: "can you build, lead, and care for volunteers? Yes, you've done it for years." },
              { title: 'Theological alignment', desc: 'do you share their convictions about worship?' },
              { title: 'Musical competence', desc: 'can you lead confidently from guitar or keys? Obviously.' },
              { title: 'Collaboration', desc: 'will you work well with the senior pastor?' },
              { title: 'Humility', desc: "worship pastors who make it about themselves don't last" },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <span className="font-bold text-green-600 text-lg">{i + 1}</span>
                <div>
                  <strong>{item.title}</strong> – {item.desc}
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* Interview Prep */}
        <Section id="interview" icon={BookOpen} title="Interview Prep" color="purple" {...sectionProps}>
          <div className="bg-purple-50 p-4 rounded-lg mb-4">
            <p className="font-medium text-purple-800 mb-3">They&apos;ll probably ask:</p>
            <ul className="space-y-2 text-sm text-purple-700">
              {[
                'What is your theology of worship?',
                'How do you balance traditional and contemporary?',
                'Tell us about a difficult team situation and how you handled it.',
                'How do you disciple and develop worship team members?',
                'Why are you leaving education for church ministry?',
              ].map((q, i) => (
                <li key={i} className="p-2 bg-white rounded">
                  &quot;{q}&quot;
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="font-medium text-gray-700 mb-3">Questions you should ask:</p>
            <ul className="space-y-2 text-sm text-gray-600">
              {[
                'What does a typical week look like for this role?',
                'How does the worship pastor collaborate with the senior pastor on service planning?',
                "What's the current state of the worship ministry and volunteer team?",
                'What does success look like in this role after one year?',
                'How does the church handle conflict or disagreement on worship style?',
              ].map((q, i) => (
                <li key={i} className="p-2 bg-white rounded">
                  &quot;{q}&quot;
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <Task id="write-theology" {...taskProps}>
              Write out your theology of worship (1 page)
            </Task>
            <Task id="prep-story" {...taskProps}>
              Prepare a &quot;difficult team situation&quot; story
            </Task>
            <Task id="why-leaving" {...taskProps}>
              Practice answering &quot;why are you leaving education?&quot;
            </Task>
          </div>
        </Section>

        {/* Red Flags */}
        <Section id="redFlags" icon={AlertTriangle} title="Red Flags to Watch For" color="red" {...sectionProps}>
          <p className="text-gray-600 mb-4">Don&apos;t let desperation make you ignore these:</p>
          <div className="space-y-2">
            {[
              "Unclear expectations or \"we'll figure it out as we go\"",
              'High turnover – always ask how long the last person stayed',
              'Senior pastor who micromanages worship decisions',
              'No budget for equipment, training, or team development',
              'Congregation deeply divided on worship style',
              'Significantly below-market pay with "it\'s ministry, not a job" justification',
            ].map((flag, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg text-red-800">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{flag}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-amber-50 rounded-lg">
            <p className="text-amber-800 text-sm">
              <strong>Remember:</strong> A bad fit will make you miserable even faster than your current school situation. It&apos;s
              okay to be patient for the right opportunity.
            </p>
          </div>
        </Section>

        {/* Practical Action Items */}
        <Section id="practical" icon={CheckCircle2} title="Your Action Checklist" color="indigo" {...sectionProps}>
          <p className="text-gray-600 mb-4">Complete these to be fully prepared:</p>

          <p className="font-medium text-gray-700 mt-4 mb-2">Materials</p>
          <div className="space-y-2">
            <Task id="resume" priority="high" {...taskProps}>
              Review and finalize your one-page resume
            </Task>
            <Task id="demo" {...taskProps}>
              Record a 3-4 song worship demo (hymn, modern, upbeat, reflective)
            </Task>
            <Task id="video" priority="high" {...taskProps}>
              Get video of you leading a congregation (not just students)
            </Task>
            <Task id="theology" {...taskProps}>
              Write out your theology of worship (1 page)
            </Task>
          </div>

          <p className="font-medium text-gray-700 mt-6 mb-2">References</p>
          <div className="space-y-2">
            <Task id="ref-pastor" {...taskProps}>
              Ask a pastor to be a reference
            </Task>
            <Task id="ref-worship" {...taskProps}>
              Ask a fellow worship leader to be a reference
            </Task>
            <Task id="ref-disciple" {...taskProps}>
              Ask someone you&apos;ve discipled to be a reference
            </Task>
          </div>

          <p className="font-medium text-gray-700 mt-6 mb-2">Applications</p>
          <div className="space-y-2">
            <Task id="apply-legacy" priority="high" {...taskProps}>
              Apply to Legacy Church (your home church!)
            </Task>
            <Task id="apply-3" {...taskProps}>
              Apply to at least 3 other positions
            </Task>
            <Task id="alerts" {...taskProps}>
              Set up job alerts on Indeed and ChurchStaffing
            </Task>
          </div>

          <p className="font-medium text-gray-700 mt-6 mb-2">Prep Work</p>
          <div className="space-y-2">
            <Task id="salary" {...taskProps}>
              Research salary expectations ($40k-$65k typical in NC full-time)
            </Task>
            <Task id="linkedin" {...taskProps}>
              Update LinkedIn to reflect worship ministry focus
            </Task>
          </div>
        </Section>

        {/* Legacy Church */}
        <Section id="legacy" icon={Heart} title="About Legacy Church" color="pink" {...sectionProps}>
          <p className="text-gray-600 mb-4">Since this is your home church, you have real advantages:</p>
          <div className="space-y-2 mb-4">
            {[
              'You already know the culture, congregation, and leadership',
              "They've seen your character over time – not just an interview version",
              'You have built-in relationships with potential team members',
              "You love the church – that'll come through in your application",
            ].map((item, i) => (
              <div key={i} className="p-3 bg-green-50 rounded-lg text-green-800">
                ✓ {item}
              </div>
            ))}
          </div>

          <p className="text-gray-600 mb-3 font-medium">But be aware of these dynamics:</p>
          <div className="space-y-2">
            {[
              'The dynamic shifts when you become staff – friendships change',
              'Some may struggle seeing you in a leadership role',
              'Have very honest conversations about expectations before accepting',
            ].map((item, i) => (
              <div key={i} className="p-3 bg-amber-50 rounded-lg text-amber-800">
                ⚠ {item}
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-pink-50 rounded-lg">
            <p className="text-pink-800 text-sm">
              <strong>My take:</strong> Being at your home church isn&apos;t a red flag – it&apos;s an advantage if handled with maturity.
              Just go in with eyes open about how the relationship dynamics will shift.
            </p>
          </div>
        </Section>

        {/* Job Listings */}
        <Section id="jobs" icon={MapPin} title="Current Job Openings" color="teal" badge="16 positions" {...sectionProps}>
          <p className="text-gray-600 mb-4">Starting from Charlotte, organized by distance:</p>

          <h4 className="font-semibold text-gray-700 mb-3 mt-4 flex items-center gap-2">
            <span className="w-3 h-3 bg-teal-500 rounded-full"></span>
            Charlotte Metro (0-15 mi)
          </h4>
          <div className="space-y-3">
            <JobCard
              title="Pastor of Worship Ministries – Legacy Church"
              location="Gastonia, NC"
              distance="Your church!"
              type="Full-Time"
              note="This is your primary target → livelegacy.org/job"
            />
            <JobCard title="Worship Pastor – ONE39 Church" location="Charlotte, NC" distance="~5 mi" type="Full-Time" />
            <JobCard
              title="Director of Contemporary Music – Covenant Presbyterian"
              location="Charlotte, NC"
              distance="~8 mi"
              type="Full-Time"
            />
            <JobCard title="Worship Leader/Coordinator – Revelation Truth Center" location="West Charlotte, NC" distance="~10 mi" />
            <JobCard
              title="Minister of Music – Mt. Lebanon Baptist"
              location="Mint Hill, NC"
              distance="~12 mi"
              urgent={true}
              note="Current minister retiring May 2026 – they need someone soon"
            />
            <JobCard title="Part-Time Worship Leader – Wilson Grove Baptist" location="Mint Hill, NC" distance="~12 mi" type="Part-Time" />
            <JobCard
              title="Director of Worship – Huntersville Presbyterian"
              location="Huntersville, NC"
              distance="~13 mi"
              note="You know this area from Lake Norman Christian School"
            />
          </div>

          <h4 className="font-semibold text-gray-700 mb-3 mt-6 flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            Surrounding Area (15-40 mi)
          </h4>
          <div className="space-y-3">
            <JobCard title="Music Director – New Hope Presbyterian" location="Gastonia, NC" distance="~20 mi" type="Full-Time" />
            <JobCard
              title="Worship Pastor – Impact Church"
              location="Rock Hill, SC"
              distance="~23 mi"
              type="Full-Time"
              note="Just across state line – easy commute"
            />
            <JobCard title="Associate Pastor of Worship – First Reformed" location="Landis, NC" distance="~26 mi" type="Full-Time" />
          </div>

          <h4 className="font-semibold text-gray-700 mb-3 mt-6 flex items-center gap-2">
            <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
            Wider NC (If Open to Relocation)
          </h4>
          <div className="space-y-3">
            <JobCard
              title="Director of Modern Worship and Youth – Trinity Reformed"
              location="Conover, NC"
              distance="~50 mi"
              note="Combined worship + youth – your student experience is relevant"
            />
            <JobCard title="Worship Pastor – Bethany Baptist" location="Wendell, NC (near Raleigh)" distance="~140 mi" />
            <JobCard
              title="Pastor for Music and Worship – First Baptist"
              location="Asheville, NC"
              distance="~120 mi"
              note="Beautiful mountain location"
            />
          </div>

          <div className="mt-6 p-4 bg-teal-50 rounded-lg">
            <p className="font-medium text-teal-800 mb-2">Keep searching:</p>
            <ul className="text-sm text-teal-700 space-y-1">
              <li>
                • <strong>ChurchStaffing.com</strong> – best for NC church jobs
              </li>
              <li>
                • <strong>JustChurchJobs.com</strong> – good regional listings
              </li>
              <li>
                • <strong>Indeed.com</strong> – search &quot;worship pastor&quot; + city
              </li>
              <li>
                • <strong>metrolina.org/job-listings</strong> – Charlotte Baptist churches
              </li>
              <li>
                • <strong>cbfnc.org</strong> – Cooperative Baptist Fellowship NC
              </li>
            </ul>
          </div>

          <Task id="set-alerts" {...taskProps}>
            Set up email alerts on ChurchStaffing and Indeed
          </Task>
        </Section>

        {/* Final Encouragement */}
        <div className="text-center mt-8 p-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl">
          <p className="text-indigo-800 font-medium text-lg">You&apos;ve got this, Ana.</p>
          <p className="text-indigo-600 mt-2">
            Your experience is more transferable than you think.
            <br />
            Trust what God has been building in you.
          </p>
          <p className="text-2xl mt-4">💜</p>
        </div>

        {/* Final Checklist */}
        <div className="mt-6 p-4 bg-white rounded-xl shadow-sm">
          <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Send className="w-5 h-5 text-indigo-500" />
            Before You Close This
          </h4>
          <div className="space-y-2">
            <Task id="read-all" {...taskProps}>
              Read through all sections at least once
            </Task>
            <Task id="pray" {...taskProps}>
              Pray about which positions to pursue first
            </Task>
            <Task id="one-thing" {...taskProps}>
              Do ONE thing today (even small) toward your goal
            </Task>
          </div>
        </div>

        <p className="text-center text-gray-400 text-sm mt-8 mb-4">Made with 💜 by Will + Claude</p>
      </div>
    </div>
  )
}
