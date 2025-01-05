import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen p-8`}>
      <main className="max-w-6xl mx-auto space-y-6">
        {/* Positions Section */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl">Positions</h2>
              <button className="text-sm text-gray-500">?</button>
            </div>
          </div>
          <div className="p-6 text-center">
            <h3 className="text-lg font-medium mb-2">YOU DO NOT HAVE A POSITION YET</h3>
            <p className="text-gray-600 mb-4">
              When a user first deposits collateral into a vault, the system<br />
              mints them an NFT. One NFT is minted per collateral type,<br />
              which creates a clear separation between loans.
            </p>
            <Link 
              href="/mint"
              className="block w-full py-3 bg-gray-100 hover:bg-gray-200 rounded text-gray-800"
            >
              CREATE A POSITION
            </Link>
          </div>
        </section>

        {/* Locks Section */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl">Locks</h2>
              <button className="text-sm text-gray-500">?</button>
            </div>
          </div>
          <div className="p-6 text-center">
            <h3 className="text-lg font-medium mb-2">YOU DO NOT HAVE A LOCK YET</h3>
            <p className="text-gray-600 mb-4">
              Lock PEG into vePEG to earn your share of protocol<br />
              revenue, receive incentives, vote on emissions, and get<br />
              protected from dilution via rebases.
            </p>
            <Link 
              href="/lock"
              className="block w-full py-3 bg-gray-100 hover:bg-gray-200 rounded text-gray-800"
            >
              CREATE A LOCK
            </Link>
          </div>
        </section>

        {/* Liquidity Rewards Section */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 opacity-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl">Liquidity Rewards</h2>
              <button className="text-sm text-gray-500">?</button>
            </div>
          </div>
          <div className="p-6 text-center">
            <h3 className="text-lg font-medium">THERE ARE NO LIQUIDITY REWARDS YET</h3>
          </div>
        </section>

        {/* Voting Rewards Section */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 opacity-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl">Voting Rewards</h2>
              <button className="text-sm text-gray-500">?</button>
            </div>
          </div>
          <div className="p-6 text-center">
            <h3 className="text-lg font-medium">THERE ARE NO VOTING REWARDS YET</h3>
          </div>
        </section>
      </main>
    </div>
  );
}
