const generateFlashcard = async (question) => {
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
          {
            role: "system",
            content: `You are a helpful assistant that generates educational flashcards. 
            
            CRITICAL REQUIREMENTS:
            1. Generate EXACTLY flashcards only
            2. Each answer must be under 20 words
            3. Return ONLY this JSON format: [{"question":"...","answer":"..."}]
            4. NO extra text, explanations, or formatting
            5. If input unclear, return: {"error":"Please provide a clear educational topic"}
            
            Example output: [{"question":"What is photosynthesis?","answer":"Process where plants convert light into energy using chlorophyll"}]`,
          }
        ],
      }),
    });
    const data = await res.json();
      return { answer: data };

  } catch (error) {
    console.log("Error in ai.js:", error);
    throw new Error({
      success: false,
      message: "There was an error in generateFlashcard",
    });
  }

};

module.exports = generateFlashcard;
