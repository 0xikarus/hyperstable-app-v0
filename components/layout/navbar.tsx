import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    return (
        <nav className="bg-white border-b border-gray-200 px-4 py-2.5">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <Link href="/" className="flex items-center">
                    <div className="text-2xl">@</div>
                    <span className="text-xl font-semibold">Hyperstable</span>
                </Link>
                <div className="flex items-center space-x-8">
                    <Link href="/mint" className="hover:text-gray-600">Mint</Link>
                    <Link href="/" className="hover:text-gray-600">Dashboard</Link>
                    <Link href="/liquidity" className="hover:text-gray-600">Liquidity</Link>
                    <Link href="/vote" className="hover:text-gray-600">Vote</Link>
                    <Link href="/lock" className="hover:text-gray-600">Lock</Link>
                    <Link href="/incentivize" className="hover:text-gray-600">Incentivize</Link>
                </div>
                <button className="bg-gray-100 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200">
                    0x123
                </button>
            </div>
        </nav>
    )
}
