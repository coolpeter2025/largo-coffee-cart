#!/bin/bash

# Simple server starter for Largo Coffee Cart website
# This script will start a web server and open your browser

echo "🚀 Starting Largo Coffee Cart Website Server..."
echo "================================================="

# Get the current directory
SITE_DIR="/home/peter/Largo Coffee Cart"
cd "$SITE_DIR"

echo "📁 Site directory: $SITE_DIR"
echo "🌐 Files found:"
ls -la *.html *.css *.js 2>/dev/null || echo "   (checking for files...)"

# Function to check if port is available
check_port() {
    local port=$1
    if command -v nc >/dev/null 2>&1; then
        ! nc -z localhost $port >/dev/null 2>&1
    else
        # Fallback method
        ! ss -ln | grep -q ":$port "
    fi
}

# Find available port
PORT=3000
while ! check_port $PORT; do
    PORT=$((PORT + 1))
    if [ $PORT -gt 9000 ]; then
        echo "❌ Could not find available port"
        exit 1
    fi
done

echo "🔌 Using port: $PORT"

# Try different server methods
if command -v python3 >/dev/null 2>&1; then
    echo "🐍 Starting Python server..."
    echo "📱 Open your browser to: http://localhost:$PORT"
    echo "📱 Or try: http://127.0.0.1:$PORT"
    echo ""
    echo "🎯 To view your site:"
    echo "   • Main website: http://localhost:$PORT/index.html"
    echo "   • Preview page: http://localhost:$PORT/preview.html"
    echo ""
    echo "⏹️  Press Ctrl+C to stop the server"
    echo ""
    
    # Start Python server
    python3 -m http.server $PORT
    
elif command -v python >/dev/null 2>&1; then
    echo "🐍 Starting Python 2 server..."
    echo "📱 Open your browser to: http://localhost:$PORT"
    python -m SimpleHTTPServer $PORT
    
elif command -v node >/dev/null 2>&1; then
    echo "📦 Checking for npx..."
    if command -v npx >/dev/null 2>&1; then
        echo "🟢 Starting Node.js server..."
        echo "📱 Open your browser to: http://localhost:$PORT"
        npx serve -p $PORT
    else
        echo "❌ Node.js found but npx not available"
        echo "💡 Try: npm install -g serve"
    fi
    
elif command -v php >/dev/null 2>&1; then
    echo "🐘 Starting PHP server..."
    echo "📱 Open your browser to: http://localhost:$PORT"
    php -S localhost:$PORT
    
else
    echo "❌ No suitable web server found!"
    echo ""
    echo "🛠️  Available options:"
    echo "   1. Install Python: sudo apt install python3"
    echo "   2. Install Node.js: sudo apt install nodejs npm"
    echo "   3. Install PHP: sudo apt install php"
    echo ""
    echo "📂 Alternative: Open files directly"
    echo "   • Right-click on index.html"
    echo "   • Select 'Open with browser'"
    echo ""
    echo "📁 Files in current directory:"
    ls -la *.html *.css *.js
fi