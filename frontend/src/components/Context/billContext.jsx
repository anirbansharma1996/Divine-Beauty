import { createContext, useState, useContext } from 'react';

const BillContext = createContext();

export const BillProvider = ({ children }) => {
  const [bill, setBill] = useState(0); 

  const updateBill = (newBill) => {
    setBill(newBill);
  };

  return (
    <BillContext.Provider value={{ bill, updateBill }}>
      {children}
    </BillContext.Provider>
  );
};

export const useBill = () => {
  return useContext(BillContext);
};
