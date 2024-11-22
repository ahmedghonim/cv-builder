import React from "react";
import {
  MailboxIcon,
  Phone,
  MapPin,
  Home,
  Calendar,
  Flag,
  Map,
} from "lucide-react";

interface ContactInfoProps {
  contact: {
    phone?: string;
    email?: string;
    country?: string;
    city?: string;
    address?: string;
    postalCode?: string;
    nationality?: string;
    placeOfBirth?: string;
    dateOfBirth?: string;
  };
}

const ContactInfo: React.FC<ContactInfoProps> = ({ contact }) => {
  return (
    <div className="space-y-4 text-sm">
      {contact.phone && (
        <div className="flex items-center space-x-2">
          <Phone className="size-4 text-gray-500" />
          <span>{contact.phone}</span>
        </div>
      )}
      {contact.email && (
        <div className="flex items-center space-x-2">
          <MailboxIcon className="size-4 text-gray-500" />
          <span>{contact.email}</span>
        </div>
      )}
      {contact.country && (
        <div className="flex items-center space-x-2">
          <MapPin className="size-4 text-gray-500" />
          <span>{contact.country}</span>
        </div>
      )}
      {contact.city && (
        <div className="flex items-center space-x-2">
          <MapPin className="size-4 text-gray-500" />
          <span>{contact.city}</span>
        </div>
      )}
      {contact.address && (
        <div className="flex items-center space-x-2">
          <Home className="size-4 text-gray-500" />
          <span>{contact.address}</span>
        </div>
      )}
      {contact.postalCode && (
        <div className="flex items-center space-x-2">
          <Map className="size-4 text-gray-500" />
          <span>{contact.postalCode}</span>
        </div>
      )}
      {contact.nationality && (
        <div className="flex items-center space-x-2">
          <Flag className="size-4 text-gray-500" />
          <span>{contact.nationality}</span>
        </div>
      )}
      {contact.placeOfBirth && (
        <div className="flex items-center space-x-2">
          <MapPin className="size-4 text-gray-500" />
          <span>{contact.placeOfBirth}</span>
        </div>
      )}
      {contact.dateOfBirth && (
        <div className="flex items-center space-x-2">
          <Calendar className="size-4 text-gray-500" />
          <span>{contact.dateOfBirth}</span>
        </div>
      )}
    </div>
  );
};

export default ContactInfo;
