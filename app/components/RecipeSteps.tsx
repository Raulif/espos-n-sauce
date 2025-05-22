import { AnimatedHeightContainer } from "./AnimatedHeightContainer";
import { useRecipeStore } from "../stores/useRecipeStore";
import { Step } from "./Step";
export const RecipeSteps = () => {
  const { recipe, retrying } = useRecipeStore();
  const { steps } = recipe;

  return (
    <AnimatedHeightContainer show={!retrying}>
      {!!steps.length && (
        <div className="recipe-steps-container">
          <h4>Steps</h4>
          <ol>
            {steps.map((step, idx) => (
              <Step step={step} key={`${step}-${idx}`} />
            ))}
          </ol>
        </div>
      )}
    </AnimatedHeightContainer>
  );
};
