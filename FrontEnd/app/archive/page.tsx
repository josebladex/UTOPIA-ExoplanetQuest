import Archive from "./_components/planets/page";

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data/data.json`); // Asegúrate de que `NEXT_PUBLIC_BASE_URL` esté configurado correctamente
  const data = await res.json();

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6 text-red-400">Archive</h1>
      <p className="mb-4 text-gray-300">
        This section is used to observe all exoplanets that can be characterized as potentially habitable.
      </p>

      <div>
        <p className="mb-4 text-violet-300">Number of planets obtained: {data.length}</p>
        <div className="p-4">
          <Archive />
        </div>
      </div>
    </div>
  );
}
