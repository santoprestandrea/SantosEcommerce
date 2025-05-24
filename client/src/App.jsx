import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "./features/cartSlice";
import Home from "./pages/Home";
import Prodotti from "./pages/Prodotti";
import ChiSiamo from "./pages/ChiSiamo";
import Indirizzo from "./pages/Indirizzo";
import Contatti from "./pages/Contatti";
import Footer from "./components/Footer";
import ProdottiCategoria from "./pages/ProdottiCategoria";
import CarrelloIcon from "./components/CarrelloIcon";
import CarrelloSidebar from "./components/CarrelloSidebar";
import Checkout from "./pages/Checkout";
import { CarrelloProvider } from "./context/CarrelloContext";
import Register from "./components/Register";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  /*  facciamo una funzione che ci setta in modo visibile il carrello*/
  const [carrelloVisibile, setCarrelloVisibile] =
    useState(false); /* di default è chiusa la sidebar */
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(clearCart());
    }
  }, [user, dispatch]);

  return (
    /* avvolgo tutto all'interno del router, in modo che i componenti funzionino su tutte le pagine */
    <Router>
      <div>
        <Navbar />
        {user && <CarrelloIcon onClick={() => setCarrelloVisibile(true)} />}
        <CarrelloSidebar
          visibile={carrelloVisibile}
          onClose={() => setCarrelloVisibile(false)}
        />
        <main style={{ padding: "2rem", paddingTop: "100px" }}>
          <Routes> {/* definizione delle rotte */}
            <Route path="/" element={<Home />} />
            <Route path="/prodotti" element={<Prodotti />} />
            <Route
              path="/prodotti/:categoria"
              element={<ProdottiCategoria />}
            ></Route>
            <Route path="/chi-siamo" element={<ChiSiamo />} />
            <Route path="/indirizzo" element={<Indirizzo />} />
            <Route path="/contatti" element={<Contatti />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* rotta private dell'admin:  */}
            <Route 
              path="/admin"
              element={
                <PrivateRoute role="admin">
                  {" "}
                  <AdminDashboard />{" "}
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer></Footer>
      </div>
    </Router>
  );
};

export default App;
