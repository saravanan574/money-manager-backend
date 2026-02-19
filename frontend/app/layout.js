
import { Inter } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SPEI - Smart Placement Email Intelligence",
  description: "An AI-powered system to manage placement emails.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Toaster position="top-center" />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
