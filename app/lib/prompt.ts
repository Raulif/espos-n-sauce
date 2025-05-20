export const getPrompt = (
  wantedIngredients: string[],
  notWantedIngredients: string[],
  lastRecipe: string
) =>
  `
  - Hello Gemini, I am preparing a dish with following ingredients: ${wantedIngredients.join(", ")}. 
  ${
    notWantedIngredients?.length
      ? `
  - Following ingredients I do not have available for a sauce: ${notWantedIngredients?.join(", ")}.
  - If I have listed an ingredient as available and also as not available, please consider it as not available.
  - When listing the ingredients not available, I may include amounts together with the ingredients. Please disregard the amounts, the ingredients are not available independently of the amounts.
  ${
    lastRecipe?.length
      ? `
  - You have just suggested this recipe, please suggest now something different:
    *** LAST RECIPE START ***
    ${lastRecipe}
    *** LAST RECIPE END ***
    `
      : ""
  }
  `
      : ""
  }
  - Can you please give me a recipie for a sauce which would go well and round up the dish?
  - The sauce can be from any kind of gastronomy from all over the world.
  ${notWantedIngredients?.length ? "- Please do not include in the recipe for the sauce the ingredients which I do not have." : ""}
  - You can use any possible ingredients to make the sauce recipe, not necessarily only from the list of available ingredients which I provided to you.
  - You can however use some of the available ingredients to create the sauce, but please not too much of them, since they are supposed to be the main content of the dish.
  - Please give me detailed description of the recipe of the sauce, as a numbered list of steps.
  - Please prefix the list of steps with '<STEPS>', so that I can identify them when I parse the response. Use '*' as list marker for each step on the list.
  - Please give the sauce a title / name, and prefix it with '<TITLE>'.
  - Additionally, I need the list of all the ingredients necessary for the sauce, including the quantities required. Use '*' as list marker for each ingredient on the list.
  - Please prefix the list of ingredients with '<INGREDIENTS_LIST>', so that I can find it when I parse your response.
  - Remove any initial confirmation messages.
  - PPease use closing tags for '<TITLE>', '<INGREDIENTS_LIST>' and '<STEPS>'.
  - Thank you very much :) .
  `;
