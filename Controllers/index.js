
function searchTrains()
{
    var result = document.getElementById('result')
    result.innerHTML = ""

    var source = document.getElementById('source').value
    var destination = document.getElementById('destination').value
    var date_ = document.getElementById('date').value
    console.log(date_)
    var date = date_[8]+date_[9]+"-"+date_[5]+date_[6]+"-"+date_[0]+date_[1]+date_[2]+date_[3]
    console.log(source + " " + destination + " " + date)
    console.log("fetch called")
    var xhr = new XMLHttpRequest()

    xhr.addEventListener("readystatechange", function(event){
        if(this.readyState == 4)
        {
            var responseObj = JSON.parse(this.responseText)

            responseObj.trains.forEach(element => {
                var li = document.createElement('li')
                li.innerText = element.name;
                result.appendChild(li)
            });
            
            console.log(responseObj)
        }
    });

    xhr.open('GET', 'https://api.railwayapi.com/v2/between/source/' + source + '/dest/' + destination + '/date/' + date + '/apikey/6r23xmv7dw/')
    xhr.send(null)

    return true;
}