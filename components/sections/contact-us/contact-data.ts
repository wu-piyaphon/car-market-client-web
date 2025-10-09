export interface LocationInfo {
  id: number;
  name: string;
  address: string;
  phone: string;
  facebook?: string;
  line?: string;
  hours: string;
  image: string;
}

export const CONTACT_LOCATIONS: LocationInfo[] = [
  {
    id: 1,
    name: "แชมป์ออโต้ระยอง 1",
    address: "เลขที่ 168 หมู่4 ตำบลกบินมา อำเภอเมือง จังหวัดระยอง 21000",
    phone: "063-809-8888",
    facebook: "เพจตลาดรถ มือสอง ระยอง แชมป์1",
    line: "0637098888",
    hours: "เปิดบริการทุกวัน 24 ชม",
    image: "/images/contact/location-1.jpg",
  },
  {
    id: 2,
    name: "แชมป์ออโต้ระยอง 2",
    address: "เลขที่ 255 หมู่3 ตำบลนาป่า อำเภอเมือง จังหวัดระยอง 21000",
    phone: "063-809-8889",
    facebook: "เพจตลาดรถ มือสอง ระยอง แชมป์2",
    line: "0637098889",
    hours: "เปิดบริการทุกวัน 24 ชม",
    image: "/images/contact/location-2.jpg",
  },
  {
    id: 3,
    name: "แชมป์ออโต้ชลบุรี",
    address: "เลขที่ 89 หมู่7 ตำบลบางละมุง อำเภอบางละมุง จังหวัดชลบุรี 20150",
    phone: "063-809-8890",
    facebook: "เพจตลาดรถ มือสอง ชลบุรี แชมป์",
    line: "0637098890",
    hours: "เปิดบริการทุกวัน 24 ชม",
    image: "/images/contact/location-3.jpg",
  },
  {
    id: 4,
    name: "แชมป์ออโต้สระแก้ว",
    address: "เลขที่ 123 หมู่5 ตำบลสระแก้ว อำเภอสระแก้ว จังหวัดสระแก้ว 27160",
    phone: "063-809-8891",
    facebook: "เพจตลาดรถ มือสอง สระแก้ว แชมป์",
    line: "0637098891",
    hours: "เปิดบริการทุกวัน 24 ชม",
    image: "/images/contact/location-4.jpg",
  },
  {
    id: 5,
    name: "แชมป์ออโต้ฉะเชิงเทรา",
    address: "เลขที่ 456 หมู่8 ตำบลบางคะเอา อำเภอเมือง จังหวัดฉะเชิงเทรา 24000",
    phone: "063-809-8892",
    facebook: "เพจตลาดรถ มือสอง ฉะเชิงเทรา แชมป์",
    line: "0637098892",
    hours: "เปิดบริการทุกวัน 24 ชม",
    image: "/images/contact/location-5.jpg",
  },
];
