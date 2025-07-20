// dashboard.js
document.addEventListener("DOMContentLoaded", () => {
    console.log("Dashboard Loaded");
  
    // ─── Dashboard Data Generation ────────────────────────────────────
    function generateRandomPercentage() {
      return Math.floor(Math.random() * 100) + "%";
    }
    function generateRandomNotification() {
      const notifications = [
        "High power consumption detected!",
        "New software update available.",
        "System running optimally.",
        "Voltage fluctuations detected!",
        "Energy-saving mode activated!"
      ];
      return notifications[Math.floor(Math.random() * notifications.length)];
    }
    function generateRandomSystemStatus() {
      const statuses = ["Healthy", "Warning", "Critical"];
      return statuses[Math.floor(Math.random() * statuses.length)];
    }
  
    function updateDashboard() {
      const profileInfo = document.getElementById("profile-info");
      if (profileInfo) profileInfo.innerText = "Account: Premium | Energy Plan: Residential";
  
      const notificationInfo = document.getElementById("notification-info");
      if (notificationInfo) notificationInfo.innerText = generateRandomNotification();
  
      const systemStatus = document.getElementById("system-status");
      if (systemStatus) systemStatus.innerText = "Status: " + generateRandomSystemStatus();
  
      const performanceScore = document.getElementById("performance-score");
      if (performanceScore) performanceScore.innerText = "Efficiency: " + generateRandomPercentage();
    }
  
    updateDashboard();
    setInterval(updateDashboard, 5000);
  
    // ─── Performance Gauge ─────────────────────────────────────────────
    const performanceCanvas = document.getElementById("performanceGauge");
    if (performanceCanvas) {
      const ctx = performanceCanvas.getContext("2d");
      let performanceGauge = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Load Time"],
          datasets: [{
            data: [1.2, (3 - 1.2).toFixed(2)],
            backgroundColor: ["#00e676", "#e0e0e0"],
            cutout: "80%",
            borderWidth: 0
          }]
        },
        options: {
          rotation: -90,
          circumference: 180,
          plugins: {
            tooltip: { enabled: false },
            legend: { display: false }
          }
        }
      });
  
      function updatePerformanceMetrics() {
        const loadSpeed     = (Math.random() * 3).toFixed(2);
        const responsiveness = Math.floor(Math.random() * 100);
        const latency       = Math.floor(Math.random() * 100);
  
        performanceGauge.data.datasets[0].data = [
          loadSpeed,
          (3 - loadSpeed).toFixed(2)
        ];
        performanceGauge.update();
  
        document.getElementById("loadSpeed")     .innerText = `Load Speed: ${loadSpeed}s`;
        document.getElementById("responsiveness").innerText = `Responsiveness: ${responsiveness}%`;
        document.getElementById("latency")       .innerText = `Latency: ${latency}ms`;
      }
  
      updatePerformanceMetrics();
      setInterval(updatePerformanceMetrics, 5000);
    }
  
    // ─── Voltage Alert ─────────────────────────────────────────────────
    const refreshButton = document.querySelector(".refresh-btn");
    let voltage = Math.floor(Math.random() * 300);
  
    function showNotification(message, type = "error") {
      const notif = document.createElement("div");
      notif.classList.add("notification", type);
      notif.innerHTML = `<strong>⚠ Alert:</strong> ${message}`;
      document.body.appendChild(notif);
  
      setTimeout(() => notif.classList.add("show"), 100);
      setTimeout(() => {
        notif.classList.remove("show");
        setTimeout(() => notif.remove(), 500);
      }, 5000);
    }
  
    function checkVoltage() {
      if (voltage > 250) {
        showNotification(`High Voltage Detected! (${voltage}V) Reduce consumption!`);
      }
    }
  
    checkVoltage();
    if (refreshButton) {
      refreshButton.addEventListener("click", () => {
        voltage = Math.floor(Math.random() * 300);
        checkVoltage();
      });
    }
  
    // ─── “Manage Profile” Button ───────────────────────────────────────
    const manageProfileBtn = document.getElementById("manage-profile-btn");
    if (manageProfileBtn) {
      manageProfileBtn.addEventListener("click", () => {
        window.location.href = "settings.html";
      });
    }
  
    // ─── Chatbot Module ────────────────────────────────────────────────
    function initChatbot() {
      const TARIFF  = 7.5;
      const INTENTS = [
        { name: "BILL_EXPLAIN", pattern: /(bill mismatch|my bill|₹\s*\d+)/i },
        { name: "GRAPH_EXPLAIN",pattern: /(weekly graph|explain weekly graph|day vs night|blue|yellow)/i },
        { name: "TOP_APPLIANCE",pattern: /(appliance|which appliance|uses most)/i },
        { name: "DAY_NIGHT",   pattern: /(day vs night|night usage|day usage)/i },
        { name: "ESTIMATE",    pattern: /(estimate|per unit|₹\s*\d+\s*per)/i },
        { name: "TIPS",        pattern: /(tips|energy saving tips|save energy)/i }
      ];
      const TEMPLATES = {
        BILL_EXPLAIN:   explainBill,
        GRAPH_EXPLAIN:  () => explainGraph(),
        TOP_APPLIANCE:  `Your pie chart shows the AC uses the most energy (35%), followed by the fridge (20%). Tip: Raising your AC thermostat by 1–2°C can save energy.`,
        DAY_NIGHT:      `You used 30 kWh at night and 20 kWh during the day. Avoiding peak hours (6–10 pm) can help reduce your bill.`,
        ESTIMATE:       `At ₹${TARIFF}/unit, monthly estimate = ₹${(150 * TARIFF).toFixed(2)}.`,
        TIPS:           `• Use LED bulbs\n• Turn off standby appliances\n• Avoid peak hours (6–10 pm).`,
        FALLBACK:       `Sorry, I didn’t understand that. Try “Explain weekly graph” or “Energy saving tips”.`
      };
  
      // chatbot DOM refs
      const container = document.getElementById("chatbot-container");
      const log       = document.getElementById("chatbot-messages");
      const input     = document.getElementById("chat-input-field");
      const sendBtn   = document.getElementById("chat-send");
      const toggleBtn = document.getElementById("chatbot-toggle");
      const closeBtn  = document.getElementById("chatbot-close");
  
      function appendBot(msgText) {
        const msg = document.createElement("div");
        msg.className = "bot-message";
        msg.innerText = msgText;
        log.appendChild(msg);
        log.scrollTop = log.scrollHeight;
      }
  
      function renderChips() {
        document.querySelectorAll(".suggestion-chips").forEach(el => el.remove());
        const chipBox = document.createElement("div");
        chipBox.className = "suggestion-chips";
        [
          "Bill mismatch",
          "Explain weekly graph",
          "Which appliance uses most?",
          "Day vs Night usage",
          "Energy saving tips"
        ].forEach(label => {
          const btn = document.createElement("button");
          btn.className = "chip";
          btn.innerText = label;
          btn.onclick = () => {
            input.value = label;
            sendMessage();
          };
          chipBox.appendChild(btn);
        });
        container.querySelector("#chatbot-window")
                 .insertBefore(chipBox, log);
      }
  
      function explainGraph() {
        const wd = window.weeklyData || {};
        if (!wd.dayUsage || !wd.nightUsage) {
          return "Blue bars = daytime usage; yellow = nighttime.";
        }
        const dayTotal   = wd.dayUsage.reduce((a,b)=>a+b,0);
        const nightTotal = wd.nightUsage.reduce((a,b)=>a+b,0);
        return `Weekly total: day ${dayTotal} kWh, night ${nightTotal} kWh.`;
      }
  
      function explainBill(txt) {
        const m = txt.match(/₹\s*(\d+)/);
        const amt = m ? +m[1] : null;
        if (!amt) return "Invalid bill amount.";
        const wd = window.weeklyData || {};
        if (wd.dayUsage && wd.nightUsage) {
          const total    = wd.dayUsage.concat(wd.nightUsage).reduce((a,b)=>a+b,0);
          const expected = (total * TARIFF).toFixed(2);
          const diff     = (amt - expected).toFixed(2);
          return `You used ${total} kWh → ₹${expected}. Difference ₹${diff}.`;
        }
        const units = (amt / TARIFF).toFixed(2);
        return `₹${amt} @ ₹${TARIFF}/unit = ${units} kWh.`;
      }
  
      function sendMessage() {
        const text = input.value.trim();
        if (!text) return;
        const userMsg = document.createElement("div");
        userMsg.className = "user-message";
        userMsg.innerText = text;
        log.appendChild(userMsg);
        input.value = "";
        log.scrollTop = log.scrollHeight;
  
        let reply = TEMPLATES.FALLBACK;
        for (const intent of INTENTS) {
          if (intent.pattern.test(text)) {
            const tmpl = TEMPLATES[intent.name];
            reply = typeof tmpl === "function" ? tmpl(text) : tmpl;
            break;
          }
        }
  
        const typing = document.createElement("div");
        typing.className = "bot-message typing";
        log.appendChild(typing);
        log.scrollTop = log.scrollHeight;
  
        setTimeout(() => {
          typing.remove();
          appendBot(reply + "\nAnything else?");
          renderChips();
        }, 800);
      }
  
      // wire up events
      sendBtn .addEventListener("click", sendMessage);
      input   .addEventListener("keydown", e => {
        if (e.key === "Enter") { e.preventDefault(); sendMessage(); }
      });
      toggleBtn.addEventListener("click", () => {
        const isOpen = container.classList.toggle("open");
        if (isOpen) {
          log.innerHTML = "";
          appendBot("👋 Hi! I'm your SmartWatts Assistant. Choose a suggestion or type below.");
          renderChips();
          input.focus();
        }
      });
      closeBtn.addEventListener("click", () => {
        container.classList.remove("open");
        log.innerHTML = "";
        document.querySelectorAll(".suggestion-chips").forEach(el=>el.remove());
      });
      document.addEventListener("click", e => {
        if (container.classList.contains("open") && !container.contains(e.target)) {
          closeBtn.click();
        }
      });
    }
    initChatbot();
  });
  