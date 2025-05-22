import { createServerFn } from "@tanstack/react-start";
import { getRecipeText } from "./gemini";
import type { PromptPayload } from "../types/types";

export const getSauce = createServerFn({
  method: "GET",
})
  .validator(
    (data: PromptPayload) => data
  )
  .handler(async (ctx) => {
    try {
      const { data } = ctx;
      const recipeText = await getRecipeText({
        data,
      });
      return recipeText;
    } catch (e) {
      console.error("Error on getRecipe: ", e);
    }
  });
