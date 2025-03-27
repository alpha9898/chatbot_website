document.addEventListener('DOMContentLoaded', () => {
    // First check if config is loaded properly
    if (typeof config === 'undefined') {
        console.error('Configuration not loaded! Make sure config.js is properly included.');
        alert('Error: Configuration not loaded. Please check the console for details.');
        return;
    }

    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    // Function to add a message to the chat
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = content;
        
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to get chat response
    async function getChatResponse(message) {
        try {
            const response = await fetch(config.CHAT_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${config.CHAT_API_KEY}`
                },
                body: JSON.stringify({
                    model: config.CHAT_MODEL,
                    messages: [
                        {
                            role: "system",
                            content: "You are a concise health and fitness assistant. Follow these rules:\n1. Keep responses short and to the point\n2. Use bullet points for lists\n3. Limit to 2-3 main points\n4. Be direct and clear"
                        },
                        {
                            role: "user",
                            content: message
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 400
                })
            });

            if (!response.ok) {
                throw new Error('Failed to get chat response');
            }

            const data = await response.json();
            return data.choices[0]?.message?.content || "Try asking about exercises or nutrition!";
        } catch (error) {
            console.error('Chat API error:', error);
            return null;
        }
    }

    // Function to get exercise information
    async function getExercises(query) {
        const response = await fetch(`${config.EXERCISES_ENDPOINT}?name=${encodeURIComponent(query)}`, {
            method: 'GET',
            headers: {
                'X-Api-Key': config.API_KEY,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch exercise data');
        }

        return await response.json();
    }

    // Function to get nutrition information
    async function getNutrition(query) {
        const response = await fetch(`${config.NUTRITION_ENDPOINT}?query=${encodeURIComponent(query)}`, {
            method: 'GET',
            headers: {
                'X-Api-Key': config.API_KEY,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch nutrition data');
        }

        return await response.json();
    }

    // Function to format exercise response
    function formatExerciseResponse(exercises) {
        if (!exercises || exercises.length === 0) {
            return "No exercises found. Try being more specific!";
        }

        let response = "Found these exercises:\n";
        exercises.slice(0, 2).forEach((exercise, index) => {
            response += `${index + 1}. ${exercise.name}\n`;
            response += `   • ${exercise.muscle} | ${exercise.difficulty}\n`;
            response += `   • ${exercise.instructions.slice(0, 100)}...\n\n`;
        });
        return response;
    }

    // Function to format nutrition response
    function formatNutritionResponse(nutrition) {
        if (!nutrition || nutrition.length === 0) {
            return "No nutrition info found. Try being more specific!";
        }

        let response = "Nutrition info:\n";
        nutrition.slice(0, 2).forEach((item, index) => {
            response += `${index + 1}. ${item.name}\n`;
            response += `   • ${item.calories} kcal | P: ${item.protein_g}g | C: ${item.carbohydrates_total_g}g | F: ${item.fat_total_g}g\n\n`;
        });
        return response;
    }

    // Function to handle sending messages
    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        // Add user message to chat
        addMessage(message, true);
        userInput.value = '';

        let loadingMessage;
        try {
            // Show loading state
            loadingMessage = document.createElement('div');
            loadingMessage.className = 'message bot';
            loadingMessage.innerHTML = '<div class="message-content">Thinking...</div>';
            chatMessages.appendChild(loadingMessage);

            let response = '';
            const messageLower = message.toLowerCase();

            // First try to get exercise or nutrition info
            if (messageLower.includes('exercise') || messageLower.includes('workout') || messageLower.includes('training')) {
                const exercises = await getExercises(message);
                response = formatExerciseResponse(exercises);
            } else if (messageLower.includes('food') || messageLower.includes('nutrition') || messageLower.includes('diet') || messageLower.includes('eat')) {
                const nutrition = await getNutrition(message);
                response = formatNutritionResponse(nutrition);
            } else {
                // If not about exercise or nutrition, use chat API
                const chatResponse = await getChatResponse(message);
                if (chatResponse) {
                    response = chatResponse;
                } else {
                    response = "I can help you with exercise and nutrition information. Try asking about:\n" +
                              "- Specific exercises or workouts\n" +
                              "- Nutrition information for foods\n" +
                              "- Diet and meal suggestions\n\n" +
                              "For example, try 'Show me some chest exercises' or 'What's the nutrition in chicken breast?'";
                }
            }

            // Remove loading message
            if (loadingMessage && loadingMessage.parentNode) {
                chatMessages.removeChild(loadingMessage);
            }

            addMessage(response);

        } catch (error) {
            console.error('Error details:', error);
            
            // Remove loading message if it exists
            if (loadingMessage && loadingMessage.parentNode) {
                chatMessages.removeChild(loadingMessage);
            }

            addMessage("I apologize, but I encountered an error. Please try asking in a different way or try again later.");
        }
    }

    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Initial welcome message
    addMessage("Hi! I can help with:\n" +
              "• Exercise info\n" +
              "• Nutrition facts\n" +
              "• Fitness tips\n\n" +
              "Try asking about exercises or food!");

    // Log when the script is loaded
    console.log('Chat script loaded successfully');
}); 