import { Campus, CampusCategory, CampusCluster, DailySimulationMetric, ProblemSubmission, ProjectRecommendation, Student } from '@/types';
import { calculateBuildabilityScore } from '../lib/scoring/buildability';
import { generateDeterministicProject } from '../lib/ai/fallback';

export const SEED_CAMPUSES: Campus[] = [
  { id: 'camp-1', name: 'PSG College of Technology', shortCode: 'PSG Tech', city: 'Coimbatore', state: 'Tamil Nadu', studentCountEstimate: 4200, problemCount: 48, registrationCount: 39, topCategory: 'Placement', averageBuildability: 87 },
  { id: 'camp-2', name: 'Vellore Institute of Technology', shortCode: 'VIT', city: 'Vellore', state: 'Tamil Nadu', studentCountEstimate: 12000, problemCount: 64, registrationCount: 52, topCategory: 'Transport', averageBuildability: 84 },
  { id: 'camp-3', name: 'RV College of Engineering', shortCode: 'RVCE', city: 'Bengaluru', state: 'Karnataka', studentCountEstimate: 3800, problemCount: 38, registrationCount: 31, topCategory: 'Food', averageBuildability: 86 },
  { id: 'camp-4', name: 'College of Engineering, Guindy', shortCode: 'CEG Anna Univ', city: 'Chennai', state: 'Tamil Nadu', studentCountEstimate: 5100, problemCount: 42, registrationCount: 34, topCategory: 'Campus Life', averageBuildability: 83 },
  { id: 'camp-5', name: 'BMS College of Engineering', shortCode: 'BMSCE', city: 'Bengaluru', state: 'Karnataka', studentCountEstimate: 4500, problemCount: 34, registrationCount: 27, topCategory: 'Placement', averageBuildability: 88 },
  { id: 'camp-6', name: 'Coimbatore Institute of Technology', shortCode: 'CIT', city: 'Coimbatore', state: 'Tamil Nadu', studentCountEstimate: 3100, problemCount: 29, registrationCount: 24, topCategory: 'Education', averageBuildability: 82 },
  { id: 'camp-7', name: 'PES University', shortCode: 'PESU', city: 'Bengaluru', state: 'Karnataka', studentCountEstimate: 6200, problemCount: 45, registrationCount: 36, topCategory: 'Productivity', averageBuildability: 89 },
  { id: 'camp-8', name: 'Thiagarajar College of Engineering', shortCode: 'TCE', city: 'Madurai', state: 'Tamil Nadu', studentCountEstimate: 3400, problemCount: 26, registrationCount: 21, topCategory: 'Placement', averageBuildability: 85 },
  { id: 'camp-9', name: 'SRM Institute of Science and Technology', shortCode: 'SRM', city: 'Chennai', state: 'Tamil Nadu', studentCountEstimate: 14000, problemCount: 52, registrationCount: 41, topCategory: 'Transport', averageBuildability: 81 },
  { id: 'camp-10', name: 'Ramaiah Institute of Technology', shortCode: 'MSRIT', city: 'Bengaluru', state: 'Karnataka', studentCountEstimate: 4100, problemCount: 31, registrationCount: 25, topCategory: 'Food', averageBuildability: 86 },
  { id: 'camp-11', name: 'Kumaraguru College of Technology', shortCode: 'KCT', city: 'Coimbatore', state: 'Tamil Nadu', studentCountEstimate: 3900, problemCount: 33, registrationCount: 26, topCategory: 'Campus Life', averageBuildability: 83 },
  { id: 'camp-12', name: 'SSN College of Engineering', shortCode: 'SSN', city: 'Chennai', state: 'Tamil Nadu', studentCountEstimate: 3600, problemCount: 35, registrationCount: 28, topCategory: 'Placement', averageBuildability: 88 },
  { id: 'camp-13', name: 'National Institute of Engineering', shortCode: 'NIE', city: 'Mysuru', state: 'Karnataka', studentCountEstimate: 2900, problemCount: 19, registrationCount: 15, topCategory: 'Education', averageBuildability: 84 },
  { id: 'camp-14', name: 'Government College of Technology', shortCode: 'GCT', city: 'Coimbatore', state: 'Tamil Nadu', studentCountEstimate: 2600, problemCount: 22, registrationCount: 18, topCategory: 'Administration', averageBuildability: 82 },
  { id: 'camp-15', name: 'MIT World Peace University', shortCode: 'MIT-WPU', city: 'Pune', state: 'Maharashtra', studentCountEstimate: 5800, problemCount: 28, registrationCount: 22, topCategory: 'Productivity', averageBuildability: 85 },
  { id: 'camp-16', name: 'College of Engineering, Pune', shortCode: 'COEP', city: 'Pune', state: 'Maharashtra', studentCountEstimate: 3700, problemCount: 25, registrationCount: 20, topCategory: 'Transport', averageBuildability: 87 },
  { id: 'camp-17', name: 'Bannari Amman Institute of Technology', shortCode: 'BIT', city: 'Sathyamangalam', state: 'Tamil Nadu', studentCountEstimate: 4800, problemCount: 27, registrationCount: 21, topCategory: 'Food', averageBuildability: 85 },
  { id: 'camp-18', name: 'Dayananda Sagar College of Engineering', shortCode: 'DSCE', city: 'Bengaluru', state: 'Karnataka', studentCountEstimate: 5200, problemCount: 24, registrationCount: 19, topCategory: 'Events', averageBuildability: 84 },
  { id: 'camp-19', name: 'Amrita Vishwa Vidyapeetham', shortCode: 'Amrita', city: 'Coimbatore', state: 'Tamil Nadu', studentCountEstimate: 7000, problemCount: 30, registrationCount: 24, topCategory: 'Healthcare', averageBuildability: 83 },
  { id: 'camp-20', name: 'Vidyalankar Institute of Technology', shortCode: 'VIT Mumbai', city: 'Mumbai', state: 'Maharashtra', studentCountEstimate: 3300, problemCount: 18, registrationCount: 14, topCategory: 'Placement', averageBuildability: 86 },
];

