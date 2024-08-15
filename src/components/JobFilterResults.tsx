import React from "react";
import JobListItem from "@/components/JobListItem";
import prisma from "@/lib/prisma";
import { JobFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";

interface JobResultsProps {
  filterValues: JobFilterValues;
}

export default async function JobResults({
  filterValues: { q, location, remote, type },
}: JobResultsProps) {
  const searchString = q
    ?.trim()
    .split(/\s+/)
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilters: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { companyName: { search: searchString } },
          { type: { search: searchString } },
          { locationType: { search: searchString } },
          { location: { search: searchString } },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilters,
      type ? { type: type } : {},
      remote ? { locationType: "Remote" } : {},
      location ? { location: location } : {},
      { approved: true },
    ],
  };

  const jobs = await prisma.job.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="grow space-x-4">
      {jobs.map((job) => (
        <JobListItem key={job.id} job={job} />
      ))}
      {jobs.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-center text-muted-foreground">
            No jobs found. Try another search.
          </p>
        </div>
      )}
    </div>
  );
}
