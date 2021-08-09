// Components
import { MainHeader } from '../../components/MainHeader';
import { MainFooter } from '../../components/MainFooter';
import { FontAwesomeIcon } from '../../components/FontAwesomeIcon';

export function Error404Page() {

	return (
		<div className="container-column">
			<MainHeader />
				<div style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
					marginTop: 100,
					color: 'var(--color-main-blue)'
				}}>
					<div style={{
						fontSize: 200,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'column',
					}}>
						<FontAwesomeIcon 
							iconName="fas fa-exclamation-triangle" 
						/>
						<span style={{fontSize:70, fontWeight: 'bolder'}}>404</span>
						<span style={{fontSize:40}}>Página não encontrada</span>
					</div>
				</div>
			<MainFooter />
		</div>
	);
}