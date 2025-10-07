# AI-Powered Chatbot

A sophisticated AI-powered chatbot web application built with Flask, featuring a beautiful glassmorphism UI, user authentication, and intelligent conversational capabilities.

## Features

- 🤖 **Intelligent AI Chatbot** - Advanced NLP powered responses using NLTK and machine learning
- 🔐 **User Authentication** - Secure login/register system with session management
- 🎨 **Glassmorphism Design** - Modern, elegant UI with glass-like effects and animations
- 🌙 **Dark/Light Mode** - Animated theme toggle with smooth transitions
- 📱 **Responsive Design** - Optimized for all devices and screen sizes
- 💬 **Real-time Chat** - Live messaging with typing indicators and animations
- 🎭 **Card Flip Effects** - Interactive feature cards with smooth animations
- 📊 **Conversation History** - Track and export chat conversations
- 🎨 **Gradient Text Effects** - Beautiful gradient typography
- ⚡ **Fast & Smooth** - Optimized performance with modern web technologies

## Technologies Used

- **Backend**: Python, Flask, SQLAlchemy
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **AI/NLP**: NLTK, scikit-learn, NumPy
- **Database**: SQLite
- **Styling**: Glassmorphism, CSS Grid, Flexbox
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Poppins)

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd AI_Powered_Chatbot
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   venv\\Scripts\\activate  # On Windows
   # source venv/bin/activate  # On Linux/Mac
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Download NLTK data** (first run will auto-download)
   ```python
   python -c "import nltk; nltk.download('punkt'); nltk.download('wordnet'); nltk.download('stopwords')"
   ```

5. **Run the application**
   ```bash
   python app.py
   ```

6. **Open your browser**
   Navigate to `http://localhost:5000`

## Project Structure

```
AI_Powered_Chatbot/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── models/
│   ├── __init__.py       # Package initializer
│   └── chatbot.py        # AI chatbot engine
├── templates/
│   ├── base.html         # Base template with theme toggle
│   ├── index.html        # Landing page with features
│   ├── login.html        # Login page
│   ├── register.html     # Registration page
│   └── chat.html         # Main chat interface
├── static/
│   ├── css/
│   │   └── style.css     # Comprehensive styling with glassmorphism
│   ├── js/
│   │   ├── theme.js      # Theme switching functionality
│   │   ├── animations.js # Animation and visual effects
│   │   ├── landing.js    # Landing page interactions
│   │   ├── auth.js       # Authentication handling
│   │   └── chat.js       # Chat interface functionality
│   └── images/           # Static images
└── data/
    └── knowledge_base.json # AI training data
```

## Features Overview

### 🎨 Glassmorphism Design
- Translucent elements with backdrop blur effects
- Gradient backgrounds and text
- Smooth hover animations
- Modern, sleek appearance

### 🌙 Theme System
- Animated light/dark mode toggle
- Smooth color transitions
- Persistent theme preference
- Mobile-optimized theme switching

### 🤖 AI Chatbot
- Natural language processing with NLTK
- Contextual conversation handling
- Extensible knowledge base
- Personalized responses

### 💬 Chat Interface
- Real-time messaging
- Typing indicators
- Message animations
- Emoji picker
- Quick action buttons
- Export chat functionality

### 🔐 Authentication
- Secure user registration/login
- Password hashing with Werkzeug
- Session management
- Form validation
- Error handling

## Customization

### Adding New AI Responses
Edit `models/chatbot.py` to add new patterns and responses:

```python
self.knowledge_base["new_intent"] = {
    "patterns": ["pattern1", "pattern2"],
    "responses": ["response1", "response2"]
}
```

### Modifying Styles
Edit `static/css/style.css` to customize:
- Colors and gradients
- Glassmorphism effects
- Animations and transitions
- Responsive breakpoints

### Extending Functionality
- Add new routes in `app.py`
- Create new templates in `templates/`
- Add JavaScript modules in `static/js/`

## Browser Support

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

## Performance Optimizations

- Lazy loading for animations
- Optimized CSS with variables
- Minimal JavaScript bundles
- Efficient database queries
- Responsive image loading

## Security Features

- Password hashing
- Session management
- CSRF protection ready
- Input validation
- SQL injection prevention

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue on GitHub or contact the development team.

## Roadmap

- [ ] Voice chat integration
- [ ] Multi-language support
- [ ] Advanced AI models (GPT integration)
- [ ] Mobile app version
- [ ] Group chat functionality
- [ ] File sharing capabilities

---

Made with ❤️ and modern web technologies