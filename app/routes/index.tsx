import { createFileRoute } from "@tanstack/react-router";

import { Recipe } from "../components/Recipe";
import { RetryActions } from "../components/RetryActions";
import "../styles/global.css";
import { GenerateButton } from "../components/GenerateButton";
import { InputWithTagList } from "../components/InputWithTagList";
import { useRecipeStore } from "../stores/useRecipeStore";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const {
    wantedIngredients,
    addWantedIngredient,
    addAdditionalCharacteristic,
    removeAdditionalCharacteristic,
    removeWantedIngredient,
    additionalCharacteristics,
  } = useRecipeStore();

   useEffect(() => {
      if (wantedIngredients.length || additionalCharacteristics.length) {
        const newItems = document.querySelectorAll(".tag.hidden");
        newItems.forEach((item) => item.classList.remove("hidden"));
      }
    }, [wantedIngredients, additionalCharacteristics]);
    
  return (
    <div className="outer-container">
      <div className="headline-container">
        <h1>{`Espos'n'\nSauce`}</h1>
        <img src="/icon.png" className="chef-icon" alt="chef icon" />
      </div>
      <InputWithTagList
        id="ingredients"
        listItems={wantedIngredients}
        label="Ingredients in your dish"
        listHeader="Ingredients"
        onChange={addWantedIngredient}
        iconClassName="fa-bowl-rice"
        tagSelector="ingredient-tag"
        onRemove={removeWantedIngredient}
      />
      <InputWithTagList
        id="additional-characteristics"
        listItems={additionalCharacteristics}
        label="How would you describe your sauce"
        listHeader="Characteristics"
        onChange={addAdditionalCharacteristic}
        iconClassName="fa-pepper-hot"
        tagSelector="characteristic-tag"
        onRemove={removeAdditionalCharacteristic}
      />

      <GenerateButton />
      <Recipe />
      <RetryActions />
    </div>
  );
}
