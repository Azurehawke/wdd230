// dark.js
document.addEventListener('DOMContentLoaded', () => {
    const themeSelect = document.getElementById('theme');
    
    // Function to set the theme
    const setTheme = (theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme); // Persist theme choice
    };
  
    // Load saved theme from localStorage, default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    themeSelect.value = savedTheme; // Update select element to reflect saved theme
  
    // Listen for changes to the select element
    themeSelect.addEventListener('change', (event) => {
      const selectedTheme = event.target.value;
      setTheme(selectedTheme);
    });
  });