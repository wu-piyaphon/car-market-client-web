import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// ----------------------------------------------------------------------

const FAQ = [
  {
    question: "อาชีพอะไร ที่สามารถออกรถได้?",
    answer: ` "ออกได้ทุกอาชีพ"  ไม่ว่าจะเป็นพนักงานประจำ ข้าราชการ เจ้าของธุรกิจ หรือแม้แต่อาชีพอิสระ สิ่งสำคัญที่สถาบันการเงินพิจารณาคือ ความมั่นคงของรายได้ ความสามารถในการชำระหนี้ และประวัติทางการเงินที่ดี`,
  },
  {
    question: "ติดเครดิตบูโร ออกรถได้ไหม?",
    answer:
      'การติดบูโรไม่ใช่ "แบล็กลิสต์" ที่ห้ามไม่ให้ทำธุรกรรมทางการเงินตลอดไป แต่เป็นข้อมูลประวัติการชำระหนี้ที่สถาบันการเงินใช้ในการพิจารณาความน่าเชื่อถือ ซึ่งสามารถแก้ไขได้ด้วยการจัดการหนี้สินและสร้างวินัยทางการเงินที่ดีขึ้น',
  },
  {
    question: "ตรวจสภาพ Goo Inspection 344 จุด คืออะไร?",
    answer:
      "Goo Inspection 344 จุด คือการตรวจสภาพรถยนต์มือสองอย่างละเอียดถึง 344 รายการตามมาตรฐานของสมาคมการประเมินสภาพรถยนต์แห่งประเทศญี่ปุ่น (JAAA) โดยบริษัท Goo Inspection",
  },
  {
    question: "มีรับประกันและบริการหลังการขายไหม?",
    answer:
      "รถทุกคันได้รับการตรวจเช็คจากช่างผู้ชำนาญการของบริษัท ก่อนส่งมอบให้คุณลูกค้า และมีบริการหลังการขายทุกคัน",
  },
  {
    question: "ทำไมต้องซื้อรถกับเรา?",
    answer:
      "- โปรโมชั่นพิเศษ ทุกเดือน\n - มีการตรวจสภาพรถจากผู้เชี่ยวชาญ\n - มีสถาบันการเงินรองรับทุกสถาบัน\n - ทีมขายมืออาชีพ\n - สต๊อกรถให้เลือกแน่น\n - มีบริการหลังการขายทุกคัน",
  },
];

// ----------------------------------------------------------------------

export default function AboutUsFAQ() {
  return (
    <div id="faq">
      <h2 className="font-bold text-5xl text-primary-500 md:text-center md:text-9xl md:text-slate-900 lg:text-11xl">
        คำถามที่พบบ่อย
      </h2>

      <Accordion
        type="multiple"
        className="mt-4 w-full space-y-4 md:mt-6 lg:mt-10 lg:space-y-6"
      >
        {FAQ.map((item) => (
          <AccordionItem key={item.question} value={item.question}>
            <AccordionTrigger className="p-4 md:p-7 lg:p-10">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="!pt-0 whitespace-pre-line p-4 leading-snug md:p-7 lg:p-10">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
