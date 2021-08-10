# EscrevaMe
EscrevaMe é uma plataforma onde usuários podem se cadastrar e postar suas redações, interagindo com pessoas de todo o mundo e promovendo a difusão de conhecimentos.

<img src="https://github.com/alessandroCidney/EscrevaMe/blob/master/src/assets/images/designs/design.jpg" />

## :computer: Como funciona?

### Plataforma
Na plataforma EscrevaMe, os usuários podem se cadastrar e postar suas próprias redações, assim como curtir e interagir em redações de outros usuários.

### Cadastro
Os usuários podem se cadatrar a partir do componente JoinUsPage, escolhendo um dos métodos de cadastro.

Após realizar o cadastro, os usuários são redirecionados para suas respectivas páginas de usuário.

#### Detalhes
- O sistema identifica automaticamente que emails são válidos e quais não são, permitindo o cadastro apenas de emails válidos.
- O sistema identifica automaticamente se os dados informados já estão sendo utilizados. Se sim, não permite o cadastro

### Login
Os usuários podem fazer login e ter acesso à plataforma com o componente LoginPage, escolhendo um dos métodos de login.

Após realizar o login, os usuários são redirecionados para suas respectivas páginas de usuário.

## :raising_hand: Para desenvolvedores

### Ativar o projeto localmente
Para ativar o projeto localmente, basta baixá-lo e utilizar o comando `yarn start` na pasta do projeto através do terminal.

O projeto será inicializado e ficará disponível em `http://localhost:5000`. 

## :wrench: Funcionalidades planejadas

### LoginPage
- :white_check_mark: Autenticação por email e senha 

### JoinUsPage
- :white_check_mark: Cadastro com email e senha
- :white_check_mark: Envio de foto de perfil
- :white_circle: Enviar descrição do perfil

### UserPage
- :white_check_mark: Dados do usuário
- :white_check_mark: Foto de perfil
- :white_check_mark: Redações enviadas
- :white_check_mark: Redações destaque do usuário

### MainPage
- :white_check_mark: Visualizar outras redações
- :white_check_mark: Visualizar últimos usuários cadastrados

### EssayPage
- :white_check_mark: Título da redação
- :white_check_mark: Conteúdo da redação
- :white_check_mark: Autor da redação
- :white_check_mark: Avaliar a redação
- :white_check_mark: Função de comentar
- :white_check_mark: Ver outros comentários

## :book: Páginas

### Página de Login

<div align="center">
	<img src="https://github.com/alessandroCidney/EscrevaMe/blob/master/src/assets/images/pages/LoginPage.png" />
	<br />
</div>


Nesta página é possível realizar login para poder ter acesso às funcionalidades da aplicação

### Página de Cadastro

<div align="center">
	<img src="https://github.com/alessandroCidney/EscrevaMe/blob/master/src/assets/images/pages/JoinUsPage.png" />
	<br />
</div>


Nesta página é possível realizar o cadastro (atualmente, apenas com email e senha). Após se cadastrar, o usuário é redirecionado para sua página de usuário, podendo ter acesso às outras páginas da aplicação.

### Página de Usuário

<div align="center">
	<img src="https://github.com/alessandroCidney/EscrevaMe/blob/master/src/assets/images/pages/UserPage.png" />
	<br />
</div>


Nesta página, o usuário pode ver seus dados, como username, avatar, redações destaque e todas as redações, assim como a quantidade de caracteres de cada uma de suas redações.

Se o usuário acessar a página de outro, também poderá ver os mesmos dados do outro, pois não há nenhuma informação secreta ou sensível neste local.

### Página de Nova Redação

<div align="center">
	<img src="https://github.com/alessandroCidney/EscrevaMe/blob/master/src/assets/images/pages/NewEssayPage.png" />
	<br />
</div>


Nesta página é possível adicionar novas redações. Existem alguns processos de validação para que, somente ao passar por eles, a redação possa ser enviada.

## :space_invader: Principais Dependências
- React
- React Router DOM
- SASS
- React Hot Toast
- Firebase
- Firebase tools