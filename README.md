## 🔍 FindrZon

![2025-04-24 15-29-11](https://github.com/user-attachments/assets/729c5647-4f18-4810-ae59-e496f9888b35)

**FindrZon** is a fullstack web application that scrapes product listings from the first page of search results on [Amazon.com](https://www.amazon.com). It displays product title, rating, number of reviews, product image, and link of image in a clean and responsive interface.

This project was built as part of a trainee application challenge using **Bun**, **Express**, **Axios**, **JSDOM**, **Vite**, **HTML**, **CSS**, and **Vanilla JavaScript**.

---

### ⚙️ Technologies

- Bun (backend runtime)
- Express
- Axios
- JSDOM
- Vite
- HTML5 + CSS3
- Vanilla JavaScript

---

### 🚀 Getting Started

### ✅ Prerequisites

#### 1. Install Bun

**macOS / Linux:**

```bash
curl -fsSL https://bun.sh/install | bash
```

To install a specific version:

```bash
curl -fsSL https://bun.sh/install | bash -s "bun-v1.2.10"
```

**Windows (PowerShell):**

```powershell
powershell -c "irm bun.sh/install.ps1|iex"
```

More info: [https://bun.sh](https://bun.sh)

---

#### 2. Install Node.js (for the frontend)

Download the latest **LTS version** from [https://nodejs.org](https://nodejs.org).  
Make sure to check **"Add to PATH"** during installation.

Verify installation:

```bash
node -v
npm -v
```

---

### 🧰 Installation

### 📁 Clone the project

```bash
git clone https://github.com/your-username/findrzon.git
cd findrzon
```

---

### ▶ Backend Setup (Bun)

```bash
cd backend
bun install
bun add express axios jsdom cors
bun index.js
```

Backend will be available at:  
`http://localhost:3000/api/scrape?keyword=iphone`

---

### 💻 Frontend Setup (Vite)

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at:  
`http://localhost:5173`

---

### 🔎 How It Works

1. Type a search keyword in the input field.
2. Click "Search" or press `Enter`.
3. The app fetches and displays up to 15 products from Amazon.com with:
   - Title
   - Rating
   - Number of reviews
   - Image
   - Image Link

You can click **"← New Search"** to reset and search again.

---

### 🎯 Features

- Clean and responsive UI
- Fully functional backend built with Bun
- Friendly loading animation and error handling
- Cross-origin requests enabled via `cors`
- Lightweight and easy to run locally

---

### 📸 Preview
![2025-04-24 15-29-11](https://github.com/user-attachments/assets/03195c69-a4bf-4010-9b67-4e5f4b93b81d)
---

### 📁 Project Structure

```
findrzon/
├── backend/
│   ├── index.js
│   └── ...
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── main.js
```

---

### 📄 License

This project is for educational and technical assessment purposes only.  
**Not intended for commercial use or production deployment.**

---
