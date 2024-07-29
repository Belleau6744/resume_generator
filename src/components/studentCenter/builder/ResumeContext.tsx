import { ResumeDefinition } from "@types";
import React, { createContext } from 'react';

type ResumeContextType = {
  isCommentSectionOpen: boolean;
  handleCommentSectionToggle: () => void;
  originalResume: ResumeDefinition;
  currentResume: ResumeDefinition;
  setCurrentResume: React.Dispatch<React.SetStateAction<ResumeDefinition>>;
  isDirty: boolean;
  handleSaveResume: () => void;
  sectionEdit: string;
  setSectionEdit: React.Dispatch<React.SetStateAction<string>>;
  resetResume: () => void;
  handleSelect: (item: string) => () => void;
};

export const ResumeContext = createContext<ResumeContextType | undefined>(undefined);