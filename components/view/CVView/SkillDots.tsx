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
        className={`text-${i < level ? "black" : "gray-400"} text-3xl`}
      >
        •
      </span>
    );
  }
  return <>{dots}</>;
};

export default SkillDots;
