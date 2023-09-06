import React, { ReactNode, createContext, useContext, useState } from 'react';

interface PatientContextType {
  removeContext: () => void;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

// Create a provider component
const PatientContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<any | undefined>(undefined);

  const saveContext = (input: any): void => {
    const temp: any | undefined = { ...input, type: 'Host' };
    setData(temp);
  };

  const removeContext = () => {
    setData(undefined);
  };

  const toggleUserType = () => {
    const newType: any = data?.type === 'Host' ? 'Guest' : 'Host';
    const d = { ...data, type: newType };

    // @ts-ignore
    setData(d);
  };

  const changeuserType = (type: any) => {
    const d = { ...data, type };

    // @ts-ignore
    setData(d);
  };

  // The value object contains the data and functions you want to share
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value: PatientContextType = {
    removeContext,
  };

  return (
    <PatientContext.Provider value={value}>
      {children}
    </PatientContext.Provider>
  );
};

export default PatientContextProvider;

// Custom hook to use the context
export const usePatientContext = () => {
  return useContext(PatientContext);
};
