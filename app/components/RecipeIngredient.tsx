import { useCallback } from "react";
import { useRecipeStore } from "../stores/useRecipeStore";

export const RecipeIngredient = ({ ingredient }: { ingredient: string }) => {
  const {
    removeNotWantedIngredient,
    addNotWantedIngredient,
    notWantedIngredients,
    setRetrying,
    retrying,
  } = useRecipeStore();

  const notWanted = notWantedIngredients.includes(ingredient);

  const onClick = useCallback(() => {
    if (notWanted) {
      removeNotWantedIngredient(ingredient);
    } else {
      addNotWantedIngredient(ingredient);
      if (!retrying) {
        setRetrying(true);
      }
    }
  }, [notWanted, notWantedIngredients, retrying]);

  return (
    <li className={notWanted ? "not-available-item" : ""}>
      <span>{ingredient}</span>
      <button
        className={`not-available-button ${notWanted ? "add-again" : ""}`}
        onClick={onClick}
        title="toggle ingredient availability"
      >
        {notWanted ? <i className="fa fa-circle-plus" /> : <i className="fa fa-circle-xmark" />}
      </button>
    </li>
  );
};
