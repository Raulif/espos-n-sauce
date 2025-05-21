import { useCallback, useEffect } from "react";
import { useSauce } from "../hooks/useGetSauce";
import { useRecipeStore } from "../stores/useRecipeStore";
import { RecipeIngredient } from "./RecipeIngredient";

export const Recipe = () => {
  const { recipe } = useSauce();
  const {
    retrying,
    setRetrying,
    notWantedIngredients,
  } = useRecipeStore();

  useEffect(() => {
    if (notWantedIngredients?.length && !retrying) setRetrying(true);
    if (!notWantedIngredients?.length && retrying) setRetrying(false);
  }, [notWantedIngredients, retrying]);

  if (!recipe) return;
  const { title, ingredients, steps } = recipe;

  return (
    <>
      {title && <h3>{title}</h3>}
      {!!ingredients?.length && (
        <>
          <h4>Ingredients</h4>
          <ul>
            {ingredients.map((ingredient, idx) => (
              <RecipeIngredient
                ingredient={ingredient}
                key={`${ingredient}-${idx}`}
              />
            ))}
          </ul>
        </>
      )}
      {!!steps?.length && (
        <>
          <h4>Steps</h4>
          <ol>
            {steps.map((stp, ind) => (
              <li key={`${stp}-${ind}`}>
                <span>{stp}</span>
              </li>
            ))}
          </ol>
        </>
      )}
    </>
  );
};
