export default function BlogPage() {
  return (
    <main>
      {/* Spacer to push content down below the header */}
      <div className="h-20" />

      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">Articole și Resurse</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* This is where we will map over the real blog posts from the CMS */}
          
          {/* Example Post Card 1 */}
          <div className="border rounded-lg overflow-hidden shadow-lg">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Titlul Articolului de Exemplu</h2>
              <p className="text-gray-700 mb-4">
                Un scurt rezumat al articolului va fi afișat aici. Acesta oferă cititorului o idee despre conținut...
              </p>
              <a href="#" className="font-bold text-blue-600 hover:underline">
                Citește mai mult &rarr;
              </a>
            </div>
          </div>

          {/* Example Post Card 2 */}
          <div className="border rounded-lg overflow-hidden shadow-lg">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Un Alt Articol Interesant</h2>
              <p className="text-gray-700 mb-4">
                Acesta este un alt exemplu de cum ar putea arăta un card de articol pe pagina de blog...
              </p>
              <a href="#" className="font-bold text-blue-600 hover:underline">
                Citește mai mult &rarr;
              </a>
            </div>
          </div>

          {/* Add more example cards as you like */}
        </div>
      </div>
    </main>
  );
}