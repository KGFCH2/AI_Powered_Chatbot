# 🤖 AI-Powered Chatbot

A sophisticated AI-powered chatbot web application built with Flask, featuring a beautiful glassmorphism UI, user authentication, and intelligent conversational capabilities. 🚀

## ✨ Features

- 🤖 **Intelligent AI Chatbot** - Advanced NLP powered responses using NLTK and machine learning 🧠
- 🔐 **User Authentication** - Secure login/register system with session management 👤
- 🎨 **Glassmorphism Design** - Modern, elegant UI with glass-like effects and animations ✨
- 🌙 **Dark/Light Mode** - Animated theme toggle with smooth transitions 🌓
- 📱 **Responsive Design** - Optimized for all devices and screen sizes 💻📱
- 💬 **Real-time Chat** - Live messaging with typing indicators and animations 🚀
- 🎭 **Card Flip Effects** - Interactive feature cards with smooth animations 🎪
- 📊 **Conversation History** - Track and export chat conversations 📋
- 🎨 **Gradient Text Effects** - Beautiful gradient typography 🌈
- ⚡ **Fast & Smooth** - Optimized performance with modern web technologies 💯

## 🛠️ Technologies Used

- **Backend:** 🐍 Python, Flask, SQLAlchemy, Flask-Login
- **AI Engine:** 🧬 NLTK, scikit-learn, NumPy, custom NLP processing
- **Frontend:** 🌐 HTML5, CSS3, JavaScript (ES6+)
- **Database:** 🗃️ SQLite with ORM
- **Styling:** ✨ Glassmorphism, CSS Grid, Flexbox
- **Icons:** 🎯 Custom SVG graphics and Font Awesome
- **Fonts:** 📝 Google Fonts (Poppins)

## 🚀 Installation & Setup

1. **📥 Clone the repository**
   ```bash
   git clone https://github.com/KGFCH2/AI_Powered_Chatbot.git
   cd AI_Powered_Chatbot
   ```

2. **🐍 Create a virtual environment**
   ```bash
   python -m venv venv
   venv\Scripts\activate  # On Windows
   # source venv/bin/activate  # On Linux/Mac
   ```

3. **📦 Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **🔧 Download NLTK data** (first run will auto-download)
   ```python
   python -c "import nltk; nltk.download('punkt'); nltk.download('wordnet'); nltk.download('stopwords')"
   ```

5. **▶️ Run the application**
   ```bash
   python app.py
   ```

6. **🌍 Open your browser**
   Navigate to `http://localhost:5000` 🔗

## 📋 Project Structure

```
AI_Powered_Chatbot/
├── 🐍 app.py                      # Main Flask application
├── 📦 requirements.txt            # Python dependencies
├── 📄 LICENSE                     # MIT License
├── 📝 README.md                   # Project documentation
├── 🤖 models/
│   ├── __init__.py               # Package initializer
│   └── chatbot.py               # AI chatbot engine
├── 🎨 templates/
│   ├── base.html                # Base template with theme toggle
│   ├── index.html               # Landing page with features
│   ├── login.html               # Login page
│   ├── register.html            # Registration page
│   └── chat.html                # Main chat interface
├── 🎯 static/
│   ├── css/style.css            # Comprehensive glassmorphism styling
│   ├── js/                      # JavaScript modules
│   │   ├── theme.js             # Theme switching functionality
│   │   ├── animations.js        # Animation and visual effects
│   │   ├── landing.js           # Landing page interactions
│   │   ├── auth.js              # Authentication handling
│   │   └── chat.js              # Chat interface functionality
│   └── images/                  # Custom SVG graphics
├── 📊 data/
│   └── knowledge_base.json      # Comprehensive AI training dataset
└── 🗄️ instance/
    └── chatbot.db               # SQLite database
```

## � AI Capabilities

The chatbot can intelligently discuss:
- 💻 **Technology & Programming** - Python, JavaScript, AI, ML, frameworks 🔧
- 🎬 **Movies & Entertainment** - Hollywood, Bollywood, international cinema 🍿
- 📱 **Social Media & Trends** - Platforms, content creation, digital marketing 📈
- 🌍 **World News & Current Affairs** - Global events, politics, society 📰
- 🏠 **Daily Life & Practical Tips** - Cooking, health, productivity 💡
- 🎨 **Art & Creativity** - Design, music, literature, creative projects 🖌️
- 🏥 **Health & Wellness** - Fitness, nutrition, mental health 💚
- 📚 **Education & Learning** - Study tips, career advice, skill development 🎓

## 🎨 Design Highlights

- **✨ Glassmorphism Effects** - Translucent elements with backdrop blur 🌈
- **🌈 Gradient Text** - Beautiful gradient typography and backgrounds 🎭
- **🔄 Smooth Transitions** - Fluid animations and micro-interactions ⚡
- **🖼️ Custom SVG Graphics** - Scalable vector icons and avatars 🎨
- **� Mobile-First Design** - Responsive layout for all devices 💯
- **🌙 Theme System** - Persistent dark/light mode with smooth switching 🎪

## 🔧 Customization

### 🤖 Adding New AI Responses
Edit `data/knowledge_base.json` to add new intents:
```json
{
  "tag": "new_intent",
  "patterns": ["pattern1", "pattern2"],
  "responses": ["response1", "response2"]
}
```

### 🎨 Modifying Styles
Edit `static/css/style.css` to customize:
- Colors and gradients
- Glassmorphism effects
- Animations and transitions
- Responsive breakpoints

## 🌐 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🚀 Performance Features

- ⚡ Lazy loading for animations
- 🎯 Optimized CSS with variables
- 📦 Minimal JavaScript bundles
- 🗃️ Efficient database queries
- 🖼️ Responsive image loading

## 🔒 Security Features

- 🔐 Password hashing with Werkzeug
- 🛡️ Session management
- 🔒 Input validation and sanitization
- 🚫 SQL injection prevention
- 🛠️ CSRF protection ready

## 🤝 Contributing

1. 🍴 Fork the repository
2. 🌟 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 Commit your changes (`git commit -m 'Add amazing feature'`)
4. 📤 Push to the branch (`git push origin feature/amazing-feature`)
5. 🔄 Open a Pull Request

## 🗺️ Roadmap

- [ ] 🎤 Voice chat integration
- [ ] 🌍 Multi-language support
- [ ] 🚀 Advanced AI models (GPT integration)
- [ ] 📱 Mobile app version
- [ ] 👥 Group chat functionality
- [ ] 📎 File sharing capabilities
- [ ] 🔔 Push notifications
- [ ] 📊 Analytics dashboard

## 📄 License

📜 This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. ⚖️

## 🆘 Support

For support, please:
- 🐛 Open an issue on GitHub
- 📧 Contact the development team
- 📖 Check the documentation

## 👨‍💻 Author

**KGFCH2** - *Initial work and development*

---

⭐ **Star this repository if you found it helpful!** ⭐

Made with ❤️ using Flask and modern web technologies 🌟