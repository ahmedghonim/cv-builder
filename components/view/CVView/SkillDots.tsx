import { cn } from "@/lib/utils";
import React from "react";

interface SkillDotsProps {
  level: number;
}

const SkillDots: React.FC<SkillDotsProps> = ({ level }) => {
  const dots = [];
  for (let i = 0; i < 5; i++) {
    dots.push(
      <span
        key={i}
        className={cn("text-3xl", i < level ? "text-black" : "text-gray-300")}
      >
        •
      </span>
    );
  }
  return <>{dots}</>;
};

export default SkillDots;
