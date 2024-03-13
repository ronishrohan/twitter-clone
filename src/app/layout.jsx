import "./globals.css";
import Sidebar from "./components/sidebar/Sidebar";
import QuickAccess from "./components/quick-access/QuickAccess";
import "@fontsource-variable/roboto-flex";
import "@fortawesome/fontawesome-svg-core/styles.css"

export const metadata = {
  title: "waffle",
  description: "waffling",
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background text-text-900">
        <div className="flex flex-row size-full">
          <Sidebar></Sidebar>
          {children}
          <QuickAccess></QuickAccess>
        </div>
      </body>
    </html>
  );
}
