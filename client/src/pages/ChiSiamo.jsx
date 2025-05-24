import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./ChiSiamo.css";
import teamImage from "../images/team.jpg";


/* pagina descritiva con un'immagine sulla sinistra, del testo sulla destra ed un elenco puntato sotto a questi due elementi */
const ChiSiamo = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="chi-siamo-page">
      <h1 data-aos="fade-down">Chi siamo</h1>

      <section className="intro-section">
        <div className="image-container" data-aos="fade-right">
          <img src={teamImage} alt="Il nostro team" />
        </div>
        <div className="text-container" data-aos="fade-left">
          <p>
            Santo's Ecommerce nasce dall’idea di offrire tecnologia accessibile, affidabile e selezionata con cura. 
            La nostra passione per l'informatica ci ha spinti a creare un punto di riferimento per chi cerca prodotti 
            di qualità e un servizio clienti attento.
          </p>
          <p>
            Dal primo giorno ci impegniamo a selezionare solo dispositivi e accessori performanti, con un occhio al prezzo 
            e uno alla durabilità. Crediamo nella trasparenza, nell’evoluzione continua e nel supporto umano, anche online.
          </p>
        </div>
      </section>

      <section className="valori-section" data-aos="zoom-in-up">
        <h2>I nostri valori</h2>
        <ul>
          <li><strong>Affidabilità:</strong> ogni prodotto è testato e garantito.</li>
          <li><strong>Innovazione:</strong> restiamo sempre aggiornati con le ultime tecnologie.</li>
          <li><strong>Servizio:</strong> assistenza rapida, disponibile e umana.</li>
          <li><strong>Passione:</strong> viviamo il digitale come una missione, non solo un lavoro.</li>
        </ul>
      </section>
    </div>
  );
};

export default ChiSiamo;
