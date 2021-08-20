//Global Variable Decleration

let currentDate = new Date(new Date().getTime()),
currentDay = currentDate.getDate(),
nextDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
nextDay = nextDate.getDate(),
afterNextDate = new Date(new Date().getTime() + 48 * 60 * 60 * 1000),
afterNextDay = afterNextDate.getDate(),
currentDayName = currentDate.toLocaleString("default", { weekday: "long" }),
nextDayName = nextDate.toLocaleString("default", { weekday: "long" }),
afterNextDayName = afterNextDate.toLocaleString("default", { weekday: "long" });
htttpRequest=new XMLHttpRequest();
 htttpRequest2=new XMLHttpRequest();

// Default Location Is Alexandria

getCityWeather('alex')


// Wait Until Get Weather Response

$(document).ready(function()
    {
        $('#loader').fadeOut(1000,function()
        {
            $('body').css('overflow','visible')
        })
    })

// Location Search

$('#search-location').keyup(function()
{
    getCityWeather($('#search-location').val());
    

})

//get Weather Information

function getCityWeather(city)
{
 
    
    htttpRequest.open(`GET`,`https://api.weatherapi.com/v1/forecast.json?key=fed42fdc10ba439792e183849212904&q=${city}&days=3`)
    htttpRequest.send();
    htttpRequest.addEventListener('readystatechange',function()
    {
        
        if (htttpRequest.readyState==4 && htttpRequest.status==400)
        {
            $('#search-location').addClass('is-invalid')
            $('#search-location').removeClass('is-valid')
            
            
        }
        if(htttpRequest.readyState==4 && htttpRequest.status==200)
        {
            var weatherResponse=JSON.parse(htttpRequest.response)
            console.log(weatherResponse)
            $('#search-location').removeClass('is-invalid')
            $('#search-location').addClass('is-valid')
            currentDayWeather(weatherResponse);
            nextDayWeather(weatherResponse);
            afterNextDayWeather(weatherResponse);
        }
        if($('#search-location').val()=='')
        {
            $('#search-location').removeClass('is-invalid')
            $('#search-location').removeClass('is-valid')
        }
        
    })
}
//Display Weather Information

function currentDayWeather(weatherResponse)
{
    
    $("#city-info").html(weatherResponse.location.name);
    $('#day1-deg-info').html(weatherResponse.current.temp_c+'<span> &#8451;</span>');
    
    $('#day1-condition-icon-info').attr('src',weatherResponse.current.condition.icon);
    $('#day1-condition-info').html(weatherResponse.current.condition.text);
    $('#date1-info').html(currentDay+' '+getCurrentMonth());
    $('#day1-info').html(currentDayName);
    $('#humidity').html(weatherResponse.current.humidity)
    $('#wind-kp').html(weatherResponse.current.wind_kph)
    $('#wind-direction').html(weatherResponse.current.wind_dir)
}
function nextDayWeather(weatherResponse)
{
    var weatherResponse=JSON.parse(htttpRequest.response)
    
    $('#day2-deg-info-max').html(weatherResponse.forecast.forecastday[1].day.maxtemp_c+'<span> &#8451;</span>');

    $('#day2-deg-info-min').html(weatherResponse.forecast.forecastday[1].day.mintemp_c+'<span> &#8451;</span>');
    
    
    $('#day2-condition-icon-info').attr('src',weatherResponse.forecast.forecastday[1].day.condition.icon);
    $('#day2-condition-info').html(weatherResponse.forecast.forecastday[1].day.condition.text);
    $('#date2-info').html(nextDay+' '+getCurrentMonth());
    $('#day2-info').html(nextDayName);
}
function afterNextDayWeather(weatherResponse)
{
    
    
    $('#day3-deg-info-max').html(weatherResponse.forecast.forecastday[2].day.maxtemp_c+'<span> &#8451;</span>');
    $('#day3-deg-info-min').html(weatherResponse.forecast.forecastday[2].day.mintemp_c+'<span> &#8451;</span>');
    
    $('#day3-condition-icon-info').attr('src',weatherResponse.forecast.forecastday[2].day.condition.icon);
    $('#day3-condition-info').html(weatherResponse.forecast.forecastday[2].day.condition.text);
    $('#date3-info').html(afterNextDay+' '+getCurrentMonth());
    $('#day3-info').html(afterNextDayName);
}

//Get Current Month

function getCurrentMonth()
{


var months=['January',
'February',
'March',
'April',
'May',
'June',
'July ',
'August',
'September',
'October',
'November',
'December']
var date=new Date();

return months[date.getMonth()]


}









