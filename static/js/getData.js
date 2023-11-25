function getData() {
    document.getElementById('loading').style.display = "block";

    var ticker = document.getElementById("symbolInput").value;
    var startDate = document.getElementById("date").value;
   
    var xhr = new XMLHttpRequest();
    var url = "/get_stock_data?ticker=" + ticker + "&start_date=" + startDate;

    xhr.open('GET', url, true);

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            document.getElementById('loading').style.display = "none";
            
            
            var data = JSON.parse(xhr.responseText);
            console.log('Success:', data);

            var status = data.status;

            if (status == "error") {
                document.getElementById("desc").innerHTML =  data.message;
                launch_toast();
                return;
            }
            setTimeout(getDataNoLoader, 5000);

            updateTable(data);
            document.getElementById("desc_correct").innerHTML = "Data Fetched";
            launch_toast_correct(); 
        } else {
            document.getElementById('loading').style.display = "none";
            console.error('Error:', xhr.status, xhr.statusText);
        }
    };

    xhr.onerror = function () {
        console.error('Network error');
        setTimeout(getDataNoLoader, 5000);
    };
    xhr.send();
}

function getDataNoLoader() {
    var ticker = document.getElementById("symbolInput").value;
    var startDate = document.getElementById("date").value;
    console.log(startDate);
    var xhr = new XMLHttpRequest();
    var url = "/get_stock_data?ticker=" + ticker + "&start_date=" + startDate;

    xhr.open('GET', url, true);

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            var data = JSON.parse(xhr.responseText);
            console.log('Success:', data);

            var status = data.status;

            if (status == "error") {
                return;
            }
            setTimeout(getDataNoLoader, 5000);

            updateTable(data);
        } else {
            document.getElementById('loading').style.display = "none";
            console.error('Error:', xhr.status, xhr.statusText);
        }
    };

    xhr.onerror = function () {
        console.error('Network error');
        setTimeout(getDataNoLoader, 5000);
    };

    xhr.send();
}


function updateTable(data){

    var json_data = data.data;

    json_data = json_data.replaceAll("Stock Splits", "stock_splits");
    json_data = JSON.parse(json_data);

    console.log(json_data);

    var table = document.getElementById("tbody");
    
    table.innerHTML = "";
    var table_data = "";
    for (var i = 0; i < json_data.length; i++) {
        table_data += "<tr>";
        table_data += "<td>" + json_data[i].Date + "</td>";
        table_data += "<td>" + json_data[i].Open + "</td>";
        table_data += "<td>" + json_data[i].High + "</td>";
        table_data += "<td>" + json_data[i].Low + "</td>";
        table_data += "<td>" + json_data[i].Close + "</td>";
        table_data += "<td>" + json_data[i].Volume + "</td>";
        table_data += "<td>" + json_data[i].Dividends + "</td>";
        table_data += "<td>" + json_data[i].stock_splits + "</td>";
        table_data += "</tr>";
    }
    table.innerHTML = table_data;
}