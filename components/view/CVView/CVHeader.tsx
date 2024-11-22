import React from "react";

interface CVHeaderProps {
  firstName: string;
  lastName: string;
  jobTitle: string;
  summary: string;
}

const CVHeader: React.FC<CVHeaderProps> = ({
  firstName,
  lastName,
  jobTitle,
  summary,
}) => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold">
        {firstName} {lastName}
      </h1>
      <h2 className="text-xl font-semibold text-gray-600">{jobTitle}</h2>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">About Me</h3>
        <p>{summary}</p>
      </div>
    </div>
  );
};

export default CVHeader;
