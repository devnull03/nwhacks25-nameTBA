/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import useMediapipe from '../hooks/useMediapipe';
import useSocketIO from '../hooks/useSocketIO';
import { RemoteVideoSection } from '@/components/RemoteVideoSection';
import { StatsOverlay } from '@/components/StatsOverlay';
import { LocalVideoSection } from '@/components/LocalVideoSection';
import useWebRTC from '../hooks/useWebRTC';


export default function CallPage() {
  const { roomId } = useParams() as { roomId: string };

  // -------------- Video Refs --------------
  const localVideoRef = useRef<HTMLVideoElement>(null!) as React.RefObject<HTMLVideoElement>;
  const remoteVideoRef = useRef<HTMLVideoElement>(null!) as React.RefObject<HTMLVideoElement>;

  // -------------- Canvas Refs (face/hand for each side) --------------
  const localFaceCanvasRef = useRef<HTMLCanvasElement>(null!) as React.RefObject<HTMLCanvasElement>;
  const localHandCanvasRef = useRef<HTMLCanvasElement>(null!) as React.RefObject<HTMLCanvasElement>;
  const remoteFaceCanvasRef = useRef<HTMLCanvasElement>(null!) as React.RefObject<HTMLCanvasElement>;
  const remoteHandCanvasRef = useRef<HTMLCanvasElement>(null!) as React.RefObject<HTMLCanvasElement>;

  // -------------- Collision & Speed States --------------
  const [handSpeed, setHandSpeed] = useState<number>(0);
  const [handDirection, setHandDirection] = useState<number>(0);
  const [isColliding, setIsColliding] = useState<boolean>(false);

  const [remoteHandSpeed, setRemoteHandSpeed] = useState<number>(0);
  const [remoteHandDirection, setRemoteHandDirection] = useState<number>(0);
  const [isRemoteColliding, setIsRemoteColliding] = useState<boolean>(false);

  // -------------- Hooks: Socket + WebRTC --------------
  const { socketRef } = useSocketIO(roomId);
  const { peerConnectionRef, remoteStreamExists } = useWebRTC({
    roomId,
    socketRef,
    localVideoRef,
    remoteVideoRef,
  });

  // -------------- Hook: Mediapipe (Face/Hand) --------------
  useMediapipe({
    roomId,
    socketRef,
    localVideoRef,
    remoteVideoRef,
    localFaceCanvasRef,
    localHandCanvasRef,
    remoteFaceCanvasRef,
    remoteHandCanvasRef,
    remoteStreamExists,
    isColliding,
    setIsColliding,
    isRemoteColliding,
    setIsRemoteColliding,
    setHandSpeed,
    setHandDirection,
    setRemoteHandSpeed,
    setRemoteHandDirection,
  });

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* LOCAL side */}
          <LocalVideoSection
            localVideoRef={localVideoRef}
            localFaceCanvasRef={localFaceCanvasRef}
            remoteHandCanvasRef={remoteHandCanvasRef}
          />

          {/* REMOTE side */}
          <RemoteVideoSection
            remoteVideoRef={remoteVideoRef}
            remoteStreamExists={remoteStreamExists}
            remoteFaceCanvasRef={remoteFaceCanvasRef}
            localHandCanvasRef={localHandCanvasRef}
          />
        </div>
      </div>

      <StatsOverlay
        handSpeed={handSpeed}
        handDirection={handDirection}
        isColliding={isColliding}
        remoteHandSpeed={remoteHandSpeed}
        remoteHandDirection={remoteHandDirection}
        isRemoteColliding={isRemoteColliding}
      />
    </div>
  );
}
