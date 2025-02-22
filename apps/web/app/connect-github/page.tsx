import { auth } from "@/auth";
import PageContent from "./page-content";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return <PageContent />;
};

export default page;
