import React, { useState } from "react";
import "./styles.css";
import logoImg from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";

export default function NewIncident() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValeu] = useState("");

  const ongID = localStorage.getItem("ongId");
  const history = useHistory();

  async function handleNewIncident(e) {
    e.preventDefault();
    const data = {
      title,
      description,
      value
    };
    try {
      await api.post("incidents", data, {
        headers: {
          Authorization: ongID
        }
      });
      history.push("/profile");
    } catch (error) {
      alert("Erro ao cadastar, tente novamente");
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastrar Novo Caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>
          <FiArrowLeft size={16} color="#e02041" />
          <Link className="back-link" to="/profile">
            Voltar para o Home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Titulo do caso"
          />
          <textarea
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="descricao"
          />
          <input
            type="text"
            value={value}
            onChange={e => setValeu(e.target.value)}
            placeholder="Valor em reais"
          />

          <button className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
