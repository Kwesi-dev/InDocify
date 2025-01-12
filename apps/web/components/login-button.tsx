import { auth } from "@/auth";
import Link from "next/link";

const LoginButton = async () => {
  const session = await auth();

  if (session) {
    return null;
  }

  return (
    <Link href="/login">
      <button className="bg-white/10 text-white px-6 py-2 rounded-full hover:bg-white/20 transition-colors font-medium">
        LOGIN
      </button>
    </Link>
  );
};

export default LoginButton;
