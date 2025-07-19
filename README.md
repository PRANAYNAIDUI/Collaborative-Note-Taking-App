# 📝 Collaborative Note-Taking App

A real-time, multi-user collaborative note-taking web application built using **Node.js**, **React**, **Socket.io**, and **MongoDB**. Think of it as your own live Google Docs! Users can create, edit, and share documents in real time, with support for version control, user presence, access permissions, and rollback functionality.  

---

## 🌐 Live Features Overview

✅ Real-time editing with WebSockets  
✅ Shared document model in MongoDB  
✅ WebSocket events for live sync  
🛠️ Modular and scalable backend with Express.js  
⚙️ React frontend with live updates and cursor tracking  
🔐 JWT-based authentication  
👥 User presence and cursor tracking  
🔄 Document versioning and rollback (Upcoming)

---

## 📁 Tech Stack

- **Frontend:** React, Context API, Socket.io-client  
- **Backend:** Node.js, Express.js, Socket.io  
- **Database:** MongoDB with Mongoose  
- **Auth:** JWT (JSON Web Tokens)  
- **Testing (Planned):** Mocha, Chai, Jest  
- **Styling:** CSS, Tailwind (optional)  

---

## ✅ Module-Wise Progress

| Module                        | Status     | Tasks Completed |
|------------------------------|------------|------------------|
| 🔌 WebSocket Setup            | ✅ Complete | 4/4              |
| 📄 Document Model             | ✅ Complete | 4/4              |
| 🔁 Real-Time Updates          | ✅ Complete | 4/4              |
| 🔐 User Authentication        | ⏳ In Progress | 0/4          |
| 📃 Document List              | ⏳ In Progress | 0/4          |
| 🕓 Version Control            | ❌ Not Started | 0/4          |
| 👥 User Presence & Cursor     | ⏳ In Progress | 1/4          |
| 🔑 Document Permissions       | ⏳ In Progress | 1/4          |
| ⏪ Version Rollback           | ❌ Not Started | 0/4          |
| 🎨 UI Enhancements            | ⏳ In Progress | 2/4          |
| 🧪 Testing                    | ❌ Not Started | 0/4          |

---

## 🚀 Getting Started

### 🛠 Prerequisites

- Node.js (v18+)
- MongoDB installed & running
- npm or yarn

---

### 📥 Installation

# Start backend
cd server
npm start

# Start frontend
cd ../client
npm start


---

Would you like me to:
- Generate this as a downloadable `.md` file?
- Add badges (e.g. build passing, license)?
- Include deployment instructions (Vercel, Render, etc.)?

Let me know!

```bash
# 1. Clone the repository
git clone https://github.com/PRANAYNAIDUI/Collaborative-Note-Taking-App.git
cd Collaborative-Note-Taking-App

# 2. Install backend dependencies
cd server
npm install

# 3. Install frontend dependencies
cd ../client
npm install
