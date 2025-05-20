import { createServerFn } from "@tanstack/react-start";
import { getRecipeText } from "./gemini";
export const getSauce = createServerFn({
  method: "GET",
})
  .validator(
    (data: {
      wantedIngredients: string[];
      notWantedIngredients: string[];
      lastRecipe: string;
      veryDifferent: boolean;
    }) => data
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
