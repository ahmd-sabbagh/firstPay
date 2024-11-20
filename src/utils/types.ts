import React from "react";
import { Article, Comment, User } from "@prisma/client";

export type TypeButton = {
  type?: string;
  hRef?: string;
  text?: string;
  fill?: boolean;
  clickHandel?: () => void;
};
export type Children = {
  children: React.ReactNode;
  data: {
    title: string;
    discription: string;
    question: string;
    response: string;
    linkTo?: string;
  };
};

export type jwtPayload = {
  id: number;
  isAdmin: boolean;
  username: string;
};

export type CommentWithUser = Comment & { user: User };
export type SingleArticle = Article & { comment: Comment[] };