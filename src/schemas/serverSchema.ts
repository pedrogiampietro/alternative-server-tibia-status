import { z } from "zod";

export const serverSchema = z.object({
  id: z.string().optional(),
  ip: z.string(),
  port: z.number(),
  country: z.string(),
  serverName: z.string(),
  playersCount: z.number(),
  uptime: z.string(),
  pts: z.number(),
  exp: z.number(),
  type: z.string(),
  version: z.string(),
});

export type Server = z.infer<typeof serverSchema>;
