import z from "zod";

export const createProductSchema = z.object({
    name: z.string().min(1), //bat buoc, toi thieu 1 ky tu
    price: z.number().positive(), //bat buoc, > 0
    stock: z.number().optional(),
    attributes: z.array(z.number()).optional() // la mangr
})

export const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  price: z.number().positive().optional(),
  description: z.string().optional(),
  stock: z.number().int().optional(),
  attributes: z.array(z.number()).optional(),
});
