// Chat UI Interactive Functionality
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const chatMessages = document.getElementById('chatMessages');
const typingIndicator = document.getElementById('typingIndicator');
const attachBtn = document.getElementById('attachBtn');
const emojiBtn = document.getElementById('emojiBtn');
const minimizeBtn = document.getElementById('minimizeBtn');
const closeBtn = document.getElementById('closeBtn');

// Sample bot responses (Instagram-style casual)
const botResponses = [
    "That's cool! 😊",
    "Nice! Tell me more about that",
    "I feel you! 💯",
    "That's interesting 🤔",
    "Got it! What's next?",
    "Love that! ❤️",
    "Sounds good to me!",
    "I'm here for it! 🔥",
    "That makes sense",
    "Thanks for sharing! ✨"
];

// Get current time in HH:MM AM/PM format
function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
}

// Add message to chat
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const avatarSvg = isUser 
        ? `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor"/>
            <path d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" fill="currentColor"/>
          </svg>`
        : `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor"/>
            <path d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" fill="currentColor"/>
          </svg>`;
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            ${avatarSvg}
        </div>
        <div class="message-content">
            <div class="message-bubble">
                <p>${text}</p>
                <span class="message-time">${getCurrentTime()}</span>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Show typing indicator
function showTypingIndicator() {
    typingIndicator.classList.add('active');
    scrollToBottom();
}

// Hide typing indicator
function hideTypingIndicator() {
    typingIndicator.classList.remove('active');
}

// Get random bot response
function getBotResponse(userMessage) {
    // Simple keyword matching for more contextual responses (Instagram-style)
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return "Hey! 👋 What's up?";
    } else if (lowerMessage.includes('help')) {
        return "Sure thing! How can I help? 💪";
    } else if (lowerMessage.includes('thank')) {
        return "No problem! 😊 Anytime!";
    } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
        return "Catch you later! 👋";
    } else if (lowerMessage.includes('how are you')) {
        return "I'm good! How about you? 😊";
    } else if (lowerMessage.includes('name')) {
        return "I'm your chat buddy! What's your name?";
    } else if (lowerMessage.includes('love') || lowerMessage.includes('❤️')) {
        return "Aww, thanks! ❤️✨";
    } else if (lowerMessage.includes('lol') || lowerMessage.includes('haha')) {
        return "Haha! 😂";
    } else {
        // Random response from the array
        return botResponses[Math.floor(Math.random() * botResponses.length)];
    }
}

// Send message
function sendMessage() {
    const message = messageInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage(message, true);
    
    // Clear input
    messageInput.value = '';
    updateSendButton();
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate bot thinking time (very short for immediate response)
    setTimeout(() => {
        hideTypingIndicator();
        const botResponse = getBotResponse(message);
        addMessage(botResponse, false);
    }, 500); // 500ms delay for natural feel
}

// Update send button state
function updateSendButton() {
    const hasText = messageInput.value.trim().length > 0;
    sendBtn.disabled = !hasText;
    sendBtn.style.opacity = hasText ? '1' : '0.5';
}

// Scroll to bottom of chat
function scrollToBottom() {
    setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 100);
}

// Event Listeners
sendBtn.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

messageInput.addEventListener('input', updateSendButton);

// Attach button (placeholder)
attachBtn.addEventListener('click', () => {
    alert('File attachment feature coming soon!');
});

// Emoji button (placeholder)
emojiBtn.addEventListener('click', () => {
    const emojis = ['😊', '😄', '👍', '❤️', '🎉', '🔥', '✨', '💯'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    messageInput.value += randomEmoji;
    messageInput.focus();
    updateSendButton();
});

// Minimize button
minimizeBtn.addEventListener('click', () => {
    alert('Minimize feature - would minimize the chat window');
});

// Close button
closeBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to close the chat?')) {
        alert('Chat closed!');
    }
});

// Initialize
updateSendButton();
scrollToBottom();

