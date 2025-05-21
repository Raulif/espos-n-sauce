import { createFileRoute } from "@tanstack/react-router";

import { Recipe } from "../components/Recipe";
import { IngredientInput } from "../components/IngredientInput";
import { RecipeRetry } from "../components/RecipeRetry";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="outer-container">
      <div className="headline-container">
        <h1>Espos'n'Sauce</h1>
      </div>
      <IngredientInput />
      <RecipeRetry />
      <Recipe />
    </div>
  );
}