export const RAW_CAMPUS_PROBLEMS: { text: string; category: CampusCategory }[] = [
  { text: 'Cafeteria queues exceed 35 minutes during 12:45 lunch break, causing students to skip food or get late for afternoon labs.', category: 'Food' },
  { text: 'College shuttle buses are completely packed by the time they reach outer stops, leaving 40+ hostellers stranded daily.', category: 'Transport' },
  { text: 'Students submit generic resumes to Tier-1 campus placement drives and get rejected at ATS screening without knowing what skills they lacked.', category: 'Placement' },
  { text: 'Hostel maintenance complaints written in warden physical registers take 10 to 14 days for minor plumbing and electrical fixes.', category: 'Campus Life' },
  { text: 'Students miscalculate the 75% mandatory attendance cut-off across 6 subjects and receive sudden exam debarment notices.', category: 'Productivity' },
  { text: 'Selecting elective subjects in final year is done blindly based on hearsay rather than syllabus difficulty and career match.', category: 'Education' },
  { text: 'Massive amount of leftover cooked food in mess dining halls gets dumped daily because cooking quantities cannot predict student turnout.', category: 'Food' },
  { text: 'Students returning from off-campus project internships after 7 PM have no safe, predictable transit inside our 200-acre campus.', category: 'Transport' },
  { text: 'Mock interview practice is unavailable for niche engineering domains like Embedded Systems and Computer Vision.', category: 'Placement' },
  { text: 'Hostel WiFi bandwidth gets congested every night at 9 PM making online assignment submissions fail at the deadline.', category: 'Campus Life' },
  { text: 'Students scramble to find verified previous year question papers and faculty notes right before mid-semester exams.', category: 'Education' },
  { text: 'Electronics lab components and oscilloscopes are hoard-occupied by one team while other project groups wait idle for hours.', category: 'Productivity' },
  { text: 'Campus technical symposium workshop registrations are tracked on disorganized Google Forms with chaotic payment receipt verification.', category: 'Events' },
  { text: 'Mess menu repetitive dishes cause student dissatisfaction and irregular attendance leading to unexpected kitchen inventory waste.', category: 'Food' },
  { text: 'College bus routes do not adapt during monsoon waterlogging, leading to 2-hour commute delays without driver notifications.', category: 'Transport' },
  { text: 'Off-campus internship opportunities with stipend are buried in unstructured college email digests and missed by final-year students.', category: 'Placement' },
  { text: 'Hostel water cooler filters breakdown frequently without warden notice, forcing students to buy packaged water bottles.', category: 'Campus Life' },
  { text: 'Department project guide allocation takes 3 weeks of manual faculty paper signing causing delayed final-year thesis starts.', category: 'Administration' },
  { text: 'Campus health clinic lacks digital prescription records and students queue up for hours just for fever consultations.', category: 'Healthcare' },
  { text: 'Students struggle to find inter-disciplinary team members (e.g. Mechanical student seeking AI programmer) for hackathons.', category: 'Productivity' },
  { text: 'Library study rooms and reference textbook checkouts have zero live occupancy visibility from hostel rooms.', category: 'Campus Life' },
  { text: 'Students with fee scholarship disbursements face bureaucratic delays across three administrative counters without ticket status.', category: 'Finance' },
  { text: 'Campus security gate manual visitor register causes 20-minute vehicle traffic jams during evening parent visiting hours.', category: 'Security' },
  { text: 'Engineering branch students get overwhelmed balancing 4 mini-projects, competitive coding, and final semester major capstones.', category: 'Education' },
  { text: 'Day scholars miss morning attendance because college entrance turnstiles break down during morning 8:30 AM rush.', category: 'Transport' },
];

