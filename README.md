# PDF Viewer 📄

A lightweight React app for uploading and previewing PDF files directly in the browser — no backend required.

## 🚀 Live Demo
[View on GitHub Pages](https://Oliwia-b.github.io/pdf-preview-app)

## 🛠 Technologies Used

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [react-pdf](https://github.com/wojtekmaj/react-pdf)
- HTML5
- CSS

## ✨ Features

- **Responsive design** — mobile and desktop friendly
- **Drag & drop** support for easy file uploads
- **PDF navigation** with page controls
- **Simulated loading progress bar** (based on file size only — for UX, not actual loading time)
- **Graceful error handling** for unsupported or unreadable files

## 📦 Installation

```bash
git clone https://github.com/Oliwia-b/pdf-preview-app.git
cd pdf-viewer
npm install
npm run dev
```

## Prompts used to build this project

1. I'm building a React app with Vite that will allow users to upload and preview PDF files. Write a component that: 
  - lets the user upload a file from disk
  - validates that the file is a PDF
  - displays the uploaded PDF using react-pdf
  - make sure it works with local uploaded files (not URLs) 
  - shows a simple fallback message if the file is invalid or unreadable
  Write all the CSS styles in separate file and write dependencies to be installed.

2. file upload works but then it displayes a file in form of a photo and below text from this pdf with a default formating

3. Instead of displaying pages of the uploaded file one below another, modify the component in order to navigate the document via the navbar with "current page of all pages" and arrows to go to the next or previous page

4. Add drag & drop functionality

5. Add file upload progress

6. Enhance the UI by making it responsive and more modern. It should be clean and simple. You can add some colors. Add a heading or pargraph (or both) on the top of the website that'll briefly describe what the website is for

7. Write a short readme including:
- technologies used
- info that there is no backend
- features: responsive design, drag & drop, highlight that the loading bar is simulated, just for UI improvement
