// Clock on now.html

function changeTimeZone(date, timeZone) {
  if (typeof date === 'string') {
    return new Date(
      new Date(date).toLocaleString('en-US', {
        timeZone,
      }),
    );
  }

  return new Date(
    date.toLocaleString('en-US', {
      timeZone,
    }),
  );
}

const krkDate = changeTimeZone(new Date(), 'Europe/Warsaw');
console.log(krkDate); // 👉️ "Sun Jan 16 2022 08:54:44"

var seconds = krkDate.getSeconds();
var minutes = krkDate.getMinutes();
var hours = krkDate.getHours();
hours = (hours > 12) ? hours - 12 : hours;
minutes = (minutes * 60) + seconds;
hours = (hours * 3600) + minutes;

document.querySelector('.clock-second-hand').setAttribute('transform', 'rotate('+360*(seconds/60)+',192,192)');
document.querySelector('.clock-minute-hand').setAttribute('transform', 'rotate('+360*(minutes/3600)+',192,192)');
document.querySelector('.clock-hour-hand').setAttribute('transform', 'rotate('+360*(hours/43200)+',192,192)');
