export interface CreateArticleDto {
  title: string;
  discription: string;
}
export interface UpdateArticleDto {
  title?: string;
  discription?: string;
}

export interface createUserDto {
  username: string;
  email: string;
  password: string;
}
export interface loginUserDto {
  email: string;
  password: string;
}
export interface updateUserDto {
  username?: string;
  email?: string;
  password?: string;
  isAdmin?:boolean
}
export interface createCommentDto {
  text: string;
  articleId: number;
}
export interface updateCommentDto {
  text: string;
}
