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

export type Qualification = {
  abbr: string;
  title: string;
  description: string;
};

/** Post-nominals exactly as they appear on the practice's Google listing. */
export const QUALIFICATIONS: Qualification[] = [
  {
    abbr: "MBBS",
    title: "Bachelor of Medicine, Bachelor of Surgery",
    description:
      "The primary medical degree, and the licence to practise medicine in Pakistan.",
  },
  {
    abbr: "MS",
    title: "Master of Surgery",
    description:
      "A postgraduate surgical degree, awarded after supervised operative training and examination.",
  },
  {
    abbr: "MRCS",
    title: "Member of the Royal College of Surgeons",
    description:
      "An international surgical membership from the Royal College of Surgeons, examined in the United Kingdom.",
  },
  {
    abbr: "CHPE",
    title: "Certificate in Health Professions Education",
    description:
      "A qualification in teaching medicine, held by surgeons who train postgraduate doctors.",
  },
  {
    abbr: "ATLS",
    title: "Advanced Trauma Life Support",
    description:
      "Certification in the standardised protocol for assessing and stabilising trauma patients.",
  },
];

export type Hospital = {
  name: string;
  shortName: string;
  address: string;
  city: string;
  mapQuery: string;
};

/** The three hospitals named on the practice's Google listing. */
export const HOSPITALS: Hospital[] = [
  {
    name: "Fatima Memorial Hospital",
    shortName: "FMH",
    address: "Shadman",
    city: "Lahore",
    mapQuery: "Fatima Memorial Hospital, Shadman, Lahore",
  },
  {
    name: "Mid City Hospital",
    shortName: "Mid City",
    address: "10-C Jail Road, Shadman",
    city: "Lahore",
    mapQuery: "Mid City Hospital, 10 C Jail Rd, Shadman, Lahore",
  },
  {
    name: "Lahore Medical Complex & the Heart Hospital",
    shortName: "LMCH",
    // No street address published for this site; the card falls back to the city.
    address: "",
    city: "Lahore",
    mapQuery: "Lahore Medical Complex and the Heart Hospital, Lahore",
  },
];

export type ServiceImage = {
  src: string;
  credit: string;
  licence: string;
  source: string;
};

/**
 * Anatomical illustrations for the procedures, keyed by service slug.
 *
 * These override the house SVGs in public/services/ for the procedures they
 * cover. Every file here is self-hosted from Wikimedia Commons under a licence
 * permitting commercial reuse with attribution, and the credit line below is
 * rendered beneath the services grid to satisfy it.
 *
 * Only procedures whose provenance is documented appear here; the rest keep the
 * house illustration, which is why this map is deliberately incomplete.
 */
export const SERVICE_IMAGES: Record<string, ServiceImage> = {
  "roux-en-y-gastric-bypass-rygb": {
    src: "/services/img/roux-en-y-gastric-bypass-rygb.png",
    credit: "BruceBlaus / Blausen Medical",
    licence: "CC BY 3.0",
    source: "Wikimedia Commons - Blausen 0776 Roux-En-Y 01.png",
  },
  "advanced-laparoscopic-hernia-repair": {
    src: "/services/img/advanced-laparoscopic-hernia-repair.png",
    credit: "BruceBlaus / Blausen Medical",
    licence: "CC BY 3.0",
    source: "Wikimedia Commons - Blausen 0560 InguinalHernia.png",
  },
  "laparoscopic-intestine-surgery": {
    src: "/services/img/laparoscopic-intestine-surgery.png",
    credit: "BruceBlaus / Blausen Medical",
    licence: "CC BY 3.0",
    source: "Wikimedia Commons - Blausen 0817 SmallIntestine Anatomy.png",
  },
  "laparoscopic-gallbladder-surgery": {
    src: "/services/img/laparoscopic-gallbladder-surgery.jpg",
    credit: "OpenStax College, Anatomy & Physiology",
    licence: "CC BY 4.0",
    source: "Wikimedia Commons - 2425 Gallbladder.jpg",
  },
  "minimally-invasive-thyroid-surgery": {
    src: "/services/img/minimally-invasive-thyroid-surgery.jpg",
    credit: "U.S. National Cancer Institute",
    licence: "Public domain",
    source: "Wikimedia Commons - Illu08 thyroid.jpg",
  },
};

/** The illustration for a service: the sourced one if we have it, else the house SVG. */
export function serviceImage(slug: string, fallback: string | null) {
  return SERVICE_IMAGES[slug]?.src ?? fallback;
}

/** Distinct credit lines, for the attribution notice under the grid. */
export function imageCredits(): ServiceImage[] {
  const seen = new Map<string, ServiceImage>();
  for (const image of Object.values(SERVICE_IMAGES)) {
    const key = image.credit + "|" + image.licence;
    if (!seen.has(key)) seen.set(key, image);
  }
  return [...seen.values()];
}

export function getDoctor(id: string) {
  return DOCTORS.find((d) => d.id === id) ?? null;
}
