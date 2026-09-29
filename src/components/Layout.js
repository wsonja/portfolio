import CommandPalette from "./CommandPalette";
import Footer from "./Footer";
import SiteHeader from "./SiteHeader";

export default function Layout({ children }) {
  return (
    <div className="site">
      <SiteHeader />
      <CommandPalette />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
