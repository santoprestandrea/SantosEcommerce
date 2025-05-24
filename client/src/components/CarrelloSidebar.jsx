import React from "react";

import { useCarrello } from "../context/CarrelloContext";

import { useNavigate } from "react-router-dom";

import "./CarrelloSidebar.css";

const CarrelloSidebar = ({ visibile, onClose }) => {
  const { carrello, rimuoviDalCarrello } = useCarrello();

  const navigate = useNavigate();

  const calcolaTotale = () => {
    return carrello
      .reduce((acc, item) => {
        const prezzo = parseFloat(item.prezzo.replace("€", "").replace(",", "."));
        return acc + (isNaN(prezzo) ? 0 : prezzo); 
      }, 0)
      .toFixed(2); // Limita a 2 decimali
  };

  const vaiAlCheckout = () => {
    onClose(); // Chiude la sidebar
    navigate("/checkout"); // Naviga al checkout
  };

  return (
    <div className={`carrello-sidebar ${visibile ? "aperto" : ""}`}>
      <button className="chiudi-btn" onClick={onClose}>X</button>
      <h2>Carrello</h2>

      {carrello.length === 0 ? (
        <p>Il carrello è vuoto.</p>
      ) : (
        <>
          <ul>
            {/* Mappa ogni prodotto nel carrello */}
            {carrello.map((item, idx) => (
              <li key={idx} className="carrello-item">
                <img src={item.immagine} alt={item.nome} />
                <div>
                  <h3>{item.nome}</h3>
                  <p>{item.prezzo}</p>
                  {/* Pulsante per rimuovere il prodotto */}
                  <button className="visualizza-btn-rimuovi" onClick={() => rimuoviDalCarrello(item.id)}>X</button>
                </div>
              </li>
            ))}
          </ul>

          {/* Footer della sidebar con totale e pulsante checkout */}
          <div className="footer-carrello">
            <p>Totale: € {calcolaTotale()}</p>
            <button className="visualizza-btn" style={{ marginTop: "0.5rem" }} onClick={vaiAlCheckout}>
              Vai al checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CarrelloSidebar;
