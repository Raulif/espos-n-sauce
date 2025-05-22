import { useRecipeStore } from "../stores/useRecipeStore";
import { RecipeIngredient } from "./RecipeIngredient";
import { AnimatedHeightContainer } from "./AnimatedHeightContainer";
import { NotWantedIngredientsList } from "./NotWantedIngredientsList";
import { RecipeSteps } from "./RecipeSteps";

export const Recipe = () => {
  const { recipe, retrying, notWantedIngredients } = useRecipeStore();

  const { title, ingredients, steps } = recipe;

  return (
    <AnimatedHeightContainer show={!!title} classes="recipe-container">
      {title && <h3>{title}</h3>}
      {!!ingredients?.length && (
        <div className="recipe-ingredients-container">
          <p>
            You can <span className="highlight">select</span> which ingredients
            you don't have or don't want, and
            <span className="highlight"> generate</span> a new sauce
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
        </div>
      )}

      <NotWantedIngredientsList />

      <RecipeSteps />
    </AnimatedHeightContainer>
  );
};
