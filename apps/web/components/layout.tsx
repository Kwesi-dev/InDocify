import { Footer } from "./footer";
import IndocifyLogo from "./indocify-logo";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#1a1f1a] flex flex-col">
      <header className="border-b border-white/10">
        <div className="container mx-auto px-6 py-6">
          <IndocifyLogo />
        </div>
      </header>
      {children}
      <Footer />
    </div>
  );
};

export default PageLayout;
