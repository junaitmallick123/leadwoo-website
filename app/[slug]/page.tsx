import { LeadWooPage, supportedRoutes } from "../site";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return supportedRoutes.map((slug) => ({ slug }));
}

export default async function RoutePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!supportedRoutes.includes(slug)) notFound();
  return <LeadWooPage route={slug} />;
}
