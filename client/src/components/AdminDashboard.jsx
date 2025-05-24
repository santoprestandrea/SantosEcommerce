import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategory } from "../features/productSlice";
import "./AdminDashboard.css";

/* AdminDshboard ci serve per interfacciarci con il backend, attraverso questa schermata l'amministratore può aggiungere modificare o eliminare
uno specifico prodotto, filtrando tramite le categorie. ogni cambiamento che sarà fatto dalla schermata admin dashboard , sarà automaticamente
aggiornato sul backend.
*/
const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("portatili");
  /* definiamo lo stato per l'indice del prodotto, da modificare */
  const [editIndex, setEditIndex] = useState(null);
  /* adesso andiamo a definirci per il prodotto modificato */
  const [editedProduct, setEditedProduct] = useState({});
  /*definiamo lo stato per un nuovo prodtto da aggiungere */
  const [newProduct, setNewProduct] = useState({});
  /*definiamo lo stato per il messaggio di feedback */
  const [message, setMessage] = useState(null);
  /*definiamo il tipo del messaggio di successo o di errore e lo impostiamo a success */
  const [typeMessage, setTypeMessage] = useState("success");

  /*Aggiornimao i prodotti quando la categoria cambia, andando prima a selezionarci i dati dal redux  */
  const products = useSelector((state) => state.products.items);
  /*Andiamo a definirci lo stato del caricamento dei prodotti */
  const loading = useSelector((state) => state.products.status === "loading");
  /*ci definiamo lo stato dell'errore del prodotto */
  const error = useSelector((state) => state.products.error);
  useEffect(() => {
    /* andiamo a caricarci i prodotti dal backend */
    dispatch(fetchProductsByCategory(selectedCategory));
    /* ci risettiamo l'indice della modifica */
    setEditIndex(null);
    /* resettiamo il prodotto modificato */
    setEditedProduct({});
    setNewProduct({});

    setMessage(null);
  }, [
    selectedCategory,
    dispatch,
  ]); /* ci siamo andati ad aggiornare la categoria selezionata */
  /* Mostriamo un messaggio temporaneo a video per qualche secondo, riferito ad una determinata azione */
  const showMessage = (text, type = "success") => {
    setMessage(text);
    setTypeMessage(type);
    setTimeout(() => setMessage(null), 5000);
  };
  /* funzione per la validazione dei campi del form e per i messaggi di conferma per la modifica o la cancellazione dei prodotti */
  const validateProduct = (prod) => {
    for (const [key, val] of Object.entries(prod)) {
      const value = val?.toString().trim() || "";
      if (!value) {
        showMessage(`Il campo '${key}' non può essere vuoto.`, "error");
        return false;
      }
      if (key === "prezzo") {
        const num = parseFloat(value.replace(/€/, ""));
        if (isNaN(num) || num <= 0) {
          showMessage(
            "Prezzo non valido. Deve essere un numero maggiore di zero.",
            "error"
          );
          return false;
        }
      }
      if (key.toLowerCase() === "id") {
        if (!/^[A-Z0-9]+$/.test(value)) {
          showMessage(
            "ID non valido: usa solo lettere maiuscole e numeri.",
            "error"
          );
          return false;
        }
      }
      if (key.toLowerCase() === "immagine") {
        if (!/^\/.+\.(jpg|jpeg|png|gif)$/i.test(value)) {
          showMessage(
            "Percorso immagine non valido. Deve iniziare con / e terminare con estensione valida.",
            "error"
          );
          return false;
        }
      }
    }
    return true;
  };

  /* Gestiamo il click sul pulsante modifica , in maniera tale da modificare il prodotto all'indice cliccato */
  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditedProduct({ ...products[index] });
  };

  /* funzione che ci permette di salvare il prodotto modificato, tramite API*/
  const handleSaveClick = async () => {
    if (!validateProduct(editedProduct)) return;
    if (
      !window.confirm(
        "Sei sicuro di voler salvare le modifiche a questo prodotto?"
      )
    )
      return;

    /* il try ci serve per gestire e captare eventuali errori */
    try {
      /* inviamo una richiesta put al server che ci permetta di aggiornare il prodotto selezionato */
      await fetch(
        `http://localhost:5000/api/products/${selectedCategory}/${editIndex}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          /*convertiamo l'oggetto modificato in stringa json */
          body: JSON.stringify(editedProduct),
        }
      );
      /* ricarico la lista prodotti dopo la modifica */
      dispatch(fetchProductsByCategory(selectedCategory));
      /* usciamo dalla modalità della modifica e azzeriamo l'indice */
      setEditIndex(null);
      showMessage("Prodotto modificato con successo");
    } catch (error) {
      console.error("errore nel salvatagggio: ", error);
      showMessage("errore nel salvataggio", "error");
    }
  };

  /*funzione che ci permette di eliminare un prodotto , tramite la porta 5000 ovvero server */

  const handleDeleteClick = async (index) => {
    /* esce fuori il popup per chiedere se si è sicuri di voler eliminare il prodotto */
    if (!window.confirm("Sei sicuro di voler eliminare questo prodotto?"))
      return;

    try {
      /* eliminiamo un prodottotramite API, che ci permette di selezionare il prodotto o l'indice indicato */
      await fetch(
        `http://localhost:5000/api/products/${selectedCategory}/${index}`,
        {
          methdod: "DELETE",
        }
      );
      /* ricarichiamo i prodotti all'interno della categoria */
      dispatch(fetchProductsByCategory(selectedCategory)); 
      showMessage("prodotto eliminato con successo ");
    } catch (error) {
      console.error("errore nella cancellazione:", error);
      showMessage("errore nella cancellazione:", "error");
    }
  };

  /*funzione per aggiungere un nuovo prodotto alla categoria in cui siamo */

  const hadleAddProduct = async () => {
    if (!validateProduct(newProduct)) return;
    if (!window.confirm("Confermi l'aggiunta del nuovo prodotto?")) return;

    try {
      /*ci richiamiamo api che ci indica la categoria selezionata, tramite la quale possiamo aggiungere un prodotto alla categoia in cui siamo */
      await fetch(`http://localhost:5000/api/products/${selectedCategory}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: Json.stringify(newProduct),
      });

      /* ricarico i prodotti all'interno della categoria */
      dispatch(fetchProductsByCategory(selectedCategory));
      setNewProduct({});
      showMessage("Prodotto aggiunto con successo");
    } catch (error) {
      console.error("errore nell'aggiunta del prodotto", error);
      showMessage("Errore nell'aggiunta del prodotto:", "error");
    }
  };

  return (
    <div className="admin-dashboard">
      <h2 className="admin-title">Dashboard Admin</h2>
      <label className="admin-categoria">Categoria</label>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="portatili"> Portatili</option>
        <option value="accessori"> Accessori</option>
        <option value="case">Case</option>
        <option value="ssd"> SSD</option>
        <option value="telefonia"> Telefonia</option>
      </select>
      {message && <p className={`message ${typeMessage}`}>{message}</p>}
      {loading && <p>Prodotti in fase di caricamento..</p>}
      {error && <p className="message-error">{error}</p>}
      {products.length > 0 && (
        <div className="add-product">
          <h3>Aggiungi nuovo prodotto</h3>
          {/*mappiamo gli oggetti uno alla volta attraverso la loro chiave, in modo tale da crearci il form con le label e gli input text */}
          {Object.keys(products[0]).map((key) => (
            <div key={key}>
              <label>{key}: </label>
              <input
                value={newProduct[key] || ""}
                /* al cambiamento del valore del prodotto, lo sttiamo a set new product */
                onChange={(e) =>
                  setNewProduct({ ...newProduct, [key]: e.target.value })
                }
              />
            </div>
          ))}
          <button onClick={hadleAddProduct}> Aggiungi</button>
        </div>
      )}
      {/*creazione tabella responsive, in cui andiamo a mappare tutti gli elementi di una certa categoria e permettiamo per ogni elemento
    la modifica e la cancellazione */}

      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              {products.length > 0 &&
                Object.keys(products[0]).map((key) => <th key={key}>{key}</th>)}
              <th>azioni</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod, idx) => (
              /* stiamo leggendo la cella del e file e la impostiamo sulla tabella*/
              <tr key={idx}>
                {/* mappiamo un elemento alla volta ed popoliamo la tabella  */}
                {/* key è la chiave per cui iteriamo e datalabel contiene il nome della colonna */}
                {Object.keys(prod).map((key) => (
                  <td key={key} data-label={key}>
                    {/* associamo gli id */}
                    {editIndex === idx ? (
                      <input
                        value={editedProduct[key] || ""}
                        onChange={(e) =>
                          setEditedProduct({
                            ...editedProduct,
                            [key]: e.target.value,
                          })
                        }
                      ></input>
                    ) : (
                      prod[key]
                    )}
                  </td>
                ))}
                <td>
                  {/* stiamo popolando l'ultima cella impostando il button modifica e cancella ; se si clicca sul modifica
                    il button diventa "Salva" */}
                  {editIndex === idx ? (
                    <>
                      <button onClick={handleSaveClick}>Salva</button>
                      <button onClick={() => setEditIndex(null)}>
                        Annulla
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(idx)}>
                        Modifica
                      </button>
                      <button onClick={() => handleDeleteClick(idx)}>
                        Elimina
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminDashboard;
