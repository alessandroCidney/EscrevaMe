// Components
import { Button } from '../../components/Button';
import { AsideWithMan } from '../../components/AsideWithMan';
import { FontAwesomeIcon } from '../../components/FontAwesomeIcon';

// Firebase
import { firebase } from '../../services/firebaseService/firebase';

// Hooks
import { useAuth } from '../../hooks/useAuth';

// Util
import { validateEmail } from '../../util/validateEmail';

// SASS
import './styles.scss';

// React Router DOM
import { Link, useHistory } from 'react-router-dom';

// React Hot Toast
import toast, { Toaster } from 'react-hot-toast';

// React
import { useState, FormEvent } from 'react';

// Images
import logoWithNameImg from '../../assets/images/logos/logoWithName.svg';

export function LoginPage() {
  // Aciona o useHistory do React Router DOM
  const history = useHistory();

  // Aciona o Cloud Firestore do Firebase e 
  // armazena a referência da collection Users
  const firestore = firebase.firestore();
  const usersColection = firestore.collection("users");

  // Aciona o hook useEmailAuth e importa as variáveis que ele retorna
  const { authUser, signInWithGoogle, addUserDataToContext } = useAuth();

  // Se o usuário estiver logado, redireciona para a página dele
  if(authUser) {
    history.push(`/main`);
  }

  function testInputValues() {

    if(!emailValue || emailValue.trim()==='' || !passwordValue || passwordValue.trim()==='') {
      return false;
    }

    if(!validateEmail(emailValue)) {
      return false;
    }

    return true;
  }

  const [loginWithEmail, setLoginWithEmail] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  function toggleButtonsWhenDoLoginWithEmailAndPassword() {
    setLoginWithEmail(!loginWithEmail ? true : false);
  }

  async function handleLoginWithGoogle() {
    if(!authUser) {
      await signInWithGoogle();
    }

    if(authUser) {
      history.push('/main');  
    }
  }

  function handleLoginWithEmailAndPassword(event: FormEvent) {
    // Quando esta função é chamada, emailValue e passwordValue já contém os valores de email
    // e senha recebidos através dos inputs de email e senha.
    
    event.preventDefault();

    firebase.auth().signInWithEmailAndPassword(emailValue.trim(), passwordValue.trim())
    .then(({ user }) => {

      if(user && user.displayName && user.photoURL) {
        usersColection.where("email", "==", emailValue.trim()).get()
        .then(usersQuerySnapshot => {
          let id = '';

          usersQuerySnapshot.forEach(usersDoc => {
            id = usersDoc.id
          });

          if(user.displayName !== null && user.photoURL !== null) {
            addUserDataToContext(id, user.displayName, user.photoURL); 
          } 
        })
      }
      
      history.push(`/main`);
    })
    .catch((err) => {
      console.log(err)
      toast.error("Não foi possível conectar o usuário");
    })
  }

  return (
    <div className="login container-row">
      <Toaster />
      <AsideWithMan />

      <main>
        <div>
          <img src={logoWithNameImg} alt="Logo do EscrevaMe" />
          { !loginWithEmail ? (
            <>  
              <span className="title-span">
                Faça login para ter acesso à plataforma
              </span>
              
              <hr />

              <Button
                className="red"
                onClick={handleLoginWithGoogle}
              >
                <div>
                  <FontAwesomeIcon 
                    iconName="fab fa-google"
                    noChange
                  />
                </div>
                <span>Entrar com o Google</span>
              </Button>

              <Button
                onClick={toggleButtonsWhenDoLoginWithEmailAndPassword}
              >
                <div>
                  <FontAwesomeIcon 
                    iconName="fas fa-envelope" 
                    noChange
                  />
                </div>
                <span>Entrar com email e senha</span>
              </Button>
              <span>Não possui uma conta? <Link to="/joinus">Cadastre-se</Link></span>
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
                <Button 
                  type="submit"
                  disabled={((!validateEmail(emailValue) && emailValue!=='') || !testInputValues()) ? true : false}
                  onClick={event => {
                    if(testInputValues()) {
                      handleLoginWithEmailAndPassword(event);
                    }
                  }}
                >Entrar</Button>
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