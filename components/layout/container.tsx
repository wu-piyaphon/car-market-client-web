import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Container({ children, className, ...other }: Props) {
  return (
    <div
      className={cn("px-5 md:px-10 lg:px-15 max-w-[1440px]", className)}
      {...other}
    >
      {children}
    </div>
  );
}
