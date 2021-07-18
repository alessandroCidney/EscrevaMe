// SASS
import './styles.scss';

// Components
import { EssayOfUserPage } from '../../components/EssayOfUserPage';
import { EssaysArea } from '../../components/EssaysArea';
import { MainHeader } from '../../components/MainHeader';
import { MainFooter } from '../../components/MainFooter';

export function UserPage() {

	return (
		<div className="user-page container-column">
			{/*<MainHeader />*/}
			
			<div className="custom-background">
				<div className="profile-photo">
					
				</div>	
			</div>

			<div className="user-data">	
				<h1>@Username</h1>
				<p>Este é um exemplo de descrição para o perfil de um possível futuro usuário da plataforma EscrevaMe</p>
			</div>
			
			<EssaysArea title="Redações destaque" highlight>
				<EssayOfUserPage icon="quote" title="A sociedade brasileira nos últimos tempos" />
				<EssayOfUserPage icon="quote" title="A tecnologia contemporânea" />
				<EssayOfUserPage icon="quote" />	
			</EssaysArea>

			<EssaysArea title="Todas as redações">
				<EssayOfUserPage />
				<EssayOfUserPage />
				<EssayOfUserPage />
				<EssayOfUserPage />
				<EssayOfUserPage />
				<EssayOfUserPage />
				<EssayOfUserPage />
			</EssaysArea>

			<MainFooter />
		</div>
	);
}