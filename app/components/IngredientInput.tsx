import { useCallback, useEffect, useRef } from "react";
import { useSauce } from "../hooks/useGetSauce";
import { useRecipeStore } from "../stores/useRecipeStore";
import { IngredientTag } from "./IngredientTag";

export const IngredientInput = () => {
  const { wantedIngredients, addWantedIngredient, fetching, clearRecipe, recipe } = useRecipeStore();
  const { generateRecipe } = useSauce();
  const input = useRef<HTMLInputElement>(null);

  const onChange = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!input.current?.value) return;
      if (e.key === "Enter") {
        addWantedIngredient(input.current.value);
        input.current.value = "";
       clearRecipe()
      }
    },
    [input.current]
  );

  const onClick = useCallback(() => {
    if (!input.current?.value) return;
    addWantedIngredient(input.current.value);
    input.current.value = "";
    clearRecipe()
  }, [input.current]);

  useEffect(() => {
    if (wantedIngredients.length) {
      const newIngredients = document.querySelectorAll(
        ".ingredient-tag.hidden"
      );
      newIngredients.forEach((tag) => tag.classList.remove("hidden"));
    }
  }, [wantedIngredients]);

  return (
    <>
      <div className="input-container">
        <label htmlFor="ingredient-input">
          <h4>
            Ingredients in your dish <i className="fa fa-bowl-rice" />
          </h4>
        </label>
        <span className="inner-input-container">
          <input id="ingredient-input" onKeyDown={onChange} ref={input} />
          <button onClick={onClick} title="Add ingredient" className="button">
            <i className="fa fa-carrot"></i>
          </button>
        </span>
      </div>
      <div className="ingredients-container">
        <ul className="horizontal-list">
        Ingredients:
          {wantedIngredients.map((ingredient, index) => (
            <IngredientTag
              key={`${ingredient}-${index}`}
              ingredient={ingredient}
              isTag={!recipe.title && !fetching}
            />
          ))}
        </ul>
      </div>

      {!recipe?.title && (
        <button
          disabled={!wantedIngredients.length || fetching}
          className="generate-recipe button"
          onClick={() => generateRecipe()}
        >
          {fetching ? (
            <>
              Generating... <i className="fa fa-arrows-rotate" />
            </>
          ) : (
            <>
              Generate Recipe
              {wantedIngredients.length ? <i className="fa fa-rocket" /> : ""}
            </>
          )}
        </button>
      )}
    </>
  );
};
