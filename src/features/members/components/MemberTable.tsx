"use client";

import Link from "next/link";
import { createColumnHelper, tableFeatures, useTable } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import type { Member } from "@/features/members/types";

const features = tableFeatures({});
const columnHelper = createColumnHelper<typeof features, Member>();

const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: "이름",
    cell: (info) => (
      <Link href={`/members/${info.row.original.id}`} className="font-medium hover:underline">
        {info.getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor("position", { header: "직책" }),
  columnHelper.accessor("studentId", { header: "학번" }),
  columnHelper.accessor("department", { header: "학과" }),
]);

const EMPTY_DATA: Member[] = [];

interface MemberTableProps {
  data: Member[];
  isLoading?: boolean;
}

export function MemberTable({ data, isLoading }: MemberTableProps) {
  const table = useTable({ features, columns, data: data.length ? data : EMPTY_DATA });

  if (isLoading) {
    return <Skeleton className="h-48 w-full" />;
  }

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder ? null : <table.FlexRender header={header} />}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getAllCells().map((cell) => (
                <TableCell key={cell.id}>
                  <table.FlexRender cell={cell} />
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
              등록된 아롬인이 없습니다.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
