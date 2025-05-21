import { useCallback } from "react";
import { useRecipeStore } from "../stores/useRecipeStore";

export const RecipeIngredient = ({ ingredient }: { ingredient: string }) => {
  const {
    removeNotWantedIngredient,
    addNotWantedIngredient,
    notWantedIngredients,
  } = useRecipeStore();
  
  const notWanted = notWantedIngredients.includes(ingredient);

  const onClick = useCallback(() => {
    if (notWanted) {
      removeNotWantedIngredient(ingredient)
    } else {
      addNotWantedIngredient(ingredient)
    }
  }, [notWanted, notWantedIngredients]);

  return (
    <li className={notWanted ? "not-available-item" : ""}>
      <span>{ingredient}</span>
      <button
        className={`not-available-button ${notWanted ? "add-again" : ""}`}
        onClick={onClick}
      >
        {notWanted ? "+" : "X"}
      </button>
    </li>
  );
};
