
window.addEventListener("DOMContentLoaded", function () {
    "use strict";
    //ТАЙМЕР
    //задаем конечную дату отcчета таймера
    let deadline = "2023-05-06";

    //функция для расчета времени в промежутке между сейчас и дедлайном, где endtime - дата дедлайна
    function getTimeRemaining(endtime) {
        //создаем переменную, в которую будем помещать разницу между датами в миллисекундах (endtime - дата дедлайна, new Date() - сегодняшняя дата)
        let t = Date.parse(endtime) - Date.parse(new Date()),
            //получаем количество секунд (миллисекунды делим на 1000 - получаем секунды, после секунды делим на 60 - получаем минуты и берем остаток после запятой, который округляем с помощью Math.floor)
            seconds = Math.floor((t / 1000) % 60),
            //по аналогии с секундами получаем количество минут
            minutes = Math.floor((t / 1000 / 60) % 60),
            //получаем количество часов
            hours = Math.floor(t / (1000 * 60 * 60));
        //получаем количество дней при необходимости, при этом изменяем вариант получения количества часов
        //hours = Math.floor((t / 1000 / 60 / 60) % 24),
        //days = Math.floor(t / (1000 * 60 * 60 * 24));

        //создаем новый объект, в который присваеваем значения полученных переменных
        return {
            total: t,
            //days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    }

    //превращаем статическую верстку в динамическую
    //создаем функцию, аргументами которой будут id самого таймера и выставленный дедлайн
    function setClock(id, endtime) {
        //получаем сам таймер
        let timer = document.getElementById(id),
            //из блока timer получаем дни, часы, минуты и секунды
            //days = timer.querySelector(".days"),
            hours = timer.querySelector(".hours"),
            minutes = timer.querySelector(".minutes"),
            seconds = timer.querySelector(".seconds"),
            //создаем перееменную, в которую помещаем значения интервала обновления
            timeInterval = setInterval(updateClock, 1000);

        //создаем функцию, которая будет обновлять таймер каждую секунду
        function updateClock() {
            //создаем переменную, в которой вызываем функцию getTimeRemaining
            let t = getTimeRemaining(endtime);

			//создаем функцию, которая будет добавлять ноль перед числом, если число меньше девяти
            function addZero(num) {
                if (num <= 9) {
                    return "0" + num;
                } else return num;
            }

            //присваиваем перееменным полученные значения
            //days.textContent = addZero(t.days);
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            //как только значение таймера будет равняться меньше нуля..
            if (t.total <= 0) {
                //.. останавливаем работу таймера..
                clearInterval(timeInterval);
                //.. и выставляем в ноль значения времени
                //days.textContent = "00";
                hours.textContent = "00";
                minutes.textContent = "00";
                seconds.textContent = "00";
            }
        }
    }

    //вызываем функцию setClock, где в качестве аргументов указываем id самого таймера, а также дедлайн работы таймера
    setClock("timer", deadline);
});
