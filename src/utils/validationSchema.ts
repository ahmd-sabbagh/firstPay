import { z } from "zod";

export const createArticleSchema = z.object({
  title: z.string().min(5).max(200),
  discription: z.string().min(20),
});
export const createUserSchema = z.object({
  username: z
    .string({
      required_error: "username is required",
      invalid_type_error: "username shoud be string",
    })
    .min(5)
    .max(100),
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email shoud be string",
    })
    .min(10)
    .email(),
  password: z.string().min(6),
});
export const loginUserSchema = z.object({
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email shoud be string",
    })
    .min(10)
    .email(),
  password: z.string().min(6),
});
export const craeteCommentSchema = z.object({
  text: z
    .string({
      required_error: "comment is required",
      invalid_type_error: "comment shoud be string",
    })
    .min(10),
  articleId: z.number(),
});
