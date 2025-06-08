# 🌐 How to View Your Largo Coffee Cart Website

## 🚀 **Quick Start - 3 Simple Ways**

### **Method 1: Direct File Opening (Easiest)**
1. **Open your file manager**
2. **Navigate to:** `/home/peter/Largo Coffee Cart/`
3. **Double-click:** `index.html` or `preview.html`
4. **Your browser will open** showing the website

### **Method 2: Python Web Server**
```bash
# Open terminal and run:
cd "/home/peter/Largo Coffee Cart"
python3 -m http.server 8000

# Then open browser to:
http://localhost:8000
```

### **Method 3: Node.js Server (if you have Node)**
```bash
# Install serve globally (one-time)
npm install -g serve

# Run server
cd "/home/peter/Largo Coffee Cart"
serve -p 3000

# Open browser to:
http://localhost:3000
```

### **Method 4: PHP Server (if you have PHP)**
```bash
cd "/home/peter/Largo Coffee Cart"
php -S localhost:8080

# Open browser to:
http://localhost:8080
```

---

## 📱 **What You'll See**

### **Main Website (index.html)**
- **Hero Section:** "Largo's Premier Coffee Experience"
- **Service Areas:** Interactive Pinellas County map
- **Voice Assistant:** Floating button (bottom-right)
- **Local Content:** Largo-specific testimonials and info
- **Mobile Responsive:** Works on phones, tablets, desktop

### **Preview Page (preview.html)**
- **Visual overview** of all website sections
- **Feature highlights** and statistics
- **Design showcase** with explanations

---

## 🛠️ **Troubleshooting**

### **If Files Won't Open:**
1. **Right-click** on `index.html`
2. **Select "Open With"**
3. **Choose your browser** (Chrome, Firefox, Safari, Edge)

### **If Server Won't Start:**
- **Check if port is in use:** Try different port numbers (3000, 8000, 8080)
- **Use different method:** Try the direct file opening method

### **If Styles Look Broken:**
- **Make sure all files are in same folder**
- **Check that `styles.css` and `script.js` are present**
- **Use a proper web server** (not just file:// protocol)

---

## 🌟 **Best Viewing Experience**

### **Recommended Browsers:**
- ✅ **Chrome** (Best performance)
- ✅ **Firefox** (Great compatibility)
- ✅ **Safari** (Good for Mac users)
- ✅ **Edge** (Windows default)

### **Test on Different Devices:**
1. **Desktop/Laptop** - Full experience
2. **Tablet** - Touch-optimized interface
3. **Mobile Phone** - Mobile-first design
4. **Voice Assistant** - Try the microphone button

---

## 📂 **File Structure Check**

**Make sure these files exist:**
```
Largo Coffee Cart/
├── index.html              ✓ Main website
├── preview.html             ✓ Visual preview
├── styles.css               ✓ Styling
├── script.js                ✓ Functionality
├── voice-assistant.js       ✓ Voice features
├── favicon.svg              ✓ Icon
├── images/                  ✓ Asset folder
├── README.md                ✓ Documentation
└── HOW-TO-VIEW.md          ✓ This guide
```

---

## 🎯 **Quick Test Commands**

### **Check if Python is available:**
```bash
python3 --version
```

### **Check if Node.js is available:**
```bash
node --version
npm --version
```

### **Check if files exist:**
```bash
ls -la "/home/peter/Largo Coffee Cart/"
```

---

## 🌐 **For Web Hosting**

### **To Put Online:**
1. **Upload all files** to your web hosting provider
2. **Point domain** to the folder containing `index.html`
3. **Test on:** `https://your-domain.com`

### **Popular Hosting Options:**
- **Netlify** (Free, drag-and-drop)
- **Vercel** (Free, GitHub integration)
- **GitHub Pages** (Free, version controlled)
- **Traditional hosting** (GoDaddy, Bluehost, etc.)

---

## 🎤 **Testing Voice Assistant**

1. **Open website** in browser
2. **Look for microphone button** (bottom-right corner)
3. **Click and say:** "Do you serve Largo?"
4. **Try commands like:**
   - "Book my Largo event"
   - "Show service areas"
   - "Call for quote"

**Note:** Voice features require HTTPS in production

---

## 📞 **Need Help?**

### **Common Issues:**
- **CORS errors:** Use a proper web server, not file:// protocol
- **Missing styles:** Ensure all files are in the same directory
- **Voice not working:** Try in Chrome with microphone permissions

### **Quick Fixes:**
1. **Refresh browser** (Ctrl+F5 or Cmd+Shift+R)
2. **Clear browser cache**
3. **Try different browser**
4. **Check browser console** for errors (F12 → Console)

---

## 🎉 **You're Ready!**

Your Largo Coffee Cart website is **complete and professional**. Choose any method above to start viewing your new site!

**Pro Tip:** Start with Method 1 (direct file opening) for the quickest preview, then use Method 2 (Python server) for the full experience with all features working.