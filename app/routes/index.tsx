import { createFileRoute } from "@tanstack/react-router";

import { Recipe } from "../components/Recipe";
import { IngredientInput } from "../components/IngredientInput";
import "../styles/global.css";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="outer-container">
      <div className="headline-container">
        <h1>Espos'n'Sauce</h1>
        <img src="/icon.png" className="chef-icon" alt="chef icon" />
      </div>
      <IngredientInput />
      <Recipe />
    </div>
  );
}
