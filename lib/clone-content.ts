/**
 * Content for the sections ported from the reference front-end
 * (doctors, projects and the practice profile). These pages have no table in
 * Supabase yet, so the copy lives here and is rendered statically -- the same
 * way the reference site renders it once its API answers.
 */

export type CloneAbout = {
  title: string;
  description: string;
  image: string;
  features: { title: string; description: string }[];
  stats: { value: string; label: string }[];
};

export const ABOUT: CloneAbout = {
  title: "Precision Surgery, Trusted Care",
  description:
    "Compassion, Skill, Safety and Excellent Outcomes. Prof. Dr. Awais Malik is an experienced laparoscopic and bariatric surgeon, committed to evidence-based care, precision surgery, and patient-centered outcomes.",
  image: "/clone/dr.jpg",
  features: [
    {
      title: "Evidence-Based Practice",
      description:
        "Every plan is built on current international guidelines and reviewed case by case.",
    },
    {
      title: "Minimally Invasive First",
      description:
        "Laparoscopic technique wherever it is safe, for less pain and a faster return home.",
    },
    {
      title: "Continuity of Care",
      description:
        "The same surgeon reviews you before, during and long after your procedure.",
    },
    {
      title: "Clear Counselling",
      description:
        "Risks, benefits and alternatives explained in plain language before you decide.",
    },
  ],
  stats: [
    { value: "600+", label: "Complete Project" },
    { value: "200+", label: "Team Member" },
    { value: "500k+", label: "Clients Reviews" },
  ],
};

export type CloneDoctor = {
  id: string;
  name: string;
  expertise: string;
  description: string;
  biography: string;
  education: string[];
  experience: string[];
  specialization: string[];
  workingHours: string;
  image: string;
};

export const DOCTORS: CloneDoctor[] = [
  {
    id: "prof-dr-awais-malik",
    name: "Prof. Dr. Awais Malik",
    expertise: "Advanced Laparoscopic & Bariatric Surgery",
    description:
      "A highly respected advanced laparoscopic and bariatric surgeon, recognized for precision surgery, ethical practice, and patient-centered outcomes.",
    biography:
      "Prof. Dr. Awais Malik is an advanced laparoscopic and bariatric surgeon with a commitment to evidence-based medicine, meticulous surgical technique, and compassionate care. Renowned for his calm demeanor, clinical judgment, and commitment to excellence, he believes successful surgery is built on trust, communication, and continuity of care.",
    education: [
      "Professor of General and Minimally Access Surgery",
      "Undergraduate and Postgraduate Surgical Trainer & Researcher",
    ],
    experience: [
      "Over 10 years of clinical, academic, and surgical experience",
      "Professor at Fatima Memorial College of Medicine & Dentistry",
      "Consultant Surgeon at Midcity Hospital Lahore",
    ],
    specialization: [
      "Advanced Laparoscopic Procedures",
      "Bariatric (Metabolic) Surgery",
      "Modern Weight-Loss Surgeries",
      "Minimally Invasive Surgical Techniques",
    ],
    workingHours: "Available upon appointment",
    image: "/clone/imm.jpg",
  },
];

export type CloneProject = {
  slug: string;
  title: string;
  category: string;
  description: string;
  fullContent: string;
  image: string;
  location: string;
  client: string;
  website: string;
  date: string;
};

