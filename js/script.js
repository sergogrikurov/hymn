const inputNum = document.querySelector('.inputNum');
const inputText = document.querySelector('.inputText');
const iBtn = document.querySelector('.i-btn');
const hCont = document.querySelector('.hymns-container');
const gimnNum = document.querySelector('.gimnNum');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const footer = document.querySelector('.footer');
const main = document.querySelector('.main');
const play = document.querySelector('.play');
const stopP = document.querySelector('.stop');
const pause = document.querySelector('.pause');
const search = document.querySelector('.search');
const header = document.querySelector('.header');
const himnWrapper = document.querySelector('.himn-wrapper');
const strContainer = document.querySelector('.str-container');

//=======================================================//

inputNum.focus();
inputNum.addEventListener('input', () => inputText.value = '');
inputText.addEventListener('input', () => inputNum.value = '');

//=======================================================//

let song = new Audio();

function songSrc() {
	const gStr = document.querySelector('.gNum').textContent;
	gNum = Number(gStr);
	song.src = `./audio/${gNum}.ogg`;
}

//=======================================================//

inputNum.oninput = function () {
	if (this.value.length > this.maxLength) {
		this.value = this.value.slice(0, this.maxLength);
	}
}

//=======================================================//

inputNum.addEventListener('input', e => {
	e.target.value = e.target.value.replace(/^0/, '');
	if (e.target.value > 10) { //потом заменить на 800
		e.target.value = '';
	}
});

inputText.addEventListener('input', e => {
	const inputsArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '.', '!', '?', '-', '+', '=', ':', ';',
		'"', '|', '\\', '<', '>', '/', '*', '@', '#', '$', '%', '^', '&', '(', ')', '[', ']', '{', '}', '~', '`', '\''];
	const arr_en = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
	const arr_EN = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	let arr_ru = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ы', 'ъ', 'э', 'ю', 'я'];
	let arr_RU = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ь', 'Ы', 'Ъ', 'Э', 'Ю', 'Я'];
	for (let i = 0; i < inputsArr.length; i++) {
		if (e.target.value === inputsArr[i] || e.target.value === arr_en[i] || e.target.value === arr_EN[i] || e.target.value === arr_ru[i] || e.target.value === arr_RU[i]) {
			e.target.value = '';
		}
	}
});

//=======================================================//

let sum = 0;

iBtn.addEventListener('click', () => {
	const data = inputNum.value;
	if (data !== '') {
		main.classList.add('none');
		himnWrapper.classList.remove('none');
		prev.classList.remove('hide');
		next.classList.remove('hide');
		stopP.classList.add('none');
		pause.classList.add('none');
		play.classList.remove('none');
		sum = data - 1;
		hCont.innerHTML = `${pages[sum].page}`;
		gNumber();
		songSrc();
		if (gimnNum.textContent === 'ჰიმნი 1') {
			prev.classList.add('hide');
		}
		if (gimnNum.textContent === 'ჰიმნი 10') {//поменять на 800
			next.classList.add('hide');
		}
	}
})

//=======================================================//

iBtn.addEventListener('click', () => {
	const dadaText = inputText.value.trim();
	for (let key in pages) {
		if (pages[key].page.includes(dadaText) && dadaText !== '' && dadaText.length > 7) {
			main.classList.add('none');
			strContainer.classList.remove('none');
			let str = pages[key].title;
			let num = pages[key].num;
			strContainer.innerHTML += `<li class="str-li" data="${key}">${str}<span>${num}</span></li>`;
		}
	}
	document.querySelectorAll('.str-li').forEach(item => {
		item.onclick = function () {
			strContainer.classList.add('none');
			himnWrapper.classList.remove('none');
			stopP.classList.add('none');
			pause.classList.add('none');
			play.classList.remove('none');
			strContainer.innerHTML = '';
			let s = this.getAttribute('data');
			let n = Number(s);
			hCont.innerHTML = `${pages[n].page}`;
			gNumber();
			songSrc();
			sum = n;
			if (gNum == 1) {
				prev.classList.add('hide');
				next.classList.remove('hide');
			}
			if (gNum == 10) {//поменять на 800
				next.classList.add('hide');
				prev.classList.remove('hide');
			}
			if (gNum > 1 && gNum < 10) {//поменять на 800
				next.classList.remove('hide');
				prev.classList.remove('hide');
			}
		}
	})


})

//=======================================================//

prev.onclick = function () {
	next.classList.remove('hide');
	hCont.innerHTML = `${pages[sum - 1].page}`;
	stopP.classList.add('none');
	pause.classList.add('none');
	play.classList.remove('none');
	gNumber();
	songSrc();
	sum--;
	if (gimnNum.textContent === 'ჰიმნი 1') {
		prev.classList.add('hide');
	}
}

//=======================================================//

next.onclick = function () {
	prev.classList.remove('hide');
	sum++;
	hCont.innerHTML = `${pages[sum].page}`;
	stopP.classList.add('none');
	pause.classList.add('none');
	play.classList.remove('none');
	gNumber();
	songSrc();
	if (gimnNum.textContent === 'ჰიმნი 10') {//поменять на 800
		next.classList.add('hide');
	}
}

//=======================================================//

stopP.classList.add('none');
pause.classList.add('none');

function playSound() {
	song.play();
}

function stopSound() {
	song.pause();
	song.currentTime = 0;
}

function pauseSound() {
	song.pause();
}

play.onclick = function () {
	this.classList.add('none');
	stopP.classList.remove('none');
	pause.classList.remove('none');
	playSound();
}

stopP.onclick = function () {
	this.classList.add('none');
	pause.classList.add('none');
	play.classList.remove('none');
	stopSound()
}

pause.onclick = function () {
	pauseSound();
	this.classList.add('none');
	stopP.classList.remove('none');
	play.classList.remove('none');
}

//=======================================================//

search.onclick = () => {
	himnWrapper.classList.add('none');
	main.classList.remove('none');
	if (playSound) {
		stopSound();
	}
	inputNum.value = '';
	inputText.value = '';
	inputNum.focus();

};

//=======================================================//

function gNumber() {
	const gStr = document.querySelector('.gNum');
	gimnNum.textContent = 'ჰიმნი ' + gStr.textContent;
};








