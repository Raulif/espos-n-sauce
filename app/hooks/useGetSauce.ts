import { useCallback } from "react";
import { parseRecipeText } from "../helpers/parseRecipeText";
import { getSauce } from "../server-functions/sauce";
import { useRecipeStore } from "../stores/useRecipeStore";

export const useSauce = () => {
  const {
    retrying,
    setRetrying,
    recipe,
    setRecipe,
    wantedIngredients,
    notWantedIngredients,
    veryDifferent,
    setVeryDifferent
  } = useRecipeStore();

  const generateRecipe = useCallback(async () => {
    if (!wantedIngredients?.length) return;

    const sauceResponse = await getSauce({
      data: {
        wantedIngredients,
        notWantedIngredients,
        lastRecipe: retrying ? recipe?.rawText : "",
        veryDifferent
      },
    });

    if (!sauceResponse) return;

    if (retrying) setRetrying(false);
    if (veryDifferent) setVeryDifferent(false);

    const recipeObject = parseRecipeText(sauceResponse);
    setRecipe(recipeObject);
  }, [wantedIngredients, notWantedIngredients, recipe?.rawText, retrying]);

  return { recipe, generateRecipe };
};
