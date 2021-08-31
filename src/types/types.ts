export type CommentType = {
	comment_author: string;
	comment_author_avatar: string;
	comment_content: string;
	created_at: number;
}

export type EssayType = {
	essay_title: string;
	formated_essay_title: string;
	essay_content: string;
	author_username: string;
	author_id: string;
	author_avatar: string;
	created_at: number;
	likes: string[];
	comments: CommentType[];
}

export type UserType = {
	id: string;
	avatar: string;
	email: string;
	username: string;
}