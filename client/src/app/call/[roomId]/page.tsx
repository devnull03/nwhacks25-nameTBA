/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import useMediapipe from "../hooks/useMediapipe";
import useSocketIO from "../hooks/useSocketIO";
import RemoteVideoSection from "@/components/RemoteVideoSection";
import StatsOverlay from "@/components/StatsOverlay";
import LocalVideoSection from "@/components/LocalVideoSection";
import useWebRTC from "../hooks/useWebRTC";
import { playSound, renderVisual } from "@/lib/utilts";
import { TimestampedPosition } from "@/interfaces/hand.model";
import RoomInfo from "@/components/RoomInfo";
import { ScoreData } from "@/interfaces/stats.model";

export default function CallPage() {
	const { roomId } = useParams() as { roomId: string };

	// -------------- Video Refs --------------
	const localVideoRef = useRef<HTMLVideoElement>(
		null!
	) as React.RefObject<HTMLVideoElement>;
	const remoteVideoRef = useRef<HTMLVideoElement>(
		null!
	) as React.RefObject<HTMLVideoElement>;

	// -------------- Canvas Refs (face/hand for each side) --------------
	const localFaceCanvasRef = useRef<HTMLCanvasElement>(
		null!
	) as React.RefObject<HTMLCanvasElement>;
	const localHandCanvasRef = useRef<HTMLCanvasElement>(
		null!
	) as React.RefObject<HTMLCanvasElement>;
	const remoteFaceCanvasRef = useRef<HTMLCanvasElement>(
		null!
	) as React.RefObject<HTMLCanvasElement>;
	const remoteHandCanvasRef = useRef<HTMLCanvasElement>(
		null!
	) as React.RefObject<HTMLCanvasElement>;

	// -------------- Collision & Speed States --------------
	const [handSpeed, setHandSpeed] = useState<number>(0);
	// const [handDirection, setHandDirection] = useState<number>(0);
	const [isColliding, setIsColliding] = useState<boolean>(false);
	const localPreviousHandPositionRef = useRef<TimestampedPosition | null>(null);

	const [remoteHandSpeed, setRemoteHandSpeed] = useState<number>(0);
	// const [remoteHandDirection, setRemoteHandDirection] = useState<number>(0);
	const [isRemoteColliding, setIsRemoteColliding] = useState<boolean>(false);
	const remotePreviousHandPositionRef = useRef<TimestampedPosition | null>(
		null
	);

	const [finalScoreData, setFinalScoreData] = useState<ScoreData>({
		localHighestDamage: 0,
		remoteHighestDamage: 0,
		localHits: 0,
		remoteHits: 0,
		localHealth: 100,
		remoteHealth: 100,
	});

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
		setRemoteHandSpeed,
		localPreviousHandPositionRef,
		remotePreviousHandPositionRef,
	});

	useEffect(() => {
		setTimeout(() => {
			playSound("ready-go");
			renderVisual("ready-go");
		}, 1000);
	}, []);

	return (
		<div className="w-full h-screen bg-gray-800 relative">
			<RoomInfo roomId={roomId} />

			{/* Main remote video container */}
			<div className="w-full h-full p-2">
				<RemoteVideoSection
					remoteVideoRef={remoteVideoRef}
					remoteStreamExists={remoteStreamExists}
					remoteFaceCanvasRef={remoteFaceCanvasRef}
					localHandCanvasRef={localHandCanvasRef}
				/>
			</div>

			{/* Floating local video container */}
			<LocalVideoSection
				localVideoRef={localVideoRef}
				localFaceCanvasRef={localFaceCanvasRef}
				remoteHandCanvasRef={remoteHandCanvasRef}
			/>

			{/* Bottom stats overlay */}
			<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full">
				<StatsOverlay
					handSpeed={handSpeed}
					isColliding={isColliding}
					remoteHandSpeed={remoteHandSpeed}
					isRemoteColliding={isRemoteColliding}
					localPreviousHandPositionRef={localPreviousHandPositionRef}
					remotePreviousHandPositionRef={remotePreviousHandPositionRef}
					finalScoreData={finalScoreData}
					setFinalScoreData={setFinalScoreData}
				/>
			</div>
		</div>
	);
}
