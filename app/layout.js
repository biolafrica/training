import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const dynamic = "force-dynamic"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Training Agent",
  description: "AI-Powered Food Delivery Staff Training",
};

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en-GB" 
      style={{transitionProperty:"none",marginRight:"0px"}}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
