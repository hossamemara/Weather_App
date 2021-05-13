var htttpRequest=new XMLHttpRequest();
var htttpRequest2=new XMLHttpRequest();
var cityInfo=document.getElementById("city-info"),
day1_deg_info=document.getElementById("day1-deg-info"),
day1_condition_icon_info=document.getElementById("day1-condition-icon-info"),
day1_condition_info=document.getElementById("day1-condition-info"),
date1_info=document.getElementById("date1-info"),
day1_info=document.getElementById("day1-info"),
day2_deg_info_max=document.getElementById("day2-deg-info-max"),
day2_deg_info_min=document.getElementById("day2-deg-info-min"),
day2_condition_icon_info=document.getElementById("day2-condition-icon-info"),
day2_condition_info=document.getElementById("day2-condition-info"),
date2_info=document.getElementById("date2-info"),
day2_info=document.getElementById("day2-info"),
day3_deg_info_max=document.getElementById("day3-deg-info-max"),
day3_deg_info_min=document.getElementById("day3-deg-info-min"),
day3_condition_icon_info=document.getElementById("day3-condition-icon-info"),
day3_condition_info=document.getElementById("day3-condition-info"),
date3_info=document.getElementById("date3-info"),
day3_info=document.getElementById("day3-info"),
clock=document.getElementById("clock"),
findBtn=document.getElementById("find-btn"),
searchLocation=document.getElementById("search-location")

$(document).ready(function()
    {
        $('#loader').fadeOut(1000,function()
        {
            $('body').css('overflow','visible')
        })
    })
getCityWeather('cairo')
searchLocation.addEventListener('keyup',function()
{
    getCityWeather(searchLocation.value);
    
setInterval(getTime(searchLocation.value),1000)
})
// findBtn.addEventListener('click',function()
// {
//     getCityWeather(searchLocation.value)
// })

function getCityWeather(city)
{
 
    
    htttpRequest.open(`GET`,`https://api.weatherapi.com/v1/forecast.json?key=fed42fdc10ba439792e183849212904&q=${city}&days=3`)
    

    
    htttpRequest.send();
    htttpRequest.addEventListener('readystatechange',function()
    {
        
        if (htttpRequest.readyState==4 && htttpRequest.status==400)
        {
            searchLocation.classList.add('is-invalid')
            searchLocation.classList.remove('is-valid')
            
            
        }
        if(htttpRequest.readyState==4 && htttpRequest.status==200)
        {
            var weatherResponse=JSON.parse(htttpRequest.response)
            console.log(weatherResponse)
            searchLocation.classList.remove('is-invalid')
            searchLocation.classList.add('is-valid')
            day1Info(weatherResponse);
            day2Info(weatherResponse);
            day3Info(weatherResponse);
        }
        if(searchLocation.value=='')
        {
            searchLocation.classList.remove('is-invalid')
            searchLocation.classList.remove('is-valid')
        }
        
    })
}

function day1Info(weatherResponse)
{
    
    cityInfo.innerHTML=weatherResponse.location.name;
    day1_deg_info.innerHTML=weatherResponse.current.temp_c+'<span> &#8451;</span>';
    
    day1_condition_icon_info.src=weatherResponse.current.condition.icon;
    day1_condition_info.innerHTML=weatherResponse.current.condition.text;
    date1_info.innerHTML=getMonth();
    day1_info.innerHTML=getDay1();
}
function day2Info(weatherResponse)
{
    var weatherResponse=JSON.parse(htttpRequest.response)
    
    day2_deg_info_max.innerHTML=weatherResponse.forecast.forecastday[1].day.maxtemp_c+'<span> &#8451;</span>';

    day2_deg_info_min.innerHTML=weatherResponse.forecast.forecastday[1].day.mintemp_c+'<span> &#8451;</span>';
    
    
    day2_condition_icon_info.src=weatherResponse.forecast.forecastday[1].day.condition.icon;
    day2_condition_info.innerHTML=weatherResponse.forecast.forecastday[1].day.condition.text;
    
    day2_info.innerHTML=getDay2();
}
function day3Info(weatherResponse)
{
    
    
    day3_deg_info_max.innerHTML=weatherResponse.forecast.forecastday[2].day.maxtemp_c+'<span> &#8451;</span>';
    day3_deg_info_min.innerHTML=weatherResponse.forecast.forecastday[2].day.mintemp_c+'<span> &#8451;</span>';
    
    day3_condition_icon_info.src=weatherResponse.forecast.forecastday[2].day.condition.icon;
    day3_condition_info.innerHTML=weatherResponse.forecast.forecastday[2].day.condition.text;
    
    day3_info.innerHTML=getDay3();
}


function getMonth()
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

return date.getDate()+' '+months[date.getMonth()]


}


function getDay1()
{


    var days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];
var date=new Date();

return days[date.getDay()]


}
function getDay2()
{


    var days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];
var date=new Date();
if(date.getDay()==6)
{
    return 'Sunday'
}
else
{
    return days[date.getDay()+1]
}



}
function getDay3()
{


    var days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];
var date=new Date();
if(date.getDay()==5)
{
    return 'Sunday'
}
else if(date.getDay()==6)
{
    return 'Monday'
}
else
{
    return days[date.getDay()+2]
}



}


function getTime(city)
{
    // var date=new Date();
    // clock.innerHTML=`${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`;
    htttpRequest2.open(`GET`,`https://api.weatherapi.com/v1/timezone.json?key=fed42fdc10ba439792e183849212904&q=${city}`)
    htttpRequest2.send();
    htttpRequest2.addEventListener('readystatechange',function()
    {
        
        if (htttpRequest2.readyState==4 && htttpRequest2.status==200)
        {
            var timeZone=JSON.parse(htttpRequest2.response)
            
            clock.innerHTML=timeZone.location.localtime;
            
                
        }
        if (htttpRequest2.readyState==4 && htttpRequest2.status==400)
        {
            clock.innerHTML='';
        }
        if (searchLocation.value=='')
        {
            clock.innerHTML='';
        }
      
      
    })

    
    
}
