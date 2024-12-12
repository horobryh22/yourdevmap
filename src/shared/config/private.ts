// только серверный конфиг

import { z } from "zod";

const privateConfigSchema = z.object({
  GITHUB_ID: z.string().optional(),
  GITHUB_SECRET: z.string().optional(),

  // если одного из параметров не будет в .env то при парсинге будет ошибка
  // они обязательные, иначе приложение не запустится
  EMAIL_SERVER_USER: z.string(),
  EMAIL_SERVER_PASSWORD: z.string(),
  EMAIL_SERVER_HOST: z.string(),
  EMAIL_SERVER_PORT: z.string(),
  EMAIL_FROM: z.string(),

  ADMIN_EMAILS: z.string().optional(),
});

export const privateConfig = privateConfigSchema.parse(process.env);
