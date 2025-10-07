import nltk
import json
import random
import pickle
import numpy as np
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os

class ChatbotEngine:
    def __init__(self):
        self.lemmatizer = WordNetLemmatizer()
        self.vectorizer = TfidfVectorizer(lowercase=True, stop_words='english')
        self.load_dataset()
        self.download_nltk_data()
        
    def download_nltk_data(self):
        """Download required NLTK data"""
        try:
            nltk.data.find('tokenizers/punkt')
        except LookupError:
            nltk.download('punkt')
            
        try:
            nltk.data.find('corpora/wordnet')
        except LookupError:
            nltk.download('wordnet')
            
        try:
            nltk.data.find('corpora/stopwords')
        except LookupError:
            nltk.download('stopwords')

    def load_dataset(self):
        """Load comprehensive dataset for chatbot responses"""
        self.knowledge_base = {
            "greetings": {
                "patterns": ["hello", "hi", "hey", "good morning", "good evening", "howdy", "greetings"],
                "responses": [
                    "Hello! How can I assist you today?",
                    "Hi there! I'm here to help you with any questions you have.",
                    "Greetings! What would you like to know?",
                    "Hey! I'm your AI assistant. How can I help?",
                    "Hello! Welcome to our AI chatbot. What can I do for you?"
                ]
            },
            "how_are_you": {
                "patterns": ["how are you", "how do you feel", "what's up", "how's it going"],
                "responses": [
                    "I'm doing great! Thanks for asking. How are you?",
                    "I'm fantastic and ready to help you!",
                    "I'm doing well! How can I assist you today?",
                    "Great! I'm here and ready to chat. What's on your mind?"
                ]
            },
            "goodbye": {
                "patterns": ["bye", "goodbye", "see you later", "farewell", "take care", "until next time"],
                "responses": [
                    "Goodbye! Have a wonderful day!",
                    "See you later! Feel free to come back anytime.",
                    "Take care! I'm here whenever you need help.",
                    "Farewell! It was great chatting with you.",
                    "Bye! Have a great time ahead!"
                ]
            },
            "name": {
                "patterns": ["what is your name", "who are you", "tell me about yourself"],
                "responses": [
                    "I'm an AI-powered chatbot designed to help answer your questions!",
                    "You can call me ChatBot! I'm here to assist you with information and support.",
                    "I'm an intelligent assistant created to help users like you!",
                    "I'm your friendly AI chatbot, ready to help with whatever you need!"
                ]
            },
            "weather": {
                "patterns": ["weather", "temperature", "forecast", "rain", "sunny", "cloudy"],
                "responses": [
                    "I don't have access to real-time weather data, but I recommend checking a weather app or website for current conditions.",
                    "For accurate weather information, please check your local weather service or weather app.",
                    "I'd suggest looking at a reliable weather source for up-to-date forecasts in your area."
                ]
            },
            "time": {
                "patterns": ["what time", "current time", "time now"],
                "responses": [
                    "I don't have access to real-time data, but you can check the time on your device.",
                    "Please check your system clock or device for the current time.",
                    "I recommend checking your device's clock for the current time."
                ]
            },
            "technology": {
                "patterns": ["artificial intelligence", "ai", "machine learning", "technology", "computer", "programming"],
                "responses": [
                    "Technology is fascinating! AI and machine learning are revolutionizing how we interact with computers.",
                    "Artificial Intelligence is a rapidly growing field that aims to create intelligent machines.",
                    "I'm a product of AI technology myself! It's amazing how far we've come.",
                    "Technology continues to evolve and improve our daily lives in countless ways."
                ]
            },
            "help": {
                "patterns": ["help", "support", "assist", "what can you do"],
                "responses": [
                    "I can help answer questions, provide information, and have conversations with you!",
                    "I'm here to assist you with various topics. Feel free to ask me anything!",
                    "I can provide information, answer questions, and chat about different topics.",
                    "Ask me anything! I'm designed to help with information and support."
                ]
            },
            "math": {
                "patterns": ["math", "mathematics", "calculate", "numbers", "equation"],
                "responses": [
                    "I can help with basic math concepts! What mathematical topic are you interested in?",
                    "Mathematics is a fascinating subject. What specific area would you like to explore?",
                    "I'd be happy to discuss math topics with you. What would you like to know?"
                ]
            },
            "science": {
                "patterns": ["science", "physics", "chemistry", "biology", "research"],
                "responses": [
                    "Science is amazing! There's so much to discover about our world.",
                    "Scientific research helps us understand the universe around us.",
                    "I find science fascinating! What scientific topic interests you?",
                    "Science continues to push the boundaries of human knowledge."
                ]
            },
            "learning": {
                "patterns": ["learn", "study", "education", "school", "knowledge"],
                "responses": [
                    "Learning is a lifelong journey! What would you like to learn about?",
                    "Education opens doors to endless possibilities. What interests you?",
                    "I love helping people learn new things! What topic would you like to explore?",
                    "Knowledge is power! What subject are you curious about?"
                ]
            },
            "compliments": {
                "patterns": ["thank you", "thanks", "great job", "awesome", "amazing", "wonderful"],
                "responses": [
                    "You're very welcome! I'm glad I could help.",
                    "Thank you for the kind words! It makes me happy to assist you.",
                    "I appreciate that! I'm here whenever you need help.",
                    "Thanks! It's my pleasure to help you."
                ]
            },
            "default": {
                "responses": [
                    "That's interesting! Could you tell me more about what you're looking for?",
                    "I'd love to help you with that. Can you provide more details?",
                    "That's a great question! Let me think about that for you.",
                    "I'm here to help! Could you rephrase that or give me more context?",
                    "Interesting topic! What specific aspect would you like to know about?"
                ]
            }
        }
        
        # Build patterns and responses for matching
        self.patterns = []
        self.responses_map = {}
        
        for intent, data in self.knowledge_base.items():
            if 'patterns' in data:
                for pattern in data['patterns']:
                    self.patterns.append(pattern.lower())
                    self.responses_map[pattern.lower()] = data['responses']
        
        # Fit vectorizer with patterns
        if self.patterns:
            self.vectorizer.fit(self.patterns)

    def preprocess_text(self, text):
        """Preprocess user input"""
        # Convert to lowercase and tokenize
        tokens = word_tokenize(text.lower())
        # Lemmatize words
        lemmatized = [self.lemmatizer.lemmatize(token) for token in tokens if token.isalpha()]
        return ' '.join(lemmatized)

    def find_best_match(self, user_input):
        """Find the best matching pattern using cosine similarity"""
        processed_input = self.preprocess_text(user_input)
        
        if not processed_input:
            return None
            
        # Transform user input
        user_vector = self.vectorizer.transform([processed_input])
        
        # Transform all patterns
        pattern_vectors = self.vectorizer.transform(self.patterns)
        
        # Calculate similarities
        similarities = cosine_similarity(user_vector, pattern_vectors)[0]
        
        # Find best match
        best_match_idx = np.argmax(similarities)
        best_similarity = similarities[best_match_idx]
        
        # Threshold for accepting a match
        if best_similarity > 0.1:  # Adjust threshold as needed
            best_pattern = self.patterns[best_match_idx]
            return best_pattern
        
        return None

    def get_response(self, user_input, username="User"):
        """Generate response based on user input"""
        # Find best matching pattern
        best_match = self.find_best_match(user_input)
        
        if best_match and best_match in self.responses_map:
            response = random.choice(self.responses_map[best_match])
        else:
            # Check for specific keywords
            user_lower = user_input.lower()
            
            # Personal responses
            if any(word in user_lower for word in ['my name', 'i am', "i'm"]):
                return f"Nice to meet you! How can I help you today?"
            
            # Question responses
            elif user_lower.startswith(('what', 'how', 'why', 'when', 'where', 'who')):
                response = random.choice([
                    "That's a great question! While I may not have the specific information you're looking for, I'm here to help in any way I can.",
                    "I understand you're curious about that topic. Could you provide more context so I can better assist you?",
                    "Interesting question! I'd love to help you explore that further."
                ])
            else:
                response = random.choice(self.knowledge_base['default']['responses'])
        
        # Personalize response if username is provided
        if username and username != "User":
            if "!" in response:
                response = response.replace("!", f", {username}!")
            elif "." in response:
                response = response.replace(".", f", {username}.")
        
        return response

    def add_to_knowledge_base(self, intent, patterns, responses):
        """Add new patterns and responses to knowledge base"""
        self.knowledge_base[intent] = {
            'patterns': patterns,
            'responses': responses
        }
        
        # Update patterns and responses map
        for pattern in patterns:
            self.patterns.append(pattern.lower())
            self.responses_map[pattern.lower()] = responses
        
        # Refit vectorizer
        self.vectorizer.fit(self.patterns)

    def save_knowledge_base(self, filename='knowledge_base.json'):
        """Save knowledge base to file"""
        filepath = os.path.join('data', filename)
        with open(filepath, 'w') as f:
            json.dump(self.knowledge_base, f, indent=2)

    def load_knowledge_base_from_file(self, filename='knowledge_base.json'):
        """Load knowledge base from file"""
        filepath = os.path.join('data', filename)
        if os.path.exists(filepath):
            with open(filepath, 'r') as f:
                self.knowledge_base = json.load(f)
            self.load_dataset()  # Rebuild patterns and responses