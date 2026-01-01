import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import { useCallback, useMemo, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import type { RootState } from "../store";
import { useAppDispatch, useAppSelector } from "../hooks";
import { signOut } from "../slice/user";

export default function Header() {
  const user = useAppSelector((state: RootState) => state.user.user);
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const menuItems = useMemo(
    () => [
      { text: "Home", href: "/" },
      { text: "About Us", href: "/about" },
      { text: "Contact", href: "/contact" },
    ],
    []
  );

  const logout = useCallback(() => {
    dispatch(signOut());
    navigate("/login", { viewTransition: true });
  }, []);

  if (!user && !["/login", "/signup", "/forgot-password"].includes(pathname)) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="shadow-sm">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand as={Link} to="/" viewTransition>
          <p className="text-2xl text-black yesteryear-regular">Tastebites</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-x-16" justify="center">
        {menuItems.map(({ href, text }) => (
          <NavbarItem key={text}>
            <Link color="foreground" to={href} viewTransition>
              {text}
            </Link>
          </NavbarItem>
        ))}
        <NavbarItem>
          <Button
            as={user ? undefined : Link}
            to={user ? undefined : "/login"}
            variant="solid"
            radius="sm"
            viewTransition={!!user}
            onPress={user ? logout : undefined}
          >
            {user ? "Logout" : "Login/Register"}
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map(({ href, text }) => (
          <NavbarMenuItem key={text}>
            <Link className="w-full" to={href} viewTransition>
              {text}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem className="mt-auto mb-16">
          <Button
            as={user ? undefined : Link}
            fullWidth
            to={user ? undefined : "/login"}
            size="lg"
            viewTransition={!!user}
            onPress={user ? logout : undefined}
          >
            {user ? "Logout" : "Login/Register"}
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
