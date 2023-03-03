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
const himnHistory = document.querySelector('.himn-history');
const hBtn = document.querySelector('.h-btn');
const itemsList = document.querySelector('.itemsList');

//=======================================================//

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
	const arrGe = ['ა', 'ბ', 'გ', 'დ', 'ე', 'ვ', 'ზ', 'თ', 'ი', 'კ', 'ლ', 'მ', 'ნ', 'ო',
		'პ', 'ჟ', 'რ', 'ს', 'ტ', 'უ', 'ფ', 'ქ', 'ღ', 'ყ', 'შ', 'ჩ', 'ც', 'ძ', 'წ', 'ჭ', 'ხ', 'ჯ', 'ჰ', ' '];
	let arr = arrGe.join('');
	let text = e.target.value;
	for (let i = 0; i < text.length; i++) {
		if (arr.indexOf(text[i]) === -1) {
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
});

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

//===========================================================

play.onclick = function () {
	this.classList.add('none');
	stopP.classList.remove('none');
	pause.classList.remove('none');
	playSound();
}

stopP.onclick = stopF;
function stopF() {
	stopP.classList.add('none');
	pause.classList.add('none');
	play.classList.remove('none');
	stopSound();
}

pause.onclick = function () {
	pauseSound();
	this.classList.add('none');
	stopP.classList.remove('none');
	play.classList.remove('none');
}

song.addEventListener('ended', () => {
	stopF();
	addItem();
});

//=======================================================//

search.onclick = () => {
	himnWrapper.classList.add('none');
	main.classList.remove('none');
	himnHistory.classList.add('none');
	hBtn.classList.remove('active');
	if (playSound) {
		stopSound();
	}
	inputNum.value = '';
	inputText.value = '';
}

//=======================================================//

function gNumber() {
	const gStr = document.querySelector('.gNum');
	gimnNum.innerHTML = `ჰიმნი <span>${gStr.textContent}</span>`;
}

//=======================================================//

let items = JSON.parse(localStorage.getItem('items')) || [];

function addItem() {
	let text;
	const gStr = document.querySelector('.gimnNum span').textContent;
	let n = Number(gStr);
	function strCreat() {
		for (let key in pages) {
			let str = pages[n - 1].title;
			let num = pages[n - 1].num;
			text = `<li class="h-str-li" data="${num}">${str}<span>${num}</span></li>`;
			break;
		}
	}
	strCreat();
	const item = {
		text: text,
	}
	if (items.length === 4) {
		items.pop();
	}
	unshiftItems();
	localStorage.setItem('items', JSON.stringify(items));
	displayItems();
	function unshiftItems() {
		items.unshift(item);
	}
}

function displayItems() {
	let itemStr = JSON.parse(localStorage.getItem('items'));
	let out = '';
	if (itemStr !== null) {
		for (let i = 0; i < itemStr.length; i++) {
			if (itemStr !== '') {
				out += `${itemStr[i].text}`;
			}
		}
	}
	itemsList.innerHTML = out;
}
displayItems();

hBtn.onclick = function () {
	if (itemsList.childNodes.length != 0) {
		this.classList.add('active');
		if (this.classList.contains('active')) {
			himnHistory.classList.remove('none');
			main.classList.add('none');
		}
		document.querySelectorAll('.h-str-li').forEach(item => {
			item.onclick = function () {
				himnHistory.classList.add('none');
				main.classList.add('none');
				himnWrapper.classList.remove('none');
				stopP.classList.add('none');
				pause.classList.add('none');
				play.classList.remove('none');
				strContainer.innerHTML = '';
				let s = this.getAttribute('data');
				let n = Number(s);
				n = n - 1
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
	}
};