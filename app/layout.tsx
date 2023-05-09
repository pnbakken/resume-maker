import Header from "@/components/header";
import ClientComponent from "@/components/utility/client-component";
import Toasty from "@/components/utility/toasty";
import "@/styles/globals.scss";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toasty />
        <Header />
        {children}
        <footer>footer</footer>
      </body>
    </html>
  );
}
