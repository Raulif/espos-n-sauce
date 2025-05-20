import { useCallback } from "react";
import { useSauce } from "../hooks/useGetSauce";
import { useRecipeStore } from "../stores/useRecipeStore";

export const Recipe = () => {
  const { recipe } = useSauce();
  const {
    retrying,
    setRetrying,
    notWantedIngredients,
    addNotWantedIngredient,
  } = useRecipeStore();

  const onIngredientNotWanted = useCallback((ingredient: string) => {
    if (!retrying) setRetrying(true);
    addNotWantedIngredient(ingredient);
  }, []);

  if (!recipe) return;
  const { title, ingredients, steps } = recipe;

  return (
    <>
      {title && <h3>Recipe:</h3>}
      {title && <p>Title: {title}</p>}
      {!!ingredients?.length && (
        <>
          <p>Ingredients</p>
          <ul>
            {ingredients.map((ing, ind) => {
              const notAvailable = notWantedIngredients.includes(ing);
              return (
                <li
                  className={notAvailable ? "not-available-item" : ""}
                  key={`${ing}-${ind}`}
                >
                  <span>{ing}</span>
                  <button
                    className="not-available-button"
                    onClick={() => onIngredientNotWanted(ing)}
                  >
                    X
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
      {!!steps?.length && (
        <>
          <p>Steps</p>
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
