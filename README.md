# 📝 Blog App

A simple and clean React-based blog application that allows users to **create**, **view**, and **delete** blog posts.

## 🚀 Features

- ➕ Add a new blog post with a title and content
- 👀 View a list of all blog posts
- ❌ Delete any blog post
- ⚡ Built using React, React Router, and Context API for seamless state management

## 📂 Project Structure

```bash
📦src
 ┣ 📂api
 ┃ ┗ 📜mockApi.js              # Mocked API or static data
 ┣ 📂assets                    # Static images or files
 ┣ 📂components
 ┃ ┣ 📂blog
 ┃ ┃ ┗ 📜BlogList.jsx          # Displays list of blogs
 ┃ ┗ 📂common
 ┃   ┗ 📜Navbar.jsx            # Top navigation bar
 ┣ 📂contexts
 ┃ ┗ 📜BlogProvider.jsx        # Blog context and state management
 ┣ 📂pages
 ┃ ┣ 📜CreateBlog.jsx          # Page to create a new blog post
 ┃ ┣ 📜Home.jsx                # Homepage showing all blog posts
 ┃ ┗ 📜ShowBlog.jsx            # Page to view a single blog post
 ┣ 📂routes
 ┃ ┗ 📜AppRouter.jsx           # React Router configuration
 ┣ 📂styles
 ┃ ┗ 📜style.css               # Global CSS styles
 ┣ 📜App.jsx                   # Root component with main layout
 ┗ 📜main.jsx                  # Application entry point
```

## 🛠️ Tech Stack

- ⚛️ React
- 🔁 React Router
- 🧠 Context API
- 🧑‍💻 JavaScript (ES6+)
- 💨 Tailwind CSS *(if used)*

## 🧪 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/PRANTO-X/Blog_App.git
cd Blog_App
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

### 4. Open in Browser

Go to: [http://localhost:5173](http://localhost:5173)

## 📄 Available Pages

| Page                | Route              | Description                         |
|---------------------|--------------------|-------------------------------------|
| Home                | `/`                | Shows all blog posts                |
| Create Blog         | `/create`          | Form to add a new blog              |
| Blog Detail         | `/blogs/:id`       | View details of a specific blog     |
| Not Found           | `*`                | Shown for invalid routes            |


## 🚧 Future Improvements

- ✏️ Edit blog functionality
- 🔍 Search and filter blogs
- 📦 Backend integration (e.g., Firebase, Express API)
- 🧾 Rich text editor support

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

> Built with ❤️ by [PRANTO-X](https://github.com/PRANTO-X)