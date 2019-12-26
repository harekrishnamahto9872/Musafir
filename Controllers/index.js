
console.log("Index.js is executing")

function searchTrains()
{
    var result = document.getElementById('result')
    result.innerHTML = "please wait!!! Searching........... "

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
            result.innerHTML = ""
            var responseObj = JSON.parse(this.responseText)

            responseObj.trains.forEach(element => {
                var div = document.createElement('div')

                div.style = "margin-top: 20px; border: 2px solid black"

                var h3 = document.createElement('h3')
                h3.innerHTML = element.name + '(' + element.number + ')'

                var h4 = document.createElement('h4')
                h4.innerHTML = element.from_station.name + '(' + element.src_departure_time + ')' + '--------------->' + element.to_station.name + '(' + element.dest_arrival_time + ')'
                var h4_ = document.createElement('h4')
                
                var span = document.createElement('span')

                element.classes.forEach(val =>{
                    var btn = document.createElement('button')
                    btn.innerHTML = val.code
                    span.appendChild(btn)
                })

                h4_.innerHTML = 'Classes Available : '  

                div.appendChild(h3)
                div.appendChild(h4)
                div.appendChild(h4_)
                div.appendChild(span)

                result.appendChild(div)
            });
            
            console.log(responseObj)
        }
    });

    xhr.open('GET', 'https://api.railwayapi.com/v2/between/source/' + source + '/dest/' + destination + '/date/' + date + '/apikey/6r23xmv7dw/')
    xhr.send(null)

    return true;
}

module.exports = function pnrStatus()
{
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function (event) {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("GET", "https://indianrailways.p.rapidapi.com/index.php?pnr=1234567890");
    xhr.setRequestHeader("x-rapidapi-host", "indianrailways.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "00ae3d8070msh1e9642024fc626dp11426ajsn167355396e7b");

    xhr.send(data);
}

function track()
{

}