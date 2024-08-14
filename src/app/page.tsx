import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import JobListItem from "@/components/JobListItem";
import JobFilterSideBar from "@/components/JobFilterSideBar";

export default async function Home() {
  const jobs = await prisma.job.findMany({
    where: {
      approved: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <main className="m-auto max-w-5xl my-10 space-y-10 px-3">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Develop Jobs
        </h1>
        <p className="text-muted-foreground"> Find your dream job.</p>
      </div>
      <section className="flex flex-col  md:flex-row gap-4">
        <JobFilterSideBar />
        <div className="grow space-x-4">
          {jobs.map((job) => (
            <JobListItem key={job.id} job={job} />
          ))}
        </div>
      </section>
    </main>
  );
}
