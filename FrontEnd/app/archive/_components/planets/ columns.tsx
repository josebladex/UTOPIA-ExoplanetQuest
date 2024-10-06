"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";

import { ActionDialog } from "../action-dialog";

export type Planets = {
  elements: {
    argOfPeriapsis: number;
    period: number;
    eccentricity: number;
    semiMajorAxis: number;
    epoch: number;
    inclination: number;
    hostname: string;
    disc_telescope: string;
    density: number;
    star_radius: number;
    star_distance: number;
    snr: number;
    esmax: number;
    isCharacterizable: boolean;
  };
  name: string;
  customOrbit: string;
  radius: number;
  orbitColor: string;
  type: "planet";
  id: number;
};
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const columns: ColumnDef<Planets>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "elements.hostname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Hostname
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "elements.snr",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          SNR
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "elements.esmax",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ESmax
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "elements.isCharacterizable",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          isCharacterizable
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.original.elements.isCharacterizable; // value es booleano
      return (
        <Badge variant={value ? "default" : "destructive"}>
          {value ? "Yes" : "No"}
        </Badge>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return <ActionDialog row={row} />;
    },
  },
];
