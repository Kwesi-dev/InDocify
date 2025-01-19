import Link from "next/link";
import { auth } from "@/auth";
import GetStartedButton from "../get-started-button";

const ActionsButton = () => {
  return (
    <div className="flex flex-wrap gap-4 mt-8">
      <GetStartedButton />
      <SignupButton />
    </div>
  );
};
const SignupButton = async () => {
  const session = await auth();
  const link = session ? "/generate-docs" : "/signup";
  return (
    <Link href={link}>
      <button className="bg-white/10 text-white px-8 py-3 rounded-full hover:bg-white/20 transition-colors font-medium">
        Try Now
      </button>
    </Link>
  );
};

export default ActionsButton;
