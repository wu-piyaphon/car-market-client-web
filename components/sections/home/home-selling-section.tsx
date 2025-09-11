import { MoveUpRight, Receipt, SquarePen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { paths } from "@/lib/paths";

type HomeSellingCardProps = {
  icon: React.ReactNode;
  title: string;
  href: string;
  description?: string;
};

// ----------------------------------------------------------------------

function HomeSellingCard({ icon, title, href }: HomeSellingCardProps) {
  return (
    <article className="flex flex-1 flex-col gap-7 rounded-md border border-neutral-300 p-8 shadow-sm lg:p-10">
      <h2 className="whitespace-pre-line font-bold text-4xl leading-snug lg:text-8xl">
        {title}
      </h2>
      <div className="flex flex-1 flex-row items-end justify-between">
        <Button size="lg" asChild>
          <Link href={href}>
            ต่อไป <MoveUpRight className="size-4" />
          </Link>
        </Button>
        {icon}
      </div>
    </article>
  );
}

function HomeSellingCardMobile({
  icon,
  title,
  href,
  description,
}: HomeSellingCardProps) {
  return (
    <Link href={href}>
      <article className="flex flex-row items-center gap-4 rounded-sm px-2 py-3 shadow-[0_0_10px_0_rgba(122,161,180,0.25)]">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-white">
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-xl md:text-primary">
            {title}
          </h3>
          <p className="text-base text-slate-900">{description}</p>
        </div>
      </article>
    </Link>
  );
}

// ----------------------------------------------------------------------

export default function HomeSellingSection() {
  return (
    <div className="space-y-3 md:space-y-9 lg:space-y-12">
      <h2 className="text-left font-bold text-4xl text-primary md:text-center md:text-12xl lg:text-15xl">
        ขายรถ ?
      </h2>

      {/* -- Mobile -- */}
      <div className="flex flex-col justify-between gap-4 text-primary md:hidden">
        <HomeSellingCardMobile
          icon={<Receipt className="size-9 rotate-12" />}
          href={paths.form.selling}
          title="ขายรถและลงประกาศ"
          description="สำหรับผู้สนใจขายรถให้กับเต้นท์รถโดยตรงและลงประกาศผ่านเว็บไซต์"
        />

        <div className="flex flex-row items-center gap-2 md:hidden">
          <div className="flex-1 border-neutral-400 border-t" />
          <p className="font-bold text-neutral-500 text-xl">หรือ</p>
          <div className="flex-1 border-neutral-400 border-t" />
        </div>

        <HomeSellingCardMobile
          icon={<SquarePen className="size-8" />}
          href={paths.form.estimate}
          title="ประเมินราคารถ"
          description="ที่ GoodCarMarket เรามีบริการประเมินราคารถของลูกค้าพร้อมให้คำแนะนำ"
        />
      </div>

      {/* -- Tablet/Desktop -- */}
      <div className="hidden flex-row gap-12 text-primary md:flex lg:gap-16">
        <HomeSellingCard
          icon={<Receipt className="size-16 rotate-12 lg:size-22" />}
          href={paths.form.selling}
          title={`ขายรถและลงประกาศผ่าน\nGoodCarMarket`}
        />
        <HomeSellingCard
          icon={<SquarePen className="size-16 lg:size-22" />}
          href={paths.form.estimate}
          title={`สนใจประเมิณราคารถกับ\nGoodCarMarket`}
        />
      </div>
    </div>
  );
}
