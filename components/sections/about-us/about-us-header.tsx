import Image from "next/image";

const ABOUT_US_POINTS = [
  "ตรวจสภาพรถโดยผู้เชี่ยวชาญจากผู้เชี่ยวชาญจากญี่ปุ่น Goo Inspection 344 จุด",
  "สถาบันการเงิน ชั้นนำกว่า 10 สถาบันการเงิน ไว้รองรับความต้องการของลูกค้า",
  "สต๊อกรถ 900 กว่าคัน มีรถยนต์ ทุกรุ่น ทุกยี่ห้อ มีรถเข้าใหม่ทุกวัน",
  "มีบริการหลังการขายทุกคัน ไม่ต้องกังวล",
  "มี 6 สาขา ไว้รองรับการรบริการ เปิดบริการทุกวัน\n8:30 น. - 20:00 น. ออนไลน์ 24 ชั่วโมง",
];

export default function AboutUsHeader() {
  return (
    <div>
      {/* -- Mobile -- */}
      <div className="flex flex-col items-center gap-8 text-center md:hidden">
        <h2 className="font-bold text-5xl text-slate-900">เกี่ยวกับเรา</h2>
        <Image
          src="/logo.svg"
          alt="GoodCarMarket Logo"
          width={200}
          height={200}
          className="object-cover"
        />
        <div className="w-full space-y-4 text-left">
          <h2 className="font-bold text-7xl text-primary-500 leading-tight">
            Good Car Market ตลาดรถที่ทำให้การซื้อ-ขายเป็นเรื่อง "ง่าย"
          </h2>
          <p className="whitespace-pre-line text-slate-900 text-xl leading-normal">
            "ไม่ว่าคุณจะเป็นผู้ซื้อที่กำลังมองหารถคู่ใจคันใหม่
            หรือเป็นผู้ขายที่ต้องการส่งต่อรถสภาพดีให้กับเจ้าของใหม่ Good Car Market
            คือคำตอบที่ดีที่สุดสำหรับคุณ เพราะเราไม่ได้ขายแค่รถ
            แต่เรามอบประสบการณ์การซื้อ-ขายที่ง่าย ปลอดภัย และน่าประทับใจ
            ให้รถทุกคันได้อยู่กับเจ้าของที่ใช่ และให้เจ้าของรถทุกคนได้พบกับตลาดรถที่ดีที่สุด"
          </p>
          <ol className="list-outside list-disc space-y-3 whitespace-pre-line px-5">
            {ABOUT_US_POINTS.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ol>
        </div>
      </div>

      {/* -- Tablet/Desktop -- */}
      <div className="hidden flex-row justify-between gap-8 md:flex">
        <h2 className="flex-1 whitespace-pre-line font-bold text-6xl leading-tight lg:text-11xl">
          Good Car Market ตลาดรถที่ทำให้การซื้อ-ขายเป็นเรื่อง "ง่าย"
        </h2>
        <div className="flex flex-1 flex-col gap-3 text-base lg:text-xl">
          <p>
            "ไม่ว่าคุณจะเป็นผู้ซื้อที่กำลังมองหารถคู่ใจคันใหม่
            หรือเป็นผู้ขายที่ต้องการส่งต่อรถสภาพดีให้กับเจ้าของใหม่ Good Car Market
            คือคำตอบที่ดีที่สุดสำหรับคุณ เพราะเราไม่ได้ขายแค่รถ
            แต่เรามอบประสบการณ์การซื้อ-ขายที่ง่าย ปลอดภัย และน่าประทับใจ
            ให้รถทุกคันได้อยู่กับเจ้าของที่ใช่ และให้เจ้าของรถทุกคนได้พบกับตลาดรถที่ดีที่สุด"
          </p>
          <ol className="list-inside list-disc space-y-3">
            {ABOUT_US_POINTS.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
