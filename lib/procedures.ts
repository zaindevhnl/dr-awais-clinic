/**
 * How the practice groups its procedures, in the order it presents them.
 *
 * The services table has no category column, so this is the single source for
 * the grouping: the navbar's Procedures menu, the label on each card and the
 * sections on the Procedures page all read it. Labels here are the short names
 * used in the menu; each card still shows the procedure's full title.
 *
 * A published procedure missing from this list still appears on the
 * Procedures page, under "Other procedures".
 */
export type ProcedureGroup = {
  id: "bariatric" | "laparoscopic" | "endoscopic";
  title: string;
  items: { label: string; slug: string }[];
};

export const PROCEDURE_GROUPS: ProcedureGroup[] = [
  {
    id: "bariatric",
    title: "Bariatric Surgery",
    items: [
      { label: "Sleeve Gastrectomy", slug: "sleeve-gastrectomy" },
      { label: "Gastric Bypass", slug: "roux-en-y-gastric-bypass-rygb" },
      { label: "Mini Gastric Bypass", slug: "mini-gastric-bypass-oagb" },
      { label: "Obesity & Diabetes Surgery", slug: "obesity-diabetes-metabolic-surgery" },
      { label: "Revisional Surgery", slug: "revisional-bariatric-surgery" },
    ],
  },
  {
    id: "laparoscopic",
    title: "Laparoscopic Surgery",
    items: [
      { label: "Gallbladder Surgery", slug: "laparoscopic-gallbladder-surgery" },
      { label: "Hernia Repair", slug: "advanced-laparoscopic-hernia-repair" },
      { label: "Hiatal Hernia", slug: "laparoscopic-hiatal-hernia-surgery" },
      { label: "Ventral Hernia", slug: "laparoscopic-ventral-hernia-repair" },
      { label: "Intestine Surgery", slug: "laparoscopic-intestine-surgery" },
    ],
  },
  {
    id: "endoscopic",
    title: "Endoscopic Surgery",
    items: [
      { label: "Thyroid Surgery", slug: "minimally-invasive-thyroid-surgery" },
      { label: "Breast Surgery", slug: "comprehensive-breast-surgery" },
      { label: "Varicose Vein Treatment", slug: "varicose-vein-treatment" },
    ],
  },
];

/** The group a procedure belongs to, or null if it is not listed. */
export function groupForSlug(slug: string): ProcedureGroup | null {
  return PROCEDURE_GROUPS.find((g) => g.items.some((i) => i.slug === slug)) ?? null;
}
