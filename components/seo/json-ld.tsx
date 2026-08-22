import { SITE } from "@/lib/site";
import type { Faq, Post, SiteSettings } from "@/types/database.types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function JsonLd({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      // Server-generated, no user input interpolated unescaped.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function physicianLd(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": ["Physician", "MedicalBusiness"],
    name: SITE.doctorName,
    alternateName: settings.clinic_name ?? undefined,
    medicalSpecialty: SITE.specialty,
    url: SITE.url,
    telephone: settings.phone ?? undefined,
    email: settings.email ?? undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address ?? undefined,
      addressLocality: SITE.city,
      addressCountry: SITE.countryCode,
    },
    sameAs: [
      settings.facebook_url,
      settings.instagram_url,
      settings.linkedin_url,
    ].filter(Boolean),
  };
}

export function articleLd(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt ?? undefined,
    image: post.cover_image_url ?? undefined,
    datePublished: post.published_at ?? post.created_at,
    dateModified: post.updated_at,
    author: { "@type": "Person", name: SITE.doctorName },
    publisher: { "@type": "Organization", name: SITE.doctorName },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
  };
}

export function faqLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}
