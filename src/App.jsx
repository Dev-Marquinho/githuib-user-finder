import { useState } from 'react';
import './App.css'

function App() {
  const [usuario, setUsuario] = useState("")
  const [dadosUsuario, setDadosUsuario] = useState(null);
  const [naoEncontrado, setNaoEncontrado] = useState(false);

  function buscar() {
    fetch(`https://api.github.com/users/${usuario}`)
      .then(function(resposta) {
        return resposta.json();
      })
      .then(function(dados) {
        if (dados.message === "Not Found") {
          setNaoEncontrado(true);
          setDadosUsuario(null);
        }
        else {
          setDadosUsuario(dados);
          setNaoEncontrado(false);
        }
      });
  }
  return (
    <>
    <div className='container'>
     <h1 className='titulo'>Buscador GitHub</h1>
      <div className='pesquisar'>
     <input 
        type="text"
        className='input'
        placeholder='Digite um usuário'
        value={usuario}
        onChange={function(evento) {
          setUsuario(evento.target.value);
        }}

     />

      <button className='button' onClick={buscar}>Buscar</button>
      </div> 
      {dadosUsuario && (
        <>
          <img src={dadosUsuario.avatar_url}
               alt="Foto do usuário."
               className="avatar"/>
          <h2>{dadosUsuario.login}</h2>
          <h4>{dadosUsuario.bio || "Sem biografia"}</h4>
          <p>Seguidores: {dadosUsuario.followers}</p>
          <p>Repositórios: {dadosUsuario.public_repos}</p>
        </>
        )}

        {naoEncontrado && (
            <h1 style={{margin: '100px'}}>Usuário não encontrado.</h1>
        )}
    </div>
    </>
  
  )
}

export default App
