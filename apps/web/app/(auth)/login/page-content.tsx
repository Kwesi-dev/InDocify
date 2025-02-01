"use client";

import Link from "next/link";
import IndocifyLogo from "@/components/indocify-logo";
import GoogleIcon from "@/components/google-icon";
import { googleSignIn } from "@/app/actions";
import { useSearchParams } from "next/navigation";
import ParticlesAnimation from "@/components/particles-animation";
// import ParticlesAnimation from "@/components/particles-animation";

export default function LoginPageContent() {
  const searchParams = useSearchParams();
  const repoName = searchParams.get("repo");
  const repoUrl = searchParams.get("next-repo-url");
  const owner = searchParams.get("owner");
  const googleCallbackUrl =
    repoName && repoUrl && owner
      ? `/repo-extraction?next-repo-url=${repoUrl}&repo=${repoName}&owner=${owner}`
      : repoName && repoUrl
        ? `/repo-extraction?next-repo-url=${repoUrl}&repo=${repoName}`
        : "/analyse-repo";

  const registrationUrl =
    repoName && repoUrl && owner
      ? `/signup?next-repo-url=${repoUrl}&repo=${repoName}&owner=${owner}`
      : repoName && repoUrl
        ? `/signup?next-repo-url=${repoUrl}&repo=${repoName}`
        : "/signup";

  // const [email, setEmail] = useState("");

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   await sendgridSignIn(email);
  // };

  return (
    <div className="min-h-screen bg-[#1a1f1a] flex flex-col">
      <ParticlesAnimation />
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="space-y-2 mb-5">
            <IndocifyLogo />
            <h1 className="text-3xl font-bold text-white">Welcome back</h1>
            <p className="text-white/70 mb-8">
              New to inDocify?{" "}
              <Link
                href={registrationUrl}
                className="text-[#CCFF00] hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>

          {/* <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#CCFF00] focus:border-transparent"
                placeholder="name@email.com"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-white/10 bg-white/5 text-[#CCFF00] focus:ring-[#CCFF00] focus:ring-offset-0"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-white"
                >
                  Remember me
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#CCFF00] text-black px-6 py-3 rounded-lg hover:bg-[#CCFF00]/90 transition-colors font-medium"
            >
              Sign in
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#1a1f1a] text-white/50">OR</span>
              </div>
            </div>

           
          </form> */}
          <button
            type="button"
            className="w-full bg-white/5 border border-white/10 text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            onClick={async () => {
              await googleSignIn(googleCallbackUrl);
            }}
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <p className="mt-6 text-sm text-white/50 text-center">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-[#CCFF00] hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-[#CCFF00] hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
