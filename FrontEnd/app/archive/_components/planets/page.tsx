
import { columns, Planets } from "./ columns";
import { DataTable } from "./data-table";

export default async function Archive() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://utopia-exoplanet-quest.vercel.app';
  
  try {
    const res = await fetch(`${baseUrl}/data/data.json`);
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Error fetching data:', errorText);
      throw new Error(`Error al cargar datos: ${res.status}`);
    }
    
    const data = await res.json();
    
    return (
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data as Planets[]} />
      </div>
    );
  } catch (error) {
    console.error('Error durante el prerenderizado de Archive:', error);
    throw error;
  }
}