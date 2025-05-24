import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { useParams, Link } from "react-router-dom"; /* libreria per leggere i paramentri dall'indirizzo URL */
import ProductCard from '../components/ProductCard';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./ProdottiCategoria.css";


const ProdottiCategoria = () => {
    const { categoria } = useParams();
    const [prodotti, setProdotti] = useState([]);

    useEffect(() => {
        const fetchExcel = async () => {
            try {
                const res = await fetch(`/data/${categoria}.xlsx`);
                const data = await res.arrayBuffer();
                const workBook = XLSX.read(data, { type: "array" });
                const sheet = workBook.Sheets[workBook.SheetNames[0]];
                const json = XLSX.utils.sheet_to_json(sheet);
                setProdotti(json);

            } catch (error) {
                console.error("errore nella lettura dei dati: ", error);

            }
        };
        fetchExcel();
    }, [categoria]);

    return (
        <div className="contenitore-carosello">
            <h1> {categoria.charAt(0).toLocaleUpperCase() + categoria.slice(1)}</h1>
            <Carousel
                showThumbs={false} /* non ci fa vedere le miniature al di sotto di esso, quidi le mini card*/
                showStatus={false} /* non ci mostra lo stato, ad esempio 1 di 15 */
                infiniteLoop  /* non ha una fine , torniamo subito all'inizio*/
                emulateTouch /* ci simula il tocco anche sul desktop allo stesso modo */
                swipeable /* ci permette lo swipe con il mouse */
                className="carosello-product"
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
                {prodotti.map((p, id) => (
                    <div className="prodotti-map" key={id}>
                        {/*  andiamo a richiamarci il componente esterno che vuole un oggetto per cui iterare, percio gli passiamo p*/}
                        <ProductCard prodotto={p}></ProductCard>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default ProdottiCategoria;

