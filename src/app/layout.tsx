import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "DentalKab - Atención Dental de Calidad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://db.onlinewebfonts.com/c/1cd1e7d71e048159076fd90b39846902?family=Open+Sauce+One"
          rel="stylesheet"
        />
        <link
          href="https://db.onlinewebfonts.com/c/42acf9aa4a6dc2f2886a3f682e337ead?family=Open+Sauce+One+Bold"
          rel="stylesheet"
        />
      </head>
      <body className="bg-cream">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
