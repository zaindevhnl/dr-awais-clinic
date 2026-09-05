import "server-only";
import { getContent } from "@/lib/content";

export type Hospital = {
  name: string;
  shortName: string;
  address: string;
  city: string;
  mapQuery: string;
};

/**
 * The hospital list is edited in one place and used in two: the teal panel on
 * the home page and the cards on the About page.
 */
export async function getHospitals() {
  const content = await getContent<{ items: Hospital[] }>("about.hospitals");
  return content.items ?? [];
}
