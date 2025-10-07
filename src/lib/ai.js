const generateFlashcard = async (question, deckName) => {
  const api_key = process.env.OPENROUTER_API_KEY;
  if (!api_key) {
    throw new Error("OPEN ROUTER API key not found");
  }

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${api_key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          // {
          //   role: "system",
          //   content: `You are an assistant that generates educational flashcards.

          //       CRITICAL RULES:
          //       1. Output must be JSON only, no extra text.
          //       2. JSON format: [{"question":"...","answer":"..."}]
          //       3. Each answer must be concise (max 20 words).
          //       4. Generate only flashcards; do not include explanations or formatting.
          //       5. If input is unclear, output: {"error":"Please provide a clear educational topic"}.

          //       Example output:
          //       [{"question":"What is photosynthesis?","answer":"Process where plants convert light into energy using chlorophyll"}]`,
          // },
          {
            role: "user",
            content: `Process the natural language of the question to understandable ai Prompt, Now understand the question through that ai prompt. Answer the question within 20 words(no more then 20 words). Simple, concise, to the point. Answer must not contain " <s> ". - Here is the question: ${question}.`,
          },
        ],
      }),
    });
    const data = await res.json();
    return { success: true, response: data.choices[0].message.content };
  } catch (error) {
    console.log("Error in ai.js:", error);
    throw new Error({
      success: false,
      message: "There was an error in generateFlashcard",
    });
  }
};

module.exports = generateFlashcard;
