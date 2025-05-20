const titleStartTag = "<TITLE>";
const titleEndTag = "</TITLE>";
const ingredientsStartTag = "<INGREDIENTS_LIST>";
const ingredientsEndTag = "</INGREDIENTS_LIST>";
const stepsStartTag = "<STEPS>";
const stepsEndTag = "</STEPS>";

const parseList = (text: string) =>
  text
    .split("*")
    .map((e) => e.trim())
    .filter((e) => !!e.length);

    interface RecipeObj {
      title: string
      ingredients: string[]
      steps: string[]
      rawText: string
    }

export const parseRecipeText = (text:string): RecipeObj => {
  if (!text.length) {
    return {
      title: "",
      ingredients: [],
      steps: [],
      rawText: ''
    };
  }
  let title, ingredients, steps;

  if (text.includes(titleStartTag) && text.includes(titleEndTag)) {
    const titleStart = text.indexOf(titleStartTag) + titleStartTag.length;
    const titleEnd = text.indexOf(titleEndTag);
    title = text.slice(titleStart, titleEnd);
  }

  if (text.includes(ingredientsStartTag) && text.includes(ingredientsEndTag)) {
    const ingredientsStart =
      text.indexOf(ingredientsStartTag) + ingredientsStartTag.length;
    const ingredientsEnd = text.indexOf(ingredientsEndTag);
    const ingredientsText = text.slice(ingredientsStart, ingredientsEnd);
    console.log(ingredientsText);
    ingredients = parseList(ingredientsText);
  }

  if (text.includes(stepsStartTag) && text.includes(stepsEndTag)) {
    const stepsStart = text.indexOf(stepsStartTag) + stepsStartTag.length;
    const stepsEnd = text.indexOf(stepsEndTag);
    const stepsText = text.slice(stepsStart, stepsEnd);
    steps = parseList(stepsText);
  }

  return {
    title: title || "",
    ingredients: ingredients || [],
    steps: steps || [],
    rawText: text
  };
};
