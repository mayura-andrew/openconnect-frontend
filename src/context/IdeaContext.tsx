import React, { createContext, useContext, useState } from 'react';

interface IdeaContextType {
  ideaSubmitted: boolean;
  notifyIdeaSubmission: () => void;
  resetIdeaSubmission: () => void;
}

const IdeaContext = createContext<IdeaContextType | undefined>(undefined);

export const IdeaProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [ideaSubmitted, setIdeaSubmitted] = useState(false);

  const notifyIdeaSubmission = () => {
    setIdeaSubmitted(true);
  };

  const resetIdeaSubmission = () => {
    setIdeaSubmitted(false);
  };

  return (
    <IdeaContext.Provider value={{ ideaSubmitted, notifyIdeaSubmission, resetIdeaSubmission }}>
      {children}
    </IdeaContext.Provider>
  );
};

export const useIdea = () => {
  const context = useContext(IdeaContext);
  if (context === undefined) {
    throw new Error('useIdea must be used within an IdeaProvider');
  }
  return context;
};