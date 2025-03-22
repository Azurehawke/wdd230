document.addEventListener('DOMContentLoaded', () => {
    const submissionDate = document.getElementById('submission-date');
    submissionDate.value = new Date().toISOString();
  });