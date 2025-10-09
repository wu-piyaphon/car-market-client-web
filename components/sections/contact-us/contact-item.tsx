import type React from "react";

type ContactItemProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
};

export default function ContactItem({ title, value, icon }: ContactItemProps) {
  return (
    <div className="flex flex-col text-primary">
      <div className="flex flex-row items-center gap-2">
        <p className="font-bold text-3xl">{title}</p>
        {icon}
      </div>
      <p className="text-xl">{value}</p>
    </div>
  );
}
