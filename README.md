# EscrevaMe
EscrevaMe é uma plataforma onde usuários podem se cadastrar e postar suas redações, interagindo com pessoas de todo o mundo e promovendo a difusão de conhecimentos.

<img src="https://github.com/alessandroCidney/EscrevaMe/blob/master/src/assets/images/designs/design.jpg" />

## Como funciona?

### Cadastro
Os usuários podem se cadatrar a partir do componente JoinUsPage, escolhendo um dos métodos de cadastro (em 29/07/2021, o único método disponível era cadastro por email e senha).

Após realizar o cadastro, os usuários são redirecionados para suas respectivas páginas de usuário.

#### Detalhes
- O sistema identifica automaticamente que emails são válidos e quais não são, permitindo o cadastro apenas de emails válidos.
- O sistema identifica automaticamente se os dados informados já estão sendo utilizados. Se sim, não permite o cadastro

## Páginas

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

## Funcionalidades planejadas

### Página de Login
- Google
- Twitter
- Email e senha 

### Perfil do Usuário
- Dados do usuário
- Redações enviadas

### Página Principal
- Redações destaque
- Visualizar outras redações
- Avaliar outras redações

## Principais Dependências
- React
- React Router DOM
- SASS

## Cores legais para o projeto
- #1e017d (Azul escuro)
- #000000
- #7b53ff, rgba(123, 83, 255, 1) (Azul intermediário)
- #9fa8da (Azul claro)
- #ede7ff (Azul muito claro)
- #0073ff (Azul claro, mas forte)
- #ff3333 (Vermelho)

## Estrutura do banco de dados no Firebase

```json
"db": {
	"users": {
		"id": {
			"name": "",
			"description": "",
			"avatar": "",
			"created_at": "",
			"exp": "",
		},
		"essays": {
			"id": {
				"title": "",
				"content": "",
				"author_id": "",
				"created_at": "",
				"likes": ""
			}
		}
	}
}
```

## Regras do banco de dados no Firebase

### Cadastro de usuários

- Qualquer indivíduo pode cadastrar um novo usuário
	- Se entrar com o Google, o cadastro já é realizado automaticamente

- O usuário pode alterar seu perfil, mas não pode alterar o de outros usuários

### Cadastro de redações

- Usuários autenticados podem postar redações

- Usuários autenticadps podem editar/remover suas redações, mas não podem alterar as de outros usuários

### Likes em redações

- Usuários autenticados podem dar likes em redações (inclusive na própria redação), mas somente 1 like em cada

- Usuários autenticados podem retirar seus likes de redações

- Usuários autenticados não podem remover likes dados por outros usuários

## Informações importantes sobre o banco de dados

### Sobre a criação de novos itens
- O Firebase cria, automaticamente, um ID para um novo objeto adicionado
