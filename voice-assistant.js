// Voice Assistant for Delightful Bean Largo
class LargoCoffeeVoiceAssistant {
    constructor() {
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.isListening = false;
        this.voiceButton = null;
        this.voiceIndicator = null;
        
        // Largo-specific voice commands
        this.largoCommands = {
            'largo': () => this.showLargoInfo(),
            'where do you serve': () => this.showServiceInfo(),
            'do you come to': () => this.showServiceInfo()
        };
        
        // Check for browser support
        this.hasSupport = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
        
        if (this.hasSupport) {
            this.initializeSpeechRecognition();
            this.createVoiceInterface();
        }
    }
    
    initializeSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        
        // Configure recognition
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';
        
        // Set up event handlers
        this.recognition.onstart = () => {
            this.isListening = true;
            this.updateUI();
        };
        
        this.recognition.onend = () => {
            this.isListening = false;
            this.updateUI();
        };
        
        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            this.isListening = false;
            this.updateUI();
            
            if (event.error === 'no-speech') {
                this.speak("I didn't hear anything. Please try again, or ask about our Largo coffee service!");
            } else if (event.error === 'network') {
                this.speak("Network error. Please check your connection and try again.");
            }
        };
        
        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            console.log('User said:', transcript);
            this.handleVoiceCommand(transcript);
        };
    }
    
    createVoiceInterface() {
        // Create voice button container with Largo styling
        const voiceContainer = document.createElement('div');
        voiceContainer.className = 'voice-assistant-container';
        voiceContainer.innerHTML = `
            <button class="voice-assistant-button largo-voice-button" aria-label="Voice assistant for Largo coffee cart">
                <i class="fas fa-microphone"></i>
            </button>
            <div class="voice-indicator hidden">
                <div class="voice-wave largo-wave"></div>
                <span class="voice-text">Listening for Largo commands...</span>
            </div>
            <div class="voice-help-tooltip hidden">
                <div class="voice-help-content">
                    <h4>Try saying:</h4>
                    <ul>
                        <li>"Book my Largo event"</li>
                        <li>"Show me services"</li>
                        <li>"Call for quote"</li>
                        <li>"About Delightful Bean"</li>
                    </ul>
                </div>
            </div>
        `;
        
        // Add Largo-specific styles
        const styles = document.createElement('style');
        styles.textContent = `
            .voice-assistant-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 1000;
            }
            
            .voice-assistant-button.largo-voice-button {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: linear-gradient(135deg, var(--secondary), var(--accent));
                color: white;
                border: none;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(127, 176, 105, 0.3);
                transition: all 0.3s ease;
                font-size: 24px;
                position: relative;
            }
            
            .voice-assistant-button.largo-voice-button:hover {
                background: linear-gradient(135deg, var(--primary), var(--secondary));
                transform: scale(1.1);
                box-shadow: 0 6px 20px rgba(127, 176, 105, 0.4);
            }
            
            .voice-assistant-button.largo-voice-button.listening {
                background: linear-gradient(135deg, var(--primary), var(--largo-blue));
                animation: largo-pulse 1.5s infinite;
            }            
            
            @keyframes largo-pulse {
                0% { box-shadow: 0 0 0 0 rgba(74, 144, 164, 0.7); }
                70% { box-shadow: 0 0 0 10px rgba(74, 144, 164, 0); }
                100% { box-shadow: 0 0 0 0 rgba(74, 144, 164, 0); }
            }
            
            .voice-indicator {
                position: absolute;
                bottom: 70px;
                right: 0;
                background: white;
                padding: 12px 20px;
                border-radius: 25px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                white-space: nowrap;
                border: 2px solid var(--secondary);
            }
            
            .voice-indicator.hidden {
                display: none;
            }
            
            .voice-wave.largo-wave {
                display: inline-block;
                width: 20px;
                height: 20px;
                margin-right: 10px;
                background: var(--secondary);
                border-radius: 50%;
                animation: largo-wave 1s infinite;
            }
            
            @keyframes largo-wave {
                0%, 100% { 
                    transform: scale(0.8);
                    background: var(--secondary);
                }
                50% { 
                    transform: scale(1.2);
                    background: var(--accent);
                }
            }
            
            .voice-text {
                color: var(--dark);
                font-weight: 500;
                font-size: 14px;
            }
            
            .voice-help-tooltip {
                position: absolute;
                bottom: 70px;
                right: 70px;
                background: white;
                padding: 15px;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                border: 2px solid var(--secondary);
                width: 250px;
            }
            
            .voice-help-tooltip.hidden {
                display: none;
            }
            
            .voice-help-content h4 {
                margin: 0 0 10px 0;
                color: var(--primary);
                font-size: 14px;
                font-weight: 600;
            }
            
            .voice-help-content ul {
                margin: 0;
                padding: 0;
                list-style: none;
            }
            
            .voice-help-content li {
                padding: 4px 0;
                font-size: 12px;
                color: var(--text);
                border-bottom: 1px solid var(--cream);
            }
            
            .voice-help-content li:before {
                content: "🎤 ";
                margin-right: 5px;
            }
            
            .voice-help-content li:last-child {
                border-bottom: none;
            }
            
            @media (max-width: 768px) {
                .voice-help-tooltip {
                    right: -180px;
                    width: 200px;
                }
            }
        `;
        
        document.head.appendChild(styles);
        document.body.appendChild(voiceContainer);
        
        this.voiceButton = voiceContainer.querySelector('.voice-assistant-button');
        this.voiceIndicator = voiceContainer.querySelector('.voice-indicator');
        this.helpTooltip = voiceContainer.querySelector('.voice-help-tooltip');
        
        // Event listeners
        this.voiceButton.addEventListener('click', () => this.toggleListening());
        
        // Show help on hover
        this.voiceButton.addEventListener('mouseenter', () => {
            if (!this.isListening) {
                this.helpTooltip.classList.remove('hidden');
            }
        });
        
        this.voiceButton.addEventListener('mouseleave', () => {
            this.helpTooltip.classList.add('hidden');
        });
        
        // Hide help when listening starts
        this.voiceButton.addEventListener('click', () => {
            this.helpTooltip.classList.add('hidden');
        });
    }
    
    toggleListening() {
        if (this.isListening) {
            this.stopListening();
        } else {
            this.startListening();
        }
    }
    
    startListening() {
        if (this.recognition && !this.isListening) {
            try {
                this.recognition.start();
                // Track voice assistant usage
                if (window.DelightfulBeanLargo && window.DelightfulBeanLargo.trackEvent) {
                    window.DelightfulBeanLargo.trackEvent('Voice Assistant', 'start_listening', 'Largo site');
                }
            } catch (error) {
                console.error('Failed to start voice recognition:', error);
                this.speak("Sorry, I'm having trouble with voice recognition. Please try clicking our contact button instead.");
            }
        }
    }
    
    stopListening() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
        }
    }
    
    updateUI() {
        if (this.voiceButton) {
            if (this.isListening) {
                this.voiceButton.classList.add('listening');
                this.voiceIndicator.classList.remove('hidden');
                this.helpTooltip.classList.add('hidden');
            } else {
                this.voiceButton.classList.remove('listening');
                this.voiceIndicator.classList.add('hidden');
            }
        }
    }
    
    speak(text) {
        if (this.synthesis) {
            // Cancel any ongoing speech
            this.synthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9;
            utterance.pitch = 1;
            utterance.volume = 0.8;
            
            // Try to use a more natural voice
            const voices = this.synthesis.getVoices();
            const preferredVoice = voices.find(voice => 
                voice.name.includes('Google') || 
                voice.name.includes('Alex') || 
                voice.name.includes('Samantha')
            );
            
            if (preferredVoice) {
                utterance.voice = preferredVoice;
            }
            
            this.synthesis.speak(utterance);
        }
    }
    
    handleVoiceCommand(transcript) {
        // Enhanced command matching for Largo
        const commands = {
            // Booking commands
            'book': () => this.navigateToBooking(),
            'quote': () => this.navigateToBooking(),
            'schedule': () => this.navigateToBooking(),
            'reserve': () => this.navigateToBooking(),
            
            // Navigation commands
            'services': () => this.scrollToSection('services'),
            'about': () => this.scrollToSection('about'),
            'testimonials': () => this.scrollToSection('testimonials'),
            'reviews': () => this.scrollToSection('testimonials'),
            'faq': () => this.scrollToSection('faq'),
            'questions': () => this.scrollToSection('faq'),
            
            // Contact commands
            'call': () => this.initiateCall(),
            'phone': () => this.initiateCall(),
            'contact': () => this.showContactInfo(),
            'email': () => this.openEmail(),
            
            // Local commands
            'menu': () => this.toggleMobileMenu(),
            'help': () => this.showHelp(),
            
            // Merge Largo-specific commands
            ...this.largoCommands
        };
        
        // Find the best matching command
        let bestMatch = null;
        let bestScore = 0;
        
        Object.keys(commands).forEach(cmd => {
            if (transcript.includes(cmd)) {
                const score = cmd.length; // Longer matches get priority
                if (score > bestScore) {
                    bestMatch = cmd;
                    bestScore = score;
                }
            }
        });
        
        if (bestMatch) {
            commands[bestMatch]();
            this.speak(this.getResponseMessage(bestMatch, transcript));
            
            // Track successful command
            if (window.DelightfulBeanLargo && window.DelightfulBeanLargo.trackEvent) {
                window.DelightfulBeanLargo.trackEvent('Voice Assistant', 'command_executed', bestMatch);
            }
        } else {
            // Default response
            this.speak("I didn't understand that command. Try saying 'book my event', 'show services', 'call for quote', or 'help' to see what I can do!");
            
            // Track unrecognized commands for improvement
            if (window.DelightfulBeanLargo && window.DelightfulBeanLargo.trackEvent) {
                window.DelightfulBeanLargo.trackEvent('Voice Assistant', 'unrecognized_command', transcript);
            }
        }
    }
    
    
    getResponseMessage(command, transcript) {
        const responses = {
            'book': 'Taking you to our booking page for your event!',
            'quote': 'Opening our quote form for your coffee service!',
            'services': 'Showing you our premium coffee catering services!',
            'about': 'Learn more about Delightful Bean!',
            'testimonials': 'See what customers say about us!',
            'faq': 'Here are answers to common questions about our service!',
            'call': 'Connecting you to our coffee experts!',
            'contact': 'Here\'s how to reach our team!',
            'largo': 'Showing you information about our premium coffee catering!'
        };
        
        return responses[command] || 'Navigating to that section!';
    }
    
    showLargoInfo() {
        this.speak("Delightful Bean Coffee Cart brings premium coffee catering to your Largo events! We specialize in high-quality espresso drinks, gourmet coffee service, and professional event catering.");
        this.scrollToSection('about');
    }
    
    showServiceInfo() {
        this.speak("We provide premium coffee catering services including espresso bars, coffee stations, and custom beverage menus for corporate events, weddings, and special occasions!");
        this.scrollToSection('services');
    }
    
    navigateToBooking() {
        window.open('https://DelightfulBean.com', '_blank');
    }
    
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    toggleMobileMenu() {
        const menuToggle = document.getElementById('mobile-menu-toggle');
        if (menuToggle) {
            menuToggle.click();
        }
    }
    
    initiateCall() {
        window.location.href = 'tel:+18134197438';
    }
    
    openEmail() {
        window.location.href = 'mailto:info@delightfulbean.com';
    }
    
    showContactInfo() {
        this.speak("You can call us at 8-1-3, 4-1-9, 7-4-3-8, or email info at delightful bean dot com for premium coffee catering services!");
    }
    
    showHelp() {
        this.speak("I can help you with: booking your event, viewing our services, getting quotes, calling us, or navigating the website. Just tell me what you need!");
    }
}

// Initialize the Largo voice assistant when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if not already done and if speech recognition is supported
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const largoVoiceAssistant = new LargoCoffeeVoiceAssistant();
        
        // Make it globally accessible for debugging
        window.largoVoiceAssistant = largoVoiceAssistant;
        
        console.log('Largo Coffee Voice Assistant initialized');
    } else {
        console.log('Voice recognition not supported in this browser');
    }
});