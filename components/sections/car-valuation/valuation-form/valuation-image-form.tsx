import RHFUpload from "@/components/hook-forms/rhf-upload";
import { CAR_IMAGE_SLOTS } from "@/lib/constants/car-valuation.constants";

// ----------------------------------------------------------------------

const PLACEHOLDER_IMAGE_PATH = "/images/placeholder/car-valuation";

// ----------------------------------------------------------------------

export default function ValuationImageForm() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-6">
      {CAR_IMAGE_SLOTS.map((slot, index) => (
        <RHFUpload
          key={slot.id}
          name={`files.${index}`}
          label={slot.label}
          placeholderImage={
            slot.placeholderImage
              ? `${PLACEHOLDER_IMAGE_PATH}${slot.placeholderImage}`
              : undefined
          }
          required
        />
      ))}
    </div>
  );
}
