import React from "react";
import "./ProductCard.css";
import { useCarrello } from "../context/CarrelloContext";

/* componente per mostrare tutti i prodotti sia nella pagina prodotti generale, che in quella divisa per le categorie */
const ProductCard = ({ prodotto }) => {
  const { aggiungiAlCarrello } = useCarrello();
  return (
    
    <div className="card-prodotto">
      <img src={prodotto.immagine} alt={prodotto.nome} />
      <h2 className="prodotto-nome">{prodotto.nome}</h2>
      <p>{prodotto.descrizione}</p>
      <p><strong>Specifiche:</strong> {prodotto["specifiche tecniche"]}</p>
      <span className="prezzo">{prodotto.prezzo}</span>
      <button className="visualizza-btn" onClick={() => aggiungiAlCarrello(prodotto)}>
        Acquista
      </button>
    </div>
  );
};

export default ProductCard;
