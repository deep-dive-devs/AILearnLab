import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AILearnLab",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Toaster position="top-center"/>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
