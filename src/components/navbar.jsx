import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `hover:text-blue-600 transition ${
      isActive ? "text-blue-600 font-semibold" : "text-gray-700"
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600 animate-bounce">MyGallery</div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 font-medium">
        <li>
          <NavLink to="/" className={navLinkClass}>
            Dashboard Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/gallery" className={navLinkClass}>
            My Gallery
          </NavLink>
        </li>
       
      </ul>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-start p-6 gap-4 font-medium md:hidden">
          <li>
            <NavLink
              to="/"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              Dashboard Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/gallery"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              My Gallery
            </NavLink>
          </li>
          <p className="text-center text-gray-500 mt-2 text-sm">Welcome to MyGallery — Your Personal Photo Collection
Discover and save stunning images across various categories. Explore nature, technology, animals, and more — all in one place. Like your favorites to keep them handy anytime!!</p>
          
          
        </ul>
        
        
      )}
    </nav>
  );
};

export default Navbar;
