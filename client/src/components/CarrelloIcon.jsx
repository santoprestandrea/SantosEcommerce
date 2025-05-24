import React from "react";
import { useCarrello } from "../context/CarrelloContext";
import "./CarrelloIcon.css";
/*  icona del carrello che appare fissa sullo schermo dopo che si è effettuato il login */
const CarrelloIcon = ({ onClick }) => {
  const { carrello } = useCarrello();
  return (
    <div className="carrello-icon" onClick={onClick}>
      🛒
      {carrello.length > 0 && <span className="badge">{carrello.length}</span>}
    </div>
  );
};

export default CarrelloIcon;
