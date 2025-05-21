import { useCallback, useRef } from "react";
import { useRecipeStore } from "../stores/useRecipeStore";

export const IngredientTag = ({
  ingredient,
  isTag,
}: {
  ingredient: string;
  isTag: boolean;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  const { removeWantedIngredient, fetching } = useRecipeStore();

  const onRemoveClick = useCallback(() => {
    const element = ref.current;
    if (element) {
      element.classList.add("hidden");
    }
    setTimeout(() => {
      removeWantedIngredient(ingredient);
    }, 200);
  }, [ref.current]);

  return isTag ?(
    <li className="ingredient-tag hidden" ref={ref}>
      <span>{ingredient}</span>
      <button
        className="ingredient-remove"
        onClick={onRemoveClick}
        title="remove the ingredient"
      >
        <i className="fa fa-circle-xmark" />
      </button>
    </li>
  ) : (
    <li>{ingredient}</li>
  );
};
