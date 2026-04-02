import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/layout/container";
import CarDetailCard from "@/components/sections/cars/detail/car-detail-card";
import CarDetailCarousel from "@/components/sections/cars/detail/car-detail-carousel";
import LoanCalculatorForm from "@/components/sections/loan-calculator/loan-calculator-form";
import { CONFIG } from "@/global-config";
import { getCarBySlug, getCars } from "@/services";

// ----------------------------------------------------------------------

export async function generateStaticParams() {
  const result = await getCars({ page: 1, pageSize: 1000 });

  if (!result.success) return [];

  return result.data.items
    .filter((car) => car.isActive)
    .map((car) => ({ slug: car.slug }));
}

export const revalidate = 3600;

// ----------------------------------------------------------------------

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = await getCarBySlug(slug);

  if (!detail.success || !detail.data.isActive) {
    return { title: `${CONFIG.appName} | ไม่พบรถยนต์` };
  }

  const { brand, model, subModel, modelYear, price, images } = detail.data;
  const title = `${brand.name} ${model} ${subModel} ปี ${modelYear} มือสอง`;
  const description = `${brand.name} ${model} ${subModel} ปี ${modelYear} ราคา ${price.toLocaleString()} บาท สภาพดี พร้อมใช้งาน ที่ ${CONFIG.appName}`;
  const ogImages = images.length > 0 ? [images[0]] : [];

  return {
    title,
    description,
    alternates: { canonical: `/cars/${slug}` },
    openGraph: {
      title,
      description,
      url: `/cars/${slug}`,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages,
    },
  };
}

// ----------------------------------------------------------------------

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const detail = await getCarBySlug(slug);

  if (!detail.success || !detail.data.isActive) {
    notFound();
  }

  const { brand, model, subModel, modelYear, price, images } = detail.data;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: `${brand.name} ${model} ${subModel}`,
    brand: { "@type": "Brand", name: brand.name },
    modelDate: String(modelYear),
    vehicleModelDate: String(modelYear),
    image: images,
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: "THB",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <section aria-labelledby="car-details">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires dangerouslySetInnerHTML
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container className="px-0 md:block md:px-10 md:py-12 lg:px-15">
        <div className="mb-6 grid grid-cols-1 gap-6 md:mb-16 md:grid-cols-[minmax(0,_1fr)_350px] lg:grid-cols-[minmax(0,_1fr)_400px] lg:gap-8">
          <CarDetailCarousel images={detail.data.images} />

          <CarDetailCard data={detail.data} />
        </div>

        <div className="hidden md:block">
          <LoanCalculatorForm defaultPrice={detail.data.price} />
        </div>
      </Container>

      <div className="block md:hidden">
        <LoanCalculatorForm defaultPrice={detail.data.price} />
      </div>
    </section>
  );
}
