import type { Metadata } from "next";
import "./globals.css";

import { ChakraProvider } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "TaskList",
  description: "exercice pour apprendre Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  );
}
