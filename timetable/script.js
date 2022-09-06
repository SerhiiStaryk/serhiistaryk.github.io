'use strict';

const time = [
	'8.30 - 9.05',
	'9.15 - 9.50',
	'10.10 - 10.45',
	'11.05 - 11.40',
	'12.05 - 12.40',
];

const days = [
	'Неділя',
	'Понеділок',
	'Вівторок',
	'Середа',
	'Четвер',
	"П'ятниця",
	'Cубота',
];
const months = [
	'січеня',
	'лютого',
	'березеня',
	'квітеня',
	'травеня',
	'червеня',
	'липеня',
	'серпеня',
	'вересеня',
	'жовтеня',
	'листопада',
	'груденя',
];

const currentDate = new Date();

function getCurrentDate(date) {
	return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

const date = document.querySelector('.current-date');

date.innerHTML = `${getCurrentDate(currentDate)}`;

const timetable = [
	{
		day: 'Понеділок',
		lessons: [
			{ name: 'Інт. курс(математика)', link: '' },
			{ name: 'Укр. мова', link: '' },
			{ name: 'Англійська', link: '' },
			{ name: 'Музика', link: '' },
			{ name: 'Укр. мова(інт.)', link: '' },
		],
	},
	{
		day: 'Вівторок',
		lessons: [
			{ name: 'Інт. курс(природа)', link: '' },
			{ name: 'Укр. мова', link: '' },
			{ name: 'Англійська', link: '' },
			{ name: 'Математика', link: '' },
			{ name: 'Шахи', link: '' },
		],
	},
	{
		day: 'Середа',
		lessons: [
			{
				name: "Інт. курс(основи зродов'я)",
				link: 'https://us04web.zoom.us/j/77244409096?pwd=tDp661JC1LBI9QxAs9tgIDDFoqSHZ3.1',
			},
			{ name: 'Фізкультура', link: '' },
			{
				name: 'Математика',
				link: 'https://us04web.zoom.us/j/72998465078?pwd=NlcyfJIFh0htiKpixno49Xjezc2L1W.1',
			},
			{
				name: 'Укр. мова',
				link: 'https://us04web.zoom.us/j/74320416182?pwd=qHozTNBk5y5cuQOLf14tzcxBfqQpBW.1',
			},
		],
	},
	{
		day: 'Четвер',
		lessons: [
			{ name: 'Інт. курс(трудове навчання)', link: '' },
			{ name: 'Фізкультура', link: '' },
			{ name: 'Укр. мова', link: '' },
			{ name: 'Укр. мова(інт.курс)', link: '' },
		],
	},
	{
		day: "П'ятниця",
		lessons: [
			{ name: 'Інт.курс(природа)', link: '' },
			{ name: 'Укр. мова', link: '' },
			{ name: 'Математика', link: '' },
			{ name: 'Образотворче мистецтво', link: '' },
			{ name: 'Англійська', link: '' },
		],
	},
];

const row = document.querySelector('.row');

function createDays(timetable) {
	const dayWeek = days[currentDate.getDay()];

	for (const day of timetable) {
		const column = document.createElement('div');
		column.classList.add('column');
		const card = document.createElement('div');
		card.classList.add('card');

		console.log(dayWeek);
		console.log(day.day);

		if (dayWeek === day.day) {
			card.classList.add('card-select');
		} else {
			card.classList.remove('card-select');
		}

		card.innerHTML = `<h3 class="card-title">${day.day}</h3>`;
		card.appendChild(createLessons(day.lessons));

		column.appendChild(card);

		row.appendChild(column);
	}
}

function createLessons(lessons) {
	const ol = document.createElement('ol');
	ol.classList.add('card-list');
	for (let i = 0; i < lessons.length; i++) {
		const li = document.createElement('li');
		li.classList.add('list-item');
		if (lessons[i].link === '') {
			li.innerHTML = `${lessons[i].name} <span class='card-item__text-left'>${time[i]}</span>`;
		} else {
			li.innerHTML = `<a href=${lessons[i].link} target="_blank">${lessons[i].name}</a> <span class='card-item__text-left'>${time[i]}</span>`;
		}
		ol.appendChild(li);
	}
	return ol;
}

createDays(timetable);
