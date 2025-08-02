import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Newspaper, Home, HeartPulse, Atom, Tv2, BriefcaseBusiness, Rocket, Trophy, Cpu } from 'lucide-react';
import { Button } from '../components/ui/button'; // Assuming you have shadcn/ui installed

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  const navItems = [
    { path: "/", name: "Home", icon: Home },
    { path: "/business", name: "Business", icon: BriefcaseBusiness },
    { path: "/entertainment", name: "Entertainment", icon: Tv2 },
    { path: "/general", name: "General", icon: Newspaper },
    { path: "/health", name: "Health", icon: HeartPulse },
    { path: "/science", name: "Science", icon: Atom },
    { path: "/sports", name: "Sports", icon: Trophy },
    { path: "/technology", name: "Technology", icon: Cpu },
  ];

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  return (
    <motion.nav 
      className="fixed w-full  bg-white z-50 border-b"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Newspaper className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                NewsHub
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.div 
                key={item.path}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={item.path}>
                  <Button
                    variant={location.pathname === item.path ? "default" : "ghost"}
                    className="flex items-center gap-2"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        className="md:hidden"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <item.icon className="h-4 w-4 mr-2" />
              {item.name}
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;