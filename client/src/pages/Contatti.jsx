import React, { useEffect, useState } from "react"; 
import AOS from "aos";
import "aos/dist/aos.css"; 
import "./Contatti.css";

const Contatti = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); 
  }, []);

  // Stato per gestire i dati del form (nome, contatto, messaggio)
  const [formData, setFormData] = useState({
    nome: "",
    contatto: "",
    messaggio: ""
  });

  // Gestore del cambiamento nei campi del form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); 
  };

const handleSubmit = (e) => {
  e.preventDefault(); // Previene il comportamento di default (refresh della pagina)
  console.log("Messaggio inviato:", formData); 
  alert(`Grazie per averci contattato, ${formData.nome.trim()}!`);
  setFormData({ nome: "", contatto: "", messaggio: "" });
};

  return (
    <div className="contatti-page">
      <h1 data-aos="fade-down">Contattaci</h1>
      <section className="info-section" data-aos="fade-up">
        <p><strong>Email:</strong> info@santosecommerce.it</p>
        <p><strong>Telefono:</strong> 0425 123456</p>
        <p><strong>Cellulare:</strong> +39 333 9876543</p>
        <p><strong>Fax:</strong> 0425 654321</p>
      </section>

      <section className="form-section" data-aos="fade-up"> 
        <h1>Scrivici un messaggio</h1>
        <form onSubmit={handleSubmit}> 
          <input
            type="text"
            name="nome"
            placeholder="Il tuo nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="contatto"
            placeholder="Email o numero di telefono"
            value={formData.contatto}
            onChange={handleChange}
            required
          />
          <textarea
            name="messaggio"
            placeholder="Il tuo messaggio"
            rows="5"
            value={formData.messaggio}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Invia</button>
        </form>
      </section>
    </div>
  );
};

export default Contatti; 
