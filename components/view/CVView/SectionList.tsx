import React from "react";
import SkillDots from "./SkillDots";

interface Section {
  title: string;
  description: string;
  skills: { name: string; level?: number }[];
  type: string;
}

interface SectionListProps {
  sections: Section[];
}

const SectionList: React.FC<SectionListProps> = ({ sections }) => {
  return (
    <>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mt-6">
          <h3 className="text-lg font-semibold capitalize">{section.title}</h3>
          <p>{section.description}</p>

          <ul className="list-disc pl-5 mt-4">
            {section.skills.map((skill, skillIndex) => (
              <li
                key={skillIndex}
                className="text-gray-700 flex items-center space-x-2"
              >
                <span>{skill.name}</span>
                {section.type === "technical" && skill.level !== undefined && (
                  <div className="flex space-x-1">
                    <SkillDots level={skill.level} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default SectionList;
