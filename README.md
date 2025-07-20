# 🔌 SmartMeter IoT System

A complete IoT-based Smart Meter solution that provides real-time monitoring of electrical appliances, cost estimation, remote control functionality, and secure access via a web dashboard.

---

## 📦 Project Overview

This SmartMeter project was developed during a hackathon to address modern energy management challenges. It integrates **hardware-based current & voltage sensing**, **cloud data handling via Firebase**, and a **responsive web interface** to give consumers full control over their power usage — down to the individual socket level.

The project uniquely features a **hidden, compact meter box** that sits behind switchboards and monitors connected appliances. This allows precise appliance-level tracking, distinguishing it from many generic smart meters in the market.

 This repo doesn't consist of the entire project work/code for security reasons but would provide u the base design were u could show your creativity and talent.

---

## 🚀 Features

- 🔌 **Real-time Monitoring**: View live voltage, current, and power usage of each connected socket.
- 💰 **Cost Estimation**: Calculates approximate energy costs per appliance.
- 🌐 **Remote Control**: Switch appliances ON/OFF via the web dashboard.
- 🔐 **User Authentication**: Secured login with Firebase Authentication.
- 📈 **Live Sync with Firebase**: Real-time data updates using Firebase Realtime Database.
- 🧰 **Modular Web Interface**: Built with HTML, CSS, and JavaScript.

---

## 🛠️ Tech Stack

| Component            | Technology Used        |
|---------------------|------------------------|
| Hardware            | ESP32/ESP8266, Current & VoltageT Sensors, Relays |
| Backend (Realtime)  | Firebase Realtime DB & Auth |
| Frontend            | HTML, CSS, JavaScript  |
| Communication       | HTTP/REST or MQTT (based on version) |



## 🔧 Installation & Setup

### 📟 Hardware Side (Microcontroller)
1. Connect sensors to read voltage and current.
2. Integrate relay modules for appliance control.
3. Upload firmware (e.g., using Arduino IDE) that sends data to Firebase.

### 🌐 Web Dashboard
1. Clone this repository:
   ```bash
   git clone https://github.com/Shevdeyash/smartmeter.git
   cd smartmeter-iot
