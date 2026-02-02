import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";



export const metadata: Metadata = {
  title: "Real-World Blogs",
  description: "A platform for reading blogs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased` }
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
