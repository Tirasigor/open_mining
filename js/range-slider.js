const rangeSliderMass = document.querySelectorAll('.label-item__slider');

let power = 50;
let days = 180;

const setRangeSlider = (i, value) => {
	let sliderValue = value;

	rangeSliderMass[i].noUiSlider.set(sliderValue);
};

if (rangeSliderMass[0]){
	noUiSlider.create(rangeSliderMass[0], {
		start: 50,
		connect: 'lower',
		step: 1,
		range: {
			'min': 10,
			'max': 1000
		}
	});

	const input0 = document.getElementById('input-0');

	rangeSliderMass[0].noUiSlider.on('update', function(values, handle){
		input0.value = Math.round(values);
		power = input0.value;
		document.querySelector('.number').innerHTML = power * days * 10;
		document.querySelector('.crypt-profit').innerHTML = ((power / 180) * 10 / 2).toFixed(2);
	});

	input0.addEventListener('change', (e) => {
		rangeSliderMass[0].noUiSlider.set(e.currentTarget.value);
	})



}

if (rangeSliderMass[1]){
	noUiSlider.create(rangeSliderMass[1], {
		start: 180,
		connect: 'lower',
		step: 1,
		range: {
			'min': 90,
			'max': 365
		}
	});

	const input1 = document.getElementById('input-1');

	rangeSliderMass[1].noUiSlider.on('update', function(values, handle){
		input1.value = Math.round(values);
		days = input1.value;
		document.querySelector('.number').innerHTML = power * days * 10;
	});

	input1.addEventListener('change', (e) => {
		rangeSliderMass[1].noUiSlider.set(e.currentTarget.value);
	})
}