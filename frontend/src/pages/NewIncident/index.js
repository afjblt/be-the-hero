import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api'; 

import logoImg from '../../assets/logo.svg';

import './styles.css';

export default function NewIncidents() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const ongId = localStorage.getItem('ongId')

  const history = useHistory();

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try {
      await api.post('incidents', data, {
        headers : {
          Authorization: ongId,
        }
      })

      history.push('/profile');
    }catch(err) {
      alert('Erro ao cadastrar caso, tente novamente');
    }
  }

  return (
    <div className="new-incident">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the hero"/>

          <h1>Cadastro novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar o herói para resolver isso.</p>

          <Link className="back-link" to="/profile">
          <FiArrowLeft  size={16} color="#e02041" />
          Voltar para home
       </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input placeholder="Titulo do caso" value={title} onChange={e => setTitle(e.target.value)}/>
          <textarea placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)}/>
          <input placeholder="Valor em reais" value={value} onChange={e => setValue(e.target.value)}/>
          <button className="button">Cadastrar</button>
        </form>
      </div>
   </div>
  )
}