const FIRST_NAMES = [
  'Aarav', 'Aditi', 'Akash', 'Ananya', 'Arjun', 'Bhavya', 'Chetan', 'Deepika', 'Divya', 'Ganesh',
  'Hari', 'Harini', 'Ishaan', 'Janani', 'Karthick', 'Kavya', 'Madhav', 'Meera', 'Naveen', 'Nidhi',
  'Pooja', 'Pranav', 'Priya', 'Rahul', 'Rithika', 'Rohan', 'Sai', 'Sanjay', 'Shreya', 'Sneha',
  'Surya', 'Swathi', 'Tarun', 'Varun', 'Vignesh', 'Vinay', 'Yash', 'Zoya', 'Abhishek', 'Archana'
];

const LAST_INITIALS = ['K.', 'S.', 'R.', 'M.', 'V.', 'N.', 'P.', 'B.', 'G.', 'T.', 'A.', 'D.'];

const BRANCHES = [
  'Computer Science & Engineering (CSE)',
  'Information Technology (IT)',
  'Artificial Intelligence & Data Science (AI/DS)',
  'Electronics & Communication (ECE)',
  'Electrical & Electronics (EEE)',
  'Mechanical Engineering (MECH)',
];

const SKILL_POOLS = [
  ['Python', 'AI / ML Fundamentals', 'Data Analysis & Pandas'],
  ['React / Next.js', 'JavaScript / TypeScript', 'UI / UX Design'],
  ['Backend (Node/FastAPI)', 'Python', 'Testing & QA'],
  ['Prompt Engineering', 'React / Next.js', 'Product Management'],
  ['Python', 'Cloud / DevOps Basics', 'AI / ML Fundamentals'],
  ['JavaScript / TypeScript', 'Backend (Node/FastAPI)', 'Database Design'],
];

