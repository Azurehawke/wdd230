document.addEventListener('DOMContentLoaded', () => {
    const lastVisit = localStorage.getItem('lastVisit');
    const lastVisitDisplay = document.getElementById('last-visit');
    const now = Date.now();
  
    if (!lastVisit) {
      lastVisitDisplay.textContent = 'This is your first visit!';
    } else {
      const daysBetween = Math.floor((now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));
      lastVisitDisplay.textContent = `Days since your last visit: ${daysBetween}`;
    }
  
    localStorage.setItem('lastVisit', now);
  });