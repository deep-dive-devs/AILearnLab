import Image from "next/image";
import AuthNavbar from "@/components/auth /authNavbar";

export default function AuthLayout({ children }) {
  return (
    <section className="w-full px-5 h-full min-h-screen bg-backgroundPrimary">
      <AuthNavbar />
      <div className="flex items-center justify-center w-full gap-10">
        {children}
        <Image
          className="hidden md:block"
          src={"/robotteacher.png"}
          alt="aibot"
          width={400}
          height={400}
        />
      </div>
    </section>
  );
}
