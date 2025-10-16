import type React from "react";

type ContactItemProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
};

export default function ContactItem({ title, value, icon }: ContactItemProps) {
  return (
    <div className="flex flex-col space-y-1 text-primary md:whitespace-pre-line">
      <div className="flex flex-row items-center gap-2">
        {icon}
        <p className="font-bold text-3xl md:text-2xl lg:text-5xl">{title}</p>
      </div>
      <p className="text-xl">{value}</p>
    </div>
  );
}
