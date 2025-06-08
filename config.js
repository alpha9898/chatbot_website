// WARNING: Never share or commit this file with real API keys
// Add this file to .gitignore if using version control
const config = {
    // Together AI configuration
    CHAT_ENDPOINT: 'https://api.together.xyz/v1/chat/completions',
    CHAT_API_KEY: 'tgp_v1_wGudQ3ca4DQDuUQstQwXK-q9N1bmIXhnnigN-HLMZ64',
    CHAT_MODEL: 'meta-llama/Llama-3.3-70B-Instruct-Turbo',
    // Keep the exercise and nutrition APIs
    EXERCISES_ENDPOINT: 'https://api.api-ninjas.com/v1/exercises',
    NUTRITION_ENDPOINT: 'https://api.api-ninjas.com/v1/nutrition',
    API_KEY: 'TuVtqgFCKxYzkB2EG0NXxw==f3dWOTYUVdxPGNCm'
};

// Make sure config is defined in the global scope
window.config = config; 