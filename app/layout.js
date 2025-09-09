import './globals.css';
import { Poppins } from 'next/font/google';
import AudioPlayer from '../components/AudioPlayer';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-gradient-to-br from-blue-900 to-blue-500 text-white min-h-screen`}>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-64 p-6 bg-blue-950/80 backdrop-blur-md">
            <img
              src="/img/logo.png"
              alt="Logo"
              className="h-12 mb-8 rounded-lg transition-transform hover:scale-105"
            />
            <nav>
              <ul className="space-y-4">
                <li>
                  <a href="/dashboard" className="text-lg hover:text-cyan-300 transition-colors">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="/search" className="text-lg hover:text-cyan-300 transition-colors">
                    Search Lyrics
                  </a>
                </li>
                <li>
                  <a href="/library" className="text-lg hover:text-cyan-300 transition-colors">
                    Your Library
                  </a>
                </li>
              </ul>
            </nav>
          </aside>
          {/* Main Content */}
          <main className="flex-1 p-8 overflow-y-auto">{children}</main>
        </div>
        {/* Audio Player */}
        <footer className="fixed bottom-0 w-full bg-blue-950/90 p-4 backdrop-blur-md">
          <AudioPlayer />
        </footer>
      </body>
    </html>
  );
    }
