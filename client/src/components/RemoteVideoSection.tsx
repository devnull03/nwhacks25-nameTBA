// components/RemoteVideoSection.tsx

import React, { RefObject } from 'react';

interface RemoteVideoSectionProps {
  remoteVideoRef: RefObject<HTMLVideoElement>;
  remoteStreamExists: boolean;
  remoteFaceCanvasRef: RefObject<HTMLCanvasElement>;
  localHandCanvasRef: RefObject<HTMLCanvasElement>;
}

export function RemoteVideoSection({
  remoteVideoRef,
  remoteStreamExists,
  remoteFaceCanvasRef,
  localHandCanvasRef,
}: RemoteVideoSectionProps) {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-2xl bg-gray-800/50 backdrop-blur-sm">
      <div className="aspect-video relative">
        {!remoteStreamExists && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4" />
              <p className="text-white text-sm">Waiting for peer to join...</p>
            </div>
          </div>
        )}
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
        <canvas
          ref={remoteFaceCanvasRef}
          className="absolute inset-0 w-full h-full"
        />
        <canvas
          ref={localHandCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
      </div>
      <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1.5 rounded-lg">
        <span className="text-white text-sm font-medium">Remote User</span>
      </div>
    </div>
  );
}
