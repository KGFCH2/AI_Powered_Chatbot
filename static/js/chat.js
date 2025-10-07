// Chat Interface JavaScript
class ChatManager {
    constructor() {
        this.messageInput = document.getElementById('messageInput');
        this.chatMessages = document.getElementById('chatMessages');
        this.chatForm = document.getElementById('chatForm');
        this.sendBtn = document.getElementById('sendBtn');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.quickActions = document.getElementById('quickActions');
        this.emojiPicker = document.getElementById('emojiPicker');
        this.emojiBtn = document.getElementById('emojiBtn');
        this.charCount = document.getElementById('charCount');
        this.clearChatBtn = document.getElementById('clearChatBtn');
        this.exportChatBtn = document.getElementById('exportChatBtn');
        
        this.sessionId = this.generateSessionId();
        this.isTyping = false;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupAutoResize();
        this.setupEmojiPicker();
        this.setupQuickActions();
        this.loadConversationHistory();
    }
    
    setupEventListeners() {
        // Form submission
        this.chatForm.addEventListener('submit', this.handleSendMessage.bind(this));
        
        // Input events
        this.messageInput.addEventListener('input', this.handleInputChange.bind(this));
        this.messageInput.addEventListener('keydown', this.handleKeyPress.bind(this));
        
        // Button events
        this.emojiBtn.addEventListener('click', this.toggleEmojiPicker.bind(this));
        this.clearChatBtn.addEventListener('click', this.clearChat.bind(this));
        this.exportChatBtn.addEventListener('click', this.exportChat.bind(this));
        
        // Click outside to close emoji picker
        document.addEventListener('click', (e) => {
            if (!this.emojiPicker.contains(e.target) && !this.emojiBtn.contains(e.target)) {
                this.hideEmojiPicker();
            }
        });
    }
    
