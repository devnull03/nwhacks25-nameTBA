// components/LocalVideoSection.tsx

import React, { RefObject } from 'react';

interface LocalVideoSectionProps {
  localVideoRef: RefObject<HTMLVideoElement>;
  localFaceCanvasRef: RefObject<HTMLCanvasElement>;
  remoteHandCanvasRef: RefObject<HTMLCanvasElement>;
}

export function LocalVideoSection({
  localVideoRef,
  localFaceCanvasRef,
  remoteHandCanvasRef,
}: LocalVideoSectionProps) {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-2xl bg-gray-800/50 backdrop-blur-sm">
      <div className="aspect-video relative">
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover mirror"
        />
        <canvas
          ref={localFaceCanvasRef}
          className="absolute inset-0 w-full h-full"
        />
        <canvas
          ref={remoteHandCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
      </div>
      <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1.5 rounded-lg">
        <span className="text-white text-sm font-medium">You</span>
      </div>
    </div>
  );
}
