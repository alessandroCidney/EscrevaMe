// Components
import { Button } from '../../components/Button';
import { AsideWithMan } from '../../components/AsideWithMan';
import { FontAwesomeIcon } from '../../components/FontAwesomeIcon';

// Firebase
import { firebase } from '../../services/firebaseService/firebase';

// Hooks
import { useEmailAuth } from '../../hooks/useEmailAuth';

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
import logoWithNameImg from '../../assets/images/logos/logoWithName500px.png';
import googleIconImg from '../../assets/images/icons/google-icon.png';

export function LoginPage() {
  // Aciona o useHistory do React Router DOM
  const history = useHistory();

  // Aciona o Cloud Firestore do Firebase e 
  // armazena a referência da collection Users
  const firestore = firebase.firestore();
  const usersColection = firestore.collection("users");

  // Aciona o hook useEmailAuth e importa as variáveis que ele retorna
  const { emailUser, addUserDataToContext } = useEmailAuth();

  // Se o usuário estiver logado, redireciona para a página dele
  if(emailUser) {
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

  /**
   * googleUser e signInWithGoogle contém as informações
   * do context GoogleAuthContext, obtidas através do hook useGoogleAuth.
   * 
   * */

  // const { googleUser, signInWithGoogle } = useGoogleAuth();

  function toggleButtonsWhenDoLoginWithEmailAndPassword() {
    setLoginWithEmail(!loginWithEmail ? true : false);
  }

  // async function handleLoginWithGoogle() {
  //   if(!googleUser) {
  //     await signInWithGoogle();
  //   }

  //   if(googleUser) {
  //     history.push(`/users/${googleUser.id}`);  
  //   }
  // }

  function handleLoginWithEmailAndPassword(event: FormEvent) {
    // Quando esta função é chamada, emailValue e passwordValue já contém os valores de email
    // e senha recebidos através dos inputs de email e senha.
    
    event.preventDefault();

    // Testando se o usuário está cadastrado
    usersColection.where("email", "==", emailValue.trim()).get()
        .then(usersQuerySnapshot => {
          const userData = [] as Record<string, string>[];

          usersQuerySnapshot.forEach(usersDoc => {
            userData.push(usersDoc.data());
          });

          if(userData[0]) {
            firebase.auth().signInWithEmailAndPassword(emailValue.trim(), passwordValue.trim())
              .then(() => {
                addUserDataToContext(userData[0].username, userData[0].avatar);
                
                history.push(`/main`);
              })
              .catch((err) => {
                console.log(err)
                toast.error("Não foi possível conectar o usuário");
              })
          } else {
            toast.error("Dados incorretos!");
          }
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
                onClick={toggleButtonsWhenDoLoginWithEmailAndPassword}
              >
                <div>
                  <FontAwesomeIcon iconName="fas fa-envelope" />
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