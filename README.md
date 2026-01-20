# ✈️ Airport Schedule Monitoring System (Flight + Shuttle Management)

A **Full Stack MERN Project** that helps airports monitor and manage **flight schedules**, **runway operations**, and **internal/external shuttle services** in real time.
It includes dedicated dashboards for **Admin**, **Staff**, and **Passengers** with an upcoming **AI-powered Airport Assistant Chatbot** using **RAG (Retrieval Augmented Generation) built in n8n**.

---

## 🌟 Project Highlights

✅ Admin Dashboard for controlling airport operations
✅ Staff Access & Permissions Management
✅ Passenger Dashboard to track flights and shuttle info
✅ Internal & External Shuttle Bus Management
✅ Flight schedule management (On Time / Delayed / Cancelled)
✅ Real-time UI updates using API integration
✅ **Unique Feature:** AI Chatbot (RAG) using **n8n + MongoDB data** (in progress / integration phase)

---

## 🧠 Unique Feature: AI Airport Assistant Chatbot (RAG)

This project includes an intelligent chatbot designed as an **Airport Assistant**.

### 🔥 What it can do

* Answer passenger questions like:

  * “What is the status of flight AI220?”
  * “Which gate is my flight assigned to?”
  * “Show internal shuttle pickup and drop locations”
* Respond only using **airport database context** (no hallucination)

### 🛠️ Built using

* **n8n workflows**
* **MongoDB collections as knowledge source**
* Retrieval + context injection into LLM (RAG pipeline)
* Strict system prompt to avoid guessing

📌 The chatbot UI is created in frontend, and backend AI integration is planned through n8n endpoints.

---

## 👨‍💻 Modules Included

### 👑 Admin Module

* Dashboard with total flights stats
* Add/Edit flight details
* Bulk update flights
* Manage runway status
* Manage internal & external shuttles
* Staff management: allow/deny access

### 🧑‍✈️ Staff Module

* Staff login system
* Access control by Admin approval
* View assigned responsibilities

### 🧳 Passenger Module

* Passenger dashboard
* Search flight by flight number
* View flight status table
* View shuttle services (internal & external)
* Upcoming chatbot assistant panel for help

---

## 🖥️ Tech Stack

### Frontend

* React.js
* CSS (Custom Professional UI)
* React Router DOM
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Local / Compass)

### AI / Automation

* n8n Workflow Automation
* RAG pipeline using MongoDB context
* LLM integration (Future implementation)

---

## 📂 Folder Structure

```bash
Airport-Sidual-Monitoring-System/
│
├── Backend/        # Node + Express + MongoDB APIs
└── Frontend/       # React UI (Admin/Staff/Passenger Dashboards)
```

---

## ⚙️ Setup & Run Locally

### 1️⃣ Clone Repo

```bash
git clone https://github.com/praveen2007-VY/Airport-Sidual-Monitoring-System-.git
cd Airport-Sidual-Monitoring-System-
```

### 2️⃣ Start Backend

```bash
cd Backend
npm install
npm start
```

### 3️⃣ Start Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

## 📸 Screenshots

<img width="1917" height="917" alt="image" src="https://github.com/user-attachments/assets/e34f180f-a1da-478f-b40a-86faca30c42c" />
Example:

* ✅ Admin Dashboard
* ✅ Passenger Dashboard
* ✅ Shuttle Management
* ✅ Chatbot UI

---

## 🚀 Future Enhancements

🔹 Fully connect AI Chatbot to backend using n8n webhook API
🔹 Add PDF Ticket Upload & Summary feature in chatbot
🔹 Flight alert notifications (Email/WhatsApp)
🔹 Add OTP-based passenger authentication
🔹 Better analytics dashboard for admin

---

## 🎯 Use Case

This project can be used for:

* Airport flight operations monitoring
* Shuttle coordination between terminals & city
* Passenger self-service flight tracking
* AI-based quick help assistant

---

## 👤 Author

**Praveen R**
2nd Year College Student-KIT CBE | MERN Developer
📌 Project for Hackathon / Academic Submission

---

## ⭐ Support

If you like this project, don’t forget to ⭐ star the repository!
