import { Job } from "@prisma/client";
import Image from "next/image";
import companyLogoPlaceholder from "@/assets/company-logo-placeholder.png";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import { formatMoney, relativeDate } from "@/lib/utils";
import Badge from "./Badge";
interface JobListItemProps {
  job: Job;
}

export default function JobListItem({
  job: {
    title,
    companyName,
    companyLogoUrl,
    type,
    location,
    locationType,
    salary,
    createdAt,
  },
}: JobListItemProps) {
  return (
    <article className="flex gap-3 border rounded-lg p-5 hover:bg-muted/60">
      <Image
        src={companyLogoUrl || companyLogoPlaceholder}
        alt={`${companyName} logo`}
        width={100}
        height={100}
      />
      <div className="flex-grow space-y-3">
        <div className="">
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-sm text-muted-foreground">{companyName}</p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex gap-1.5 items-center sm:hidden">
            <Briefcase className="shrink-0" size={16} />
            {type}
          </p>
          <p className="flex gap-1.5 items-center">
            <MapPin className="shrink-0" size={16} />
            {locationType}
          </p>
          <p className="flex gap-1.5 items-center ">
            <Globe2 className="shrink-0" size={16} />
            {location || "Worldwide"}
          </p>
          <p className="flex gap-1.5 items-center">
            <Banknote className="shrink-0" size={16} />
            {formatMoney(salary)}
          </p>
          <p className="flex gap-1.5 items-center">
            <Clock className="shrink-0" size={16} />
            {relativeDate(createdAt)}
          </p>
        </div>
      </div>

      <div className="hidden sm:flex flex-col items-end justify-between shrink-0">
        <Badge>{type}</Badge>
        <span className="flex gap-1.5 items-center text-muted-foreground">
          <Clock className="shrink-0" size={16} />
          {relativeDate(createdAt)}
        </span>
      </div>
    </article>
  );
}
