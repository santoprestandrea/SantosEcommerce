# SANTO_ECOMMERCE

**Progetto di eCommerce full-stack con React, Redux Toolkit e Node.js/Express**

## Descrizione

SANTO_ECOMMERCE è una piattaforma eCommerce completa che consente agli utenti di esplorare un catalogo di prodotti, aggiungerli al carrello, registrarsi, eseguire il login e finalizzare l'ordine. L'applicazione è modulare e separa chiaramente il client (front-end) dal server (back-end), facilitando manutenzione e scalabilità.

## Funzionalità principali:
__ Informazioni Base:
* Il sito web è totalmente responsive, pensato per piccoli schermi e non! 
* Difatti un piccolo esempio è la navbar, la quale si apre ad hamburger se lo schermo diventa piccolo!

### Front-end (Client)

1. **Home Page**

   * Presentazione della storia di come nasce E-shop Informatica e della qualità ricercata che hanno i prodotti venduti. 
   * Sezione sottostante alla qualità prodotti dove vi è in carousell con 3 prodotti in evidenza, con sotto un pulsante che porta alla pagina di tutti i prodotti

2. **Catalogo Prodotti**

   * Visualizzazione a griglia dei prodotti con immagine, nome, specifiche tecniche, breve descrizione e prezzo.
   * Pagine dinamiche di prodotto, selezionando un button "Visualizza tutti", si viene reindirizzati sulla pagina che permette di visualizzare tutti i prodotti all'interno di quella categoria!
3. **Chi siamo**
   * Breve descrrizione della storia dell'ecommerce e dei nostri valori!


4. **Indirizzo**

   * Pagina con all'interno una mappa che mostra dove ci troviamo


5. **Form contatti**

   * Pagina che mostra le informazioni utili per contattarci, con un form che permette agli utente di farsi contattare, lasciando un messaggio! Una volta inviato il messaggio, esce fuori il popup di conferma.



6. **Autenticazione e Profilo Utente**

   * Pagina del login che permette di entrare con le credenziali utente o quelle admin.
   * Se l'utente non è registato, può crearsi un account cliccando su "Registrati", dove potrà inserire i suoi di accesso, una volta registrato, entrerà direttamente all'interno dell'ecommerce e in automatico l'utente sarà inserito nel file "users.json" (all'interno del server), in questo modo, dalla prossima volta potrà effettuare il login.

7. **Rotta dell'Admin**

   * Accedendo con:
   email: admin@admi.com
   psw:   admin
   si entra nella rotta privata dell'amministrazione, in cui si hanno permessi speciali.
   * Filtrando nella categoria desiderata, possiamo aggiungere un nuovo prodotto attraverso il form, modificare un prodotto od eliminarlo.

8. **Provider del Carrello**

   * La gestione del carrello è stata implementata principalmente tramite il CarrelloContext che si occupa di gestire l'aggiunta, la rimozione di un prodotto dal carrello e lo svuotamento totale del carrello.

   * Il componente del carrello appare solo ed esclusivamente se si è effettuato il login sul sito, altrimenti non si possono acquistare prodotti. 

9. **Checkout page**

   * Se si hanno prodotti nel carrello, cliccando sull'iconcina, si può visualizzare un riepilogo dei prodotti acquistati ed andare alla pagina del checkout, dove potrà inviare l'ordine. 
   * Una volta che l'ordine sarà stato inviato, il carrello verrà svuotato.

   

### Back-end (Server)

   * Cartella server che permette di interfacciarci con il backend, tramite delle api. 
   * index.js ---> contenuto di tutte le api che ci sono servite per gestire il collegamento tra backend e frontend. 
   * Eseguito tramite Express

   **users.json**:
   File dove vengono salvati tutti i nuovi utenti
   



## Struttura delle cartelle

```bash
SANTO_ECOMMERCE/
├── client/                # Front-end React + Redux Toolkit
│   ├── public/            
│   │   ├── data/          # File excel da cui leggere i prodotti
│   │   └── images/        # Immagini per ogni categoria dei prodotti
│   ├── src/
│   │   ├── assets/       
│   │   ├── components/    # Componenti UI riutilizzabili
│   │   ├── features/      # Slice di Redux Toolkit
│   │   ├── context/       # Provider del carrello
│   │   ├── pages/         # Pagine del sito 
│   │────── App.jsx        # Root component
│   │────── main.jsx       # Entry point Vite
│   │────── store.js       # Configurazione Redux store
│   └── vite.config.js     # Config Vite
│
└── server/                # Back-end Node.js/Express
    ├── index.js             # Configurazione Express e API
    └── users.json           # Gli utenti salvati
```

**Tecnologie utilizzate:**

* Per la parte frontend abbiamo utilizzato CSS
* AOS ---> per le animazioni, ovvero rendere il tutto più dinamico!!!


**Collegamento server-client**

   * Per permettere il collegamento tra il server ed il client, abbiamo modificato il  package.json della cartella esterna che in modo simutaneo, avvia sia il server che il client (ovviamente su porte diverse)
   * npm install -D concurrently -----> comando da lanciare nel terminale per permmettere l'esecuzione simultanea
