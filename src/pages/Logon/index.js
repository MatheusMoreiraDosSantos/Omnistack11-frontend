import React, { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import "./styles.css";
import api from "../../services/api";

import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.svg";

export default function Logon() {
  const [id, setId] = useState("");
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await api.post("sessions", { id });

      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", response.data.name);

      history.push("/profile");
    } catch (error) {
      alert("Falha no Login, tente novamente");
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />
        <form>
          <h1>Faça seu Logon</h1>
          <input
            type="text"
            value={id}
            onChange={e => setId(e.target.value)}
            placeholder="sua ID:"
          />
          <button onClick={handleLogin} className="button">
            Entrar
          </button>
          <Link to="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tenho Cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} style={{ width: 500 }} alt="Heroes" />
    </div>
  );
}
