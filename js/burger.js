let burger = document.querySelector('.header__burger');
const burgerMenu = document.querySelector('.header__burger-menu');

burger.addEventListener('click', (e) => {
	e.preventDefault;
	burger.classList.toggle('header__burger_active');
	burgerMenu.classList.toggle('header__burger-menu_active');

	document.addEventListener('click', (e) => {
		if (e.target !== burger)
		{
			burger.classList.remove('header__burger_active');
		burgerMenu.classList.remove('header__burger-menu_active');
		}
	});
	
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Tab' || e.key === 'Escape') {
			burger.classList.remove('header__burger_active');
			burgerMenu.classList.remove('header__burger-menu_active')
		}
	});
});