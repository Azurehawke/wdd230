const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
	navigation.setAttribute('aria-hidden', navigation.classList.contains('open') ? 'false' : 'true');
});

document.addEventListener('DOMContentLoaded', () => {
	const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 3 = Wednesday
	const banner = document.getElementById('banner');
	const closeBanner = document.getElementById('close-banner');
  
	// Show banner on Monday (1), Tuesday (2), or Wednesday (3)
	if (today >= 1 && today <= 3) {
	  banner.style.display = 'block';
	}
  
	// Close banner on button click
	closeBanner.addEventListener('click', () => {
	  banner.style.display = 'none';
	});
  
	const lastModified = document.getElementById('last-modified');
	lastModified.textContent = document.lastModified;
  
	const menuButton = document.getElementById('menu');
	const nav = document.querySelector('nav');
  
	menuButton.addEventListener('click', () => {
	  menuButton.classList.toggle('open');
	  nav.classList.toggle('open');
  
	  const isOpen = nav.classList.contains('open');
	  nav.setAttribute('aria-hidden', !isOpen);
	  menuButton.setAttribute('aria-expanded', isOpen);
	});
  });