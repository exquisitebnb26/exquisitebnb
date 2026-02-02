interface LogoProps {
  variant?: "full" | "icon";
  className?: string;
}

const Logo = ({ variant = "full", className = "" }: LogoProps) => {
  if (variant === "icon") {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="relative w-10 h-10">
          {/* Stylized E monogram with house roof accent */}
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Roof accent */}
            <path
              d="M20 4L32 14H8L20 4Z"
              stroke="hsl(43 40% 50%)"
              strokeWidth="1.5"
              fill="none"
            />
            {/* Stylized E */}
            <path
              d="M12 16H28M12 16V34H28M12 16V34M12 25H24"
              stroke="hsl(40 20% 92%)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon */}
      <div className="relative w-9 h-9 flex-shrink-0">
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Roof accent */}
          <path
            d="M20 4L32 14H8L20 4Z"
            stroke="hsl(43 40% 50%)"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Stylized E */}
          <path
            d="M12 16H28M12 16V34H28M12 16V34M12 25H24"
            stroke="hsl(40 20% 92%)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <span className="text-xl lg:text-2xl font-serif text-cream tracking-wide">
          Exquisite<span className="text-gold">bnb</span>
        </span>
      </div>
    </div>
  );
};

export default Logo;
