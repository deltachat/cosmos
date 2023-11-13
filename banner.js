document.addEventListener('DOMContentLoaded', function () {
	const target = document.createElement('div');
	document.body.appendChild(target);
	target.innerHTML = `<div class="deltachat-banner" lang="en">
	<a href="https://delta.chat">deltachat</a>
	 &middot; 
	<a href="https://webxdc.org">webxdc</a>
	 &middot; 
	<a href="https://bots.delta.chat">bots</a>
	 &middot; 
	<a href="https://cosmos.delta.chat">cosmos</a>
</div><link rel="stylesheet" type="text/css" href="./banner.css">`;
	document.body.style.paddingBottom = document.querySelector('.deltachat-banner').getBoundingClientRect().height + 'px'
});
