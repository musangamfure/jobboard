import React from "react";
import JobListItem from "@/components/JobListItem";
import prisma from "@/lib/prisma";
import { JobFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface JobResultsProps {
  filterValues: JobFilterValues;
  page?: number;
}

export default async function JobResults({
  filterValues,
  page = 1,
}: JobResultsProps) {
  const { q, type, remote, location } = filterValues;

  const jobsPerPage = 6;
  const skipdJobs = (page - 1) * jobsPerPage;

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

  const jobsPromise = prisma.job.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },

    take: jobsPerPage,
    skip: skipdJobs,
  });

  const jobsCountPromise = prisma.job.count({
    where,
  });

  const [jobs, jobsCount] = await Promise.all([jobsPromise, jobsCountPromise]);
  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <Link key={job.id} href={`/jobs/${job.slug}`} className="block">
          <JobListItem job={job} />
        </Link>
      ))}
      {jobs.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-center text-muted-foreground">
            No jobs found. Try another search.
          </p>
        </div>
      )}
      {jobs.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(jobsCount / jobsPerPage)}
          filterValues={filterValues}
        />
      )}
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  filterValues: JobFilterValues;
}

function Pagination({
  currentPage,
  totalPages,
  filterValues: { q, type, location, remote },
}: PaginationProps) {
  function handlePageChange(page: number) {
    const searchParams = new URLSearchParams({
      ...(q && { q }),
      ...(type && { type }),
      ...(location && { location }),
      ...(remote && { remote: "true" }),
      page: page.toString(),
    });

    return `/?${searchParams.toString()}`;
  }

  return (
    <div className="flex justify-between">
      <Link
        href={handlePageChange(currentPage - 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage <= 1 && "invisible"
        )}
      >
        <ArrowLeft className="text-muted-foreground" size={16} />
        Previous Page
      </Link>
      <span className="text-muted-foreground">
        {" "}
        Page{currentPage} of {totalPages}{" "}
      </span>
      <Link
        href={handlePageChange(currentPage + 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage >= totalPages && "invisible"
        )}
      >
        <ArrowRight className="text-muted-foreground" size={16} />
        Next Page
      </Link>
    </div>
  );
}
