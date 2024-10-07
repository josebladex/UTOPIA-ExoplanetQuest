import { columns, Planets } from "./ columns"
import { DataTable } from "./data-table"
import data from "@/public/data/data.json"; // Ajusta la ruta según la ubicación real de tu JSON


export default async function Archive() {

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data as Planets[]} />
    </div>
  )
}
