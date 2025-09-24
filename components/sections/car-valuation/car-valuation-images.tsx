"use client";

import { Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface CarImage {
  id: string;
  file?: File;
  preview?: string;
  label: string;
}

interface CarValuationImagesProps {
  onImagesChange?: (images: CarImage[]) => void;
}

export default function CarValuationImages({
  onImagesChange,
}: CarValuationImagesProps) {
  const [images, setImages] = useState<CarImage[]>([
    { id: "front", label: "รูปรถหน้าขาว" },
    { id: "front-angled", label: "รูปรถหน้าบอก" },
    { id: "side", label: "รูปรถข้างขาว" },
    { id: "side-angled", label: "รูปรถข้างบอก" },
    { id: "interior", label: "รูปคอนโซล" },
    { id: "engine", label: "รูปห้องเครื่อง" },
    { id: "front-seats", label: "รูปภายใน(หน้า)" },
    { id: "rear-seats", label: "รูปภายใน(หลัง)" },
    { id: "dashboard", label: "สำนักงะเมียนรถ" },
    { id: "additional-1", label: "สำนักงะเมียนรถ" },
    { id: "additional-2", label: "สำนักงะเมียนรถ (หน้า 16)" },
    { id: "additional-3", label: "สำนักงะเมียนรถ (หน้า 18)" },
  ]);

  const handleImageUpload = (
    imageId: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const updatedImages = images.map((img) =>
        img.id === imageId
          ? { ...img, file, preview: e.target?.result as string }
          : img,
      );
      setImages(updatedImages);
      onImagesChange?.(updatedImages);
    };
    reader.readAsDataURL(file);
  };

  const renderImageUploadSlot = (image: CarImage) => (
    <div key={image.id} className="relative">
      <label
        htmlFor={`upload-${image.id}`}
        className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-gray-300 border-dashed transition-colors hover:border-gray-400 md:h-40 lg:h-48"
      >
        <input
          id={`upload-${image.id}`}
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(image.id, e)}
          className="hidden"
        />

        {image.preview ? (
          <div className="relative h-full w-full overflow-hidden rounded-lg">
            <Image
              src={image.preview}
              alt={image.label}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition-opacity hover:opacity-100">
              <span className="font-medium text-sm text-white">เปลี่ยนรูป</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200 opacity-60 md:h-16 md:w-16">
              <Plus className="h-6 w-6 text-gray-400 md:h-8 md:w-8" />
            </div>
            <span className="font-medium text-gray-500 text-xs opacity-70 md:text-sm">
              {image.label}
            </span>
          </div>
        )}
      </label>
    </div>
  );

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-6">
        {images.map(renderImageUploadSlot)}
      </div>
    </div>
  );
}
