// Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');
const body = document.body;

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark');
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
} else {
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    if (body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    } else {
        localStorage.setItem('theme', 'light');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    }
});

// Sticky Navbar
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('shadow-lg');
    }
});

// Mobile Navigation Sidebar Logic
const hamburgerMenu = document.getElementById('hamburger-menu');
const mobileNavMenu = document.getElementById('mobile-nav-menu');
const sidebarOverlay = document.getElementById('sidebar-overlay'); // Get the new overlay element

function closeMobileMenu() {
    mobileNavMenu.classList.remove('open');
    hamburgerMenu.classList.remove('open');
    sidebarOverlay.classList.remove('show'); // Hide overlay
    // Re-enable scrolling on body
    body.style.overflow = '';
}

hamburgerMenu.addEventListener('click', () => {
    mobileNavMenu.classList.toggle('open');
    hamburgerMenu.classList.toggle('open');
    sidebarOverlay.classList.toggle('show'); // Toggle overlay visibility
    // Disable scrolling on body when menu is open
    if (mobileNavMenu.classList.contains('open')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
});

// Close menu when clicking on overlay
sidebarOverlay.addEventListener('click', closeMobileMenu);

// Smooth Scrolling for Navbar Links (updated to close sidebar)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - navbar.offsetHeight; // Adjust for sticky navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (mobileNavMenu.classList.contains('open')) {
                closeMobileMenu(); // Use the new close function
            }
        }
    });
});

// Scroll-based Animations (Intersection Observer)
const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.1 // 10% of element visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, observerOptions);

animateOnScrollElements.forEach(el => {
    observer.observe(el);
});

