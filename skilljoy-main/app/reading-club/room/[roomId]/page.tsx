'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function RoomPage() {
  const params = useParams();
  const roomId = params.roomId as string;

  return (
    <main className="min-h-screen bg-[#0f1219] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Reading Room #{roomId}</h1>
        <p className="text-gray-400 mb-6">This is where the reading room will be displayed.</p>
        <Link href="/reading-club" className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition">
          Back to Reading Club
        </Link>
      </div>
    </main>
  );
}