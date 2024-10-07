import { useState } from "react";
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
            <DialogContent className="w-full h-screen p-2">
              <DialogHeader>
                <DialogTitle>3D Host System Viewer</DialogTitle>
                <DialogDescription>
                  Here you can view the host system in 3D.
                </DialogDescription>
              </DialogHeader>
              <div className="w-full h-screen p-3 flex items-center justify-center">
                <iframe
                  id="orbitViewerContainer"
                  className="w-[450px] h-[350px]"
                  src="/orbits/orbit.html"
                ></iframe>
              </div>
              <Button variant="outline" onClick={() => setOpen3DViewer(false)}>
                Close
              </Button>
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
