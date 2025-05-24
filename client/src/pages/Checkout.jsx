import React, { useEffect } from "react";

import { useCarrello } from "../context/CarrelloContext";

import { Link } from "react-router-dom";
import "./Checkout.css";

import AOS from "aos";
import "aos/dist/aos.css";
/* la pagina  del checkout contiene il riepilogo del carrello con sotto il totale di quanto ha speso,
alla fine del riepilogo ci sta il form per confermare l'ordiene. Una volta confermato, viene fuori un popup per
ringranziarci dell'acquisto ed il contenuto del carrelo viene svuotato, come anche l'icona del carrello*/
const Checkout = () => {
  const { carrello, svuotaCarrello } = useCarrello();

  const totale = carrello.reduce((acc, item) => {
    const prezzo = parseFloat(item.prezzo.replace("€", "").replace(",", "."));
    return acc + (isNaN(prezzo) ? 0 : prezzo);
  }, 0).toFixed(2);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    alert("Ordine confermato! Grazie per l'acquisto.");
    svuotaCarrello(); 
  };

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (

    <div className="checkout-page" data-aos="fade-up">
      <h1>Checkout</h1>

      {carrello.length === 0 ? (
        <p>Il tuo carrello è vuoto.</p>
      ) : (
        <>
          {/* Riepilogo dei prodotti */}
          <ul className="riepilogo">
            {carrello.map((item, idx) => (
              <li key={idx}>
                <img src={item.immagine} alt={item.nome} />
                <div>
                  <h3>{item.nome}</h3>
                  <p>{item.prezzo}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Totale dei prodotti */}
          <p className="totale">Totale: € {totale}</p>

          {/* Form per inserire i dati dell'utente */}
          <form className="checkout-form" onSubmit={handleSubmit} data-aos="fade-up">
            <input type="text" placeholder="Nome e Cognome" required />
            <input type="email" placeholder="Email" required />
            <input type="text" placeholder="Indirizzo di spedizione" required />
            <button className="visualizza-btn" type="submit">Conferma ordine</button>
          </form>

          {/* Pulsante per tornare alla home */}
          <div style={{ marginTop: "1rem", textAlign: "center" }} data-aos="fade-up">
            <Link to="/">
              <button className="visualizza-btn">Torna alla Home</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
