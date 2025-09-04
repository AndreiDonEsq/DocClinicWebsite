export default function HomePage() {
  return (

    <main>
      <div className="h-20" /> 
      
      <section className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold">Bine ați venit!</h1>
          <p className="mt-4 text-lg">
            Conținutul principal al paginii va veni aici.
          </p>
        </div>
      </section>

      <section className="bg-white mt-8">
         <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold">Secțiunea Servicii</h2>
            <div className="h-screen" />
         </div>
      </section>
    </main>
  );
}