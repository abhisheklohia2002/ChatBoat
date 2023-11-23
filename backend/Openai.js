const OpenAi = require("openai");
const openai = new OpenAi.OpenAI({
    apiKey: process.env.OpenAI, 
  });
async function generateChatbotResponse(userMessage) {
    try {
      const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: userMessage }],
        model: 'gpt-3.5-turbo',
      });
  console.log(chatCompletion.choices[0].message.content)
      return chatCompletion.choices[0].message.content;
    } catch (error) {
      console.error('Error:', error.message);
      return 'Error generating chatbot response';
    }
  }

  module.exports = generateChatbotResponse;