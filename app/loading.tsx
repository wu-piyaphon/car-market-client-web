"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-100 flex min-h-screen flex-col items-center justify-center backdrop-blur-xs">
      <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
        {/* -- Spinner -- */}
        <div className="relative">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-primary"></div>
          <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full border-4 border-[#34B6B8] opacity-20"></div>
        </div>

        {/* -- Loading Text -- */}
        <div className="flex flex-col items-center space-y-2">
          <h2 className="animate-fade-in font-semibold text-primary text-xl">
            กำลังโหลด...
          </h2>
          <p className="animate-fade-in-delay text-base text-gray-700">
            กรุณารอสักครู่ เรากำลังเตรียมข้อมูลให้คุณ
          </p>
        </div>
      </div>
    </div>
  );
}
