'use strict';
const main = document.querySelector('.main');
const modal = document.querySelector('.create-card');
const bgModal = document.querySelector('.aside-bg');

let titles = [];
let myCards = [];
if (localStorage.length > 0){
	myCards = JSON.parse(localStorage.myCards);
	titles = JSON.parse(localStorage.titles);

	for (let card of myCards){
		main.innerHTML += `
		<div class="card">
					<div class="card__front">
						<div class="card__header">
							<h3 class="card__title">
								${card.title}
							</h3>
							<p class="card__price">
								${card.price}
							</p>
						</div>
						<p class="card__text">
							${card.text}
						</p>
					</div>
					<div class="card__back">
						<div class="card__back_content">
							<h4>Удалить карточку</h4>
						</div>
					</div>
				</div>
		`;
		plusMinusLot(+1);
		plusMinusPrice(+card.price);
	}

}

console.log(myCards)

let manipulationsCard = () => {
	let reverseCard = (front, back) => {
		front.classList.add('card__front_back');
		back.classList.add('card__back_back');
	};

	let deleteCard = (card, deleteBtn,cardPrice) => {
		deleteBtn.addEventListener('click', () => {
			card.classList.add('to-up');

			let title = card.querySelector('.card__title');
			console.log(title);

			let deleteItem = titles.indexOf(title.innerHTML);
			console.log(deleteItem);
			myCards.splice(deleteItem, 1);
			titles.splice(deleteItem, 1);
			localStorage.setItem('titles', JSON.stringify(titles));
			localStorage.setItem('myCards', JSON.stringify(myCards));

			setTimeout(() => card.remove(), 800);
			let howMuchPrice = document.querySelector('#howManyMoney');
			howMuchPrice.innerHTML = Number(howMuchPrice.innerHTML) - Number(cardPrice.innerHTML);
			plusMinusLot(-1);
			console.log(myCards);

		});
	};

	for (let card of main.children) {
		let front = card.children[0];
		let back = card.children[1];
		let deleteBtn = back.children[0];
		let cardPrice = card.querySelector('.card__price');
		console.log(cardPrice.innerHTML)

		card.addEventListener('click', function () {
			reverseCard(front, back);
			deleteCard(card, deleteBtn,cardPrice);

			setTimeout(() => {
				front.classList.remove('card__front_back');
				back.classList.remove('card__back_back');
			}, 2000);
		});
	}
};

openCloseModal();
createCard();
changeTheme();
// reverseCard();
function openCloseModal() {
	bgModal.addEventListener('click', function () {
		modal.classList.remove('create-card_show');
		bgModal.classList.remove('aside-bg_show');
	});

	const openBtn = document.querySelector('#plus');

	openBtn.addEventListener('click', function () {
		modal.classList.add('create-card_show');
		bgModal.classList.add('aside-bg_show');
	});
}


function createCard() {
	const sendBtn = document.querySelector('#input-send');
	const inputTitle = document.querySelector('#input-title');
	const inputPrice = document.querySelector('#input-price');
	const inputText = document.getElementsByTagName('textarea')[0];

	sendBtn.addEventListener('click', function () {
		console.log(inputTitle);
		main.innerHTML += `
		<div class="card">
					<div class="card__front">
						<div class="card__header">
							<h3 class="card__title">
								${inputTitle.value}
							</h3>
							<p class="card__price">
								${inputPrice.value}
							</p>
						</div>
						<p class="card__text">
							${inputText.value}
						</p>
					</div>
					<div class="card__back">
						<div class="card__back_content">
							<h4>Удалить карточку</h4>
						</div>
					</div>
				</div>
		`;

		let objCard = {
			title: inputTitle.value,
			text: inputText.value,
			price: inputPrice.value,
		};
		titles.push(inputTitle.value);
		myCards.push(objCard);
		console.log(myCards);
		localStorage.setItem('titles', JSON.stringify(titles));
		localStorage.setItem('myCards', JSON.stringify(myCards));

		plusMinusPrice(+ inputPrice.value)

		inputTitle.value = '';
		inputText.value = '';
		inputPrice.value = '';

		modal.classList.remove('create-card_show');
		bgModal.classList.remove('aside-bg_show');
		manipulationsCard();
		plusMinusLot(+1);
	});
	manipulationsCard();
}

function plusMinusLot(digit){
	const lotOfCards = document.querySelector('#howManyCards');
	lotOfCards.innerHTML = Number(lotOfCards.innerHTML) + digit;
}

function plusMinusPrice(howMuch){
	const howManyMoney = document.querySelector('#howManyMoney');
	howManyMoney.innerHTML = Number(howManyMoney.innerHTML) + howMuch;
}

function changeTheme(){
	const toggle = document.querySelector('.toggle');
	const toggleBtn = document.querySelector('.toggle__btn');

	toggle.addEventListener('click', function(){
		toggleBtn.classList.toggle('toggle__btn_active');
	})
}