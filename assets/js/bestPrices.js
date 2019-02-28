document.addEventListener("DOMContentLoaded", get_json_data, false);

function get_json_data() {

    var json_url = './assets/js/bestPrices.json';
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            append_json(data);
        }
    }

    xmlhttp.open("GET", json_url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}

function append_json(data) {
    var table = document.getElementById('bestPrices');
    data.forEach(function (object) {
        var x,y;
        x = object.location.x;
        y = object.location.y;  
        var tr = document.createElement('tr');
//        onclick="goToGas('+x+','+y+')"
        tr.innerHTML = '<td onclick="goToGas('+x+','+y+')" scope="row" class="gas ' + object.type + '">' + object.type + '</td>' +
            '<td onclick="goToGas('+x+','+y+')" scope="row" > $' + object.price + '</td>' +
            '<td onclick="goToGas('+x+','+y+')" scope="row">' + object.location.address_street + '</td>';
        table.appendChild(tr);
    });
}

function goToGas(x,y){
    console.log("x: " + x + "y: "+y);
    
    let marker = new mapboxgl.Marker(element).setLngLat({
    lng: x,
    lat: y
    })
    .addTo(map);
    
     map.flyTo({center: [x, y], zoom: 15});
    
}
