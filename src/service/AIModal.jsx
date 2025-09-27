// Install deps:
// npm install @google/genai



async function generate() {
  // ✅ Initialize Gemini
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY, // or import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY in React
  });

  // ✅ Use Gemini 2.x family (newer & faster)
  const model = "gemini-2.5-flash-lite";

  // ✅ Generation config (like 2nd code)
  const config = {
    generationConfig: {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "application/json", // force JSON output
    },
  };

  // ✅ History (same as 2nd code)
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Location : Las Vegas, for 3 Days for Couple with a Cheap budget ,Give me a Hotels options list with Hotel Name, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with place Name, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format",
        },
      ],
    },
  ];

  // ✅ Stream response
  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let output = "";
  for await (const chunk of response) {
    if (chunk.text) {
      output += chunk.text;
      process.stdout.write(chunk.text); // stream printing
    }
  }

  // ✅ Parse JSON safely
  try {
    const jsonData = JSON.parse(output);
    console.log("\n\n✅ Final JSON:", jsonData);
  } catch (err) {
    console.error("\n❌ Failed to parse JSON:", err.message);
  }
}

