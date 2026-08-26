/**
 * Content for the sections ported from the reference front-end
 * (the doctors list and the practice profile). These have no table in Supabase
 * yet, so the copy lives here and is rendered statically -- the same way the
 * reference site renders it once its API answers.
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
    "Compassion, Skill, Safety and Excellent Outcomes. Dr. Awais Malik is a laparoscopic and bariatric surgeon practising at Fatima Memorial Hospital, Mid City Hospital and Lahore Medical Complex & the Heart Hospital, committed to evidence-based care, precision surgery, and patient-centred outcomes.",
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
  /**
   * Unverified figures inherited from the reference template. The stats band
   * is not rendered anywhere until the practice supplies real numbers -- see
   * StatsSection, which is currently unused.
   */
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
    name: "Dr. Awais Malik",
    expertise: "Laparoscopic & Bariatric Surgery",
    description:
      "Laparoscopic and bariatric surgeon practising in Lahore at Fatima Memorial Hospital, Mid City Hospital and Lahore Medical Complex & the Heart Hospital.",
    biography:
      "Dr. Awais Malik is a laparoscopic and bariatric surgeon holding MBBS, MS, MRCS, CHPE and ATLS, practising across three Lahore hospitals. He is committed to evidence-based medicine, meticulous surgical technique and compassionate care, and believes successful surgery is built on trust, communication and continuity of care.",
    education: [
      "MBBS",
      "MS (Master of Surgery)",
      "MRCS (Member, Royal College of Surgeons)",
      "CHPE (Certificate in Health Professions Education)",
      "ATLS (Advanced Trauma Life Support)",
    ],
    experience: [
      "Fatima Memorial Hospital (FMH), Lahore",
      "Mid City Hospital, Lahore",
      "Lahore Medical Complex & the Heart Hospital (LMCH)",
    ],
    specialization: [
      "Advanced Laparoscopic Procedures",
      "Bariatric (Metabolic) Surgery",
      "Weight-Loss Surgery",
      "Minimally Invasive Surgical Techniques",
    ],
    workingHours: "Available upon appointment",
    image: "/clone/imm.jpg",
  },
];

export function getDoctor(id: string) {
  return DOCTORS.find((d) => d.id === id) ?? null;
}
