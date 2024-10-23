import React from 'react';
import { Settings, Volume2, VolumeX } from 'lucide-react';

interface HeaderProps {
  isMuted: boolean;
  onToggleMute: () => void;
}

export function Header({ isMuted, onToggleMute }: HeaderProps) {
  return (
    <div className="bg-indigo-600 p-4 flex justify-between items-center">
      <h1 className="text-white text-xl font-semibold">AI Assistant</h1>
      <div className="flex gap-3">
        <button
          onClick={onToggleMute}
          className="p-2 rounded-full hover:bg-indigo-500 transition-colors"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-white" />
          ) : (
            <Volume2 className="w-5 h-5 text-white" />
          )}
        </button>
        <button 
          className="p-2 rounded-full hover:bg-indigo-500 transition-colors"
          title="Settings"
        >
          <Settings className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}