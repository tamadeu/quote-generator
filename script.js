function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  var ampm = "";
  m = checkTime(m);

  if (h > 12) {
    h = h - 12;
    ampm = " PM";
  } else if (h == 12) {
    h = 12;
    ampm = " AM";
  } else if (h < 12) {
    ampm = " AM";
  } else {
    ampm = "PM";
  };

  if (h == 0) {
    h = 12;
  }

  document.getElementById('display').innerHTML = h + ":" + m + ampm;
  var t = setTimeout(function () { startTime() }, 500);
}

function checkTime(i) {
  if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
  return i;
}

//date
function startDate() {
  var d = new Date();
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  document.getElementById("date").innerHTML = days[d.getDay()] + " | " + [d.getMonth() + 1] + "/" + d.getDate() + "/" + d.getFullYear();
}

const settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://quotes15.p.rapidapi.com/quotes/random/",
  "method": "GET",
  "headers": {
    "X-RapidAPI-Key": "2c1f1fd5b0msh90e814d2f53ffdfp13ff59jsne91558ed4fc5",
    "X-RapidAPI-Host": "quotes15.p.rapidapi.com"
  }
};

function genQuote() {
  $.ajax(settings).done(function (response) {

    var quote = response.content;
    var author = response.originator.name;

    document.getElementById('quote').innerHTML = quote;
    document.getElementById('author').innerHTML = author;

    var tweetQuote = quote.split(' ').join('%20') + " - " + author.split(' ').join('%20');
    tweetQuote = tweetQuote.split('<br>').join('');
    tweetQuote = "https://twitter.com/intent/tweet?text=" + tweetQuote.split('"').join('')
    $('.twitter-share-button').attr('href', tweetQuote);
  });
}