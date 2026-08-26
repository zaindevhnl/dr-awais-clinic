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

export function getDoctor(id: string) {
  return DOCTORS.find((d) => d.id === id) ?? null;
}
