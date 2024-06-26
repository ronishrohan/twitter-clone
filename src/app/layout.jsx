import "./globals.css";
import localFont from "next/font/local";
import "@fontsource-variable/roboto-flex";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Head from "next/head"
import Providers from "./components/Providers";
import { connectDatabase } from "./utils/connectDatabase";


const overused = localFont({
  src: "./assets/OverusedGrotesk.woff2",
  display: "swap",
  preload: true,
});

export const metadata = {
  title: "Waffle",
  description: "waffling",
};

export default async function RootLayout({ children }) {
  await connectDatabase();
  return (
    <html lang="en" className={overused.className}>
      
      <body className="bg-background text-text-900">
        <div className="flex flex-row size-full ">
          <Providers>
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}
