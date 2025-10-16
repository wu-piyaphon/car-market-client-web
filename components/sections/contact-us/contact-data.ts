export interface LocationInfo {
  id: number;
  name: string;
  address: string;
  phone: string;
  facebook: string;
  facebookLink: string;
  hours: string;
  image: string;
  googleMapLink: string;
}

export const CONTACT_DATA: LocationInfo[] = [
  {
    id: 1,
    name: "แชมป์ออโต้ระยอง 1",
    address: "133 หมู่ 4 ตำบลทับมา อำเภอเมือง, ระยอง",
    phone: "084-144-2888",
    facebook: "รถมือสอง ระยอง แชมป์ออโต้ชัวร์ ",
    facebookLink: "https://www.facebook.com/share/1CmwE9mK4M/?mibextid=wwXIfr",
    hours: "เปิดบริการทุกวัน ไม่มีวันหยุด\n8:30-18:30 น. ออนไลน์ 24 ชั่วโมง",
    image: "/images/contact/champ-location-1.png",
    googleMapLink:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31141.265764522534!2d101.20807885834967!3d12.67040030941723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3102fb4fa2cc1fdd%3A0xaec05576792100c0!2z4Lij4LiW4Lih4Li34Lit4Liq4Lit4LiHIOC4o-C4sOC4ouC4reC4hyDguYHguIrguKHguJvguYzguK3guK3guYLguJXguYnguIrguLHguKfguKPguYw!5e0!3m2!1sen!2sth!4v1760631934483!5m2!1sen!2sth",
  },
  {
    id: 2,
    name: "แชมป์ออโต้ระยอง 2",
    address: "168 หมู่ 4 ตำบลทับมา อำเภอเมืองระยอง, ระยอง",
    phone: "063-709-8888",
    facebook: "เพจตลาดรถ มือสอง ระยอง แชมป์2",
    facebookLink: "https://www.facebook.com/share/1DNDzN3ygA/?mibextid=wwXIf",
    hours: "เปิดบริการทุกวัน ไม่มีวันหยุด\n8:30-20.00 น. ออนไลน์ 24 ชั่วโมง",
    image: "/images/contact/champ-location-2.png",
    googleMapLink:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3892.079378965175!2d101.2331901759861!3d12.70824192059564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3102fb57ae2dcbe9%3A0x3f4f72a4cae88d0b!2z4Lij4LiW4Lih4Li34Lit4Liq4Lit4LiH4Lij4Liw4Lii4Lit4LiHIOC4leC4peC4suC4lOC4o-C4liDguYHguIrguKHguJvguYwy!5e0!3m2!1sen!2sth!4v1760634594911!5m2!1sen!2sth",
  },
  {
    id: 3,
    name: "แชมป์ มาบตาพุด",
    address: "28 สุขุมวิท 30 ตำบลมาบตาพุด อำเภอเมือง, ระยอง",
    phone: "063-709-8888",
    facebook: "รถมือสอง แชมป์ มาบตาพุด",
    facebookLink: "https://www.facebook.com/share/17MSrj11nE/?mibextid=wwXIfr",
    hours: "เปิดบริการทุกวัน ไม่มีวันหยุด\n8:30-18:30 น. ออนไลน์ 24 ชั่วโมง",
    image: "/images/contact/champ-location-3.png",
    googleMapLink:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3891.9443282754705!2d101.15879687507204!3d12.717054887575411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3102f1b5628dac29%3A0xe8c77dcf2cd9c439!2z4Lij4LiW4Lih4Li34Lit4Liq4Lit4LiHIOC5geC4iuC4oeC4m-C5jCDguKHguLLguJrguJXguLLguJ7guLjguJQ!5e0!3m2!1sen!2sth!4v1760634692407!5m2!1sen!2sth",
  },
  {
    id: 4,
    name: "แชมป์ ปลวกแดง",
    address: "34 ปลวกแดง 12, ตำบลมาบยางพร, อำเภอปลวกแดง, ระยอง",
    phone: "095-555-5588",
    facebook: "รถมือสอง แชมป์ ปลวกแดง ระยอง",
    facebookLink: "https://www.facebook.com/share/19qfGWRUez/?mibextid=wwXIf",
    hours: "เปิดบริการทุกวัน ไม่มีวันหยุด\n8:30-18:30 น. ออนไลน์ 24 ชั่วโมง",
    image: "/images/contact/champ-location-4.png",
    googleMapLink:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.05792953542!2d101.19820467507633!3d12.968144987346864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3102c34d84055fbf%3A0xd42cc54af1f41324!2z4Lij4LiW4Lih4Li34Lit4Liq4Lit4LiHIOC5geC4iuC4oeC4m-C5jCDguJvguKXguKfguIHguYHguJTguIcg4Lij4Liw4Lii4Lit4LiH!5e0!3m2!1sen!2sth!4v1760634764558!5m2!1sen!2sth",
  },
  {
    id: 5,
    name: "แชมป์ สะพาน 4",
    address: "50, ตำบลมาบยางพร, อำเภอปลวกแดง, ระยอง",
    phone: "088-777-8856",
    facebook: "รถมือสองระยอง แชมป์ สะพาน 4",
    facebookLink: "https://www.facebook.com/share/1GHaaBqSF7/?mibextid=wwXIfr",
    hours: "เปิดบริการทุกวัน ไม่มีวันหยุด\n8:30-18:30 น. ออนไลน์ 24 ชั่วโมง",
    image: "/images/contact/champ-location-5.png",
    googleMapLink:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.757528691881!2d101.13656717507682!3d12.987354387329457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3102c3cbbc707373%3A0x5bf9c4cd119b6fe!2z4Lij4LiW4Lih4Li34Lit4Liq4Lit4LiHIOC5geC4iuC4oeC4m-C5jCDguKrguLDguJ7guLLguJk0!5e0!3m2!1sen!2sth!4v1760634804961!5m2!1sen!2sth",
  },
  {
    id: 6,
    name: "Car Dj",
    address: "179 หมู่ 6 ถนนสุขุมวิท ตำบลเนินพระ อำเภอเมืองระยอง, ระยอง",
    phone: "089-799-9993",
    facebook: "รถมือสอง คาร์ดีเจ รถดีจริง",
    facebookLink: "https://www.facebook.com/share/1Jv4zRNurB/?mibextid=wwX",
    hours: "เปิดบริการทุกวัน ไม่มีวันหยุด\n8:30-18:30 น. ออนไลน์ 24 ชั่วโมง",
    image: "/images/contact/champ-location-6.png",
    googleMapLink:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3892.3802289742866!2d101.20796677507161!3d12.688587787601405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3102fb789669d4d1%3A0xb11de04dceaca4fe!2z4Lij4LiW4Lih4Li34Lit4Liq4Lit4LiHIOC4hOC4suC4o-C5jOC4lOC4teC5gOC4iCDguKPguJbguJTguLXguIjguKPguLTguIc!5e0!3m2!1sen!2sth!4v1760634850768!5m2!1sen!2sth",
  },
];
