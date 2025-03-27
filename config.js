// WARNING: Never share or commit this file with real API keys
// Add this file to .gitignore if using version control
const config = {
    // Together AI configuration
    CHAT_ENDPOINT: 'https://api.together.xyz/v1/chat/completions',
    CHAT_API_KEY: '3fd986acec811a82a26775dbf0ac23ed4df3d45402dbd2f8e075eef5cb75ee16',
    CHAT_MODEL: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
    // Keep the exercise and nutrition APIs
    EXERCISES_ENDPOINT: 'https://api.api-ninjas.com/v1/exercises',
    NUTRITION_ENDPOINT: 'https://api.api-ninjas.com/v1/nutrition',
    API_KEY: 'TuVtqgFCKxYzkB2EG0NXxw==f3dWOTYUVdxPGNCm'
};

// Make sure config is defined in the global scope
window.config = config; 