// Back to Top Button Logic
const backToTopButton = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) { // Show button after scrolling 300px
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// AI Tool Directory Data and Filtering
const aiTools = [
    { name: "ChatGPT", category: "Text AI", useCase: "Conversational AI, content generation.", link: "https://chat.openai.com", pricing: "Freemium", icon: "https://placehold.co/60x60/e0e7ff/3b82f6?text=GPT" },
    { name: "Jasper", category: "Text AI", useCase: "AI writing assistant for marketing, sales, and more.", link: "https://www.jasper.ai", pricing: "Paid", icon: "https://placehold.co/60x60/e0e7ff/3b82f6?text=JAS" },
    { name: "Grammarly", category: "Text AI", useCase: "Writing assistant for grammar, spelling, and style.", link: "https://www.grammarly.com", pricing: "Freemium", icon: "https://placehold.co/60x60/e0e7ff/3b82f6?text=GRA" },
    { name: "Midjourney", category: "Image AI", useCase: "Generates high-quality images from text prompts.", link: "https://www.midjourney.com", pricing: "Paid", icon: "https://placehold.co/60x60/e0e7ff/3b82f6?text=MJ" },
    { name: "DALL·E", category: "Image AI", useCase: "Creates realistic images and art from natural language descriptions.", link: "https://openai.com/dall-e", pricing: "Freemium", icon: "https://placehold.co/60x60/e0e7ff/3b82f6?text=DALL-E" },
    { name: "Leonardo AI", category: "Image AI", useCase: "AI art generation with advanced controls and features.", link: "https://leonardo.ai", pricing: "Freemium", icon: "https://placehold.co/60x60/e0e7ff/3b82f6?text=LEO" },
    { name: "Pictory", category: "Video AI", useCase: "Creates short, shareable videos from long-form content.", link: "https://pictory.ai", pricing: "Paid", icon: "https://placehold.co/60x60/e0e7ff/3b82f6?text=PIC" },
    { name: "Runway ML", category: "Video AI", useCase: "AI video editing, motion graphics, and content generation.", link: "https://runwayml.com", pricing: "Freemium", icon: "https://placehold.co/60x60/e0e7ff/3b82f6?text=RUN" },
    { name: "Sora", category: "Video AI", useCase: "Generates realistic and imaginative scenes from text instructions.", link: "https://openai.com/sora", pricing: "Paid", icon: "https://placehold.co/60x60/e0e7ff/3b82f6?text=SORA" },
    { name: "ElevenLabs", category: "Voice AI", useCase: "High-quality AI voice synthesis and cloning.", link: "https://www.elevenlabs.io", pricing: "Freemium", icon: "https://placehold.co/60x60/e0e7ff/3b82f6?text=EL" },
    { name: "Murf", category: "Voice AI", useCase: "AI voice generator for podcasts, videos, and presentations.", link: "https://murf.ai", pricing: "Paid", icon: "https://placehold.co/60x60/e0e7ff/3b82f6?text=MUR" },
    { name: "Resemble AI", category: "Voice AI", useCase: "Generates realistic human voices with emotion and nuance.", link: "https://www.resemble.ai", pricing: "Paid", icon: "https://placehold.co/60x60/e0e7ff/3b82f6?text=RES" },
    { name: "GitHub Copilot", category: "Developer AI", useCase: "AI pair programmer that suggests code and functions.", link: "https://github.com/features/copilot", pricing: "Paid", icon: "https://placehold.co/60x60/e0e7ff/3b82f6?text=COP" },
    { name: "Tabnine", category: "Developer AI", useCase: "AI code completion tool for developers.", link: "https://www.tabnine.com", pricing: "Freemium", icon: "https://placehold.co/60x60/e0e7ff/3b82f6?text=TAB" },
    { name: "Tableau AI", category: "Analytics AI", useCase: "AI-powered analytics and data visualization.", link: "https://www.tableau.com", pricing: "Paid", icon: "https://placehold.co/60x60/e0e7ff/3b82f6?text=TABL" },
    { name: "Power BI", category: "Analytics AI", useCase: "Business intelligence tool with AI capabilities for data analysis.", link: "https://powerbi.microsoft.com", pricing: "Freemium", icon: "https://placehold.co/60x60/e0e7ff/3b82f6?text=PBI" },
    { name: "Copy.ai", category: "Business & Marketing AI", useCase: "AI content generator for marketing copy, sales emails, and more.", link: "https://www.copy.ai", pricing: "Freemium", icon: "https://placehold.co/60x60/e0e7ff/3b82f6?text=COPY" },
    { name: "Ocoya", category: "Business & Marketing AI", useCase: "AI-powered content creation and scheduling for social media.", link: "https://www.ocoya.com", pricing: "Paid", icon: "https://placehold.co/60x60/e0e7ff/3b82f6?text=OCO" },
    { name: "Surfer SEO", category: "Business & Marketing AI", useCase: "AI content optimizer for search engine ranking.", link: "https://surferseo.com", pricing: "Paid", icon: "https://placehold.co/60x60/e0e7ff/3b82f6?text=SURF" },
    { name: "Khanmigo", category: "Education AI", useCase: "AI-powered tutor for personalized learning on Khan Academy.", link: "https://www.khanacademy.org/khan-labs", pricing: "Freemium", icon: "https://placehold.co/60x60/e0e7ff/3b82f6?text=KHAN" },
    { name: "Socratic", category: "Education AI", useCase: "AI learning app by Google that helps with homework.", link: "https://socratic.org", pricing: "Free", icon: "https://placehold.co/60x60/e0e7ff/3b82f6?text=SOC" },
    { name: "Quillbot", category: "Education AI", useCase: "AI paraphrasing tool and writing assistant.", link: "https://www.quillbot.com", pricing: "Freemium", icon: "https://placehold.co/60x60/e0e7ff/3b82f6?text=QUILL" }
];

const toolListContainer = document.getElementById('tool-list');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const pricingFilter = document.getElementById('pricing-filter');
const noResultsMessage = document.getElementById('no-results');

function renderTools(toolsToRender) {
    toolListContainer.innerHTML = '';
    if (toolsToRender.length === 0) {
        noResultsMessage.classList.remove('hidden');
    } else {
        noResultsMessage.classList.add('hidden');
        toolsToRender.forEach(tool => {
            const toolCardHtml = `
                <a href="${tool.link}" target="_blank" class="tool-card p-6 card rounded-xl shadow-md flex flex-col items-center text-center">
                    <img src="${tool.icon}" alt="${tool.name} Icon" class="w-16 h-16 mb-4 rounded-full">
                    <h4 class="text-xl font-semibold mb-2">${tool.name}</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">${tool.useCase}</p>
                    <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-4">Pricing: ${tool.pricing}</p>
                    <span class="text-primary-light dark:text-primary-dark font-medium">Visit Tool &rarr;</span>
                </a>
            `;
            toolListContainer.insertAdjacentHTML('beforeend', toolCardHtml);
        });
    }
}

function filterTools() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedPricing = pricingFilter.value;

    const filtered = aiTools.filter(tool => {
        const matchesSearch = tool.name.toLowerCase().includes(searchTerm) || tool.useCase.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
        const matchesPricing = selectedPricing === 'all' || tool.pricing === selectedPricing;
        return matchesSearch && matchesCategory && matchesPricing;
    });
    renderTools(filtered);
}

