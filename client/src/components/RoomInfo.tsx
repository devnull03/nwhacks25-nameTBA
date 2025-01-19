import React, { useState } from 'react';

interface RoomInfoProps {
  roomId: string;
}

export default function RoomInfo({ roomId }: RoomInfoProps) {
  const [copied, setCopied] = useState(false);
  const shareLink = `https://stream.place/0xe3e7873dd87e7323b3731c575397484e6fdf2e42`;

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
        <div className="flex items-center gap-2 mt-2">
          <a
            href={shareLink}
            target="https://stream.place/0xe3e7873dd87e7323b3731c575397484e6fdf2e42"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 text-xs underline flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Open Livestream
          </a>
          <button
            onClick={() => window.open(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(shareLink)}`, '_blank')}
            className="text-blue-400 hover:text-blue-300 text-xs underline flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
            View QR Code
          </button>
        </div>
      </div>
    </div>
  );
}
