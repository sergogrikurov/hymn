const inputNum = document.querySelector('.inputNum');
const inputText = document.querySelector('.inputText');
const iBtn = document.querySelector('.i-btn');
const hCont = document.querySelector('.hymn-container');
const hymnNum = document.querySelector('.hymnNum');
const hymnNumSpan = document.querySelector('.hymnNum span');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const footer = document.querySelector('.footer');
const main = document.querySelector('.main');
const play = document.querySelector('.play');
const stopP = document.querySelector('.stop');
const pause = document.querySelector('.pause');
const search = document.querySelector('.search');
const header = document.querySelector('.header');
const hymnWrapper = document.querySelector('.hymn-wrapper');
const strContainer = document.querySelector('.str-container');
const hymnHistory = document.querySelector('.hymn-history');
const hBtn = document.querySelector('.h-btn');
const itemsList = document.querySelector('.itemsList');

//=======================================================//

inputNum.addEventListener('click', () => inputText.value = '');
inputText.addEventListener('click', () => inputNum.value = '');

//=======================================================//

let song = new Audio();

function songSrc() {
	const gStr = document.querySelector('.hNum').textContent;
	let hNum = Number(gStr);
	song.src = `./audio/${hNum}.ogg`;
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
	if (e.target.value > 70) { //потом заменить на 800
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
		hymnWrapper.classList.remove('none');
		prev.classList.remove('hide');
		next.classList.remove('hide');
		stopP.classList.add('none');
		pause.classList.add('none');
		play.classList.remove('none');
		sum = data - 1;
		hCont.innerHTML = `${pages[sum].page}`;
		hNumber();
		songSrc();
		let hnst = document.querySelector('.hymnNum span').textContent
		let hNs = Number(hnst);
		if (hNs === 1) {
			prev.classList.add('hide');
		}
		if (hNs === 70) {//поменять на 800
			next.classList.add('hide');
		}
	}
})

//=======================================================//
const inputTextModal = document.querySelector('.inputText__modal');

iBtn.addEventListener('click', () => {
	const dadaText = inputText.value.trim();
	if (dadaText !== '' && dadaText.length < 8) {
		inputTextModal.classList.remove('height-none');
		inputNum.addEventListener('click', () => {
			inputTextModal.classList.add('height-none');
		})
		inputText.addEventListener('click', () => {
			inputTextModal.classList.add('height-none');
		})
		hBtn.addEventListener('click', () => {
			inputTextModal.classList.add('height-none');
			if (itemsList.childNodes.length === 0) {
				inputText.focus();
			}
		})
	}
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
			hymnWrapper.classList.remove('none');
			stopP.classList.add('none');
			pause.classList.add('none');
			play.classList.remove('none');
			strContainer.innerHTML = '';
			let s = this.getAttribute('data');
			let n = Number(s);
			hCont.innerHTML = `${pages[n].page}`;
			hNumber();
			songSrc();
			sum = n;
			let hnst = document.querySelector('.hymnNum span').textContent
			let hNs = Number(hnst);
			if (hNs === 1) {
				prev.classList.add('hide');
				next.classList.remove('hide');
			}
			if (hNs === 70) {//поменять на 800
				next.classList.add('hide');
				prev.classList.remove('hide');
			}
			if (hNs > 1 && hNs < 70) {//поменять на 800
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
	hNumber();
	songSrc();
	sum--;
	let hnst = document.querySelector('.hymnNum span').textContent
	let hNs = Number(hnst);
	if (hNs === 1) {
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
	hNumber();
	songSrc();
	let hnst = document.querySelector('.hymnNum span').textContent
	let hNs = Number(hnst);
	if (hNs === 70) {//поменять на 800
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
	// addItem();
});

//=======================================================//

search.onclick = () => {
	hymnWrapper.classList.add('none');
	main.classList.remove('none');
	hymnHistory.classList.add('none');
	hBtn.classList.remove('active');
	if (playSound) {
		stopSound();
	}
	inputNum.value = '';
	inputText.value = '';
}

//=======================================================//

function hNumber() {
	const hNum = document.querySelector('.hNum');
	hymnNum.innerHTML = `ჰიმნი <span>${hNum.textContent}</span>`;
}

//=======================================================//
play.addEventListener('click', () => {
	addItem();
});

let items = [];

function addItem() {
	const hStr = document.querySelector('.hymnNum span').textContent;
	let n = Number(hStr);
	function strCreate() {
		for (let key in pages) {
			let str = pages[n - 1].title;
			let num = pages[n - 1].num;
			items.push(`<li class="h-str-li" data="${num}">${str}<span>${num}</span></li>`);
			break;
		}
	}
	if (localStorage.getItem('items')) {
		items = JSON.parse(localStorage.getItem('items'));
		strCreate();
		const arr = [...new Set(items)];
		if (arr.length > 20) {//не менять!!!
			arr.shift();
			items = [];
			localStorage.setItem('items', JSON.stringify(arr));
		} else {
			items = [];
			localStorage.setItem('items', JSON.stringify(arr));
		}
	} else {
		strCreate();
		const arr = [...new Set(items)];
		items = [];
		localStorage.setItem('items', JSON.stringify(arr));
	}
	displayItems();
}

function displayItems() {
	let itemStr = JSON.parse(localStorage.getItem('items'));
	let out = '';
	if (itemStr !== null) {
		for (let i = itemStr.length; i >= 0; i--) {
			if (itemStr[i] !== undefined) {
				out += `${itemStr[i]}`;
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
			hymnHistory.classList.remove('none');
			main.classList.add('none');
		}
		document.querySelectorAll('.h-str-li').forEach(item => {
			item.onclick = function () {
				hymnHistory.classList.add('none');
				main.classList.add('none');
				hymnWrapper.classList.remove('none');
				stopP.classList.add('none');
				pause.classList.add('none');
				play.classList.remove('none');
				strContainer.innerHTML = '';
				let s = this.getAttribute('data');
				let n = Number(s);
				n = n - 1
				hCont.innerHTML = `${pages[n].page}`;
				hNumber();
				songSrc();
				sum = n;
				let hnst = document.querySelector('.hymnNum span').textContent;
				let hNs = Number(hnst);
				if (hNs === 1) {
					prev.classList.add('hide');
					next.classList.remove('hide');
				}
				if (hNs === 70) {//поменять на 800
					next.classList.add('hide');
					prev.classList.remove('hide');
				}

				if (hNs > 1 && hNs < 70) {//поменять на 800
					next.classList.remove('hide');
					prev.classList.remove('hide');
				}
			}
		})
	}
};