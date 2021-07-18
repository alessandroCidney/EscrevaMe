// Components
import { Button } from '../../components/Button';
import { AsideWithMan } from '../../components/AsideWithMan';
import { FontAwesomeIcon } from '../../components/FontAwesomeIcon';

// SASS
import './styles.scss';

// React Router DOM
import { Link, useHistory } from 'react-router-dom';

// React
import { useState, FormEvent } from 'react';

// Images
import logoWithNameImg from '../../assets/images/logos/logoWithName500px.png';
import googleIconImg from '../../assets/images/icons/google-icon.png';
import facebookIconImg from '../../assets/images/icons/facebook-icon.png';

export function LoginPage() {
  const history = useHistory();

  const [loginWithEmail, setLoginWithEmail] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  function toggleButtonsWhenDoLoginWithEmailAndPassword() {
    setLoginWithEmail(!loginWithEmail ? true : false);
  }

  function handleLoginWithEmailAndPassword(event: FormEvent) {
    // Quando esta função é chamada, emailValue e passwordValue já contém os valores de email
    // e senha recebidos através dos inputs de email e senha.

    event.preventDefault();

    history.push(`/users/${emailValue}-${passwordValue}`)
  }

  return (
    <div className="login container-row">
      <AsideWithMan />

      <main>
        <div>
          <img src={logoWithNameImg} alt="Logo do EscrevaMe" />
          { !loginWithEmail ? (
            <>  
              <Button className="red">
                <div>
                  <img src={googleIconImg} alt="Logo do Google" />
                </div>
                <span>Entrar com o Google</span>
              </Button>

              <Button className="blue">
                <div>
                  <img src={facebookIconImg} alt="Logo do Facebook" />
                </div>
                <span>Entrar com o Facebook</span>
              </Button>

              <Button
                onClick={toggleButtonsWhenDoLoginWithEmailAndPassword}
              >
                <div>
                  <FontAwesomeIcon iconName="fas fa-envelope" />
                </div>
                <span>Entrar com email e senha</span>
              </Button>
              <span>Dúvidas? Acesse o nosso <Link to="/gui">Guia</Link></span>
            </>
          ) : (
            <>
              <form onSubmit={handleLoginWithEmailAndPassword}>
                <input
                  type="text"
                  placeholder="Digite seu email"
                  onChange={event => setEmailValue(event.target.value)}
                  value={emailValue}
                />
                <input
                  type="password"
                  placeholder="Digite sua senha"
                  onChange={event => setPasswordValue(event.target.value)}
                  value={passwordValue}
                />
                <Button type="submit">Entrar</Button>
              </form>
              <span>
                Busca outros métodos de login?  
                <button 
                  onClick={toggleButtonsWhenDoLoginWithEmailAndPassword}
                >
                  Clique aqui
                </button>
              </span>
            </>
          )}
          
          
          
        </div>
      </main>
    </div>
  );
}