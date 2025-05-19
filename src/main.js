const alpacaCalendar = document.getElementById('alpaca-calendar');

function alpacaCalendarInit(container) {
    let startTime = null;
    let finishTime = null;
    const alpacaCalendarNumber = container.querySelectorAll('.alpaca-calendar__number');
    
    container.addEventListener('click', function(event) {
        const button = event.target.closest('.alpaca-calendar__number-button');
        if (!button) {
            return;
        }
        const selectedTime = (new Date(button.parentNode.dataset.date)).getTime();
        if (startTime === selectedTime) {
            startTime = null;
        } else if (startTime) {
            if (finishTime) {
                if (selectedTime < startTime) {
                    startTime = selectedTime;
                } else if (finishTime === selectedTime) {
                    finishTime = null;
                } else {
                    finishTime = selectedTime;
                }
            } else {
                finishTime = selectedTime;
            }
        } else {
            if (finishTime === selectedTime) {
                finishTime = null;
            } else {
                startTime = selectedTime;
            }
        }

        if (startTime && finishTime && startTime > finishTime) {
            const tmpTime = finishTime;
            finishTime = startTime;
            startTime = tmpTime;
        }

        alpacaCalendarNumber.forEach(item => {
            const time = (new Date(item.dataset.date)).getTime();
            item.classList.remove('alpaca-calendar__number_selected');
            item.classList.remove('alpaca-calendar__number_checked');
            item.classList.remove('alpaca-calendar__number_checked-first');
            item.classList.remove('alpaca-calendar__number_checked-last');
            if (time === startTime) {
                item.classList.add('alpaca-calendar__number_checked');
                if (finishTime) {
                    item.classList.add('alpaca-calendar__number_checked-first');
                }
                return;
            }
            if (time === finishTime) {
                item.classList.add('alpaca-calendar__number_checked');
                if (startTime) {
                    item.classList.add('alpaca-calendar__number_checked-last');
                }
                return;
            }
            if (startTime && finishTime && time > startTime && time < finishTime) {
                item.classList.add('alpaca-calendar__number_selected');
                return;
            }
        });
    });
}

alpacaCalendarInit(alpacaCalendar);

const themesButtonWhite = document.querySelector('.themes-buttons__button_white');
const themesButtonBlue = document.querySelector('.themes-buttons__button_blue');

themesButtonBlue.addEventListener('click', function() {
    alpacaCalendar.classList.remove('alpaca-calendar');
    alpacaCalendar.classList.add('blue-theme');
    alpacaCalendar.classList.add('alpaca-calendar');
    themesButtonWhite.classList.remove('themes-buttons__button_white-active');
    themesButtonBlue.classList.add('themes-buttons__button_blue-active');
});
themesButtonWhite.addEventListener('click', function() {
    alpacaCalendar.classList.remove('blue-theme');
    themesButtonWhite.classList.add('themes-buttons__button_white-active');
    themesButtonBlue.classList.remove('themes-buttons__button_blue-active');
});
