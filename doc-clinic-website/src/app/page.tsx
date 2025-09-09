import Map from '@/components/Map';
import Carousel from '@/components/Carousel';

export default function HomePage() {
  return (
    <main>
      {/* Spacer for the fixed header */}
      <div className="h-20" />

      {/* Hero Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">Bine ați venit la cabinetul Dr. Landa Danielescu!</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Medicină de familie cu grijă și profesionalism pentru întreaga familie.
          </p>
        </div>
      </section>

      {/* Carousel Section */}
      <section id="gallery" className="bg-slate-50 py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Galerie Foto</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Un spațiu primitor și modern, dedicat sănătății dumneavoastră.
            </p>
          </div>
          <div className="mt-16">
            <Carousel />
          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section id="contact" className="bg-white py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Ne găsiți aici</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Salut prieteni
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Address & Hours Info */}
            <div className="prose lg:prose-lg">
              <h3>Adresă</h3>
              <p>Strada Exemplului Nr. 123, Sector 1, București</p>

              <h3>Program</h3>
              <p>
                Luni - Vineri: 09:00 - 17:00<br />
                Sâmbătă - Duminică: Închis
              </p>

              <h3>Contact</h3>
              <p>
                Telefon: +40 123 456 789<br />
                Email: contact@dralanda.ro
              </p>
            </div>

            {/* The Map Component */}
            <div className="rounded-lg overflow-hidden shadow-xl">
              <Map />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}