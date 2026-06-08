let btcPrice = 68742;
let totalPL = 1284.67;
let positionCount = 1;

const feed = document.getElementById('trade-feed');
const priceEl = document.getElementById('btc-price');
const positionsList = document.getElementById('positions');

// Voeg trade toe aan feed
function addTrade(message, color = '#00ff9d') {
    const div = document.createElement('div');
    div.className = 'trade';
    div.style.borderColor = color;
    div.innerHTML = `[${new Date().toLocaleTimeString()}] ${message}`;
    feed.appendChild(div);
    feed.scrollTop = feed.scrollHeight;

    if (feed.children.length > 15) {
        feed.removeChild(feed.children[0]);
    }
}

// Update BTC prijs
function updatePrice() {
    const change = (Math.random() * 120 - 60);
    btcPrice = Math.round(btcPrice + change);
    priceEl.textContent = '$' + btcPrice.toLocaleString();

    if (Math.random() > 0.8) {
        totalPL += (Math.random() * 65 + 10);
        document.getElementById('total-pl').textContent = '+$' + totalPL.toFixed(2);
    }
}

// Run trading pipeline
function runPipeline() {
    const steps = ['SCAN', 'FAIR', 'EDGE', 'LIMIT', 'FILL', 'HOLD'];
    let i = 0;
    
    addTrade('Pipeline gestart...', '#ffff00');

    const interval = setInterval(() => {
        if (i < steps.length) {
            addTrade(`${steps[i]} → Processing...`, '#00ff9d');
            i++;
        } else {
            clearInterval(interval);
            if (Math.random() > 0.35) {
                addTrade(`TRADE EXECUTED: LONG BTC @ $${btcPrice}`, '#00ff9d');
                positionCount++;
                document.getElementById('positions-count').textContent = positionCount;
            } else {
                addTrade('No sufficient edge - Trade skipped', '#ffaa00');
            }
        }
    }, 380);
}

function setTab(n) {
    addTrade(`Tab ${n} geopend (demo modus)`, '#ffff00');
}

// Initial setup
window.onload = () => {
    // Start feed
    addTrade('BDBotsBTC v1.0 initialized', '#00ff9d');
    addTrade('Connected to Binance WebSocket', '#00ff9d');
    addTrade('Scanning market for opportunities...', '#ffff00');

    // Fake initial position
    positionsList.innerHTML = `
        <div class="trade" style="border-color:#00ff9d">
            LONG BTC @ $68,420<br>
            <span class="green">+$184.50 (+2.3%)</span>
        </div>
    `;

    // Live updates
    setInterval(updatePrice, 1600);
    
    setInterval(() => {
        if (Math.random() > 0.65) {
            addTrade('New momentum signal detected', '#ffff00');
        }
    }, 7200);
};