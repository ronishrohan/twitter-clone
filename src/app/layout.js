
import "./globals.css";
import Sidebar from "./components/sidebar/Sidebar";
import "@fontsource-variable/roboto-flex"



export const metadata = {
  title: "Twitter",
  description: "twitter clone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background text-text-900">
        <Sidebar></Sidebar>
        {children}
      </body>
    </html>
  );
}
