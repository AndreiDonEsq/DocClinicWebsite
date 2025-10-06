import Link from 'next/link';

export default function Footer() {
  return (<footer className="bg-slate-800 text-slate-300">
    
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Dr. Landa Danielescu</h3>
            <p>Medic de Familie</p>
            <p>București, România</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-2">Link-uri Utile</h3>
            <ul>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-2">Contact</h3>
            <p>Telefon: +40 123 456 789</p>
            <p>Email: landadanielescu@gmail.com</p>
          </div>

        </div>

        <div className="border-t border-slate-700 mt-8 pt-6 text-center text-sm text-slate-400 flex flex-col sm:flex-row justify-between">
          <p>&copy; {new Date().getFullYear()} Dr. Landa Danielescu. Toate drepturile rezervate.</p>
          
          <Link href="/login" className="hover:text-white transition-colors mt-2 sm:mt-0">
            Doctor Login
          </Link>
        </div>
      </div>
    </footer>
  );
}