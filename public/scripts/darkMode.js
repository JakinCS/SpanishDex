// Script for activating dark mode when necessary

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.querySelector("html").setAttribute("data-bs-theme", "dark")
}