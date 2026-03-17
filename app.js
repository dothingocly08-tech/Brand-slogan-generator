// Configuration
const CONFIG = {
    API_ENDPOINT: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
    API_KEY: 'AIzaSyBbNF7K_LfT-OIhQOXSRbZqx-auEOh1Y24', 
};

// DOM Elements
const industryInput = document.getElementById('industry');
const keywordsInput = document.getElementById('keywords');
const audienceInput = document.getElementById('audience');
const generateBtn = document.getElementById('generateBtn');
const loadingDiv = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const resultsSection = document.getElementById('resultsSection');
const slogansResult = document.getElementById('slogansResult');
const brandNamesResult = document.getElementById('brandNamesResult');
const regenerateBtn = document.getElementById('regenerateBtn');
const resetBtn = document.getElementById('resetBtn');
const copyNotification = document.getElementById('copyNotification');

// State
let lastFormData = null;

// Event Listeners
generateBtn.addEventListener('click', handleGenerate);
regenerateBtn.addEventListener('click', handleRegenerate);
resetBtn.addEventListener('click', handleReset);

// Validate form inputs
function validateForm() {
    const industry = industryInput.value.trim();
    const keywords = keywordsInput.value.trim();
    const audience = audienceInput.value.trim();

    if (!industry) {
        showError('Please enter your industry or field');
        return false;
    }
    if (!keywords) {
        showError('Please enter your main keywords or core values');
        return false;
    }
    if (!audience) {
        showError('Please enter your target audience');
        return false;
    }

    return true;
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Hide error message
function hideError() {
    errorMessage.style.display = 'none';
}

// Generate ideas using AI
async function handleGenerate() {
    if (!validateForm()) return;

    hideError();
    const formData = {
        industry: industryInput.value.trim(),
        keywords: keywordsInput.value.trim(),
        audience: audienceInput.value.trim(),
    };

    lastFormData = formData;
    await generateIdeas(formData);
}

// Regenerate with same data
async function handleRegenerate() {
    if (!lastFormData) return;
    await generateIdeas(lastFormData);
}

// Reset form
function handleReset() {
    industryInput.value = '';
    keywordsInput.value = '';
    audienceInput.value = '';
    resultsSection.style.display = 'none';
    hideError();
    lastFormData = null;
    industryInput.focus();
}

// Main AI generation function
async function generateIdeas(formData) {
    generateBtn.disabled = true;
    loadingDiv.style.display = 'flex';
    hideError();

    try {
        // Check if API key is configured
        if (!CONFIG.API_KEY || CONFIG.API_KEY === 'YOUR_GOOGLE_GEMINI_API_KEY_HERE') {
            throw new Error(
                'API Key not configured. Please set your Google Gemini API key in app.js (CONFIG.API_KEY)'
            );
        }

        const prompt = buildPrompt(formData);
        const response = await callGeminiAPI(prompt);
        const result = parseAIResponse(response);

        displayResults(result);
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Generation error:', error);
        showError(error.message || 'Failed to generate ideas. Please try again.');
    } finally {
        generateBtn.disabled = false;
        loadingDiv.style.display = 'none';
    }
}

// Build prompt for AI
function buildPrompt(formData) {
    return `
You are a creative branding expert. Based on the following information, generate:
1. 5-10 unique and creative slogans
2. 5-10 unique and creative brand names

For each slogan and brand name, provide a brief explanation of the meaning or feeling it conveys.

Industry: ${formData.industry}
Keywords/Core Values: ${formData.keywords}
Target Audience: ${formData.audience}

Format your response EXACTLY as follows:
SLOGANS:
1. [Slogan] - [Explanation]
2. [Slogan] - [Explanation]
... (continue for 5-10 items)

BRAND NAMES:
1. [Brand Name] - [Explanation]
2. [Brand Name] - [Explanation]
... (continue for 5-10 items)

Make sure the slogans and brand names are:
- Memorable and catchy
- Relevant to the industry and keywords
- Appealing to the target audience
- Original and creative
- Easy to pronounce (if applicable for brand names)
`;
}

// Call Google Gemini API
async function callGeminiAPI(prompt) {
    const requestBody = {
        contents: [
            {
                parts: [
                    {
                        text: prompt,
                    },
                ],
            },
        ],
    };

    const response = await fetch(`${CONFIG.API_ENDPOINT}?key=${CONFIG.API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
            throw new Error('Invalid API Key. Please check your Google Gemini API key configuration.');
        }
        if (response.status === 429) {
            throw new Error('Rate limit exceeded. Please wait a moment and try again.');
        }
        throw new Error(
            errorData.error?.message || `API Error: ${response.status} ${response.statusText}`
        );
    }

    const data = await response.json();

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Unexpected API response format. Please try again.');
    }

    return data.candidates[0].content.parts[0].text;
}

// Parse AI response
function parseAIResponse(responseText) {
    const result = {
        slogans: [],
        brandNames: [],
    };

    // Split by SLOGANS and BRAND NAMES sections
    const parts = responseText.split(/BRAND\s+NAMES:/i);

    if (parts.length >= 1) {
        // Extract slogans
        const slogansText = parts[0].replace(/SLOGANS:/i, '').trim();
        result.slogans = parseItems(slogansText);
    }

    if (parts.length >= 2) {
        // Extract brand names
        const brandNamesText = parts[1].trim();
        result.brandNames = parseItems(brandNamesText);
    }

    return result;
}

// Parse individual items from text
function parseItems(text) {
    const items = [];
    const lines = text.split('\n').filter((line) => line.trim());

    for (const line of lines) {
        // Match numbered items like "1. Title - Description"
        const match = line.match(/^\d+\.\s*(.+?)\s*-\s*(.+)$/);
        if (match) {
            items.push({
                title: match[1].trim(),
                description: match[2].trim(),
            });
        }
    }

    return items;
}

// Display results
function displayResults(result) {
    // Display slogans
    slogansResult.innerHTML = '';
    result.slogans.forEach((slogan) => {
        const itemDiv = createIdeaElement(slogan);
        slogansResult.appendChild(itemDiv);
    });

    // Display brand names
    brandNamesResult.innerHTML = '';
    result.brandNames.forEach((name) => {
        const itemDiv = createIdeaElement(name);
        brandNamesResult.appendChild(itemDiv);
    });
}

// Create idea element
function createIdeaElement(idea) {
    const div = document.createElement('div');
    div.className = 'idea-item';

    const titleDiv = document.createElement('div');
    titleDiv.className = 'idea-title';
    titleDiv.textContent = idea.title;

    const descDiv = document.createElement('div');
    descDiv.className = 'idea-description';
    descDiv.textContent = idea.description;

    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.textContent = 'Copy';
    copyBtn.addEventListener('click', () => copyToClipboard(idea.title));

    div.appendChild(titleDiv);
    div.appendChild(descDiv);
    div.appendChild(copyBtn);

    return div;
}

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard
        .writeText(text)
        .then(() => {
            showCopyNotification();
        })
        .catch((err) => {
            console.error('Copy failed:', err);
            alert('Failed to copy to clipboard');
        });
}

// Show copy notification
function showCopyNotification() {
    copyNotification.style.display = 'block';
    setTimeout(() => {
        copyNotification.style.display = 'none';
    }, 2000);
}

// Focus on industry input on page load
window.addEventListener('load', () => {
    industryInput.focus();
});
