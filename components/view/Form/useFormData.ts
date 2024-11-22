// useFormData.ts
import { useState } from "react";
import { Section } from "../type";

export const useFormData = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    jobTitle: "",
    address: "",
    postalCode: "",
    drivingLicense: "",
    nationality: "",
    placeOfBirth: "",
    dateOfBirth: "",
    summary: "",
    sections: [] as Section[],
  });
  // Toggle title edit mode
  const toggleEditTitle = (index: number) => {
    const updatedSections = [...formData.sections];
    updatedSections[index].isEditing = !updatedSections[index].isEditing;
    setFormData({ ...formData, sections: updatedSections });
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addSection = (type: Section["type"]) => {
    const newSection: Section = {
      title: type,
      description: "",
      skills: [],
      type,
    };

    setFormData((prevData) => ({
      ...prevData,
      sections: [...prevData.sections, newSection],
    }));
  };

  const deleteSection = (index: number) => {
    const updatedSections = [...formData.sections];
    updatedSections.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      sections: updatedSections,
    }));
  };

  const addSkill = (sectionIndex: number) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].skills.push({ name: "", level: 1 });
    setFormData({ ...formData, sections: updatedSections });
  };

  const handleSkillChange = (
    sectionIndex: number,
    skillIndex: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].skills[skillIndex] = {
      ...updatedSections[sectionIndex].skills[skillIndex],
      [name]: value,
    };
    setFormData({ ...formData, sections: updatedSections });
  };

  const deleteSkill = (sectionIndex: number, skillIndex: number) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].skills.splice(skillIndex, 1);
    setFormData({ ...formData, sections: updatedSections });
  };

  const handleTitleChange = (
    sectionIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].title = e.target.value;
    setFormData({ ...formData, sections: updatedSections });
  };
  const handleDescriptionChange = (
    sectionIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].description = e.target.value;
    setFormData({ ...formData, sections: updatedSections });
  };

  const handleDragEnd = (result: any) => {
    const { destination, source } = result;
    if (!destination) return;

    const updatedSections = [...formData.sections];
    const [movedSection] = updatedSections.splice(source.index, 1);
    updatedSections.splice(destination.index, 0, movedSection);

    setFormData({ ...formData, sections: updatedSections });
  };

  return {
    formData,
    setFormData,
    handleInputChange,
    addSection,
    deleteSection,
    addSkill,
    handleSkillChange,
    deleteSkill,
    handleTitleChange,
    handleDragEnd,
    toggleEditTitle,
    handleDescriptionChange,
  };
};
