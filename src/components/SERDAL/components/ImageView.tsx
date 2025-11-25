// ImagePreview.tsx
import { useState } from "react";

interface ImagePreviewProps {
  src: string;
  alt?: string;
  className?: string;
}

export default function ImagePreview({ src, alt = "", className = "" }: ImagePreviewProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`cursor-pointer ${className}`}
        onClick={() => setOpen(true)}
      />

      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >
          <div className="relative max-w-3xl w-auto p-4">
            <img
              src={src}
              alt={alt}
              className="rounded-sm max-h-[90vh] mx-auto"
            />

            {/* Close button */}
            <button
                onClick={(e) => {
                e.stopPropagation(); // prevent modal from closing when clicking inside
                setOpen(false);
                }}
                className="absolute top-4 right-5 text-white text-3xl font-bold bg-black/40 rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/60"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
