import Footer from "@/components/footer";
import Header from "@/components/header";
import Analytics from "@/components/utility/analytics";
import ClientComponent from "@/components/utility/client-component";
import CookiesAccept from "@/components/utility/cookies-accept";
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
        <Footer />
        <ClientComponent>
          <CookiesAccept />
          <Analytics />
        </ClientComponent>
      </body>
    </html>
  );
}
