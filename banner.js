document.addEventListener('DOMContentLoaded', function () {
	const target = document.createElement('div');
	document.body.appendChild(target);
	target.innerHTML = `<div class="deltachat-banner" lang="en">
	<a href="https://delta.chat">deltachat</a>
	<a href="https://webxdc.org">webxdc</a>
	<a href="https://bots.delta.chat">bots</a>
	<a href="https://deltachat.github.io/cosmos/">cosmos</a>
</div>`;
	document.body.style.paddingBottom = document.querySelector('.deltachat-banner').getBoundingClientRect().height + 'px'
});
