import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Container({ children, className, ...other }: Props) {
  return (
    <div
      className={cn("mx-auto max-w-[1440px] px-5 md:px-10 lg:px-15", className)}
      {...other}
    >
      {children}
    </div>
  );
}