export function generateSyntheticSeedDataset() {
  const problems: ProblemSubmission[] = [];
  const students: Student[] = [];
  const projects: ProjectRecommendation[] = [];

  // Generate 500 Problems across campuses
  for (let i = 0; i < 500; i++) {
    const rawTemplate = RAW_CAMPUS_PROBLEMS[i % RAW_CAMPUS_PROBLEMS.length];
    const campus = SEED_CAMPUSES[i % SEED_CAMPUSES.length];
    const id = `prob-sim-${1000 + i}`;
    const dateOffsetDays = Math.floor(i / 75); // across 7 days
    const submittedDate = new Date(Date.now() - (6 - Math.min(6, dateOffsetDays)) * 86400000 - (i % 86400) * 1000).toISOString();

    const problem: ProblemSubmission = {
      id,
      problemStatement: `${rawTemplate.text} (Reported at ${campus.shortCode})`,
      category: rawTemplate.category,
      campusName: campus.name,
      affectedUsers: 'Final Year Engineering Students',
      severity: i % 5 === 0 ? 'Critical' : i % 3 === 0 ? 'High' : 'Medium',
      submittedAt: submittedDate,
      studentId: `stud-sim-${1000 + i}`,
      isSimulated: true,
    };
    problems.push(problem);

    // Generate 300 corresponding Projects
    if (i < 300) {
      const proj = generateDeterministicProject(
        problem.problemStatement,
        problem.category,
        problem.affectedUsers,
        problem.id
      );
      proj.isSimulated = true;
      projects.push(proj);
    }
  }

  // Generate 500 Students
  for (let i = 0; i < 500; i++) {
    const fName = FIRST_NAMES[i % FIRST_NAMES.length];
    const lInit = LAST_INITIALS[i % LAST_INITIALS.length];
    const campus = SEED_CAMPUSES[i % SEED_CAMPUSES.length];
    const branch = BRANCHES[i % BRANCHES.length];
    const skills = SKILL_POOLS[i % SKILL_POOLS.length];
    const id = `stud-sim-${1000 + i}`;
    const dateOffsetDays = Math.floor(i / 75);
    const regDate = new Date(Date.now() - (6 - Math.min(6, dateOffsetDays)) * 86400000 - (i % 43200) * 1000).toISOString();

    const student: Student = {
      id,
      name: `${fName} ${lInit}`,
      email: `${fName.toLowerCase()}.${lInit.replace('.', '').toLowerCase()}***@example.test`,
      college: campus.name,
      branch,
      isFinalYear: true,
      skills,
      primaryProjectId: i < 300 ? projects[i].id : undefined,
      registeredAt: regDate,
      workshopRoleId: skills[0],
      isSimulated: true,
    };
    students.push(student);
  }

  return { problems, students, projects };
}

export const SEED_DAILY_SIMULATION: DailySimulationMetric[] = [
  { day: 1, date: 'Day 1 (Launch)', visitors: 110, problemsStarted: 62, problemsSubmitted: 48, projectsGenerated: 48, registrations: 34, cumulativeRegistrations: 34, shares: 12, targetLine: 71 },
  { day: 2, date: 'Day 2', visitors: 165, problemsStarted: 98, problemsSubmitted: 76, projectsGenerated: 76, registrations: 58, cumulativeRegistrations: 92, shares: 24, targetLine: 142 },
  { day: 3, date: 'Day 3', visitors: 220, problemsStarted: 138, problemsSubmitted: 104, projectsGenerated: 104, registrations: 81, cumulativeRegistrations: 173, shares: 38, targetLine: 214 },
  { day: 4, date: 'Day 4', visitors: 285, problemsStarted: 184, problemsSubmitted: 132, projectsGenerated: 132, registrations: 108, cumulativeRegistrations: 281, shares: 54, targetLine: 285 },
  { day: 5, date: 'Day 5 (Current)', visitors: 330, problemsStarted: 210, problemsSubmitted: 154, projectsGenerated: 154, registrations: 124, cumulativeRegistrations: 405, shares: 68, targetLine: 357 },
  { day: 6, date: 'Day 6 (Projected)', visitors: 310, problemsStarted: 195, problemsSubmitted: 140, projectsGenerated: 140, registrations: 62, cumulativeRegistrations: 467, shares: 50, targetLine: 428 },
  { day: 7, date: 'Day 7 (Projected)', visitors: 290, problemsStarted: 180, problemsSubmitted: 125, projectsGenerated: 125, registrations: 54, cumulativeRegistrations: 521, shares: 42, targetLine: 500 },
];

