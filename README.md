<div align="center">
  <h1>🌍 EcoTrack 🌍</h1>
  <p><strong>Your Personal Carbon Footprint Tracker for SDG 13: Climate Action</strong></p>
  <p>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" />
  </p>
</div>

---

## 🌱 What is EcoTrack?
EcoTrack is a simple, organically grown web application designed to help you track your daily carbon emissions and become more mindful of your environmental impact! 

I built this project to tackle **Sustainable Development Goal 13: Climate Action**. By making our invisible emissions visible, we can take the first steps toward reducing our carbon footprint. 

## ✨ Features
* **📝 Activity Logger:** Log your daily transport, food, energy usage, and shopping habits!
* **🧮 Automatic CO₂ Calculation:** Uses standard emission factors to calculate the exact carbon cost of your activities.
* **📊 Live Dashboard:** See your total emissions for the day and week, visualized with a beautiful 7-day bar chart!
* **💡 Eco Tips:** Actionable tips to reduce your footprint (and save some cash while you're at it).
* **💾 Data Persistence:** Saves your data securely in a MongoDB cloud database!

## 🚀 Getting Started

Want to run EcoTrack on your own machine? It's super easy!

**1. Clone the repository**
```bash
git clone https://github.com/Naisha0403/EcoTrack.git
cd EcoTrack
```

**2. Install dependencies**
```bash
npm install
```

**3. Environment Variables**
Create a `.env` file in the root directory and add your MongoDB connection string:
```text
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/...
```

**4. Fire up the server!**
```bash
npm start
```
*Note: For development with auto-restarts, use `npm run dev`.*

**5. View the App**
Open your favorite browser and navigate to `http://localhost:3000` 🚀

## 🏗️ How it's Built
This is one of my first full-stack projects! 
- The **Frontend** is pure, unfiltered Vanilla JavaScript, HTML, and CSS (no massive frameworks here!). 
- The **Backend** is a lightweight Express.js server that reads and writes your data to a **MongoDB Atlas** database, beautifully integrated with Mongoose. 

### 📁 Project Structure
```text
EcoTrack/
├── backend/
│   └── server.js            # Monolithic Express backend (MongoDB logic)
├── frontend/
│   ├── css/
│   │   └── style.css        # Vanilla CSS styling
│   ├── js/
│   │   └── main.js          # Monolithic frontend logic
│   └── index.html           # Main application view
├── vercel.json              # Vercel deployment configuration
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── package.json             # Project metadata & scripts
└── README.md                # Project documentation
```

## 🔮 Future Plans (TODOs)
- [ ] Add user authentication (so my friends can track their footprints too).
- [ ] Maybe rewrite the frontend in React or Svelte if the Vanilla JS gets too messy. 😅
- [ ] Add gamification (badges for low-emission streaks!).

## 🤝 Contributing
Found a bug? Have a suggestion? Feel free to open an issue or submit a Pull Request! I'm always looking to learn and improve.

---
<div align="center">
  <p>Made for the Earth by Naisha Raj</p>
</div>
