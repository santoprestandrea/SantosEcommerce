import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import './prodotti.css';
import ProductCard from '../components/ProductCard';

const categorie = ["portatili", "accessori", "case", "ssd", "telefonia"];
const Prodotti = () => {
    const [datiCategorie, setDatiCategorie] = useState({

    })

    useEffect(() => {
        /* funzione assincrona per caricare un singolo file excel in base alla categoria*/
        const caricaFileCategoria = async (cat) => {
            /*recupero il file excel dalla cartella public/data  */
            const res = await fetch(`/data/${cat}.xlsx`);
            /* convertiamo res in un arrayBuffer, cioè in un file binario */
            const data = await res.arrayBuffer();
            const workBook = XLSX.read(data, { type: "array" });
            /*mi prendo il primo foglio del file */
            const sheet = workBook.Sheets[workBook.SheetNames[0]];
            /* converto il foglio in un array di oggetti js  */
            return XLSX.utils.sheet_to_json(sheet);
        };

        /*funzione asincrona per caricare i file excel e salvarli nello stato */
        const caricaTutte = async () => {
            const risultato = {}; /* oggetto che ci conterà i dati di tutte le categorie */
            for (const cat of categorie) {
                risultato[cat] = await caricaFileCategoria(cat);
            }
            setDatiCategorie(risultato); /* aggiornato lo stato con tutti i dati */

        };
        caricaTutte(); /* richiamo la funzione per eseguire il caricamento di tutte le categorie */

    }, []);

    return (
        <div className="prodotti-page">
            <h1 className="titolo-prodotti"> I nostri Prodotti</h1>
            {/*sto mappando le categorie tramite una categoria specifica, per poi andarle a sezionarle, ovvero farle vedere a video */}
            {categorie.map((cat) => (
                <section key={cat} className="sezione-categoria">
                    <h2>{cat.charAt(0).toUpperCase() + cat.slice(1)} </h2>
                    <div className="lista-prodotti">
                        {/* andiamo a mostrare i primi sei elementi della categoria , se ci sono. 
                        andiamo a mappare il prodotto attraverso id e l'oggetto stesso(p)*/}
                        {(datiCategorie[cat] || []).slice(1, 4).map((p, idx) => (
                            <ProductCard key={idx} prodotto={p}></ProductCard>
                        ))}
                    </div>
                    {/*cliccando sul pulsante andremo alla pagina della categoria stess, che sarà la stessa per tutte le categorie */}
                    <Link to={`/prodotti/${cat}`}>
                        <button className='visualizza-tutti-btn'>Visualizza Tutti</button>
                    </Link>

                </section>
            ))
            }

        </div>
    );

};

export default Prodotti;