export const SEED_CAMPUS_CLUSTERS: CampusCluster[] = [
  {
    category: 'Placement',
    problemCount: 142,
    campusesInvolved: ['PSG Tech', 'VIT', 'RVCE', 'CEG Anna Univ', 'SSN', 'PESU', 'TCE'],
    recurringKeywords: ['resume', 'ATS screening', 'mock interview', 'DSA', 'off-campus internship'],
    averageBuildability: 88,
    keyPainPointSummary: 'Students struggle with generic resumes and lack personalized AI mock interview preparation for technical rounds.',
    sampleProblems: [
      'Resumes rejected by Tier-1 company ATS algorithms with zero constructive feedback.',
      'No domain-specific mock interview evaluation for niche engineering roles.',
      'Missing placement alerts buried in massive college email digests.',
    ],
    challengeTitle: 'Campus Placement & Technical Interview Readiness Forge',
  },
  {
    category: 'Transport',
    problemCount: 98,
    campusesInvolved: ['VIT', 'SRM', 'CEG Anna Univ', 'COEP', 'PSG Tech'],
    recurringKeywords: ['bus schedule', 'crowded shuttles', 'ETA visibility', 'monsoon delays'],
    averageBuildability: 85,
    keyPainPointSummary: 'Irregular shuttle arrival timing and overloaded passenger counts cause students to miss morning class attendance.',
    sampleProblems: [
      'Outer stop students stranded because buses arrive 100% full.',
      'Zero live countdown or delay notification during rain or peak traffic.',
    ],
    challengeTitle: 'Predictive Campus Transit & Shuttle Seat Balancer',
  },
  {
    category: 'Food',
    problemCount: 86,
    campusesInvolved: ['RVCE', 'MSRIT', 'BIT', 'PSG Tech', 'SRM'],
    recurringKeywords: ['cafeteria lines', 'mess food waste', 'lunch wait times', 'menu predictability'],
    averageBuildability: 87,
    keyPainPointSummary: '35+ minute lines during lunch rush coupled with daily kitchen food waste from unpredictable turnouts.',
    sampleProblems: [
      'Massive cafeteria queues forcing students to skip meals or arrive late for afternoon labs.',
      'Mess halls dumping cooked rice and curry due to inaccurate headcount forecasting.',
    ],
    challengeTitle: 'Campus Dining Demand & Queue Optimization Engine',
  },
  {
    category: 'Campus Life',
    problemCount: 74,
    campusesInvolved: ['CEG Anna Univ', 'KCT', 'Amrita', 'VIT', 'TCE'],
    recurringKeywords: ['hostel maintenance', 'WiFi congestion', 'water issues', 'room repair delay'],
    averageBuildability: 83,
    keyPainPointSummary: 'Maintenance complaints trapped in paper registers take weeks to resolve with zero escalation accountability.',
    sampleProblems: [
      'Plumbing and electrical fixes in hostels pending for over 10 days.',
      'Evening hostel network bandwidth collapse before assignment deadlines.',
    ],
    challengeTitle: 'Automated Hostel Facility Triager & SLA Auto-Escalator',
  },
  {
    category: 'Productivity',
    problemCount: 56,
    campusesInvolved: ['PESU', 'MIT-WPU', 'BMSCE', 'DSCE'],
    recurringKeywords: ['75% attendance rule', 'debarment risk', 'lab equipment queue', 'hackathon teams'],
    averageBuildability: 89,
    keyPainPointSummary: 'Students miscalculate attendance margins and struggle to form multidisciplinary project teams.',
    sampleProblems: [
      'Sudden exam debarment notifications due to 75% attendance calculation errors.',
      'Difficulty finding cross-department engineering collaborators for capstones.',
    ],
    challengeTitle: 'Academic Margin Predictor & Inter-Disciplinary Team Forge',
  },
];
