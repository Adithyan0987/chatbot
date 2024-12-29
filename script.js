// DOM Elements
const messagesDiv = document.getElementById('messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const startChatBtn = document.getElementById('start-chat');
const chatbotContainer = document.getElementById('chatbot-container');

// Function to display messages in the chat window
function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.className = sender === 'user' ? 'user-message' : 'bot-message';
    messageElement.textContent = message;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Function to send user message to Rasa server
async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    // Display user's message
    addMessage('user', userMessage);
    userInput.value = '';

    try {
        // Send message to Rasa server
        const response = await fetch('http://localhost:5005/webhooks/rest/webhook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage }),
        });

        const botMessages = await response.json();

        // Display bot's responses
        botMessages.forEach((message) => {
            if (message.text) addMessage('bot', message.text);
        });
    } catch (error) {
        console.error('Error connecting to Rasa server:', error);
        addMessage('bot', 'Sorry, I am having trouble connecting to the server.');
    }
}

// Event Listeners
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
startChatBtn.addEventListener('click', () => {
    chatbotContainer.style.display = 'block';
    startChatBtn.style.display = 'none';
});
