import React, { createContext, useContext, useState } from "react";
/* provider del carrello che ci permette di rendere globale un componente, in questo caso, appunto il carrello */


const CarrelloContext = createContext();

export const useCarrello = () => useContext(CarrelloContext);

export const CarrelloProvider = ({ children }) => {
  const [carrello, setCarrello] = useState([]);

  const aggiungiAlCarrello = (prodotto) => {
    setCarrello((prev) => [...prev, prodotto]);
  };

  const rimuoviDalCarrello = (id) => {
    setCarrello((prev) => prev.filter((item) => item.id !== id));
  };

  const svuotaCarrello = () => {
    setCarrello([]);
  };

  return (
    <CarrelloContext.Provider value={{ carrello, aggiungiAlCarrello, rimuoviDalCarrello, svuotaCarrello }}>
      {children} {/* Renderizza tutti i componenti figli */}
    </CarrelloContext.Provider>
  );
};
