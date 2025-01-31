import { auth } from "@/auth";
import LoginPageContent from "./page-content";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (session) {
    redirect("/analyse-repo");
  }
  return <LoginPageContent />;
};

export default page;
