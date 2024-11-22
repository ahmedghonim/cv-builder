// CVForm.tsx
import { useFormData } from "./useFormData";
import Section from "./Section";
import { Button, Input, Label, Textarea } from "@/components/ui";
import { Briefcase, Book, Award, Users, CodeIcon } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CVView from "../CVView";
import { useState } from "react";

const CVForm = () => {
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);
  const {
    formData,
    addSection,
    deleteSection,
    handleInputChange,
    addSkill,
    handleSkillChange,
    deleteSkill,
    handleTitleChange,
    handleDragEnd,
    toggleEditTitle,
    handleDescriptionChange,
  } = useFormData();

  return (
    <div className="p-6">
      <h1 className="text-2xl px-6 font-bold">Personal Details</h1>
      <div className="flex relative h-screen overflow-y-auto">
        <form className="space-y-4 p-6 mx-auto col-span-1 flex-1">
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
            <Button
              variant="ghost"
              className="text-blue-500 font-bold"
              onClick={() => setShowAdditionalDetails((prev) => !prev)}
            >
              {showAdditionalDetails
                ? "Hide Additional Details"
                : "Edit Additional Details"}
              <CodeIcon className="rotate-90" />
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

          {/* Sections Management */}
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections" direction="vertical">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
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
                        >
                          <Section
                            section={section}
                            sectionIndex={index}
                            handleTitleChange={handleTitleChange}
                            toggleEditTitle={toggleEditTitle}
                            deleteSection={deleteSection}
                            addSkill={addSkill}
                            handleSkillChange={handleSkillChange}
                            deleteSkill={deleteSkill}
                            handleDescriptionChange={handleDescriptionChange}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {/* Add Section Buttons */}
          <div className="border flex gap-10 bg-white p-5  flex-col">
            <h3 className="text-3xl font-bold">Add Section</h3>
            <div className="flex gap-4">
              <Button variant="ghost" onClick={() => addSection("technical")}>
                <Briefcase /> Add Technical Skill
              </Button>
              <Button variant="ghost" onClick={() => addSection("employment")}>
                <Briefcase /> Add Employment
              </Button>
              <Button variant="ghost" onClick={() => addSection("education")}>
                <Book /> Add Education
              </Button>
              <Button variant="ghost" onClick={() => addSection("skills")}>
                <Award /> Add Skills
              </Button>
              <Button variant="ghost" onClick={() => addSection("languages")}>
                <Users /> Add Languages
              </Button>
            </div>
          </div>
        </form>

        <div className="bg-gray-500 p-10 flex-1 sticky top-0">
          <CVView formData={formData} />
        </div>
      </div>
    </div>
  );
};

export default CVForm;
