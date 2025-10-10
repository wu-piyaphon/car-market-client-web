import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// ----------------------------------------------------------------------

const FAQ = [
  {
    question: "คำถามที่พบบ่อยข้อที่ 1",
    answer: `คำตอบสำหรับคำถามที่พบบ่อยข้อที่ 1`,
  },
  {
    question: "คำถามที่พบบ่อยข้อที่ 2",
    answer: "คำตอบสำหรับคำถามที่พบบ่อยข้อที่ 2",
  },
  {
    question: "คำถามที่พบบ่อยข้อที่ 3",
    answer: "คำตอบสำหรับคำถามที่พบบ่อยข้อที่ 3",
  },
];

// ----------------------------------------------------------------------

export default function AboutUsFAQ() {
  return (
    <div>
      <h2 className="font-bold text-5xl text-primary-500 md:text-center md:text-9xl md:text-slate-900 lg:text-11xl">
        คำถามที่พบบ่อย
      </h2>

      <Accordion
        type="multiple"
        className="mt-4 w-full space-y-4 md:mt-6 lg:mt-10 lg:space-y-6"
      >
        {FAQ.map((item) => (
          <AccordionItem key={item.question} value={item.question}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
