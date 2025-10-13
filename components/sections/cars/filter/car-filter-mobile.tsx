"use client";

import { Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useMemo, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import RHFAutocomplete from "@/components/hook-forms/rhf-autocomplete";
import RHFTextField from "@/components/hook-forms/rhf-textfield";
import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import CarImageBanner from "@/components/ui/custom-banner/car-image-banner";
import type { CarFilterSchema } from "@/lib/schemas/car-filter-schema";
import { cn } from "@/lib/utils";
import type { GetCarFiltersResponse } from "@/types/car-filter.types";

// ----------------------------------------------------------------------

const INPUT_PROPS = {
  TOP: { className: "rounded-b-none border-b-0" },
  MIDDLE: { className: "rounded-none border-b-0" },
  BOTTOM_LEFT: { className: "rounded-none rounded-bl-md border-r-0" },
  BOTTOM_RIGHT: { className: "rounded-none rounded-br-md" },
};

// ----------------------------------------------------------------------

type CarFilterMobileProps = {
  filterOptions: GetCarFiltersResponse;
};

// ----------------------------------------------------------------------

const containerVariants = {
  closed: {
    height: "320px",
  },
  open: {
    height: "790px",
  },
};

const contentVariants = {
  hidden: {
    height: 0,
    opacity: 0,
  },
  visible: {
    height: "auto",
    opacity: 1,
  },
};

// ----------------------------------------------------------------------

export default function CarFilterMobile({
  filterOptions,
}: CarFilterMobileProps) {
  const { control } = useFormContext<CarFilterSchema>();

  const [selectedModel] = useWatch({
    control,
    name: ["model"],
  });

  // Memoize filter options to prevent unnecessary re-renders
  const {
    types,
    brands,
    models,
    subModels,
    colors,
    transmissions,
    engineTypes,
    modelYears,
    engineCapacities,
  } = useMemo(() => filterOptions, [filterOptions]);

  const [showMore, setShowMore] = useState(false);

  const handleToggleMore = useCallback(() => {
    setShowMore((prev) => !prev);
  }, []);

  return (
    <>
      <Container>
        <h1 className="py-4 text-center font-bold text-4xl">
          ค้นหารถยนต์ของคุณที่ <span className="text-primary">“GoodCarMarket”</span>
        </h1>
      </Container>

      <motion.div
        className="relative"
        animate={showMore ? "open" : "closed"}
        variants={containerVariants}
      >
        <div className="-ml-10 h-full min-h-[320px] w-[120vw] bg-black/90 blur-md">
          <CarImageBanner />
        </div>

        <article className="-translate-x-1/2 absolute top-5 left-1/2 z-20 w-full max-w-[320px]">
          <div className="rounded-md bg-white">
            <RHFAutocomplete
              name="type"
              label="ประเภท"
              options={types}
              InputProps={INPUT_PROPS.TOP}
            />

            <RHFAutocomplete
              name="brand"
              label="ยี่ห้อ"
              options={brands}
              InputProps={INPUT_PROPS.MIDDLE}
            />

            <AnimatePresence>
              {showMore && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={contentVariants}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ overflow: "hidden", willChange: "height, opacity" }}
                >
                  <RHFAutocomplete
                    name="model"
                    label="รุ่น"
                    options={models}
                    InputProps={INPUT_PROPS.MIDDLE}
                  />
                  <RHFAutocomplete
                    name="subModel"
                    label="รุ่นย่อย"
                    disabled={!selectedModel}
                    options={subModels}
                    InputProps={INPUT_PROPS.MIDDLE}
                  />
                  <RHFAutocomplete
                    name="color"
                    label="สีรถ"
                    options={colors}
                    InputProps={INPUT_PROPS.MIDDLE}
                  />
                  <RHFAutocomplete
                    name="transmission"
                    label="ระบบเกียร์"
                    options={transmissions}
                    InputProps={INPUT_PROPS.MIDDLE}
                  />
                  <RHFAutocomplete
                    name="modelYear"
                    label="ปีรถ"
                    options={modelYears}
                    InputProps={INPUT_PROPS.MIDDLE}
                  />
                  <RHFAutocomplete
                    name="engineType"
                    label="ประเภทเครื่องยนต์"
                    options={engineTypes}
                    InputProps={INPUT_PROPS.MIDDLE}
                  />
                  <RHFAutocomplete
                    name="engineCapacity"
                    label="ขนาดเครื่องยนต์"
                    options={engineCapacities}
                    InputProps={INPUT_PROPS.MIDDLE}
                  />
                  <div className="flex flex-row">
                    <RHFTextField
                      name="minMileage"
                      label="เลขไมล์ต่ำสุด"
                      className="flex-1"
                      InputProps={{
                        className: cn(
                          INPUT_PROPS.MIDDLE.className,
                          "border-r-0",
                        ),
                      }}
                      type="currency"
                    />
                    <RHFTextField
                      name="maxMileage"
                      label="เลขไมล์สูงสุด"
                      className="flex-1"
                      InputProps={INPUT_PROPS.MIDDLE}
                      type="currency"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-row">
              <RHFTextField
                name="minPrice"
                label="ราคาต่ำสุด"
                className="flex-1"
                InputProps={INPUT_PROPS.BOTTOM_LEFT}
                type="currency"
              />
              <RHFTextField
                name="maxPrice"
                label="ราคาสูงสุด"
                className="flex-1"
                InputProps={INPUT_PROPS.BOTTOM_RIGHT}
                type="currency"
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
              className="border-white text-white hover:bg-white/20"
              onClick={handleToggleMore}
            >
              ค้นหาแบบ{showMore ? "ย่อ" : "ละเอียด"}
            </Button>
          </div>
        </article>
      </motion.div>
    </>
  );
}
