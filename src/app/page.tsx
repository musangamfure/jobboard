import Image from "next/image";
import Link from "next/link";

import JobFilterSideBar from "@/components/JobFilterSideBar";
import H1 from "@/components/ui/h1";
import JobResults from "@/components/JobFilterResults";
import { JobFilterValues } from "@/lib/validation";
import { Metadata } from "next";

interface PageProps {
  searchParams: {
    q?: string;
    location?: string;
    remote?: string;
    type?: string;
  };
}

function getTitle({ q, type, location, remote }: JobFilterValues) {
  const titlePrefix = q
    ? `${q} jobs`
    : type
    ? `${type} jobs`
    : location
    ? `${location} jobs`
    : remote
    ? "Remote jobs"
    : "All developer jobs";

  const titleSuffix = location ? ` in ${location}` : "";

  return `${titlePrefix}${titleSuffix}`;
}

export function generateMetadata({
  searchParams: { q, type, location, remote },
}: PageProps): Metadata {
  const filterValues: JobFilterValues = {
    q,
    type,
    location,
    remote: remote === "true",
  };

  return {
    title: `${getTitle(filterValues)} | Flow Jobs`,
  };
}

export default async function Home({
  searchParams: { q, type, location, remote },
}: PageProps) {
  const filterValues: JobFilterValues = {
    q,
    type,
    location,
    remote: remote === "true",
  };

  return (
    <main className="m-auto max-w-5xl my-10 space-y-10 px-3">
      <div className="space-y-5 text-center">
        <H1>{getTitle(filterValues)}</H1>
        <p className="text-muted-foreground"> Find your dream job.</p>
      </div>
      <section className="flex flex-col  md:flex-row gap-4">
        <JobFilterSideBar defaultValues={filterValues} />
        <JobResults filterValues={filterValues} />
      </section>
    </main>
  );
}
