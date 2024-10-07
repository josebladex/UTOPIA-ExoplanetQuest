
import { columns, Planets } from "./ columns";
import { DataTable } from "./data-table";

export default async function Archive() {
  // Cargar datos desde el archivo JSON
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data/data.json`);

  // Verificar si la respuesta es correcta
  if (!res.ok) {
    throw new Error(`Error en la carga de datos: ${res.status}`);
  }

  const data = await res.json();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data as Planets[]} />
    </div>
  );
}
