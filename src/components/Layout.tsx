import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { HeroUIProvider } from "@heroui/react";

export default function Layout() {
  const navigate = useNavigate();
  return (
    <HeroUIProvider navigate={navigate}>
      <Header />
      <main className="mt-6">
        <Outlet />
      </main>
      <Footer />
    </HeroUIProvider>
  );
}
