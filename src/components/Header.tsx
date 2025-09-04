import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-black bg-opacity-50 backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / Clinic Name */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-white text-2xl font-bold">
              Dr. [Mom's Name]
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              Acasă
            </Link>
            <Link href="/servicii" className="text-gray-300 hover:text-white transition-colors">
              Servicii
            </Link>
            <Link href="/despre" className="text-gray-300 hover:text-white transition-colors">
              Despre
            </Link>
            <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button (we can add functionality later) */}
          <div className="md:hidden">
            <button className="text-white">
              {/* Icon for menu, e.g., a hamburger icon */}
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}