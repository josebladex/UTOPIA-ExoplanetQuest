import Three from "../_components/planets/canvas/three";

export default async function Archive() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://utopia-exoplanet-quest.vercel.app';
  
  let data = null; // Declara 'data' fuera del bloque 'try'
  
  try {
    const res = await fetch(`${baseUrl}/data//Host/AU_Mic.json`);
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Error fetching data:', errorText);
      throw new Error(`Error al cargar datos: ${res.status}`);
    }
    
    data = await res.json(); // Asigna el resultado a 'data'
    
  } catch (error) {
    console.error('Error durante el prerenderizado de Archive:', error);
  }

  // Render a loading state or error message if data is null
  if (!data) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-red-600">
        <p className="text-white">No se pudieron cargar los datos.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-screen bg-red-600">
      <Three host={data} />
    </div>
  );
}
