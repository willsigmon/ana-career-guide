export interface Task {
  id: string
  label: string
  priority?: 'high' | 'normal'
}

export interface TaskCategory {
  id: string
  label: string
  icon: 'FileText' | 'Users' | 'Briefcase' | 'Search' | 'MessageSquare' | 'ArrowRight'
  color: 'teal' | 'violet' | 'amber' | 'rose'
  tasks: Task[]
}

export const taskCategories: TaskCategory[] = [
  {
    id: 'materials',
    label: 'Materials',
    icon: 'FileText',
    color: 'teal',
    tasks: [
      { id: 'resume', label: 'Finalize one-page resume', priority: 'high' },
      { id: 'demo', label: 'Record 3-4 song worship demo' },
      { id: 'video', label: 'Obtain video of leading congregation', priority: 'high' },
      { id: 'theology', label: 'Write theology of worship statement' },
    ],
  },
  {
    id: 'references',
    label: 'References',
    icon: 'Users',
    color: 'violet',
    tasks: [
      { id: 'ref-pastor', label: 'Secure pastoral reference' },
      { id: 'ref-worship', label: 'Secure fellow worship leader reference' },
      { id: 'ref-disciple', label: "Secure reference from someone you've mentored" },
    ],
  },
  {
    id: 'applications',
    label: 'Applications',
    icon: 'Briefcase',
    color: 'amber',
    tasks: [
      { id: 'apply-legacy', label: 'Submit Legacy Church application', priority: 'high' },
      { id: 'apply-3', label: 'Submit applications to 3+ additional positions' },
      { id: 'alerts', label: 'Configure job alerts on Indeed and ChurchStaffing' },
    ],
  },
  {
    id: 'research',
    label: 'Research',
    icon: 'Search',
    color: 'rose',
    tasks: [
      { id: 'salary', label: 'Research salary expectations ($40k-$65k NC range)' },
      { id: 'linkedin', label: 'Update LinkedIn for worship ministry positioning' },
      { id: 'practice-language', label: 'Practice articulating experience translations' },
    ],
  },
  {
    id: 'interview-prep',
    label: 'Interview Prep',
    icon: 'MessageSquare',
    color: 'teal',
    tasks: [
      { id: 'write-theology', label: 'Write theology of worship document (1 page)' },
      { id: 'prep-story', label: 'Prepare challenging team situation narrative' },
      { id: 'why-leaving', label: 'Articulate education-to-ministry transition rationale' },
    ],
  },
  {
    id: 'final-steps',
    label: 'Before You Close',
    icon: 'ArrowRight',
    color: 'amber',
    tasks: [
      { id: 'read-all', label: 'Review all sections at least once' },
      { id: 'pray', label: 'Discern which positions to prioritize' },
      { id: 'one-thing', label: 'Complete one action item today' },
    ],
  },
]

// Compute total task count
export const totalTaskCount = taskCategories.reduce(
  (sum, category) => sum + category.tasks.length,
  0
)
