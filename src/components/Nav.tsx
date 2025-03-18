import { Link, useLocation } from "react-router-dom";
import {
  ShoppingCart,
  List,
  X,
  MagnifyingGlass,
  User,
} from "@phosphor-icons/react";
import { useStore } from "../features/shop/store";
import { useState } from "react";

export const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const cartItems = useStore((state) => state.cartItems);
  const setCartOpen = useStore((state) => state.setCartOpen);

  const totalItems = cartItems.reduce(
    (sum: number, item) => sum + item.quantity,
    0
  );

  const handleClick = () => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  };

  const linkClass = (path: string) => `
    text-base ${location.pathname === path ? "text-white" : "text-white/80"}
    hover:text-white transition-colors
  `;

  const mobileMenuClass = `
    fixed inset-0 bg-black/95 z-50 md:hidden
    flex flex-col items-center justify-center gap-8
    transition-transform duration-300
    ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
  `;

  return (
    <header
      className="sticky top-0 z-50 w-full bg-black"
      style={{ overflow: "visible" }}
    >
      <nav className="max-w-[2000px] mx-auto">
        <div className="h-16 px-8 flex items-center justify-between relative">
          {/* Left Section - Navigation Links */}
          <div className="hidden md:flex items-center gap-8 select-none">
            <Link to="/" onClick={handleClick} className={linkClass("/")}>
              HOME
            </Link>
            <Link
              to="/shop"
              onClick={handleClick}
              className={linkClass("/shop")}
            >
              SHOP
            </Link>
            <Link
              to="/about"
              onClick={handleClick}
              className={linkClass("/about")}
            >
              ABOUT
            </Link>
          </div>

          {/* Center Section - Logo */}
          <Link
            to="/"
            onClick={handleClick}
            className="text-2xl font-bold text-white select-none absolute left-1/2 -translate-x-1/2"
          >
            COSMETIC
          </Link>

          {/* Right Section - Icons */}
          <div className="hidden md:flex items-center gap-6 select-none">
            <button className="text-white/80 hover:text-white transition-colors">
              <MagnifyingGlass size={24} weight="regular" />
            </button>
            <button className="text-white/80 hover:text-white transition-colors">
              <User size={24} weight="regular" />
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center justify-center text-white/80 hover:text-white transition-colors"
            >
              <ShoppingCart size={24} weight="regular" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white/80 hover:text-white transition-colors"
          >
            <List size={24} />
          </button>

          {/* Mobile Menu Overlay - Update to include new icons */}
          <div className={mobileMenuClass}>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-5 right-8 text-white hover:text-white/80"
            >
              <X size={24} />
            </button>

            <Link
              to="/"
              onClick={handleClick}
              className="text-2xl text-white/80 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              to="/shop"
              onClick={handleClick}
              className="text-2xl text-white/80 hover:text-white transition-colors"
            >
              Shop
            </Link>
            <Link
              to="/about"
              onClick={handleClick}
              className="text-2xl text-white/80 hover:text-white transition-colors"
            >
              About
            </Link>

            {/* Mobile Icons */}
            <div className="flex items-center gap-8 mt-8">
              <button className="text-white/80 hover:text-white transition-colors">
                <MagnifyingGlass size={24} weight="regular" />
              </button>
              <button className="text-white/80 hover:text-white transition-colors">
                <User size={24} weight="regular" />
              </button>
              <button
                onClick={() => {
                  setCartOpen(true);
                  setIsMenuOpen(false);
                }}
                className="relative flex items-center justify-center text-white/80 hover:text-white transition-colors"
              >
                <ShoppingCart size={24} weight="regular" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
