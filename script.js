//window.addEventListener("load") - скрипт начнет выполняться только после того, как загрузится все страница
//window.addEventListener("DOMContentLoaded") - весь HTML полностью загружен (то есть загружена вся структура html - дерево), не дожидаясь окончания загрузки стилей, изображений и фреймов

//весь скрипт будет прописываться внутри "DOMContentLoaded"
window.addEventListener("DOMContentLoaded", function () {
    "use strict";
    //ПЕРЕКЛЮЧЕНИЕ ТАБОВ (ВКЛАДОК)
    //получаем сами табы (кнопки)
    let tab = document.querySelectorAll(".info-header-tab"),
        //получаем родительский элемент табов
        info = document.querySelector(".info-header"),
        //получаем контент, который должен отображаться при нажатии на табы
        tabContent = document.querySelectorAll(".info-tabcontent");

    //функция, сркывающая весь контент, соответствующий табам
    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove("show");
            tabContent[i].classList.add("hide");
        }
    }
    //аргументу a задаем значение = 1, чтобы при обнолении страницы контент, соответствубщий первому табу, показывался на странице
    hideTabContent(1);

    //функция, показывающая весь контент, соответствующий табам
    function showTabContent(b) {
        if (tabContent[b].classList.contains("hide")) {
            tabContent[b].classList.remove("hide");
            tabContent[b].classList.add("show");
        }
    }

    info.addEventListener("click", function (event) {
        let target = event.target;
        //если при клике нажали на элемент с классом info-header-tab..
        if (target && target.classList.contains("info-header-tab")) {
            //..создаем цикл, который нужен для того, чтобы определить соответствие табов опреденному контенту
            for (let i = 0; i < tab.length; i++) {
                //если нажали на таб с соответствубщим индексом..
                if (target == tab[i]) {
                    //..то скрываем весь контент..
                    hideTabContent(0);
                    //.. и показываем только тот, который соответствует индексу таба
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    //ТАЙМЕР
    //задаем конечную дату отчета таймера
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
