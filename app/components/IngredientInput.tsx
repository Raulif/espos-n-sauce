import { useCallback, useEffect, useRef } from "react";
import { useSauce } from "../hooks/useGetSauce";
import { useRecipeStore } from "../stores/useRecipeStore";
import { IngredientTag } from "./IngredientTag";

export const IngredientInput = () => {
  const { wantedIngredients, addWantedIngredient } = useRecipeStore();
  const { generateRecipe, recipe } = useSauce();
  const input = useRef<HTMLInputElement>(null);

  const onChange = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!input.current?.value) return;
      if (e.key === "Enter") {
        addWantedIngredient(input.current.value);
        input.current.value = "";
      }
    },
    [input.current]
  );

  const onClick = useCallback(() => {
    if (!input.current?.value) return;
    addWantedIngredient(input.current.value);
    input.current.value = "";
  }, [input.current]);

  useEffect(() => {
    if (wantedIngredients.length) {
      const newIngredients = document.querySelectorAll(
        ".ingredient-tag.hidden"
      );
      newIngredients.forEach((tag) => tag.classList.remove('hidden'))
    }
  }, [wantedIngredients]);

  return (
    <>
      <div className="input-container">
        <label htmlFor="ingredient-input">Add Ingredient</label>
        <span className="inner-input-container">
          <input id="ingredient-input" onKeyDown={onChange} ref={input} />
          <button onClick={onClick} title="Add ingredient">
            +
          </button>
        </span>
      </div>
      <div className="ingredients-container">
        <ul className="horizontal-list">
          {wantedIngredients.map((ingredient, index) => (
            <IngredientTag
              key={`${ingredient}-${index}`}
              ingredient={ingredient}
            />
          ))}
        </ul>
      </div>
      {!recipe?.title && (
        <button
          disabled={!wantedIngredients.length}
          className="generate-recipe"
          onClick={generateRecipe}
        >
          Generate Recipe
        </button>
      )}
    </>
  );
};
