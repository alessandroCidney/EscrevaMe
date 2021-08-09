// React Router DOM
import { Link } from 'react-router-dom';

// Components
import { MainHeader } from '../../components/MainHeader';
import { MainFooter } from '../../components/MainFooter';

export function DataPolicyPage() {

	return (	
		<div className="container-column policy">

			<MainHeader />

			<div>
				<h1>Política de tratamento e segurança de dados</h1>

				<h2>Por que precisamos dos seus dados?</h2>

				<p>Precisamos dos seus dados para garantir que você e outros usuários possam utilizar a plataforma e para que ela funcione corretamente.</p>

				<h2>Como utilizamos seus dados?</h2>

				<p>Utilizamos dados como e-mail, senha e nome de usuário para que possamos identificar cada usuário da plataforma, assim como também utilizamos outros dados descritos em nossa <Link to="/privacypolicy">Política de privacidade</Link> para garantir que os usuários possam ter uma melhor experiência durante a utilização da plataforma.</p>

				<h2>Como garantimos a segurança dos seus dados</h2>

				<p>Fazemos o possível para garantir a segurança dos seus dados através de validações realizadas no front-end da aplicação EscrevaMe. Verificamos que usuário está realizando as inserções e leituras de dados, permitindo as inserções apenas se o usuário for o próprietário da conta que está utilizando. Cada usuário só pode adicionar redações em sua própria conta.</p>

				<p>Também planejamos implantar verificações no back-end da aplicação e, assim que a implementação for concluída, também estaremos realizando verificações e validações nessa parte da aplicação, apliando a segurança dos dados inseridos na plataforma.</p>

				<p>Vale lembrar que, conforme descrito em nossa <Link to="/privacypolicy">Política de privacidade</Link>, estamos autorizados a deletar e/ou alterar os dados de usuários que concordaram com nossa Política de privacidade e se cadastraram na plataforma.</p>

				<p>Não nos responsabilizamos por furto ou roubo de contas e, ao concordar com a Política de tratamento e segurança de dados e ao se cadastrar na plataforma EscrevaMe, você também concorda com isso.</p>
			</div>
			<MainFooter />
		</div>
	);	
}