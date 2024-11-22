//@ts-nocheck
import React, { useRef } from "react";
import html2pdf from "html2pdf.js";
import CVHeader from "./CVHeader";
import SectionList from "./SectionList";
import ContactInfo from "./ContactInfo";
import DownloadButton from "./DownloadButton";
import { FormData } from "../type";

interface CVViewProps {
  formData: FormData;
}

const CVView: React.FC<CVViewProps> = ({ formData }) => {
  const cvRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    const element = cvRef.current;
    const options = {
      margin: 10,
      filename: "cv.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().from(element).set(options).save();
  };

  // Separate employment and education sections for left column
  const leftSections = formData.sections.filter(
    (section) => section.type === "employment" || section.type === "education"
  );

  // Separate other sections for the right column
  const rightSections = formData.sections.filter(
    (section) => section.type !== "employment" && section.type !== "education"
  );

  return (
    <div className="flex flex-col gap-10 items-center">
      <div ref={cvRef} className="container mx-auto bg-white p-10">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="col-span-8">
            <CVHeader
              firstName={formData.firstName}
              lastName={formData.lastName}
              jobTitle={formData.jobTitle}
              summary={formData.summary}
            />
            <SectionList sections={leftSections} />
          </div>

          {/* Right Column */}
          <div className="col-span-4 mt-20">
            <ContactInfo contact={formData} />
            <SectionList sections={rightSections} />
          </div>
        </div>
      </div>

      <DownloadButton onClick={handleDownloadPDF} />
    </div>
  );
};

export default CVView;