    setupAutoResize() {
        this.messageInput.addEventListener('input', () => {
            this.messageInput.style.height = 'auto';
            this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 120) + 'px';
        });
    }
    
    setupEmojiPicker() {
        const emojis = this.emojiPicker.querySelectorAll('.emoji');
        emojis.forEach(emoji => {
            emoji.addEventListener('click', () => {
                this.insertEmoji(emoji.dataset.emoji);
                this.hideEmojiPicker();
            });
        });
    }
    
    setupQuickActions() {
        const quickBtns = this.quickActions.querySelectorAll('.quick-btn');
        quickBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const message = btn.dataset.message;
                this.messageInput.value = message;
                this.updateCharCount();
                this.messageInput.focus();
            });
        });
    }
    
    handleInputChange() {
        this.updateCharCount();
        this.updateSendButtonState();
    }
    
    handleKeyPress(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.handleSendMessage(e);
        }
    }
    
    updateCharCount() {
        const count = this.messageInput.value.length;
        this.charCount.textContent = count;
        
        // Change color based on limit
        if (count > 900) {
            this.charCount.style.color = '#f5576c';
        } else if (count > 800) {
            this.charCount.style.color = '#ffa500';
        } else {
            this.charCount.style.color = 'var(--text-secondary)';
        }
    }
    
    updateSendButtonState() {
        const hasText = this.messageInput.value.trim().length > 0;
        this.sendBtn.disabled = !hasText || this.isTyping;
        
        if (hasText && !this.isTyping) {
            this.sendBtn.style.opacity = '1';
            this.sendBtn.style.transform = 'scale(1)';
        } else {
            this.sendBtn.style.opacity = '0.6';
            this.sendBtn.style.transform = 'scale(0.9)';
        }
    }
    
    async handleSendMessage(e) {
        e.preventDefault();
        
        const message = this.messageInput.value.trim();
        if (!message || this.isTyping) return;
        
        // Add user message to chat
        this.addMessage(message, 'user');
        
        // Clear input
        this.messageInput.value = '';
        this.messageInput.style.height = 'auto';
        this.updateCharCount();
        this.updateSendButtonState();
        
        // Hide quick actions
        this.quickActions.style.display = 'none';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    session_id: this.sessionId
                })
            });
            
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }
            
            // Simulate typing delay
            setTimeout(() => {
                this.hideTypingIndicator();
                this.addMessage(data.response, 'bot', data.timestamp);
            }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
            
        } catch (error) {
            this.hideTypingIndicator();
            this.addMessage('Sorry, I encountered an error. Please try again.', 'bot');
            console.error('Chat error:', error);
        }
    }
    
    addMessage(content, sender, timestamp = null) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = sender === 'user' ? 'user-avatar' : 'ai-avatar';
        
        const avatarImg = document.createElement('img');
        avatarImg.className = 'avatar-img';
        avatarImg.alt = `${sender} Avatar`;
        avatarImg.src = sender === 'user' ? '/static/images/user-avatar.svg' : '/static/images/robot-avatar.svg';
        avatar.appendChild(avatarImg);
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = content;
        
        if (sender === 'user') {
            messageElement.appendChild(messageContent);
            messageElement.appendChild(avatar);
        } else {
            messageElement.appendChild(avatar);
            messageElement.appendChild(messageContent);
        }
        
        // Add timestamp if provided
        if (timestamp) {
            const timeElement = document.createElement('div');
            timeElement.className = 'message-time';
            timeElement.textContent = timestamp;
            timeElement.style.cssText = `
                font-size: 0.7rem;
                color: var(--text-secondary);
                margin-top: 5px;
                text-align: ${sender === 'user' ? 'right' : 'left'};
            `;
            messageContent.appendChild(timeElement);
        }
        
        this.chatMessages.appendChild(messageElement);
        this.scrollToBottom();
        
        // Add animation
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            messageElement.style.transition = 'all 0.3s ease';
            messageElement.style.opacity = '1';
            messageElement.style.transform = 'translateY(0)';
        }, 10);
    }
    
    showTypingIndicator() {
        this.isTyping = true;
        this.updateSendButtonState();
        this.typingIndicator.style.display = 'block';
        window.animationManager.fadeIn(this.typingIndicator);
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        this.isTyping = false;
        this.updateSendButtonState();
        window.animationManager.fadeOut(this.typingIndicator);
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    toggleEmojiPicker() {
        if (this.emojiPicker.style.display === 'none' || !this.emojiPicker.style.display) {
            this.showEmojiPicker();
        } else {
            this.hideEmojiPicker();
        }
    }
    
    showEmojiPicker() {
        this.emojiPicker.style.display = 'block';
        window.animationManager.fadeIn(this.emojiPicker);
    }
    
    hideEmojiPicker() {
        window.animationManager.fadeOut(this.emojiPicker);
    }
    
    insertEmoji(emoji) {
        const start = this.messageInput.selectionStart;
        const end = this.messageInput.selectionEnd;
        const text = this.messageInput.value;
        
        this.messageInput.value = text.substring(0, start) + emoji + text.substring(end);
        this.messageInput.selectionStart = this.messageInput.selectionEnd = start + emoji.length;
        this.messageInput.focus();
        this.updateCharCount();
        this.updateSendButtonState();
    }
    
    clearChat() {
        if (confirm('Are you sure you want to clear the chat history?')) {
            // Remove all messages except welcome message
            const messages = this.chatMessages.querySelectorAll('.message:not(.welcome-message)');
            messages.forEach(message => {
                message.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => message.remove(), 300);
            });
            
            // Show quick actions again
            setTimeout(() => {
                this.quickActions.style.display = 'flex';
            }, 300);
        }
    }
    
    exportChat() {
        const messages = this.chatMessages.querySelectorAll('.message:not(.welcome-message)');
        let chatText = 'Chat Export\\n\\n';
        
        messages.forEach(message => {
            const sender = message.classList.contains('user-message') ? 'You' : 'AI Assistant';
            const content = message.querySelector('.message-content').textContent;
            const time = message.querySelector('.message-time')?.textContent || '';
            
            chatText += `${sender}: ${content}${time ? ` (${time})` : ''}\\n\\n`;
        });
        
        // Create and download file
        const blob = new Blob([chatText], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chat-export-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
    
    async loadConversationHistory() {
        try {
            const response = await fetch('/api/conversation_history');
            const history = await response.json();
            
            // Load recent conversations (limit to last 10)
            const recentHistory = history.slice(0, 10).reverse();
            
            recentHistory.forEach(conv => {
                this.addMessage(conv.message, 'user');
                this.addMessage(conv.response, 'bot');
            });
            
            if (recentHistory.length === 0) {
                this.quickActions.style.display = 'flex';
            }
            
        } catch (error) {
            console.error('Error loading conversation history:', error);
        }
    }
    
    generateSessionId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}

// Additional CSS for chat interface
const chatCSS = `
.message {
    animation: messageSlideIn 0.3s ease forwards;
}

@keyframes messageSlideIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
        transform: scale(1);
    }
    to {
        opacity: 0;
        transform: scale(0.95);
    }
}

.chat-input::-webkit-scrollbar {
    width: 4px;
}

.chat-input::-webkit-scrollbar-track {
    background: transparent;
}

.chat-input::-webkit-scrollbar-thumb {
    background: var(--text-secondary);
    border-radius: 2px;
}

.chat-messages::-webkit-scrollbar {
    width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
    background: transparent;
}

.chat-messages::-webkit-scrollbar-thumb {
    background: var(--glass-border);
    border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
    background: var(--text-secondary);
}

.message-time {
    font-size: 0.7rem;
    color: var(--text-secondary);
    margin-top: 5px;
}

.quick-actions {
    animation: slideUp 0.3s ease forwards;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;

// Inject chat CSS
const chatStyle = document.createElement('style');
chatStyle.textContent = chatCSS;
document.head.appendChild(chatStyle);

// Initialize chat manager
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.chat-container')) {
        window.chatManager = new ChatManager();
    }
});