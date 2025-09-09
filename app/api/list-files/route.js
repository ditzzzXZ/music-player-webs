import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  const musicDir = path.join(process.cwd(), 'src/music');
  try {
    const files = await fs.readdir(musicDir);
    const mp3Files = files.filter((file) => file.endsWith('.mp3'));
    return NextResponse.json(mp3Files);
  } catch (error) {
    console.error('Error reading music directory:', error);
    return NextResponse.json([], { status: 500 });
  }
}
