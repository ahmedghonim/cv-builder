import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Trash2, Briefcase, Book, Award, Users, Edit } from "lucide-react"; // Import icons
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import CVView from "./CVView";
import { FormData, Section } from "./type";

export default function CVForm() {
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);
  const [formData, setFormData] = useState<FormData>({
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
    sections: [],
  });

  // Handle basic input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle adding a section
  const addSection = (type: Section["type"]) => {
    const newSection: Section = {
      title: type,
      description: "",
      skills: [],
      type, // type should be just a string, not an array
    };

    setFormData((prevData) => ({
      ...prevData,
      sections: [...prevData.sections, newSection],
    }));
  };

  // Handle deleting a section
  const deleteSection = (index: number) => {
    const updatedSections = [...formData.sections];
    updatedSections.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      sections: updatedSections,
    }));
  };

  // // Handle section title and description changes
  // const handleSectionChange = (index, e) => {
  //   const { name, value } = e.target;
  //   const updatedSections = [...formData.sections];
  //   updatedSections[index] = {
  //     ...updatedSections[index],
  //     [name]: value,
  //   };
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     sections: updatedSections,
  //   }));
  // };

  // Handle adding a skill to a section
  const addSkill = (index: number) => {
    const updatedSections = [...formData.sections];
    updatedSections[index].skills.push({ name: "", level: 1 });
    setFormData((prevData) => ({
      ...prevData,
      sections: updatedSections,
    }));
  };

  // Handle skill input changes (name and level)
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
    setFormData((prevData) => ({
      ...prevData,
      sections: updatedSections,
    }));
  };

  // Handle deleting a skill from a section
  const deleteSkill = (sectionIndex: number, skillIndex: number) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].skills.splice(skillIndex, 1);
    setFormData((prevData) => ({
      ...prevData,
      sections: updatedSections,
    }));
  };

  // Toggle title edit mode
  const toggleEditTitle = (index: number) => {
    const updatedSections = [...formData.sections];
    updatedSections[index].isEditing = !updatedSections[index].isEditing;
    setFormData({ ...formData, sections: updatedSections });
  };

  // Update section title on change
  const handleTitleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedSections = [...formData.sections];
    updatedSections[index].title = e.target.value;
    setFormData({ ...formData, sections: updatedSections });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // You can send form data to the server or store it locally.
  };

  // Handle drag end to reorder sections
  const handleDragEnd = (result: any) => {
    const { destination, source } = result;

    if (!destination) return; // If there's no destination (dropped outside)

    if (destination.index === source.index) return; // No change if dropped in the same place

    const updatedSections = [...formData.sections];
    const [movedSection] = updatedSections.splice(source.index, 1); // Remove the dragged section
    updatedSections.splice(destination.index, 0, movedSection); // Insert it at the new position

    setFormData((prevData) => ({
      ...prevData,
      sections: updatedSections,
    }));
  };

  const skillOptions = [
    { value: 0, label: "Beginner" },
    { value: 1, label: "Intermediate" },
    { value: 2, label: "Advanced" },
    { value: 3, label: "Expert" },
    { value: 4, label: "Master Level" },
    { value: 5, label: "Guru" },
  ];

  return (
    <div className="flex relative h-screen overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 mx-auto col-span-1 flex-1"
      >
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Additional Details Toggle */}
        <div className="mt-4">
          <Button onClick={() => setShowAdditionalDetails((prev) => !prev)}>
            {showAdditionalDetails
              ? "Hide Additional Details"
              : "Edit Additional Details"}
          </Button>
        </div>

        {/* Additional Details */}
        {showAdditionalDetails && (
          <div className="mt-4 space-y-4">
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="drivingLicense">Driving License</Label>
              <Input
                id="drivingLicense"
                name="drivingLicense"
                value={formData.drivingLicense}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="nationality">Nationality</Label>
              <Input
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="placeOfBirth">Place of Birth</Label>
              <Input
                id="placeOfBirth"
                name="placeOfBirth"
                value={formData.placeOfBirth}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}

        {/* Summary */}
        <Textarea
          id="summary"
          name="summary"
          value={formData.summary}
          onChange={handleInputChange}
          placeholder="Summary"
        />

        {/* Add Section Buttons with Icons */}

        {/* Sections Management with Drag and Drop */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="sections" type="section" direction="vertical">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-4 mt-4"
              >
                {formData.sections.map((section, index) => (
                  <Draggable
                    key={index}
                    draggableId={`section-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="border p-4 rounded-md shadow-sm"
                      >
                        <div className="flex justify-between">
                          <div>
                            {section.isEditing ? (
                              <div>
                                <Input
                                  id={`sectionTitle-${index}`}
                                  value={section.title}
                                  onChange={(e) => handleTitleChange(index, e)}
                                  autoFocus
                                  placeholder="Edit Section Title"
                                />
                                <button
                                  onClick={() => {
                                    toggleEditTitle(index);
                                  }}
                                >
                                  <Edit />
                                </button>
                              </div>
                            ) : (
                              // Show Title Text
                              <h1
                                className="text-2xl font-bold my-2 cursor-pointer capitalize"
                                onClick={() => toggleEditTitle(index)} // Toggle to edit
                              >
                                {section.title}
                              </h1>
                            )}
                          </div>

                          <Button
                            variant="outline"
                            color="red"
                            onClick={() => deleteSection(index)}
                          >
                            <Trash2 />
                          </Button>
                        </div>
                        {/* Skills in this section */}
                        <div className="mt-4">
                          sss
                          <Button onClick={() => addSkill(index)}>
                            + Add More {section.title}
                          </Button>
                          {section.skills.map((skill, skillIndex) => (
                            <div className="mt-2 flex space-x-4 items-center">
                              <Input
                                name="name"
                                value={skill.name}
                                onChange={(e) =>
                                  handleSkillChange(index, skillIndex, e)
                                }
                                placeholder="Skill Name"
                              />

                              {section.type === "technical" && (
                                <Select
                                  name="level"
                                  value={skill.level.toString()}
                                  onValueChange={(value) => {
                                    if (value !== "") {
                                      handleSkillChange(index, skillIndex, {
                                        // @ts-ignore
                                        target: {
                                          name: "level",
                                          value: parseInt(value) as any,
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a level" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {skillOptions.map((skill, i) => (
                                      <SelectItem
                                        key={i}
                                        value={skill.value.toString()}
                                      >
                                        {skill.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}

                              <Button
                                variant="outline"
                                color="red"
                                onClick={() => deleteSkill(index, skillIndex)}
                              >
                                <Trash2 />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="mt-6 flex gap-10 bg-white shrink p-5 shadow-lg rounded-2xl flex-col">
          <h3 className="text-3xl font-bold">Add Section</h3>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={() => addSection("technical")}>
              <Briefcase />
              Add Technical Skil
            </Button>
            <Button variant="ghost" onClick={() => addSection("employment")}>
              <Briefcase />
              Add Employment
            </Button>
            <Button variant="ghost" onClick={() => addSection("education")}>
              <Book />
              Add Education
            </Button>
            <Button variant="ghost" onClick={() => addSection("skills")}>
              <Award />
              Add Skills
            </Button>
            <Button variant="ghost" onClick={() => addSection("languages")}>
              <Users />
              Add Languages
            </Button>

            <Button
              variant="ghost"
              onClick={() => addSection("certifications")}
            >
              <Award />
              Add Certifications
            </Button>
          </div>
        </div>
      </form>

      {/* CV View */}
      <div className="bg-gray-500 p-10 flex-1 sticky top-0">
        <CVView formData={formData} />
      </div>
    </div>
  );
}
