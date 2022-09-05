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
			'Інт. курс(математика)',
			'Укр. мова',
			'Англійська',
			'Музика',
			'Укр. мова(інт.)',
		],
	},
	{
		day: 'Вівторок',
		lessons: [
			'Інт. курс(природа)',
			'Укр. мова',
			'Англійська',
			'Математика',
			'Шахи',
		],
	},
	{
		day: 'Середа',
		lessons: [
			"Інт. курс(основи зродов'я)",
			'Фізкультура',
			'Математика',
			'Укр. мова',
		],
	},
	{
		day: 'Четвер',
		lessons: [
			'Інт. курс(трудове навчання)',
			'Фізкультура',
			'Укр. мова',
			'Укр. мова(інт.курс)',
		],
	},
	{
		day: "П'ятниця",
		lessons: [
			'Інт.курс(природа)',
			'Укр. мова',
			'Математика',
			'Образотворче мистецтво',
			'Англійська',
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
		li.innerHTML = `${lessons[i]} <span class='card-item__text-left'>${time[i]}</span>`;
		ol.appendChild(li);
	}
	return ol;
}

createDays(timetable);
