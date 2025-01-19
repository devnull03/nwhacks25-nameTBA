// components/StatsOverlay.tsx

import React from 'react';

interface StatsOverlayProps {
  handSpeed: number;
  handDirection: number;
  isColliding: boolean;
  remoteHandSpeed: number;
  remoteHandDirection: number;
  isRemoteColliding: boolean;
}

export function StatsOverlay({
  handSpeed,
  handDirection,
  isColliding,
  remoteHandSpeed,
  remoteHandDirection,
  isRemoteColliding,
}: StatsOverlayProps) {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
      <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
          <StatItem
            label="Your Speed"
            value={`${handSpeed.toFixed(2)} m/s`}
            isHighlighted={handSpeed > 5}
          />
          <StatItem
            label="Remote Speed"
            value={`${remoteHandSpeed.toFixed(2)} m/s`}
            isHighlighted={remoteHandSpeed > 5}
          />
          <StatItem
            label="Your Direction"
            value={`${handDirection.toFixed(1)}°`}
          />
          <StatItem
            label="Remote Direction"
            value={`${remoteHandDirection.toFixed(1)}°`}
          />
          <CollisionIndicator
            label="Your Collision"
            isColliding={isColliding}
          />
          <CollisionIndicator
            label="Remote Collision"
            isColliding={isRemoteColliding}
          />
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, value, isHighlighted = false }: {
  label: string;
  value: string;
  isHighlighted?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-400 text-xs">{label}</span>
      <span className={`text-sm font-medium ${
        isHighlighted ? 'text-yellow-400' : 'text-white'
      }`}>
        {value}
      </span>
    </div>
  );
}

function CollisionIndicator({ label, isColliding }: {
  label: string;
  isColliding: boolean;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-400 text-xs">{label}</span>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${
          isColliding ? 'bg-red-500' : 'bg-green-500'
        }`} />
        <span className="text-sm font-medium text-white">
          {isColliding ? 'Active' : 'Clear'}
        </span>
      </div>
    </div>
  );
}
