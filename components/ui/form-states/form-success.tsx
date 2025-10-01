import { CircleCheckBig } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "../button";

type FormSuccessProps = {
  isSubmitted: boolean;
};

export default function FormSuccess({ isSubmitted }: FormSuccessProps) {
  return (
    <motion.div
      className={cn(
        "flex h-full flex-col items-center justify-center gap-5 lg:gap-6",
        !isSubmitted && "hidden",
      )}
      initial={{ opacity: 0 }}
      animate={isSubmitted ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
    >
      <CircleCheckBig className="size-32 text-primary lg:size-36" />
      <div className="flex flex-col gap-1.5 text-center text-3xl md:text-4xl lg:text-8xl">
        <h6 className="font-bold">ส่งข้อมูลสำเร็จ</h6>
        <p>ทางเราจะติดต่อกลับหาคุณโดยเร็วที่สุด</p>
      </div>

      <Button size="lg" asChild>
        <Link href="/">กลับสู่หน้าหลัก</Link>
      </Button>
    </motion.div>
  );
}
