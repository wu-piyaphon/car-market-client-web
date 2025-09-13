"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "@/components/hook-forms/form";
import RHFAutocomplete from "@/components/hook-forms/rhf-autocomplete";
import RHFTextField from "@/components/hook-forms/rhf-textfield";
import { Button } from "@/components/ui/button";
import CarImageBanner from "@/components/ui/custom-banner/car-image-banner";
import {
  type CarFilterSchema,
  carFilterSchema,
} from "../../../lib/schemas/cars-filter-schema";

// ----------------------------------------------------------------------

const INPUT_PROPS = {
  TOP: { className: "rounded-b-none border-b-0" },
  MIDDLE: { className: "rounded-none border-b-0" },
  BOTTOM_LEFT: { className: "rounded-none rounded-bl-md border-r-0" },
  BOTTOM_RIGHT: { className: "rounded-none rounded-br-md" },
  BOTTOM: { className: "rounded-t-none" },
};

// ----------------------------------------------------------------------

export default function CarsFilterMobile() {
  const methods = useForm<CarFilterSchema>({
    resolver: zodResolver(carFilterSchema),
    defaultValues: {
      brand: "",
      type: "",
      maxPrice: "",
      minPrice: "",
    },
  });

  const [showMore, setShowMore] = useState(false);

  return (
    <motion.div
      className="relative pb-8 md:hidden"
      animate={{ height: showMore ? "680px" : "360px" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="-ml-10 h-full w-[120vw] bg-black/90 blur-md">
        <CarImageBanner />
      </div>

      <article className="-translate-x-1/2 absolute top-5 left-1/2 z-20 w-full max-w-[320px]">
        <Form methods={methods}>
          <div className="rounded-md bg-white">
            <RHFAutocomplete
              name="type"
              label="ประเภท"
              options={[
                { id: "1", name: "SUV" },
                { id: "2", name: "Sedan" },
                { id: "3", name: "Hatchback" },
              ]}
              InputProps={INPUT_PROPS.TOP}
            />

            <RHFAutocomplete
              name="brand"
              label="ยี่ห้อ"
              options={[
                { id: "1", name: "Toyota" },
                { id: "2", name: "Honda" },
                { id: "3", name: "Nissan" },
              ]}
              InputProps={INPUT_PROPS.MIDDLE}
            />

            <AnimatePresence>
              {showMore && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <RHFAutocomplete
                    name="model"
                    label="รุ่น"
                    options={[]}
                    InputProps={INPUT_PROPS.MIDDLE}
                  />
                  <RHFAutocomplete
                    name="subModel"
                    label="รุ่นย่อย"
                    options={[]}
                    InputProps={INPUT_PROPS.MIDDLE}
                  />
                  <RHFAutocomplete
                    name="color"
                    label="สีรถ"
                    options={[]}
                    InputProps={INPUT_PROPS.MIDDLE}
                  />
                  <RHFAutocomplete
                    name="transmission"
                    label="ระบบเกียร์"
                    options={[]}
                    InputProps={INPUT_PROPS.MIDDLE}
                  />
                  <RHFAutocomplete
                    name="engineType"
                    label="ประเภทเครื่องยนต์"
                    options={[]}
                    InputProps={INPUT_PROPS.MIDDLE}
                  />
                  <RHFAutocomplete
                    name="engineSize"
                    label="ขนาดเครื่องยนต์"
                    options={[]}
                    InputProps={INPUT_PROPS.MIDDLE}
                  />
                  <RHFAutocomplete
                    name="mileage"
                    label="เลขไมล์"
                    options={[]}
                    InputProps={INPUT_PROPS.MIDDLE}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-row">
              <RHFTextField
                name="minPrice"
                label="ราคาต่ำสุด"
                className="flex-1"
                InputProps={INPUT_PROPS.BOTTOM_LEFT}
              />
              <RHFTextField
                name="maxPrice"
                label="ราคาสูงสุด"
                className="flex-1"
                InputProps={INPUT_PROPS.BOTTOM_RIGHT}
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2.5">
            <Button size="lg">
              <Search />
              ค้นหารถ
            </Button>
            <Button
              type="button"
              size="lg"
              variant="outline"
              className="border-white text-white"
              onClick={() => setShowMore((prev) => !prev)}
            >
              ค้นหาแบบละเอียด
            </Button>
          </div>
        </Form>
      </article>
    </motion.div>
  );
}
