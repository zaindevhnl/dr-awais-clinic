/**
 * The editable copy of the public site.
 *
 * Every group below declares its fields (which drives the admin form) and its
 * defaults (which is what the site renders until someone edits it). A row in
 * site_content overrides the defaults for one group; anything the row omits
 * falls back here, so adding a field never breaks a page that was saved before
 * the field existed.
 *
 * To make a new block of copy editable: add a group, point the component at
 * getContent(), and the admin screen picks it up with no further work.
 */

export type Field =
  | { name: string; label: string; type: "text" | "textarea"; help?: string }
  | { name: string; label: string; type: "lines"; help?: string }
  | {
      name: string;
      label: string;
      type: "items";
      itemLabel: string;
      fields: { name: string; label: string; type: "text" | "textarea" }[];
      help?: string;
    };

export type Group = {
  key: string;
  title: string;
  description: string;
  /** Where the copy appears, shown in the admin list. */
  page: string;
  fields: Field[];
  defaults: Record<string, unknown>;
};

export const GROUPS: Group[] = [
  /* ---------------------------------------------------------------- */
  {
    key: "brand",
    title: "Brand & footer",
    description: "The wordmark, the footer blurb and the copyright line.",
    page: "Every page",
    fields: [
      { name: "eyebrow", label: "Wordmark, small line", type: "text" },
      { name: "name", label: "Wordmark, main line", type: "text" },
      { name: "footerBlurb", label: "Footer paragraph", type: "textarea" },
      { name: "newsletterHeading", label: "Newsletter heading", type: "text" },
      { name: "newsletterHighlight", label: "Newsletter highlighted words", type: "text" },
      { name: "copyright", label: "Copyright line", type: "text" },
    ],
    defaults: {
      eyebrow: "Safe Surgical Care",
      name: "Dr. Awais Malik",
      footerBlurb:
        "Medical services are an essential part of our lives, offering care and treatment for various health conditions",
      newsletterHeading: "Ready To Turn Dreams Into Reality",
      newsletterHighlight: "Subscribe to Our Newsletter",
      copyright: "© 2026 Safe Surgical Care by Dr. Awais Malik | All Rights Reserved",
    },
  },

  /* ---------------------------------------------------------------- */
  {
    key: "home.intro",
    title: "Home — opening section",
    description: "The badges, headline, paragraph and the four cards beneath it.",
    page: "Home",
    fields: [
      { name: "badges", label: "Badges", type: "lines", help: "One per line." },
      { name: "headingLead", label: "Heading, first part", type: "text" },
      { name: "headingAccent", label: "Heading, coloured part", type: "text" },
      { name: "description", label: "Paragraph", type: "textarea" },
      {
        name: "features",
        label: "Cards",
        type: "items",
        itemLabel: "Card",
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Text", type: "textarea" },
        ],
      },
      { name: "primaryCta", label: "First button", type: "text" },
      { name: "secondaryCta", label: "Second button", type: "text" },
      { name: "badgeTopValue", label: "Floating badge — value", type: "text" },
      { name: "badgeTopLabel", label: "Floating badge — label", type: "text" },
      { name: "badgeBottomValue", label: "Second badge — value", type: "text" },
      { name: "badgeBottomLabel", label: "Second badge — label", type: "text" },
    ],
    defaults: {
      badges: [
        "MBBS, MS, MRCS, CHPE, ATLS",
        "Laparoscopic & Bariatric Surgeon",
        "FMH · Mid City · LMCH, Lahore",
      ],
      headingLead: "Precision Surgery,",
      headingAccent: "Trusted Care",
      description:
        "Compassion, Skill, Safety and Excellent Outcomes. Dr. Awais Malik is a laparoscopic and bariatric surgeon practising at Fatima Memorial Hospital, Mid City Hospital and Lahore Medical Complex & the Heart Hospital, committed to evidence-based care, precision surgery, and patient-centred outcomes.",
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
      primaryCta: "Get Started",
      secondaryCta: "Learn More",
      badgeTopValue: "MRCS",
      badgeTopLabel: "Royal College",
      badgeBottomValue: "3",
      badgeBottomLabel: "Hospitals",
    },
  },

  /* ---------------------------------------------------------------- */
  {
    key: "home.why",
    title: "Home — why choose the practice",
    description: "The six reasons and the teal panel beside them.",
    page: "Home",
    fields: [
      { name: "heading", label: "Heading", type: "text" },
      { name: "intro", label: "Intro paragraph", type: "textarea" },
      {
        name: "reasons",
        label: "Reasons",
        type: "items",
        itemLabel: "Reason",
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "desc", label: "Text", type: "textarea" },
        ],
      },
      { name: "panelHeading", label: "Panel heading", type: "text" },
      { name: "panelIntro", label: "Panel paragraph", type: "textarea" },
      {
        name: "panelStats",
        label: "Panel figures",
        type: "items",
        itemLabel: "Figure",
        fields: [
          { name: "value", label: "Value", type: "text" },
          { name: "label", label: "Label", type: "text" },
        ],
      },
    ],
    defaults: {
      heading: "Why Choose Dr. Awais Malik?",
      intro:
        "Dr. Awais Malik is a laparoscopic and bariatric surgeon in Lahore, practising at Fatima Memorial Hospital, Mid City Hospital and Lahore Medical Complex & the Heart Hospital.",
      reasons: [
        {
          title: "Board Certified Surgeon",
          desc: "MBBS, MS, MRCS, CHPE, ATLS — surgical training and membership of the Royal College of Surgeons.",
        },
        {
          title: "Advanced Technology",
          desc: "State-of-the-art surgical equipment and minimally invasive techniques for better outcomes.",
        },
        {
          title: "Three Hospitals",
          desc: "Consulting and operating at Fatima Memorial Hospital, Mid City Hospital and LMCH in Lahore.",
        },
        {
          title: "Safe Procedures",
          desc: "Highest safety standards with comprehensive pre and post-operative care protocols.",
        },
        {
          title: "Quick Recovery",
          desc: "Minimally invasive techniques ensuring faster recovery and shorter hospital stays.",
        },
        {
          title: "Lifetime Support",
          desc: "Continuous follow-up care and support throughout your weight loss journey.",
        },
      ],
      panelHeading: "Our Hospital Locations",
      panelIntro:
        "World-class medical facilities with modern infrastructure and dedicated bariatric surgery centers.",
      panelStats: [
        { value: "MRCS", label: "Royal College of Surgeons" },
        { value: "MS", label: "Master of Surgery" },
        { value: "3", label: "Hospital Affiliations" },
        { value: "24/7", label: "Emergency Care" },
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    key: "home.features",
    title: "Home — feature list",
    description: "The lime badge, heading and the three rows beneath it.",
    page: "Home",
    fields: [
      { name: "badge", label: "Badge", type: "text" },
      { name: "headingLead", label: "Heading, first line", type: "text" },
      { name: "headingAccent", label: "Heading, underlined words", type: "text" },
      {
        name: "items",
        label: "Rows",
        type: "items",
        itemLabel: "Row",
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "pointOne", label: "First bullet", type: "text" },
          { name: "pointTwo", label: "Second bullet", type: "text" },
        ],
      },
      { name: "buttonLabel", label: "Row button label", type: "text" },
    ],
    defaults: {
      badge: "Our Feature",
      headingLead: "Compassionate Care Health",
      headingAccent: "Exceptional Results",
      items: [
        {
          title: "Quality Care Exceptional Service",
          pointOne: "Your Health, Our Priority",
          pointTwo: "Harmony Health",
        },
        {
          title: "Healing Lives One Patient at a Time",
          pointOne: "Your Health, Our Priority",
          pointTwo: "Harmony Health",
        },
        {
          title: "Caring for You Caring for Tomorrow",
          pointOne: "Your Health, Our Priority",
          pointTwo: "Harmony Health",
        },
      ],
      buttonLabel: "Read More",
    },
  },

  /* ---------------------------------------------------------------- */
  {
    key: "home.expertise",
    title: "Home — expert care collage",
    description: "The badge, heading and captions around the three photographs.",
    page: "Home",
    fields: [
      { name: "badge", label: "Badge", type: "text" },
      { name: "headingLead", label: "Heading, first line", type: "text" },
      { name: "headingAccent", label: "Heading, underlined word", type: "text" },
      { name: "headingTail", label: "Heading, last word", type: "text" },
      { name: "intro", label: "Paragraph", type: "textarea" },
      { name: "cardTitle", label: "Middle caption title", type: "text" },
      { name: "cardText", label: "Middle caption text", type: "textarea" },
      { name: "badgeTitle", label: "Floating badge title", type: "text" },
      { name: "badgeSubtitle", label: "Floating badge subtitle", type: "text" },
    ],
    defaults: {
      badge: "Why Choose Us",
      headingLead: "Empower Health Lives",
      headingAccent: "Expert",
      headingTail: "Care",
      intro:
        "Health care is a vital aspect of maintaining overall well-being, encompassing a range of services from preventive care to treatment.",
      cardTitle: "Enhance Lives Through Expert Care",
      cardText:
        "Health care is a vital aspect of maintaining overall well-being, encompassing a range of services from preventive care.",
      badgeTitle: "FMH · Mid City · LMCH",
      badgeSubtitle: "Lahore, Pakistan",
    },
  },

  /* ---------------------------------------------------------------- */
  {
    key: "home.banner",
    title: "Home — scrolling banner",
    description: "The green pills that scroll across the foot of the home page.",
    page: "Home",
    fields: [{ name: "items", label: "Phrases", type: "lines", help: "One per line." }],
    defaults: {
      items: [
        "Advanced Healthcare, Closer to You",
        "Empowering Your Wellness Journey",
        "Precision Care, Compassionate Hearts",
        "Your Health, Our Sacred Mission",
        "Innovative Treatments, Reliable Results",
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    key: "appointment",
    title: "Appointment form block",
    description:
      "The booking form that closes the home, services, gallery, videos and about pages.",
    page: "Several pages",
    fields: [
      { name: "badge", label: "Badge", type: "text" },
      { name: "headingLead", label: "Heading, first word", type: "text" },
      { name: "headingAccent", label: "Heading, coloured word", type: "text" },
      { name: "submitLabel", label: "Button label", type: "text" },
      { name: "successMessage", label: "Message after sending", type: "textarea" },
    ],
    defaults: {
      badge: "Direct Appointment",
      headingLead: "Get an",
      headingAccent: "Appointment",
      submitLabel: "Book An Appointment Now",
      successMessage:
        "Thank you — your request has been sent. The clinic will call you back.",
    },
  },

  /* ---------------------------------------------------------------- */
  {
    key: "about.profile",
    title: "About — profile",
    description: "The biography and areas of practice on the About page.",
    page: "About",
    fields: [
      { name: "badge", label: "Badge", type: "text" },
      { name: "headingLead", label: "Heading, first part", type: "text" },
      { name: "headingAccent", label: "Heading, underlined word", type: "text" },
      { name: "headingTail", label: "Heading, last part", type: "text" },
      { name: "biography", label: "Biography", type: "textarea" },
      { name: "approach", label: "Second paragraph", type: "textarea" },
      { name: "specialisms", label: "Areas of practice", type: "lines", help: "One per line." },
      { name: "primaryCta", label: "First button", type: "text" },
      { name: "secondaryCta", label: "Second button", type: "text" },
    ],
    defaults: {
      badge: "About the Surgeon",
      headingLead: "A Surgeon You Can",
      headingAccent: "Trust",
      headingTail: "With the Decision",
      biography:
        "Dr. Awais Malik is a laparoscopic and bariatric surgeon holding MBBS, MS, MRCS, CHPE and ATLS, practising across three Lahore hospitals. He is committed to evidence-based medicine, meticulous surgical technique and compassionate care, and believes successful surgery is built on trust, communication and continuity of care.",
      approach:
        "Weight-loss surgery is a decision, not a transaction. Every consultation starts with what you have already tried, what your bloodwork says and what you actually want from the years after the operation — and ends with a plain account of the risks, the alternatives and the follow-up each option commits you to.",
      specialisms: [
        "Advanced Laparoscopic Procedures",
        "Bariatric (Metabolic) Surgery",
        "Weight-Loss Surgery",
        "Minimally Invasive Surgical Techniques",
      ],
      primaryCta: "Book a Consultation",
      secondaryCta: "See Procedures",
    },
  },

  /* ---------------------------------------------------------------- */
  {
    key: "about.qualifications",
    title: "About — qualifications",
    description: "The post-nominals and what each one certifies.",
    page: "About",
    fields: [
      { name: "badge", label: "Badge", type: "text" },
      { name: "headingLead", label: "Heading, first part", type: "text" },
      { name: "headingAccent", label: "Heading, underlined word", type: "text" },
      { name: "intro", label: "Intro paragraph", type: "textarea" },
      {
        name: "items",
        label: "Qualifications",
        type: "items",
        itemLabel: "Qualification",
        fields: [
          { name: "abbr", label: "Letters", type: "text" },
          { name: "title", label: "Full title", type: "text" },
          { name: "description", label: "What it certifies", type: "textarea" },
        ],
      },
    ],
    defaults: {
      badge: "Qualifications",
      headingLead: "The Letters After the",
      headingAccent: "Name",
      intro:
        "Medical post-nominals are rarely explained to the people they are meant to reassure. Here is what each one certifies, in plain language.",
      items: [
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
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    key: "about.hospitals",
    title: "About — hospitals",
    description: "Where the surgeon consults and operates, with directions links.",
    page: "About",
    fields: [
      { name: "badge", label: "Badge", type: "text" },
      { name: "headingLead", label: "Heading, first part", type: "text" },
      { name: "headingAccent", label: "Heading, underlined word", type: "text" },
      { name: "intro", label: "Intro paragraph", type: "textarea" },
      {
        name: "items",
        label: "Hospitals",
        type: "items",
        itemLabel: "Hospital",
        fields: [
          { name: "name", label: "Full name", type: "text" },
          { name: "shortName", label: "Short name", type: "text" },
          { name: "address", label: "Address", type: "text" },
          { name: "city", label: "City", type: "text" },
          { name: "mapQuery", label: "Google Maps search", type: "text" },
        ],
      },
    ],
    defaults: {
      badge: "Where I Operate",
      headingLead: "Three Hospitals in",
      headingAccent: "Lahore",
      intro:
        "Consultations and surgery take place at the hospitals below. Ask at the time of booking which one suits your procedure and your travel.",
      items: [
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
          address: "",
          city: "Lahore",
          mapQuery: "Lahore Medical Complex and the Heart Hospital, Lahore",
        },
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    key: "gallery",
    title: "Gallery page",
    description: "The heading above the photographs.",
    page: "Gallery",
    fields: [
      { name: "badge", label: "Badge", type: "text" },
      { name: "headingLead", label: "Heading, first line", type: "text" },
      { name: "headingTail", label: "Heading, second line", type: "text" },
      { name: "headingAccent", label: "Heading, underlined word", type: "text" },
      { name: "viewAllLabel", label: "Home page button", type: "text" },
    ],
    defaults: {
      badge: "Our Gallery",
      headingLead: "Inside the Practice",
      headingTail: "Precision You Can",
      headingAccent: "See",
      viewAllLabel: "View Full Gallery",
    },
  },

  /* ---------------------------------------------------------------- */
  {
    key: "videos",
    title: "Videos page",
    description: "The heading above the YouTube videos.",
    page: "Videos",
    fields: [
      { name: "badge", label: "Badge", type: "text" },
      { name: "headingLead", label: "Heading, first part", type: "text" },
      { name: "headingAccent", label: "Heading, underlined word", type: "text" },
      { name: "headingTail", label: "Heading, last part", type: "text" },
      { name: "intro", label: "Intro paragraph", type: "textarea" },
      { name: "subscribeLabel", label: "Subscribe link", type: "text" },
    ],
    defaults: {
      badge: "Videos",
      headingLead: "Understand the Procedure",
      headingAccent: "Before",
      headingTail: "You Decide",
      intro:
        "Explanations of the conditions and operations seen most often in clinic, in Urdu and English. General information — not a substitute for a consultation about your own case.",
      subscribeLabel: "Subscribe on YouTube",
    },
  },
];

export const GROUP_BY_KEY = new Map(GROUPS.map((group) => [group.key, group]));

/** Defaults for one group, used when the database has no row for it. */
export function defaultsFor(key: string): Record<string, unknown> {
  return GROUP_BY_KEY.get(key)?.defaults ?? {};
}
