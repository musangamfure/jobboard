import { Metadata } from "next";
import NewJobForm from "./NewJobForm";

export const metadata: Metadata = {
  title: "Post New Job",
};

export default function Page() {
  return <NewJobForm />;
}
