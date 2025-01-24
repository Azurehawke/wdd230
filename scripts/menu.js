const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
	navigation.setAttribute('aria-hidden', navigation.classList.contains('open') ? 'false' : 'true');
});