import { auth } from "@/auth";
import SignupPageContent from "./page-content";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (session) {
    redirect("/analyse-repo");
  }
  return <SignupPageContent />;
};

export default page;
