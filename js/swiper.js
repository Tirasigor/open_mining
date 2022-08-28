const slider = document.querySelector('.tabs__row');
const slides = Array.from(document.querySelectorAll('.tabs__column'));

let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationId = 0;

let currentIndex = 0;

window.addEventListener('resize', init);

function init() {
	currentTranslate = 0;
	setSliderPosition();
}


slides.forEach((slide, index) => {

	const slideImage = slide.querySelector('img');

	slide.addEventListener('touchstart', touchStart(index))
	slide.addEventListener('touchend', touchEnd)
	slide.addEventListener('touchmove', touchMove)

	slide.addEventListener('mousedown', touchStart(index))
	slide.addEventListener('mouseup', touchEnd)
	slide.addEventListener('mouseleave', touchEnd)
	slide.addEventListener('mousemove', touchMove)
});

window.oncontextmenu = function (event) {
	event.preventDefault();
	event.stopPropagation();
	return false;
}

window.addEventListener('resize', () => {
	slides.forEach((slide, index) => {

		const slideImage = slide.querySelector('img');

		slide.addEventListener('touchstart', touchStart(index))
		slide.addEventListener('touchend', touchEnd)
		slide.addEventListener('touchmove', touchMove)

		slide.addEventListener('mousedown', touchStart(index))
		slide.addEventListener('mouseup', touchEnd)
		slide.addEventListener('mouseleave', touchEnd)
		slide.addEventListener('mousemove', touchMove)
	});
})

function touchStart(index) {
	if (window.innerWidth <= 767) {
		return function (event) {
			currentIndex = index;
			startPos = getPositionX(event);
			isDragging = true;

			animationId = requestAnimationFrame(animation);
			slider.classList.add('grabbing');
		}
	}
}

function touchEnd() {
	if (window.innerWidth <= 767) {
		isDragging = false;
		cancelAnimationFrame(animationId);

		const movedBy = currentTranslate - prevTranslate

		if (movedBy < -30 && currentIndex < slides.length - 1) {
			currentIndex += 1;
		}

		if (movedBy > 30 && currentIndex > 0) {
			currentIndex -= 1;
		}

		setPositionByIndex();

		slider.classList.remove('grabbing');
	}
}

function touchMove(event) {
	if (window.innerWidth <= 767) {
		if (isDragging) {
			const currentPosition = getPositionX(event);
			currentTranslate = prevTranslate + currentPosition - startPos;
		}
	}
}

function getPositionX(event) {
	return event.type.includes('mouse') ? event.pageX :
		event.touches[0].clientX;
}

function animation() {
	setSliderPosition();
	if (isDragging) {
		requestAnimationFrame(animation);
	}
}

function setSliderPosition() {
	slider.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
	currentTranslate = currentIndex * -slides[0].offsetWidth;
	prevTranslate = currentTranslate;
	setSliderPosition();
}