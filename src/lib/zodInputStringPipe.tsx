import { z, ZodTypeAny } from "zod";

export default function zodInputStringPipe(zodPipe: ZodTypeAny) {
  return z
    .string()
    .transform((value) => (value === "" ? null : value))
    .nullable()
    .refine((value) => value === null || !isNaN(Number(value)), {
      message: "Nombre Invalide",
    })
    .transform((value) => (value === null ? 0 : Number(value)))
    .pipe(zodPipe);
}
