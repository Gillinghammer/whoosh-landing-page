document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();

    // Badge visibility control
    handleBadgeVisibility();
});

function initApp() {
    // DOM elements
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    // Health data elements
    const stepsCount = document.getElementById('steps-count');
    const waterCount = document.getElementById('water-count');
    const sleepHours = document.getElementById('sleep-hours');

    // Add event listener for send button
    sendButton.addEventListener('click', function() {
        sendMessage();
    });

    // Add event listener for Enter key
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Show welcome message
    setTimeout(() => {
        addMessage("Hello! I'm Whoosh, your AI health coach. How can I help you today?", 'ai');
    }, 500);

    // Set mock health data
    setMockHealthData();

    // Function to send user message
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        // Add user message to chat
        addMessage(message, 'user');
        userInput.value = '';

        // Simulate AI response (in real app, this would call an API)
        simulateAIResponse(message);
    }

    // Function to add message to chat
    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to simulate AI response
    function simulateAIResponse(userMessage) {
        // Show typing indicator
        const typingElement = document.createElement('div');
        typingElement.classList.add('message', 'ai-message', 'typing');
        typingElement.textContent = '...';
        chatMessages.appendChild(typingElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Simulate response delay
        setTimeout(() => {
            // Remove typing indicator
            chatMessages.removeChild(typingElement);

            // Generate response based on user message
            let response;
            const userMessageLower = userMessage.toLowerCase();
            
            if (userMessageLower.includes('hello') || userMessageLower.includes('hi')) {
                response = "Hello! How can I help with your health and fitness goals today?";
            } else if (userMessageLower.includes('workout') || userMessageLower.includes('exercise')) {
                response = "Exercise is important! I recommend 150 minutes of moderate activity per week. Would you like some workout suggestions based on your goals?";
            } else if (userMessageLower.includes('diet') || userMessageLower.includes('nutrition') || userMessageLower.includes('food')) {
                response = "Nutrition is key to health. Focus on whole foods, plenty of vegetables, lean proteins, and stay hydrated. Would you like some meal ideas?";
            } else if (userMessageLower.includes('water') || userMessageLower.includes('hydration')) {
                response = "Staying hydrated is essential! Try to drink about 8 glasses (64 oz) of water daily. I've updated your water tracker.";
                // Update water count
                waterCount.textContent = parseInt(waterCount.textContent) + 8;
            } else if (userMessageLower.includes('sleep')) {
                response = "Quality sleep is crucial for recovery and overall health. Adults should aim for 7-9 hours per night. How has your sleep been lately?";
            } else if (userMessageLower.includes('steps') || userMessageLower.includes('walk')) {
                response = "Walking is excellent exercise! A goal of 10,000 steps daily is good, but any increase in activity helps. I've added some steps to your counter.";
                // Update steps count
                stepsCount.textContent = parseInt(stepsCount.textContent) + 1500;
            } else {
                response = "That's an interesting point. As your health coach, I'm here to help with exercise routines, nutrition advice, sleep improvements, and building healthy habits. What specific area would you like guidance on?";
            }

            // Add AI response to chat
            addMessage(response, 'ai');
        }, 1500);
    }

    // Function to set mock health data
    function setMockHealthData() {
        stepsCount.textContent = '6,542';
        waterCount.textContent = '32';
        sleepHours.textContent = '7.5';
    }
}

function handleBadgeVisibility() {
    // Check if page is in an iframe
    const inIframe = window !== window.parent;
    if (inIframe) {
        document.body.classList.add('in-iframe');
    }
    
    // Check if rendered by puppeteer (for screenshots)
    const isPuppeteer = /HeadlessChrome/.test(navigator.userAgent);
    if (isPuppeteer) {
        document.body.classList.add('puppeteer');
    }
    
    // Close button for badge
    const closeButton = document.querySelector('.lovable-badge .close-button');
    if (closeButton) {
        closeButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const badge = document.querySelector('.lovable-badge');
            if (badge) {
                badge.style.display = 'none';
            }
        });
    }
}