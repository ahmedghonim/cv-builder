// Define types for the skill level
type SkillLevel = 0 | 1 | 2 | 3 | 4 | 5; // Representing levels: 0 = Beginner, 5 = Guru

// Define the structure for a skill
interface Skill {
  name: string;
  level: SkillLevel;
}

// Define the structure for a section
export interface Section {
  title: string;
  description: string;
  skills: Skill[];
  type:
    | "technical"
    | "employment"
    | "education"
    | "skills"
    | "languages"
    | "certifications";
  isEditing?: boolean; // Optional: if we need to toggle editing state for the section title
}

// Define the structure for the formData object
export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  jobTitle: string;
  address: string;
  postalCode: string;
  drivingLicense: string;
  nationality: string;
  placeOfBirth: string;
  dateOfBirth: string;
  summary: string;
  sections: Section[]; // Array of sections
}