// Initial render
renderTools(aiTools);

// Add event listeners for filtering
searchInput.addEventListener('input', filterTools);
categoryFilter.addEventListener('change', filterTools);
pricingFilter.addEventListener('change', filterTools);


// Gemini API Integration: AI Prompt Generator
const promptIdeaInput = document.getElementById('prompt-idea');
const promptTypeSelect = document.getElementById('prompt-type');
const generatePromptBtn = document.getElementById('generate-prompt-btn');
const loadingIndicator = document.getElementById('loading-indicator');
const generatedPromptOutput = document.getElementById('generated-prompt-output');
const promptTextOutput = document.getElementById('prompt-text');

generatePromptBtn.addEventListener('click', async () => {
    const idea = promptIdeaInput.value.trim();
    const type = promptTypeSelect.value;

    if (!idea) {
        promptTextOutput.textContent = "Please enter an idea to generate a prompt.";
        generatedPromptOutput.classList.remove('hidden');
        return;
    }

    loadingIndicator.classList.remove('hidden');
    generatedPromptOutput.classList.add('hidden');
    promptTextOutput.textContent = ''; // Clear previous output

    let prompt = "";
    switch (type) {
        case "text":
            prompt = `Generate a detailed and creative prompt for a text-based AI model (like ChatGPT). The user's high-level idea is: "${idea}". Make sure the prompt is specific, includes desired tone/style, and suggests elements for the AI to elaborate on.`;
            break;
        case "image":
            prompt = `Generate a highly descriptive and artistic prompt for an image-based AI model (like Midjourney or DALL-E). The user's high-level idea is: "${idea}". Include details about style, lighting, composition, colors, and any specific elements.`;
            break;
        case "story":
            prompt = `Generate a compelling story outline prompt for an AI. The user's high-level idea is: "${idea}". Include main character, setting, conflict, rising action, climax, and resolution.`;
            break;
        case "email":
            prompt = `Draft a professional email prompt for an AI. The user's high-level idea is: "${idea}". Specify sender, recipient, subject, purpose, and key points to include.`;
            break;
        default:
            prompt = `Generate a detailed AI prompt based on the idea: "${idea}".`;
    }

    try {
        let chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: prompt }] });
        const payload = { contents: chatHistory };
        const apiKey = ""; // Canvas will automatically provide the API key at runtime.
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const generatedText = result.candidates[0].content.parts[0].text;
            promptTextOutput.textContent = generatedText;
        } else {
            promptTextOutput.textContent = "Error: Could not generate prompt. Please try again.";
            console.error("Gemini API response structure unexpected:", result);
        }
    } catch (error) {
        promptTextOutput.textContent = "Error generating prompt. Please check your network connection or try again later.";
        console.error("Error calling Gemini API:", error);
    } finally {
        loadingIndicator.classList.add('hidden');
        generatedPromptOutput.classList.remove('hidden');
    }
});
