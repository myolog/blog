import { defineAction } from "astro:actions";
import { z } from "astro:schema";


export const hi =  defineAction({
    input: z.object({}),
    handler: async (input,context) => {
        return "hi"
    },
})