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
    setVeryDifferent,
    setFetching,
    clearRecipe,
    recipeCollection
  } = useRecipeStore();

  const generateRecipe = useCallback(async (isRetry?: boolean) => {
    if (!wantedIngredients?.length) return;
    setFetching(true)
    clearRecipe()

    const sauceResponse = await getSauce({
      data: {
        wantedIngredients,
        notWantedIngredients,
        lastRecipes: isRetry ? recipeCollection.map(r => r.rawText) : [],
        veryDifferent,
        additionalCharacteristics: []
      },
    });

    if (!sauceResponse) return;

    if (retrying) setRetrying(false);
    if (veryDifferent) setVeryDifferent(false);

    const recipeObject = parseRecipeText(sauceResponse);
    setFetching(false)
    setRecipe(recipeObject);
  }, [wantedIngredients, notWantedIngredients, recipe?.rawText, retrying]);

  return {  generateRecipe };
};
