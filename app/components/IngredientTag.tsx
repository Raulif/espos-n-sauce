import { useCallback, useEffect, useRef } from "react";
import { useRecipeStore } from "../stores/useRecipeStore";

export const IngredientTag = ({ ingredient }) => {
  const ref = useRef<HTMLLIElement>(null)
  const {removeWantedIngredient} = useRecipeStore()

  const onRemoveClick = useCallback(() => {
    const element = ref.current
    if (element) {
      element.classList.add('hidden')
    }
    setTimeout(() => {
      removeWantedIngredient(ingredient)
    }, 200)
  }, [ref.current])
  
  return (
    <li className="ingredient-tag hidden" ref={ref}>
      <span>{ingredient}</span>
      <button className="ingredient-remove" onClick={onRemoveClick}>X</button>
    </li>
  );
};
