import { auth } from "@/auth";
import SignupPageContent from "./page-content";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (session) {
    redirect("/generate-docs");
  }
  return <SignupPageContent />;
};

export default page;
