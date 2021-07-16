// Components
import { Button } from '../../components/Button';
import { AsideWithMan } from '../../components/AsideWithMan';

// SASS
import './styles.scss';

// Images
import logoWithNameImg from '../../assets/images/logos/logoWithName500px.png';
import googleIconImg from '../../assets/images/icons/google-icon.png';
import facebookIconImg from '../../assets/images/icons/facebook-icon.png';

// React Router DOM
import { Link } from 'react-router-dom';

const emailIcon = "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_email-256.png";

export function LoginPage() {

    return (
      <div className="login">
        <AsideWithMan />

        <main>
          <div>
            <img src={logoWithNameImg} alt="Logo do EscrevaMe" />
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
            
            <Button>
              <div>
                <img className="inverted" src={emailIcon} alt="Ícone de email" />
              </div>
              <span>Entrar com email e senha</span>
            </Button>
            <span>Não possui uma conta? <Link to="/joinus">Cadastre-se</Link></span>
          </div>
        </main>
      </div>
    );
}