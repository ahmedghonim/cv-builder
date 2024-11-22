import { Button, Input, Label, Select } from "@/components/ui";
import {
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal"; // Import the modal

interface SkillProps {
  sectionIndex: number;
  skillIndex: number;
  type: string;
  skill: { name: string; level: number };
  handleSkillChange: (
    sectionIndex: number,
    skillIndex: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  deleteSkill: (sectionIndex: number, skillIndex: number) => void;
}

const Skill = ({
  sectionIndex,
  skillIndex,
  skill,
  handleSkillChange,
  deleteSkill,
  type,
}: SkillProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false); // State to track collapsed status

  const handleDeleteClick = () => {
    setIsModalOpen(true); // Open the confirmation modal
  };

  const handleConfirmDelete = () => {
    deleteSkill(sectionIndex, skillIndex); // Delete the skill after confirmation
    setIsModalOpen(false); // Close the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal without deleting
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed); // Toggle the collapsed state
  };

  return (
    <div className="my-5">
      {/* Collapsible header with skill name and level description */}
      <div
        className="flex items-center space-x-4 cursor-pointer"
        onClick={toggleCollapse}
      >
        <div className="flex-1">
          <div className="flex flex-col">
            <span className="font-semibold text-lg">{skill.name}</span>
            {type === "technical" && (
              <span className="text-sm text-gray-500">
                {
                  ["Beginner", "Intermediate", "Advanced", "Expert", "Master"][
                    skill.level
                  ]
                }
              </span>
            )}
          </div>
        </div>
        <Button variant="ghost" size="icon">
          {collapsed ? <ChevronDown /> : <ChevronUp />}
        </Button>
        <Button variant="ghost" color="red" onClick={handleDeleteClick}>
          <Trash2 />
        </Button>
      </div>

      {/* Conditionally render input fields based on collapsed state */}
      {!collapsed && (
        <div className="mt-4 flex gap-4 items-end">
          <div className="flex-1">
            <Label htmlFor="name">Name</Label>
            <Input
              name="name"
              value={skill.name}
              onChange={(e) => handleSkillChange(sectionIndex, skillIndex, e)}
              placeholder="Skill Name"
            />
          </div>

          {type === "technical" && (
            <div className="flex-1">
              <Label htmlFor="level">Level</Label>
              <Select
                name="level"
                value={skill.level.toString()}
                onValueChange={(value) =>
                  handleSkillChange(sectionIndex, skillIndex, {
                    //@ts-ignore
                    target: { name: "level", value },
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Beginner",
                    "Intermediate",
                    "Advanced",
                    "Expert",
                    "Master",
                  ].map((label, i) => (
                    <SelectItem key={i} value={i.toString()}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this skill?"
      />
    </div>
  );
};

export default Skill;