export const PROJECTS: CloneProject[] = [
  {
    slug: "bariatric-centre-of-excellence",
    title: "Bariatric Centre of Excellence",
    category: "Metabolic Surgery",
    description:
      "A dedicated weight-loss surgery unit built around structured assessment, surgery and lifelong follow-up.",
    fullContent:
      "The bariatric unit at Mid City Hospital brings dietetics, anaesthesia, psychology and surgery into a single pathway. Every candidate is assessed by the full team before a procedure is offered, and every patient is enrolled into a follow-up programme that runs for years, not weeks.\n\nThe result is a unit where outcomes are measured, complications are audited, and patients know exactly who to call at every stage of their journey.",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2070&auto=format&fit=crop",
    location: "Mid City Hospital, Lahore",
    client: "Mid City Hospital",
    website: "midcityhospital.com.pk",
    date: "2024-03-12",
  },
  {
    slug: "laparoscopic-training-programme",
    title: "Laparoscopic Training Programme",
    category: "Surgical Education",
    description:
      "A hands-on minimally invasive surgery curriculum for postgraduate trainees and consultants.",
    fullContent:
      "Built for FCPS trainees, the programme pairs simulation-box drills with supervised theatre lists so that trainees progress from camera work to full laparoscopic procedures on a measured curve.\n\nEach cohort is assessed on standardised tasks, and the curriculum is revised every intake against the errors the assessments actually surface.",
    image:
      "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=2070&auto=format&fit=crop",
    location: "Fatima Memorial College, Lahore",
    client: "FMH College of Medicine & Dentistry",
    website: "fmhcmd.edu.pk",
    date: "2023-11-02",
  },
  {
    slug: "diabetes-remission-clinic",
    title: "Diabetes Remission Clinic",
    category: "Metabolic Health",
    description:
      "A metabolic surgery pathway aimed at durable Type 2 diabetes remission rather than weight alone.",
    fullContent:
      "Patients enter the clinic through an endocrine review, and candidacy is judged on metabolic markers as much as on BMI. Post-operative care tracks HbA1c, medication load and remission status at fixed intervals.\n\nThe clinic exists because weight is the visible outcome of metabolic surgery, but blood sugar control is the one that changes life expectancy.",
    image:
      "https://images.unsplash.com/photo-1631815590058-860e4f83c1e8?q=80&w=2070&auto=format&fit=crop",
    location: "Shadman, Lahore",
    client: "Mid City Hospital",
    website: "midcityhospital.com.pk",
    date: "2024-07-21",
  },
  {
    slug: "hernia-day-case-pathway",
    title: "Hernia Day-Case Pathway",
    category: "General Surgery",
    description:
      "A same-day discharge pathway for laparoscopic hernia repair with structured pain control.",
    fullContent:
      "By standardising mesh selection, local anaesthetic infiltration and post-operative analgesia, the pathway moved the majority of routine hernia repairs to same-day discharge without raising readmission rates.\n\nPatients receive a written recovery plan and a direct line to the team for the first week after surgery.",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2070&auto=format&fit=crop",
    location: "Mid City Hospital, Lahore",
    client: "Mid City Hospital",
    website: "midcityhospital.com.pk",
    date: "2023-06-18",
  },
  {
    slug: "community-obesity-screening",
    title: "Community Obesity Screening",
    category: "Public Health",
    description:
      "Free screening camps measuring BMI, blood pressure and blood sugar across Lahore.",
    fullContent:
      "The camps are deliberately low-tech: a scale, a cuff, a glucometer and a conversation. Attendees leave with their numbers written down and a clear explanation of what those numbers mean.\n\nReferrals from the camps are triaged into medical management first, with surgery discussed only where it is genuinely indicated.",
    image:
      "https://images.unsplash.com/photo-1584515868428-f20ad767f7ca?q=80&w=2070&auto=format&fit=crop",
    location: "Lahore, Pakistan",
    client: "Community outreach",
    website: "drawaismalik.com",
    date: "2024-01-09",
  },
  {
    slug: "post-operative-nutrition-programme",
    title: "Post-Operative Nutrition Programme",
    category: "Patient Support",
    description:
      "A staged diet and supplementation plan supporting patients through the first post-surgical year.",
    fullContent:
      "The programme runs from clear fluids through to solid textures over a structured timeline, with a dietitian review at each transition and bloodwork scheduled to catch deficiencies early.\n\nPatients who complete the programme maintain their results markedly better than those lost to follow-up, which is why enrolment is part of the surgical package rather than an optional extra.",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070&auto=format&fit=crop",
    location: "Shadman, Lahore",
    client: "Bariatric Unit",
    website: "drawaismalik.com",
    date: "2024-05-30",
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug) ?? null;
}

export function getDoctor(id: string) {
  return DOCTORS.find((d) => d.id === id) ?? null;
}
