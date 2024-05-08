import { z } from "zod";

export const taskSchema = z.object({
  title: z.string({
    required_error: "Se requiere título!",
  }),
  description: z.string({
    required_error: "Se requiere descripción!",
  }),
});
