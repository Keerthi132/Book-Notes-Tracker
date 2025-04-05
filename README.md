# 📚 Book Notes Tracker

## 📖 Overview
Book Notes Tracker is a simple and intuitive web application that helps users keep track of the books they read. Users can add books, rate them, store notes, and view book cover images fetched from the Open Library Covers API.

## ✨ Features
- 📌 **Add New Books** – Store book details including title, author, rating, and notes.
- 📷 **Book Cover Display** – Automatically fetch and display book covers using the Open Library Covers API.
- ✏️ **Edit Books** – Modify book details whenever needed.
- 🗑 **Delete Books** – Remove books from the tracker.
- 📊 **Sorting & Filtering** – Books can be sorted by rating and recency.
- 🌐 **Responsive Design** – It will have a user-friendly experience across all devices.

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js
- **Frontend**: EJS, HTML, CSS
- **Database**: PostgreSQL
- **API Integration**: Open Library Covers API

## 🚀 Installation & Setup

### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

### Steps to Run Locally
1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-username/book-notes-tracker.git
   cd book-notes-tracker
   ```
2. **Install Dependencies**
   ```sh
   npm install
   ```
3. **Set Up Environment Variables**
   - Create a `.env` file in the root directory and add:
     ```env
     DATABASE_URL=your_postgres_database_url
     ```
4. **Run the Server**
   ```sh
   node index.js
   ```
5. **Open in Browser**
   Visit `http://localhost:3000` to use the application.

## 🏆 Future Enhancements
- 🔍 Search functionality
- 📅 Book reading progress tracking
- 📊 Statistics and insights on reading habits

## 📝 License
This project is open-source and available under the MIT License.

## 💬 Feedback & Contributions
Contributions are welcome! Feel free to submit an issue or pull request on GitHub.

---

Happy reading! 📖✨
