import { Logo } from "@workspace/ui/components/Logo";
import Link from "next/link";

const IndocifyLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Logo />
      <p className="text-[#CCFF00] text-2xl font-medium">inDocify</p>
    </Link>
  );
};

export default IndocifyLogo;
