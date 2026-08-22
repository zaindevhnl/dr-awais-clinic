import {
  Activity,
  Baby,
  Bone,
  Brain,
  CalendarCheck,
  CalendarClock,
  ClipboardCheck,
  Droplet,
  Eye,
  FlaskConical,
  HeartHandshake,
  HeartPulse,
  MessagesSquare,
  Microscope,
  Pill,
  ShieldCheck,
  Stethoscope,
  Syringe,
  Thermometer,
  UserRound,
  Video,
  type LucideIcon,
} from "lucide-react";

/** Allowlisted lucide icons selectable from /admin. Keeps the bundle small. */
export const ICONS: Record<string, LucideIcon> = {
  Activity,
  Baby,
  Bone,
  Brain,
  CalendarCheck,
  CalendarClock,
  ClipboardCheck,
  Droplet,
  Eye,
  FlaskConical,
  HeartHandshake,
  HeartPulse,
  MessagesSquare,
  Microscope,
  Pill,
  ShieldCheck,
  Stethoscope,
  Syringe,
  Thermometer,
  UserRound,
  Video,
};

export const ICON_NAMES = Object.keys(ICONS);

export function Icon({
  name,
  className,
}: {
  name?: string | null;
  className?: string;
}) {
  const Cmp = (name && ICONS[name]) || Stethoscope;
  return <Cmp className={className} aria-hidden="true" />;
}
