import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

export default function CarImageBanner({
  className,
  alt,
  src,
  ...props
}: Partial<ImageProps>) {
  return (
    <Image
      src="/images/home/hero.png"
      alt="Hero Image"
      width={2560}
      height={1440}
      quality={100}
      className={cn(
        "ml-[-10vw] h-[230px] w-[120vw] max-w-none object-cover object-bottom md:h-[430px] md:object-[50%_75%] lg:h-[560]",
        className,
      )}
      priority
      {...props}
    />
  );
}
