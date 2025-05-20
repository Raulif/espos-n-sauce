import { createFileRoute } from "@tanstack/react-router";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { getSauce } from "../serverFns/sauces";
import { useIngredientStore } from "../store/useIngredientStore";
import { parseRecipeText } from "../lib/parseRecipeText";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [recipe, setRecipe] = useState<{
    title: string;
    ingredients: string[];
    steps: string[];
    rawText: string;
  } | null>(null);
  const {
    wantedIngredients,
    notWantedIngredients,
    addWantedIngredient,
    addNotWantedIngredient,
  } = useIngredientStore();

  const onChange = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const input = e.target as HTMLInputElement;
      addWantedIngredient(input.value);
      input.value = "";
    }
  }, []);

  const onClick = useCallback(() => {
    const input = document.querySelector(
      "#ingredient-input"
    ) as HTMLInputElement;
    addWantedIngredient(input.value);

    input.value = "";
  }, []);

  const onGenerate = useCallback(async () => {
    if (!wantedIngredients?.length) return;
    const sauceResponse = await getSauce({
      data: {
        wantedIngredients,
        notWantedIngredients,
        lastRecipe: recipe?.rawText || "",
      },
    });
    if (!sauceResponse) return;
    const recipeObject = parseRecipeText(sauceResponse);
    setRecipe(recipeObject);
  }, [wantedIngredients, notWantedIngredients, recipe?.rawText]);

  return (
    <div className="outer-container">
      <div className="headline-container">
        <h1>Espos'nSauce</h1>
      </div>
      <div className="input-container">
        <label htmlFor="ingredient-input">Ingredient</label>
        <input id="ingredient-input" onKeyDown={onChange} />
        <button onClick={onClick}>Add</button>
      </div>
      <div className="ingredients-container">
        <ul>
          {wantedIngredients.map((ingredient, index) => (
            <li key={`${ingredient}_${index}`}>
              <span>{ingredient}</span>
            </li>
          ))}
        </ul>
      </div>
      <button
        disabled={!wantedIngredients.length}
        className="generate-recipe"
        onClick={onGenerate}
      >
        Generate Recipe
      </button>

      {recipe?.title && <h3>Recipe:</h3>}
      {recipe?.title && <p>Title: {recipe?.title}</p>}
      {!!recipe?.ingredients?.length && (
        <>
          <p>Ingredients</p>
          <ul>
            {recipe?.ingredients.map((ing, ind) => {
              const notAvailable = notWantedIngredients.includes(ing);
              return (
                <li
                  className={notAvailable ? "not-available-item" : ""}
                  key={`${ing}-${ind}`}
                >
                  <span>{ing}</span>
                  <button
                    className="not-available-button"
                    onClick={() => addNotWantedIngredient(ing)}
                  >
                    X
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
      {!!recipe?.steps?.length && (
        <>
          <p>Steps</p>
          <ol>
            {recipe?.steps.map((stp, ind) => (
              <li key={`${stp}-${ind}`}>
                <span>{stp}</span>
              </li>
            ))}
          </ol>
        </>
      )}
      {!!notWantedIngredients?.length && (
        <>
          <h4>Ingredients not available</h4>
          <ul>
            {notWantedIngredients?.map((nwIng, ind) => (
              <li key={`${nwIng}-${ind}`}>
                <span>{nwIng}</span>
              </li>
            ))}
          </ul>
          <button onClick={onGenerate}>
            Try again without these ingredients
          </button>
        </>
      )}
    </div>
  );
}
