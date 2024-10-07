"use client"

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ActivitySquareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Row } from "@tanstack/react-table";
import { Planets } from "./planets/ columns";
import Three, { Planet } from "./planets/canvas/three";

interface ActionDialogProps {
  row: Row<Planets>; // Use the Row type with your Planets type
}

export const ActionDialog: React.FC<ActionDialogProps> = ({ row }) => {
  const [open3DViewer, setOpen3DViewer] = useState(false);
  const [openProperties, setOpenProperties] = useState(false);
  const columns = [
    { header: "Planet Name", value: row.original.name },
    { header: "Host Name", value: row.original.elements.hostname },
    { header: "Number of Stars", value: row.original.elements.snr },
    {
      header: "Discovery Telescope",
      value: row.original.elements.disc_telescope,
    },
    { header: "Orbital Period [days]", value: row.original.elements.period },
    {
      header: "Orbit Semi-Major Axis [au]",
      value: row.original.elements.semiMajorAxis,
    },
    { header: "Planet Radius [Earth Radius]", value: row.original.radius },
    { header: "Planet Density [g/cm³]", value: row.original.elements.density },
    { header: "Eccentricity", value: row.original.elements.eccentricity },
    { header: "Inclination [deg]", value: row.original.elements.inclination },
    {
      header: "Epoch of Periastron [days]",
      value: row.original.elements.epoch,
    },
    {
      header: "Argument of Periastron [deg]",
      value: row.original.elements.argOfPeriapsis,
    },
    {
      header: "Stellar Radius [Solar Radius]",
      value: row.original.elements.star_radius,
    },
    { header: "Distance [pc]", value: row.original.elements.star_distance },
    { header: "ESMax", value: row.original.elements.esmax },
    {
      header: "Is Characterizable?",
      value: row.original.elements.isCharacterizable ? "Yes" : "No",
    },
  ];
  const [data, setData] = useState<Planet[] | null>(null); // Cambiado a 'Planet[] | null'
  
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState<string | null>(null); // Cambiado para aceptar cadenas o null

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://utopia-exoplanet-quest.vercel.app';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hostname = row.original.elements.hostname.replace(/ /g, "_"); // Reemplaza espacios por guiones bajos
        const res = await fetch(`${baseUrl}/data/Host/${hostname}.json`);
        if (!res.ok) {
          const errorText = await res.text();
          console.error('Error fetching data:', errorText);
          throw new Error(`Error al cargar datos: ${res.status}`);
        }

        const result = await res.json();
        setData(result); // Asigna el resultado a 'data'
      } catch (err) {
        console.error('Error durante la carga de datos:', err);
        setError((err as Error).message); // Establece el mensaje de error en el estado
      } finally {
        setLoading(false); // Termina la carga
      }
    };

    fetchData(); // Llama a la función para obtener datos
  }, [baseUrl, row.original.elements.hostname]); // Dependencias para volver a ejecutar si cambian

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-10 w-10 p-0">
          <span className="sr-only">Open menu</span>
          <ActivitySquareIcon className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        {/* 3D Host System Viewer Dialog */}
        <DropdownMenuItem asChild>
          <Dialog open={open3DViewer} onOpenChange={setOpen3DViewer}>
            <DialogTrigger asChild>
              <Button variant="outline">3D Host System Viewer</Button>
            </DialogTrigger>
            <DialogContent className="w-1/2 h-1/2 p-2">
              <DialogHeader>
                <DialogTitle>3D Host System Viewer</DialogTitle>
                <DialogDescription>
                  Here you can view the host system in 3D.
                </DialogDescription>
              </DialogHeader>
              <div className="w-full cursor-pointer h-full p-3 flex items-center justify-center">
             
              {loading ? (
                  <p>Cargando datos...</p>
                ) : error ? (
                  <p>No se pudieron cargar los datos: {error}</p>
                ) : (
                  <Three host={data || []} /> // Pasa los datos al componente Three
                )}
              </div>
            </DialogContent>
          </Dialog>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Properties Dialog */}
        <DropdownMenuItem asChild>
          <Dialog open={openProperties} onOpenChange={setOpenProperties}>
            <DialogTrigger asChild>
              <Button variant="outline">Properties</Button>
            </DialogTrigger>
            <DialogContent className="w-[2280px] h-screen p-2">
              <DialogHeader>
                <DialogDescription className="flex items-center h-screen justify-center">
                  <table className="min-w-full h-1/2 p-3 divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-3 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Property
                        </th>
                        <th className="px-3 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {columns.map((col, index) => (
                        <tr key={index}>
                          <td className="px-3 py-1 whitespace-nowrap text-sm text-gray-900">
                            {col.header}
                          </td>
                          <td className="px-3 py-1 whitespace-nowrap text-sm text-gray-900">
                            {col.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
