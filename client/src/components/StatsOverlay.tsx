/* eslint-disable @typescript-eslint/ban-ts-comment */
// components/StatsOverlay.tsx

import React, { useState, useEffect, useRef } from "react";
import { calculateDamage } from "@/lib/logic";
import { HealthScoreIcon } from "./healthScore";
import { playSound } from "@/lib/utilts";
import { TimestampedPosition } from "@/interfaces/hand.model";
import { ScoreData } from "@/interfaces/stats.model";

interface StatsOverlayProps {
	handSpeed: number;
	isColliding: boolean;
	remoteHandSpeed: number;
	isRemoteColliding: boolean;
	remotePreviousHandPositionRef: React.MutableRefObject<TimestampedPosition | null>;
	localPreviousHandPositionRef: React.MutableRefObject<TimestampedPosition | null>;
	finalScoreData: ScoreData;
	setFinalScoreData: React.Dispatch<React.SetStateAction<ScoreData>>;
}

export default function StatsOverlay({
	handSpeed,
	isColliding,
	remoteHandSpeed,
	isRemoteColliding,
	remotePreviousHandPositionRef,
	localPreviousHandPositionRef,
	finalScoreData,
	setFinalScoreData,
}: StatsOverlayProps) {
	const [localLastInflictedDamage, setLocalLastInflictedDamage] =
		useState<number>(0);
	const [remoteLastInflictedDamage, setRemoteLastInflictedDamage] =
		useState<number>(0);

	// -------------- Health States --------------
	const [localHealth, setLocalHealth] = useState<number>(100);
	const [remoteHealth, setRemoteHealth] = useState<number>(100);

	const prevLocalCollision = useRef(false);
	const prevRemoteCollision = useRef(false);

	useEffect(() => {
		if (remoteHealth < 0 || localHealth < 0) return;
		if (isColliding && !prevLocalCollision.current) {
			const currentTime = Date.now();
			const lastHitTime = localPreviousHandPositionRef.current?.timestamp ?? 0;

			// 500ms cooldown between hits
			if (currentTime - lastHitTime > 500) {
				const damage = calculateDamage(handSpeed);
				
				setRemoteLastInflictedDamage(damage.damage);
				setRemoteHealth((prev) => Math.max(0, prev - damage.damage));
				
				// Update final score data for local player's hit
				setFinalScoreData(prev => ({
					...prev,
					localHits: prev.localHits + 1,
					localHighestDamage: Math.max(prev.localHighestDamage, damage.damage),
					remoteHealth: Math.max(0, remoteHealth - damage.damage)
				}));

				if (localPreviousHandPositionRef.current) {
					localPreviousHandPositionRef.current.timestamp = currentTime;
				}
			}
		}
		prevLocalCollision.current = isColliding;
	}, [isColliding, handSpeed, localPreviousHandPositionRef, remoteHealth, localHealth]);

	useEffect(() => {
		if (remoteHealth > 0) {
			const options = ["punch", "slap-2", "slap", "swords"];

			// @ts-ignore
			playSound(options[Math.floor(Math.random() * options.length)]);
		} else {
			playSound("knockout");
		}
	}, [remoteHealth]);

	useEffect(() => {
		if (remoteHealth < 10 || localHealth < 10) return;
		if (isRemoteColliding && !prevRemoteCollision.current) {
			const currentTime = Date.now();
			const lastHitTime = remotePreviousHandPositionRef.current?.timestamp ?? 0;

			// 500ms cooldown between hits
			if (currentTime - lastHitTime > 500) {
				const damage = calculateDamage(remoteHandSpeed);
				setLocalLastInflictedDamage(damage.damage);
				setLocalHealth((prev) => Math.max(0, prev - damage.damage));
				
				// Update final score data for remote player's hit
				setFinalScoreData(prev => ({
					...prev,
					remoteHits: prev.remoteHits + 1,
					remoteHighestDamage: Math.max(prev.remoteHighestDamage, damage.damage),
					localHealth: Math.max(0, localHealth - damage.damage)
				}));

				if (remotePreviousHandPositionRef.current) {
					remotePreviousHandPositionRef.current.timestamp = currentTime;
				}
			}
		}
		prevRemoteCollision.current = isRemoteColliding;
	}, [isRemoteColliding, remoteHandSpeed, remotePreviousHandPositionRef, remoteHealth, localHealth]);

	return (
		<div className="bg-black/50 p-4 rounded-lg text-white">
			<div className="grid grid-cols-2 gap-4">
				{/* Local Stats */}
				<div className="flex flex-col gap-2">
					<h3 className="font-bold">Local</h3>
					<div className="w-full">
						<HealthScoreIcon
							score={Math.floor(localHealth / 10)}
							color="blue"
						/>
					</div>
					<div>
						Speed: {handSpeed.toFixed(2)} units/ms
						<div className="w-32 h-2 bg-gray-700 rounded">
							<div
								className="h-full bg-green-500 rounded transition-all"
								style={{ width: `${Math.min(handSpeed * 100, 100)}%` }}
							/>
						</div>
					</div>
					<div>Last Damage Taken: {localLastInflictedDamage.toFixed(1)}</div>
					<div>
						Collision:{" "}
						<span className={isColliding ? "text-red-500" : "text-green-500"}>
							{isColliding ? "YES" : "NO"}
						</span>
					</div>
				</div>

				{/* Remote Stats */}
				<div className="flex flex-col gap-2 w-full items-end">
					<h3 className="font-bold">Remote</h3>
					<HealthScoreIcon score={Math.floor(remoteHealth / 10)} color="red" />
					<div>
						Speed: {remoteHandSpeed.toFixed(2)} units/ms
						<div className="w-32 h-2 bg-gray-700 rounded">
							<div
								className="h-full bg-green-500 rounded transition-all"
								style={{ width: `${Math.min(remoteHandSpeed * 100, 100)}%` }}
							/>
						</div>
					</div>
					<div>Last Damage Taken: {remoteLastInflictedDamage.toFixed(1)}</div>
					<div>
						Collision:{" "}
						<span
							className={isRemoteColliding ? "text-red-500" : "text-green-500"}
						>
							{isRemoteColliding ? "YES" : "NO"}
						</span>
					</div>
				</div>
			</div>

			{/* Final Score Display */}
			{(localHealth < 10 || remoteHealth < 10) && (
				<div className="fixed inset-0 bg-black/80 flex items-center justify-center">
					<div className="bg-gray-900 p-8 rounded-lg border border-white/20 max-w-2xl w-full mx-4">
						<h2 className="text-6xl font-bold text-center mb-8 animate-bounce">
							{localHealth < 10 ? "YOU LOST!" : "YOU WON!"}
						</h2>
						<div className="grid grid-cols-2 gap-8">
							<div className="space-y-2">
								<h3 className="font-bold text-xl">Your Stats</h3>
								<p>Hits: {finalScoreData.localHits}</p>
								<p>Highest Damage: {finalScoreData.localHighestDamage.toFixed(1)}</p>
								<p>Health: {finalScoreData.localHealth.toFixed(1)}</p>
							</div>
							<div className="text-right space-y-2">
								<h3 className="font-bold text-xl">Opponent Stats</h3>
								<p>Hits: {finalScoreData.remoteHits}</p>
								<p>Highest Damage: {finalScoreData.remoteHighestDamage.toFixed(1)}</p>
								<p>Health: {finalScoreData.remoteHealth.toFixed(1)}</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
