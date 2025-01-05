import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="border-t border-gray-200 py-4">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ul className="flex space-x-6 text-gray-600">
                    <li>
                        <Link href="/articles" className="hover:text-gray-900">
                            Articles
                        </Link>
                    </li>
                    <li>
                        <Link href="/support" className="hover:text-gray-900">
                            Support
                        </Link>
                    </li>
                </ul>
            </nav>
        </footer>
    );
}
