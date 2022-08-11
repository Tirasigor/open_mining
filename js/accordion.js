document.querySelectorAll('.faq__accordion-trigger').forEach(function (item) {
	item.addEventListener('click', () => {
		const parent = item.parentNode;
		parent.classList.toggle('faq__accordion-item_active');
	})
}
)