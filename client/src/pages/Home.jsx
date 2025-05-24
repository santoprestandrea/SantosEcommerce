import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Home.css";
import AOS from "aos";
import "aos/dist/aos.css";
import ecommerceStoryImage from "../images/ecommerce-story.jpg";
import prodotto1 from "../images/prodotto1.jpg";
import prodotto2 from "../images/prodotto2.jpg";
import prodotto3 from "../images/prodotto3.jpg";

const images = [prodotto1, prodotto2, prodotto3];

const Home = () => {
    useEffect(() => {
        AOS.init({ duration: 1500 }); // inizializza AOS con animazioni di 1 secondo e mezzo
    }, []);
    return (
        <div className="home-page">
            {/* Sezione Storia */}
            <section className="story-section">
                <div className="story-image" data-aos="fade-up">
                    <img src={ecommerceStoryImage} alt="La nostra storia" />
                </div>
                <div className="story-text" data-aos="fade-left">
                    <h2>La nostra storia</h2>
                    <p>
                        E-Shop Informatica nasce dalla passione per la tecnologia e l'innovazione.
                        Dal 2020 ci impegniamo a fornire i migliori prodotti informatici, selezionati
                        con cura per garantire qualità, efficienza e soddisfazione. Crediamo nella
                        trasparenza, nella professionalità e nel supporto continuo ai nostri clienti.
                    </p>
                </div>
            </section>

            {/* Sezione Prodotti */}
            <section className="products-section" data-aos="fade-up">
                <h2>Qualità dei nostri prodotti</h2>
                <p>
                    In Santo's Ecommerce selezioniamo con attenzione ogni prodotto per offrirti solo il meglio nel mondo dell'informatica. La nostra gamma comprende laptop potenti, componenti hardware di ultima generazione, accessori intelligenti e soluzioni tecnologiche affidabili pensate per ogni esigenza.
                    Ogni articolo è scelto secondo elevati standard di prestazione, sicurezza e durabilità, perché crediamo che la tecnologia debba accompagnarti nel tempo, senza compromessi.
                    Collaboriamo con i brand più affermati per garantirti innovazione, design moderno e convenienza.
                    Che tu sia uno studente, un professionista IT o un appassionato di tecnologia, in Santo's Ecommerce troverai sempre il prodotto giusto, con un'assistenza rapida e competente.
                </p>

                <div className="carousel-container" data-aos="fade-up">
                    <Carousel
                        showThumbs={false}
                        showStatus={false}
                        infiniteLoop
                        autoPlay
                        interval={3000}
                        transitionTime={500}
                        renderArrowPrev={(onClickHandler, hasPrev, label) =>
                            hasPrev && (
                                <button type="button" onClick={onClickHandler} title={label} className="arrow arrow-prev">
                                    ‹
                                </button>
                            )
                        }
                        renderArrowNext={(onClickHandler, hasNext, label) =>
                            hasNext && (
                                <button type="button" onClick={onClickHandler} title={label} className="arrow arrow-next">
                                    ›
                                </button>
                            )
                        }
                    >
                        {images.map((imgSrc, index) => (
                            <div key={index}>
                                <img src={imgSrc} alt={`Prodotto ${index + 1}`} />
                            </div>
                        ))}
                    </Carousel>
                </div>

                <Link to="/prodotti">
                    <button className="view-products-button" data-aos="fade-up" >Visualizza Prodotti</button>
                </Link>
            </section>
        </div>
    );
};

export default Home;
