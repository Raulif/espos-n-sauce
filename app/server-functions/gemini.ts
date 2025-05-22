import { createServerFn } from "@tanstack/react-start";
import { GoogleGenAI } from "@google/genai";
import { getPrompt } from "../helpers/prompt";
import type { PromptPayload } from "../types/types";

const GEMINI_MODEL = "gemini-2.0-flash";
const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getRecipeText = createServerFn({
  method: "GET",
})
  .validator((data: PromptPayload) => data)
  .handler(async (ctx) => {
    try {
      const prompt = getPrompt(ctx?.data);

      const aiResponse = await gemini.models.generateContent({
        model: GEMINI_MODEL,
        contents: [{ text: prompt }],
      });
      const text = aiResponse?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error("No text found in the AI response");
      }
      return text;
    } catch (e) {
      console.error("Error on getRecipeText: ", e);
    }
  });
