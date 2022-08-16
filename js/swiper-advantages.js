const sliderA = document.querySelector('.advantages__body');
const slidesA = Array.from(document.querySelectorAll('.advantages__item'));
const slidesAtext = Array.from(document.querySelectorAll('.advantages__text'));

let isDraggingA = false;
let startPosA = 0;
let currentTranslateA = 0;
let prevTranslateA = 0;
let animationIdA = 0;

let currentIndexA = 0;

window.addEventListener('resize', init);

function init(){
	currentTranslateA = 0;
	setsliderAPosition();
}

slidesAtext.forEach((slide, index) => {
	const slideImage = slide.querySelector('img');
//	slideImage.addEventListener('dragstart', (e) => e.preventDefault());

	slide.addEventListener('touchstart', touchStartA(index));
	slide.addEventListener('touchend', touchEndA);
	slide.addEventListener('touchmove', touchMoveA);

	slide.addEventListener('mousedown', touchStartA(index));
	slide.addEventListener('mouseup', touchEndA);
	slide.addEventListener('mouseleave', touchEndA);
	slide.addEventListener('mousemove', touchMoveA);
})

slidesA.forEach((slide, index) => {
	const slideImage = slide.querySelector('img');
	slideImage.addEventListener('dragstart', (e) => e.preventDefault());

	slide.addEventListener('touchstart', touchStartA(index));
	slide.addEventListener('touchend', touchEndA);
	slide.addEventListener('touchmove', touchMoveA);

	slide.addEventListener('mousedown', touchStartA(index));
	slide.addEventListener('mouseup', touchEndA);
	slide.addEventListener('mouseleave', touchEndA);
	slide.addEventListener('mousemove', touchMoveA);
})

window.oncontextmenu = function (event) {
	event.preventDefault();
	event.stopPropagation();
	return false;
}

function touchStartA(index) {
	if (screen.width <= 767) {
		return function (event) {
			currentIndexA = index;
			startPosA = getPositionXA(event);
			isDraggingA = true;

			animationIdA = requestAnimationFrame(animationA);
			sliderA.classList.add('grabbing');
		}
	}
}

function touchEndA() {
	if (screen.width <= 767) {
		isDraggingA = false;
		cancelAnimationFrame(animationIdA);

		const movedBy = currentTranslateA - prevTranslateA

		if (movedBy < -100 && currentIndexA < 1) {
			currentIndexA += 1;
		}

		if (movedBy > 100 && currentIndexA > 0) {
			currentIndexA -= 1;
		}

		setPositionByIndexA();

		sliderA.classList.remove('grabbing');
	}
}

function touchMoveA(event) {
	if (screen.width <= 767) {
		if (isDraggingA) {
			const currentPosition = getPositionXA(event);
			currentTranslateA = prevTranslateA + currentPosition - startPosA;
		}
	}
}

function getPositionXA(event) {
	return event.type.includes('mouse') ? event.pageX :
		event.touches[0].clientX;
}

function animationA() {
	setsliderAPosition();
	if (isDraggingA) {
		requestAnimationFrame(animationA);
	}
}

let isFirst = true;

function setsliderAPosition() {
	sliderA.style.transform = `translateX(${currentTranslateA}px)`;
}

function setPositionByIndexA() {
	if (isFirst){
		isFirst = false;
		currentIndexA = 0;
	} else {
		isFirst = true;
		currentIndexA = 1;
	}
	currentTranslateA = currentIndexA * -slidesA[0].offsetWidth;
	prevTranslateA = currentTranslateA;
	setsliderAPosition();
}