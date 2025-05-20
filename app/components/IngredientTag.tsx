import { useRecipeStore } from "../stores/useRecipeStore";

export const IngredientTag = ({ ingredient }) => {
  const {removeWantedIngredient} = useRecipeStore()
  return (
    <li className="ingredient-tag">
      <span>{ingredient}</span>
      <button className="ingredient-remove" onClick={() => removeWantedIngredient(ingredient)}>X</button>
    </li>
  );
};
