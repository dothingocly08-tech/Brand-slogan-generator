// Configuration
const CONFIG = {
    API_ENDPOINT: 'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent',
    API_KEY: 'AIzaSyBF7i6sgqxCuj8PSdbEedNM0tKJZVEbwBE',
};

// DOM Elements
const companyNameInput = document.getElementById('companyName');
const industryInput = document.getElementById('industry');
const styleInput = document.getElementById('style');
const languageInput = document.getElementById('language');
const generateBtn = document.getElementById('generateBtn');
const loadingDiv = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const resultsSection = document.getElementById('resultsSection');
const descriptionResult = document.getElementById('descriptionResult');
const sloganResult = document.getElementById('sloganResult');
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
    const companyName = companyNameInput.value.trim();
    const industry = industryInput.value.trim();
    const style = styleInput.value.trim();
    const language = languageInput.value.trim();

    if (!companyName) {
        showError('Please enter your company name');
        return false;
    }
    if (!industry) {
        showError('Please select an industry');
        return false;
    }
    if (!style) {
        showError('Please select a brand style');
        return false;
    }
    if (!language) {
        showError('Please select a language');
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
        companyName: companyNameInput.value.trim(),
        industry: industryInput.value.trim(),
        style: styleInput.value.trim(),
        language: languageInput.value.trim(),
    };

    lastFormData = formData;
    await generateBrand(formData);
}

// Regenerate with same data
async function handleRegenerate() {
    if (!lastFormData) return;
    await generateBrand(lastFormData);
}

// Reset form
function handleReset() {
    companyNameInput.value = '';
    industryInput.value = '';
    styleInput.value = '';
    languageInput.value = '';
    resultsSection.style.display = 'none';
    hideError();
    lastFormData = null;
    companyNameInput.focus();
}

// Main AI generation function
async function generateBrand(formData) {
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
        showError(error.message || 'Failed to generate brand. Please try again.');
    } finally {
        generateBtn.disabled = false;
        loadingDiv.style.display = 'none';
    }
}

// Build prompt for AI
function buildPrompt(formData) {
    const languageInstruction = formData.language === 'Vietnamese' 
        ? 'Write the response entirely in Vietnamese.' 
        : 'Write the response entirely in English.';
    
    return `
You are a professional marketing copywriter. Based on the following company information, create:
1. A compelling 5-sentence company description for marketing purposes
2. A catchy and memorable brand slogan

Company Name: ${formData.companyName}
Industry: ${formData.industry}
Brand Style: ${formData.style}

Format your response EXACTLY as follows:
COMPANY DESCRIPTION:
[5 sentences describing the company, its value proposition, target audience, and unique selling points in a compelling way suitable for marketing]

BRAND SLOGAN:
[A single, catchy and memorable slogan that reflects the company name, industry, and style]

Make sure:
- The description is professional, engaging, and marketing-focused
- The slogan is memorable, easy to remember, and reflects the brand personality
- Both are appropriate for the ${formData.industry} industry
- The writing style matches the "${formData.style}" aesthetic
- ${languageInstruction}
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
        description: '',
        slogan: '',
    };

    // Extract COMPANY DESCRIPTION section
    const descriptionMatch = responseText.match(/COMPANY\s+DESCRIPTION:\s*\n([\s\S]*?)(?=BRAND\s+SLOGAN:|$)/i);
    if (descriptionMatch) {
        result.description = descriptionMatch[1].trim();
    }

    // Extract BRAND SLOGAN section
    const sloganMatch = responseText.match(/BRAND\s+SLOGAN:\s*\n([\s\S]*?)$/i);
    if (sloganMatch) {
        result.slogan = sloganMatch[1].trim();
    }

    return result;
}

// Display results
function displayResults(result) {
    // Display company description
    descriptionResult.innerHTML = '';
    descriptionResult.textContent = result.description || 'Company description not generated';

    // Display slogan
    sloganResult.innerHTML = '';
    const sloganDiv = document.createElement('div');
    sloganDiv.className = 'slogan-item';
    sloganDiv.style.position = 'relative';
    
    const sloganText = document.createElement('span');
    sloganText.textContent = result.slogan || 'Slogan not generated';
    sloganDiv.appendChild(sloganText);
    
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.textContent = 'Copy';
    copyBtn.style.position = 'absolute';
    copyBtn.style.right = '10px';
    copyBtn.style.top = '10px';
    copyBtn.addEventListener('click', () => copyToClipboard(result.slogan));
    sloganDiv.appendChild(copyBtn);
    
    sloganResult.appendChild(sloganDiv);
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

// Focus on company name input on page load
window.addEventListener('load', () => {
    companyNameInput.focus();
});
