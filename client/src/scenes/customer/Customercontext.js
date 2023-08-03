import React, { createContext, useState, useEffect } from "react";
import { CustomerProvider } from "./CustomerContext";

const CustomerContext = createContext();

const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    occupation: "",
    role: "",
  });

  useEffect(() => {
    const savedCustomers = localStorage.getItem("customers");
    if (savedCustomers) {
      setCustomers(JSON.parse(savedCustomers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customers));
  }, [customers]);

  return (
    <CustomerContext.Provider
      value={{
        customers,
        setCustomers,
        customerDetails,
        setCustomerDetails,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export { CustomerContext, CustomerProvider };
