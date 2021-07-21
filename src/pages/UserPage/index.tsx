// SASS
import './styles.scss';

// Components
import { EssayOfUserPage } from '../../components/EssayOfUserPage';
import { EssaysArea } from '../../components/EssaysArea';
import { MainFooter } from '../../components/MainFooter';

// React Router DOM
import { useParams } from 'react-router-dom';

// Hooks
// import { useGoogleAuth } from '../../hooks/useGoogleAuth';

type UserPageParams = {
	id: string;
}

export function UserPage() {

	const params = useParams<UserPageParams>();

	const userId = params.id;

	// const { googleUser } = useGoogleAuth();

	/**
	 * */

	return (
		<div className="user-page container-column">
			{/*<MainHeader />*/}
			
			<div className="custom-background">
				<div className="profile-photo">
					
				</div>	
			</div>

			<div className="user-data">	
				<h1>@{ userId }</h1>
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