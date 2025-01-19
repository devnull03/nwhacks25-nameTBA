/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useMediapipe from "../hooks/useMediapipe";
import useSocketIO from "../hooks/useSocketIO";
import RemoteVideoSection from "@/components/RemoteVideoSection";
import StatsOverlay from "@/components/StatsOverlay";
import LocalVideoSection from "@/components/LocalVideoSection";
import useWebRTC from "../hooks/useWebRTC";
import { playSound, renderVisual } from "@/lib/utilts";
import { TimestampedPosition } from "@/interfaces/hand.model";
import RoomInfo from "@/components/RoomInfo";
import { useRPC } from "@/lib/rpc/RPCProvider";
import { rpc } from "@/lib/rpc";
import { Bet } from "@/lib/rpc/typechain-types";

export default function CallPage() {
	const router = useRouter();
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

	const [loading, setLoading] = useState<boolean>(true);
	const [bet, setBet] = useState<Bet.BetDetailsStruct | null>(null);

	const { provider, address } = useRPC();

	useEffect(() => {
		(async () => {
			if (!provider || !address) return;
			setLoading(true);

			try {
				const bet = await rpc.bet.getBet(parseInt(roomId), provider);
				setBet(bet);
				if (bet.resolved) {
					window.alert("This bet has already been resolved");
					return;
				}
				if (bet.player1 !== address && bet.player2 !== address) {
					window.alert("You are not part of this bet");
					return;
				}
				if (bet.player1 === address && !bet.player1Paid) {
					window.alert("You have not paid your bet yet");
					await rpc.bet.fund(parseInt(roomId), BigInt(bet.amount), provider);
					router.refresh();
					return;
				}
				if (bet.player2 === address && !bet.player2Paid) {
					window.alert("You have not paid your bet yet");
					const tx = await rpc.bet.fund(
						parseInt(roomId),
						BigInt(bet.amount),
						provider
					);

					router.refresh();
					return;
				}
				// the other player has not paid
				if (bet.player1 === address && !bet.player2Paid) {
					window.alert("The other player has not paid the bet yet");
					return;
				}
				if (bet.player2 === address && !bet.player1Paid) {
					window.alert("The other player has not paid the bet yet");
					return;
				}

				if (bet.player1Paid && bet.player2Paid && !bet.started) {
					window.alert(
						"The game has not started yet. If you are ready, initialize it."
					);
					await rpc.bet.startBet(parseInt(roomId), provider);
					router.refresh();
				}
			} catch (err) {
				window.alert(
					"Seems like you are not part of this bet or it does not exist. " + err
				);
			}
			setLoading(false);
		})();
	}, [address, provider, roomId, router]);

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
		if (!provider || !address || loading) return;
		setTimeout(() => {
			playSound("ready-go");
			renderVisual("ready-go");
		}, 1000);
	}, [address, loading, provider]);

	if (!address || !provider) {
		return null;
	}

	if (loading) {
		return <div>Loading the system...</div>;
	}

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
				/>
			</div>
		</div>
	);
}
