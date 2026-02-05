 import { Moon, Sun } from "lucide-react";
 import { useTheme } from "next-themes";
 import { useEffect, useState } from "react";
 import { Button } from "@/components/ui/button";
 
 const ThemeToggle = () => {
   const { theme, setTheme, resolvedTheme } = useTheme();
   const [mounted, setMounted] = useState(false);
 
   // Prevent hydration mismatch
   useEffect(() => {
     setMounted(true);
   }, []);
 
   if (!mounted) {
     return (
       <Button
         variant="ghost"
         size="icon"
         className="relative w-10 h-10 text-foreground/70"
         aria-label="Toggle theme"
       >
         <span className="w-5 h-5" />
       </Button>
     );
   }
 
   const isDark = resolvedTheme === "dark";
 
   return (
     <Button
       variant="ghost"
       size="icon"
       onClick={() => setTheme(isDark ? "light" : "dark")}
       className="relative w-10 h-10 text-foreground/70 hover:text-foreground transition-colors duration-300"
       aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
     >
       <span className="relative w-5 h-5 block">
         <Sun
           size={20}
           className={`absolute inset-0 transition-all duration-300 ${
             isDark
               ? "opacity-0 rotate-90 scale-75"
               : "opacity-100 rotate-0 scale-100"
           }`}
         />
         <Moon
           size={20}
           className={`absolute inset-0 transition-all duration-300 ${
             isDark
               ? "opacity-100 rotate-0 scale-100"
               : "opacity-0 -rotate-90 scale-75"
           }`}
         />
       </span>
     </Button>
   );
 };
 
 export default ThemeToggle;