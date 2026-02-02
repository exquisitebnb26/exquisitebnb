const LOGO_SRC = "/public/Exquisitebnb.png";

interface LogoProps {
  variant?: "full" | "icon";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Logo = ({ variant = "full", size = "md", className = "" }: LogoProps) => {
  const iconSize =
    size === "sm" ? "w-8 h-8" : size === "lg" ? "w-12 h-12" : "w-10 h-10";

  const fullIconSize =
    size === "sm" ? "w-7 h-7" : size === "lg" ? "w-11 h-11" : "w-9 h-9";

  const textSize =
    size === "sm"
      ? "text-lg"
      : size === "lg"
      ? "text-3xl"
      : "text-xl lg:text-2xl";

  if (variant === "icon") {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="bg-white rounded-full p-2 w-fit h-fit flex items-center justify-center">
          <img
            src={LOGO_SRC}
            alt="Exquisitebnb logo"
            className={`${iconSize} object-contain scale-90`}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon */}
      <div className="bg-white rounded-full p-2 w-fit h-fit flex items-center justify-center flex-shrink-0">
        <img
          src={LOGO_SRC}
          alt="Exquisitebnb logo"
          className={`${fullIconSize} object-contain scale-90`}
        />
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <span className={`${textSize} font-serif text-cream tracking-wide`}>
          Exquisite<span className="text-gold">bnb</span>
        </span>
      </div>
    </div>
  );
};

export default Logo;
