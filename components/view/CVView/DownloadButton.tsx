import React from "react";

import { Download } from "lucide-react";
import { Button } from "@/components/ui";

interface DownloadButtonProps {
  onClick: () => void;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ onClick }) => {
  return (
    <div className="mt-6">
      <Button onClick={onClick}>
        <Download />
        Download
      </Button>
    </div>
  );
};

export default DownloadButton;
