import { useRecipeStore } from "../stores/useRecipeStore";
import { RecipeIngredient } from "./RecipeIngredient";
import { RecipeRetry } from "./RecipeRetry";
import { AnimatedHeightContainer } from "./AnimatedHeightContainer";

export const Recipe = () => {
  const { recipe, retrying, notWantedIngredients } = useRecipeStore();

  const { title, ingredients, steps } = recipe;

  return (
    <AnimatedHeightContainer show={!!title}>
      {title && <h3>{title}</h3>}
      {!!ingredients?.length && (
        <>
          <p>
            You can select which ingredients you don't have or don't want, and
            generate a new sauce
          </p>
          <h4>Ingredients</h4>
          <ul className="recipe-ingredients">
            {ingredients.map((ingredient, idx) => (
              <RecipeIngredient
                ingredient={ingredient}
                key={`${ingredient}-${idx}`}
              />
            ))}
          </ul>
        </>
      )}
      <AnimatedHeightContainer
        show={!!notWantedIngredients?.length && retrying}
      >
        <RecipeRetry />
      </AnimatedHeightContainer>

      <AnimatedHeightContainer show={!retrying}>
        {!!steps.length && (
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
      </AnimatedHeightContainer>
    </AnimatedHeightContainer>
  );
};
