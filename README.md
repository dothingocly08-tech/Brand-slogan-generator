# Brand Slogan & Name Generator

A creative and intelligent web application that generates unique slogans and brand names for businesses and startups using AI technology.

## Features

- **AI-Powered Generation**: Uses Google Gemini API to generate creative slogans and brand names
- **Intelligent Insights**: Each idea includes explanations of the meaning and feeling it conveys
- **Easy to Use**: Simple, intuitive interface for entrepreneurs and business professionals
- **Copy-to-Clipboard**: Quickly copy any slogan or brand name to clipboard
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Error Handling**: Clear, user-friendly error messages for better experience

##  Quick Start

### Prerequisites

- Node.js (for local development and Docker)
- Google Gemini API Key (free tier available at [Google AI Studio](https://aistudio.google.com))
- Docker Desktop (for containerization)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/dothingocly08-tech/Brand-slogan-generator.git
   cd brand-slogan-generator
   ```

2. **Run locally**
   - Option A: Using Python
   ```bash
   python -m http.server 8000
   # Visit http://localhost:8000
   ```
   - Option B: Using Node.js
   ```bash
   npm install
   npm run dev
   # Visit http://localhost:8000
   ```

##  Project Structure

```
brand-slogan-generator/
├── index.html              # Main HTML file with structure and form
├── styles.css              # Styling and responsive design
├── app.js                  # JavaScript logic and AI integration
├── package.json            # Project metadata
├── Dockerfile              # Docker containerization
├── docker-compose.yml      # Docker Compose configuration
├── .gitignore              # Git ignore rules
└── README.md              # This file
```

##  How to Use

1. **Enter Business Information**
   - **Industry/Field**: Describe your business sector
   - **Keywords**: Enter core values or product keywords
   - **Target Audience**: Specify who you're targeting

2. **Generate Ideas**
   - Click the "Generate Ideas" button
   - Wait for AI to process (usually 5-10 seconds)

3. **Copy Ideas**
   - Hover over any slogan or brand name
   - Click "Copy" button to copy to clipboard

## 🐳 Docker Setup

### Build and Run with Docker

```bash
# Build the Docker image
docker build -t brand-slogan-generator .

# Run the container
docker run -p 8000:8000 brand-slogan-generator

# Open http://localhost:8000
```

### Docker Compose (Recommended)

```bash
docker-compose up
```

This will start the application on port 8000.

##  Deploy to Vercel

### Visit: https://brand-slogan-generator.vercel.app/


## ⚠️ Security Note

**IMPORTANT FOR PRODUCTION:**
- The current implementation stores the API key in client-side code for educational purposes only
- For production: Use environment variables or backend proxy
- Never hardcode sensitive credentials in production code


## 📄 License

This project is open-source

## 👨‍💻 Author

Created as an educational project for branding and AI integration learning.


**Last Updated**: March 2026  
**Version**: 1.0.0
