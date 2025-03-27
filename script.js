document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const chatContainer = document.querySelector('.chat-container');
    
    let isSidebarVisible = false;
    
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        isSidebarVisible = !isSidebarVisible;
        sidebar.style.display = isSidebarVisible ? 'block' : 'none';
        mobileMenuBtn.innerHTML = isSidebarVisible ? 
            '<i class="fas fa-times"></i>' : 
            '<i class="fas fa-bars"></i>';
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            isSidebarVisible && 
            !e.target.closest('.sidebar') && 
            !e.target.closest('.mobile-menu-btn')) {
            isSidebarVisible = false;
            sidebar.style.display = 'none';
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            sidebar.style.display = 'block';
            isSidebarVisible = true;
        } else {
            sidebar.style.display = isSidebarVisible ? 'block' : 'none';
        }
    });

    // Dark mode functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Set initial dark mode state
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });

    // Add Clear All button event listener
    const clearAllBtn = document.getElementById('clearAllBtn');
    clearAllBtn.addEventListener('click', clearAllChats);

    // First check if config is loaded properly
    if (typeof config === 'undefined') {
        console.error('Configuration not loaded! Make sure config.js is properly included.');
        alert('Error: Configuration not loaded. Please check the console for details.');
        return;
    }

    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    // Chat history management
    let chats = JSON.parse(localStorage.getItem('chats')) || [];
    let currentChatId = null;

    // Update chat counter
    function updateChatCounter() {
        const counter = document.querySelector('.chat-counter');
        counter.textContent = `${chats.length} chat${chats.length !== 1 ? 's' : ''}`;
    }

    // Initialize chat history
    function initializeChatHistory() {
        const chatList = document.getElementById('chatList');
        chatList.innerHTML = '';
        
        chats.forEach(chat => {
            const chatItem = createChatItem(chat);
            chatList.appendChild(chatItem);
        });

        updateChatCounter();
    }

    // Create a new chat item
    function createChatItem(chat) {
        const div = document.createElement('div');
        div.className = `chat-item ${chat.id === currentChatId ? 'active' : ''}`;
        
        const title = document.createElement('span');
        title.textContent = chat.title || 'New Chat';
        
        const deleteBtn = document.createElement('span');
        deleteBtn.className = 'delete-chat';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        
        div.appendChild(title);
        div.appendChild(deleteBtn);
        
        div.addEventListener('click', (e) => {
            if (!e.target.closest('.delete-chat')) {
                loadChat(chat.id);
            }
        });
        
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteChat(chat.id);
        });
        
        return div;
    }

    // Create a new chat
    function createNewChat() {
        const chat = {
            id: Date.now(),
            title: 'New Chat',
            messages: []
        };
        
        chats.push(chat);
        currentChatId = chat.id;
        localStorage.setItem('chats', JSON.stringify(chats));
        
        const chatList = document.getElementById('chatList');
        chatList.appendChild(createChatItem(chat));
        
        // Clear messages and add welcome message
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML = '';
        addMessage("Hi! I can help with:\n" +
                  "• Exercise info\n" +
                  "• Nutrition facts\n" +
                  "• Fitness tips\n\n" +
                  "Try asking about exercises or food!", false);

        updateChatCounter();
    }

    // Load a specific chat
    function loadChat(chatId) {
        // Don't reload if clicking the same chat
        if (currentChatId === chatId) {
            return;
        }
        
        currentChatId = chatId;
        const chat = chats.find(c => c.id === chatId);
        
        if (chat) {
            const chatMessages = document.getElementById('chatMessages');
            chatMessages.innerHTML = '';
            chat.messages.forEach(msg => {
                addMessage(msg.text, msg.type === 'user');
            });
            
            // Update active state in chat list
            document.querySelectorAll('.chat-item').forEach(item => {
                item.classList.remove('active');
                if (item.dataset.chatId === chatId.toString()) {
                    item.classList.add('active');
                }
            });
        }
    }

    // Delete a chat
    function deleteChat(chatId) {
        if (confirm('Are you sure you want to delete this chat?')) {
            chats = chats.filter(chat => chat.id !== chatId);
            localStorage.setItem('chats', JSON.stringify(chats));
            
            // Clear the chat list
            const chatList = document.getElementById('chatList');
            chatList.innerHTML = '';
            
            if (chats.length === 0) {
                // If no chats left, create a new one
                createNewChat();
            } else {
                // If there are other chats, load the most recent one
                currentChatId = chats[chats.length - 1].id;
                loadChat(currentChatId);
                // Rebuild the chat list
                chats.forEach(chat => {
                    chatList.appendChild(createChatItem(chat));
                });
            }

            updateChatCounter();
        }
    }

    // Clear all chats
    function clearAllChats() {
        if (confirm('Are you sure you want to delete all chats? This cannot be undone.')) {
            // Clear chats array and localStorage
            chats = [];
            localStorage.setItem('chats', JSON.stringify(chats));
            
            // Clear the chat list UI
            const chatList = document.getElementById('chatList');
            chatList.innerHTML = '';
            
            // Clear current messages
            const chatMessages = document.getElementById('chatMessages');
            chatMessages.innerHTML = '';
            
            // Create a new chat
            createNewChat();
            
            // Update the counter
            updateChatCounter();
        }
    }

    // Update chat title
    function updateChatTitle(message) {
        if (!currentChatId) return;
        
        const chat = chats.find(c => c.id === currentChatId);
        if (chat && chat.title === 'New Chat') {
            chat.title = message.slice(0, 30) + (message.length > 30 ? '...' : '');
            localStorage.setItem('chats', JSON.stringify(chats));
            initializeChatHistory();
        }
    }

    // Save message to current chat
    function saveMessage(message, type) {
        if (!currentChatId) return;
        
        const chat = chats.find(c => c.id === currentChatId);
        if (chat) {
            chat.messages.push({ text: message, type });
            localStorage.setItem('chats', JSON.stringify(chats));
        }
    }

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
        
        if (isUser) {
            updateChatTitle(content);
        }
        saveMessage(content, isUser ? 'user' : 'bot');
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

    // Initialize chat history
    initializeChatHistory();
    
    // Create new chat if no chats exist
    if (chats.length === 0) {
        createNewChat();
    } else {
        // Load the most recent chat
        loadChat(chats[chats.length - 1].id);
    }
    
    // New chat button
    document.getElementById('newChatBtn').addEventListener('click', createNewChat);

    // Log when the script is loaded
    console.log('Chat script loaded successfully');
}); 