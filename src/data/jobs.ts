export interface Job {
  title: string
  location: string
  distance: string
  type?: string
  urgent?: boolean
  note?: string
  url?: string
}

export interface JobCategory {
  id: string
  label: string
  range: string
  color: 'teal' | 'violet' | 'rose'
  jobs: Job[]
}

export const jobCategories: JobCategory[] = [
  {
    id: 'charlotte-metro',
    label: 'Charlotte Metro',
    range: '0-15 mi',
    color: 'teal',
    jobs: [
      {
        title: 'Pastor of Worship Ministries — Legacy Church',
        location: 'Gastonia, NC',
        distance: 'Home church',
        type: 'Full-Time',
        note: 'Primary target',
        url: 'https://legacychurchgastonia.com',
      },
      {
        title: 'Worship Pastor — ONE39 Church',
        location: 'Charlotte, NC',
        distance: '~5 mi',
        type: 'Full-Time',
        url: 'https://one39.church',
      },
      {
        title: 'Director of Contemporary Music — Covenant Presbyterian',
        location: 'Charlotte, NC',
        distance: '~8 mi',
        type: 'Full-Time',
        url: 'https://covenantpresby.org',
      },
      {
        title: 'Worship Leader/Coordinator — Revelation Truth Center',
        location: 'West Charlotte, NC',
        distance: '~10 mi',
      },
      {
        title: 'Minister of Music — Mt. Lebanon Baptist',
        location: 'Mint Hill, NC',
        distance: '~12 mi',
        urgent: true,
        note: 'Minister retiring May 2026',
        url: 'https://mtlebanonbaptist.com',
      },
      {
        title: 'Part-Time Worship Leader — Wilson Grove Baptist',
        location: 'Mint Hill, NC',
        distance: '~12 mi',
        type: 'Part-Time',
        url: 'https://wilsongrovebaptist.org',
      },
      {
        title: 'Director of Worship — Huntersville Presbyterian',
        location: 'Huntersville, NC',
        distance: '~13 mi',
      },
    ],
  },
  {
    id: 'surrounding',
    label: 'Surrounding Area',
    range: '15-40 mi',
    color: 'violet',
    jobs: [
      {
        title: 'Music Director — New Hope Presbyterian',
        location: 'Gastonia, NC',
        distance: '~20 mi',
        type: 'Full-Time',
      },
      {
        title: 'Worship Pastor — Impact Church',
        location: 'Rock Hill, SC',
        distance: '~23 mi',
        type: 'Full-Time',
        note: 'Across state line',
      },
      {
        title: 'Associate Pastor of Worship — First Reformed',
        location: 'Landis, NC',
        distance: '~26 mi',
        type: 'Full-Time',
      },
    ],
  },
  {
    id: 'wider-nc',
    label: 'Wider NC',
    range: 'Relocation',
    color: 'rose',
    jobs: [
      {
        title: 'Director of Modern Worship and Youth — Trinity Reformed',
        location: 'Conover, NC',
        distance: '~50 mi',
        note: 'Combined worship + youth',
      },
      {
        title: 'Worship Pastor — Bethany Baptist',
        location: 'Wendell, NC',
        distance: '~140 mi',
      },
      {
        title: 'Pastor for Music and Worship — First Baptist',
        location: 'Asheville, NC',
        distance: '~120 mi',
      },
    ],
  },
]

export const jobSearchResources = [
  { name: 'ChurchStaffing.com', url: 'https://www.churchstaffing.com/search?keyword=worship&state=NC' },
  { name: 'JustChurchJobs.com', url: 'https://www.justchurchjobs.com/jobs?q=worship+pastor&l=North+Carolina' },
  { name: 'Indeed — "worship pastor NC"', url: 'https://www.indeed.com/jobs?q=worship+pastor&l=North+Carolina' },
  { name: 'LinkedIn Jobs', url: 'https://www.linkedin.com/jobs/search?keywords=worship%20pastor&location=Charlotte%2C%20North%20Carolina' },
  { name: 'Metrolina Baptist Association', url: 'https://metrolina.org/job-listings/' },
  { name: 'Baptist State Convention NC', url: 'https://ncbaptist.org/jobs/' },
]

// Compute total job count
export const totalJobCount = jobCategories.reduce(
  (sum, category) => sum + category.jobs.length,
  0
)
