import { PromptPayload } from "../types/types";

const mapDifficultyToText = {
  easy: 'The recipie of the sauce you come up with should be fairly quick and easy, not very complex.',
  medium: 'The recipe of the sauce you come up with should be a bit challenging and exciting, something that could be found in a restaurant, but not overly complex.',
  hard: 'The recipe of the sauce you come up with should be complex and challenging. Something a fine-dining restaurant would prepare, appropriate for a special occasion.'
}


export const getPrompt = ({
  wantedIngredients = [],
  notWantedIngredients = [],
  lastRecipes = [],
  veryDifferent = false,
  additionalCharacteristics = [],
  difficulty = ''
}: PromptPayload) =>
  `
  - Hello Gemini, I am preparing a dish with following ingredients: ${wantedIngredients.join(", ")}.
  - These ingredients might be eaten raw, or cooked. They might be used whole or chopped. Please consider all options. 
  ${
    notWantedIngredients?.length
      ? `
  - Following ingredients I do not have available for a sauce so please do not use them: ${notWantedIngredients?.join(", ")}.
  - If I have listed an ingredient as available and also as not available, please consider it as not available.
  - When listing the ingredients not available, I may include amounts together with the ingredients. Please disregard the amounts, the ingredients are not available independently of the amounts.
  ${
    lastRecipes?.length
      ? `
  - You have already suggested these recipes:
    *** LAST RECIPE START ***
    ${lastRecipes.map((lastRecipe, idx) => `
      *** PREVIOUS RECIPE #${idx + 1} START ***
      ${lastRecipe}
      *** PREVIOUS RECIPE #${idx + 1} END ***
    `)}
     ${veryDifferent ? "please suggest now something dramatically different, a completely different gastronomy style and origin, go really crazy, but keeping it delicious" : "please suggest now something different"}.
    `
      : ""
  }
  ,`
      : ""
  }
  - Can you please give me a recipie for a sauce which would go well and round up the dish?
  - The sauce can be from any kind of gastronomy from all over the world.
  ${notWantedIngredients?.length ? "- Please do not include in the recipe for the sauce the ingredients which I do not have." : ""}
  - You can use any possible ingredients to make the sauce recipe, not necessarily only from the list of available ingredients which I provided to you.
  - You can however use some of the available ingredients to create the sauce, but please not too much of them, since they are supposed to be the main content of the dish.
  ${additionalCharacteristics.length ? `- The sauce you come up with must also these characteristics: ${additionalCharacteristics.join(', ')}.` : ''}
  ${difficulty ? mapDifficultyToText[difficulty] : ''}
  - Please give me detailed description of the recipe of the sauce, as a numbered list of steps.
  - Please prefix the list of steps with '<STEPS>', so that I can identify them when I parse the response. Use '*' as list marker for each step on the list. Please do not make the list of steps numbered.
  - Please give the sauce a title / name, and prefix it with '<TITLE>'.
  - Additionally, I need the list of all the ingredients necessary for the sauce, including the quantities required. Use '*' as list marker for each ingredient on the list.
  - Please prefix the list of ingredients with '<INGREDIENTS_LIST>', so that I can find it when I parse your response.
  - Remove any initial confirmation messages.
  - Please use closing tags for '<TITLE>', '<INGREDIENTS_LIST>' and '<STEPS>'.
  - Thank you very much :) .
  `;
