
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"
import "./Indirizzo.css";

/* mappa con descrizione a fianco */
const Indirizzo = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="indirizzo-page">

      <h1 data-aos="fade-down">Dove ci troviamo</h1>
      <section className="intro-section">
        <div className="map-container" data-aos="fade-right">
        <iframe src=" https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d101303.19542444407!2d14.995116435962549!3d37.490818746615545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1313e2dd761525b5%3A0x58fe876151c83cf0!2sCatania%20CT!5e0!3m2!1sit!2sit!4v1746113262142!5m2!1sit!2sit"
            frameborder="0"
            width="100%"
            height="350"
            allowFullScreen=""
            loading="lazy"
            title="sede santo's Ecommerce"

          ></iframe>
        </div>

        <div className="file-text-container" data-aos="fade-left">
          <p>Ti aspettiamo presso il nostro punto vendita! Vieni a toccare con mano i prodotti,
            ricevere consigli personalizzati e conoscere dal vivo il nostro team esperto.
            Da noi troverai non solo tecnologia, ma anche supporto, consulenza e passione vera.</p>

        </div>
      </section >
    </div >

  );
}

export default Indirizzo;