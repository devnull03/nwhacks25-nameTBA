import React, { useState } from 'react';

interface RoomInfoProps {
  roomId: string;
}

export default function RoomInfo({ roomId }: RoomInfoProps) {
  const [copied, setCopied] = useState(false);
  const shareLink = `${window.location.origin}/call/${roomId}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="absolute top-4 left-4 bg-black/50 p-3 rounded-lg text-white text-sm backdrop-blur-sm">
      <div className="flex flex-col gap-2">
        <div>
          Room ID: <span className="font-bold">{roomId}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={copyToClipboard}
            className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-xs transition-colors"
          >
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
          {copied && (
            <span className="text-green-400 text-xs">✓</span>
          )}
        </div>
      </div>
    </div>
  );
}
