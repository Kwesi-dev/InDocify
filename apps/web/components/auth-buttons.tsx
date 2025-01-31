import { auth } from "@/auth";
import Link from "next/link";
import UserLandingProfile from "./landing-page/user-profile";

const AuthButtons = async () => {
  const session = await auth();

  if (session) {
    return <UserLandingProfile session={session} />;
  }

  return (
    <div className="flex items-center gap-4">
      <Link href="/login">
        <button className="text-white hover:text-[#CCFF00] transition-colors">
          LOGIN
        </button>
      </Link>
      <Link href="/signup">
        <button className="bg-white/10 text-white px-6 py-2 rounded-full hover:bg-white/20 transition-colors font-medium">
          SIGN UP
        </button>
      </Link>
    </div>
  );
};

export default AuthButtons;
