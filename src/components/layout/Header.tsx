import { CircleUser, Menu, Package2, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { useLogout, useTranslate } from "@refinedev/core";
import { AppNavigationMenu } from "./AppNavigationMenu";
import Cart from "../cart/Cart";
import Wishlist from "../wishlist/Wishlist";

const Header = () => {
  const t = useTranslate();
  const navigate = useNavigate();
  const { mutate: logout } = useLogout();
  return (
    <header className="lg:px-64 sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-20">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        <AppNavigationMenu />
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">{t("Toggle navigation menu")}</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              to="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link to="#" className="hover:text-foreground">
              Dashboard
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Orders
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Products
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Customers
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Analytics
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <Wishlist />
        <Cart />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">{t("Toggle user menu")}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t("My Account")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/account")}>
              {t("Profile")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logout()}>
              {t("Logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
