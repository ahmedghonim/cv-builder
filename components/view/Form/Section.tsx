import { Button, Input } from "@/components/ui";
import { Trash2, Edit2, GripVertical, Plus } from "lucide-react";
import { useState } from "react";
import Skill from "./Skill";
import ConfirmationModal from "./ConfirmationModal"; // Import the confirmation modal component
import { type Section } from "../type";

interface SectionProps {
  section: Section;
  sectionIndex: number;
  handleDescriptionChange: (
    sectionIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleTitleChange: (
    sectionIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  toggleEditTitle: (sectionIndex: number) => void;
  deleteSection: (sectionIndex: number) => void;
  addSkill: (sectionIndex: number) => void;
  handleSkillChange: (
    sectionIndex: number,
    skillIndex: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  deleteSkill: (sectionIndex: number, skillIndex: number) => void;
}

const Section = ({
  section,
  sectionIndex,
  handleTitleChange,
  toggleEditTitle,
  deleteSection,
  addSkill,
  handleSkillChange,
  deleteSkill,
  handleDescriptionChange,
}: SectionProps) => {
  // State for controlling the delete confirmation modal for the section
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle opening the delete confirmation modal
  const handleDeleteClick = () => {
    setIsModalOpen(true); // Open the confirmation modal
  };

  // Function to handle closing the delete confirmation modal
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal without deleting
  };

  // Function to handle confirming the section delete
  const handleConfirmDelete = () => {
    deleteSection(sectionIndex); // Delete the section after confirmation
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="border p-4 flex gap-3">
      <GripVertical className="mt-3" />
      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            {section.isEditing ? (
              <div className="flex flex-col">
                <div className="relative">
                  <Input
                    id={`sectionTitle-${sectionIndex}`}
                    value={section.title}
                    onChange={(e) => handleTitleChange(sectionIndex, e)}
                    autoFocus
                    className="pr-10"
                    placeholder="Edit Section Title"
                  />
                  <button
                    className="absolute right-0 top-3 p-2 flex items-center justify-center"
                    onClick={() => toggleEditTitle(sectionIndex)}
                  >
                    <Edit2 className="size-5" />
                  </button>
                </div>
                {section.type !== "technical" && (
                  <div className="relative">
                    <Input
                      onChange={(e) => handleDescriptionChange(sectionIndex, e)}
                      id={`sectionDescription-${sectionIndex}`}
                      value={section.description}
                      autoFocus
                      className="pr-10"
                      placeholder="Edit Section Description"
                    />
                    <button
                      className="absolute right-0 top-3 p-2 flex items-center justify-center"
                      onClick={() => toggleEditTitle(sectionIndex)}
                    >
                      <Edit2 className="size-5" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <h1
                  className="text-2xl font-bold my-2 cursor-pointer capitalize"
                  onClick={() => toggleEditTitle(sectionIndex)}
                >
                  {section.title}
                </h1>
                <p
                  className="text-sm text-gray-500 cursor-pointer"
                  onClick={() => toggleEditTitle(sectionIndex)}
                >
                  {section.description}
                </p>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            color="red"
            onClick={handleDeleteClick} // Open the confirmation modal on delete click
          >
            <Trash2 />
          </Button>
        </div>
        <div className="my-4">
          {section.skills.map((skill, skillIndex) => (
            <Skill
              key={skillIndex}
              sectionIndex={sectionIndex}
              type={section.type}
              skillIndex={skillIndex}
              skill={skill}
              handleSkillChange={handleSkillChange}
              deleteSkill={deleteSkill}
            />
          ))}
        </div>
        <Button onClick={() => addSkill(sectionIndex)} variant="ghost">
          <Plus /> Add More {section.title}
        </Button>
      </div>

      {/* Confirmation Modal for Section Deletion */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this section? All skills in this section will also be deleted."
      />
    </div>
  );
};

export default Section;
