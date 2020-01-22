function addrow(data){
    console.log(data);
    
    data.list.map(function(o){
        let table = document.getElementById("list_table");
        let  rows = table.insertRow(-1);
        let cell1 = rows.insertCell(-1);
        let cell2 = rows.insertCell(-1);
        let cell3 = rows.insertCell(-1);
        let cell4 = rows.insertCell(-1);
        let cell5 = rows.insertCell(-1);
        let cell6 = rows.insertCell(-1);
        cell1.innerHTML = o.userId;
        cell2.innerHTML = o.address;
        cell3.innerHTML = o.value + "円";
        cell4.innerHTML = o.detail.tags.join(',');
        cell5.innerHTML = "<input class='btn btn-primary' type='button' value='詳細' onclick='click_detail_Button(\""+o.userId+"\")'>";
        cell6.innerHTML = "<input class='btn btn-danger' type='button' value='レンタル' onclick='click_rental_button()'>";
    
    });
}
function fetch_list(){
    $.get( 'https://cnko6od0yb.execute-api.us-east-2.amazonaws.com/develop/')
    .done(function( data ) {
        addrow(data);
    });
}
function click_detail_Button(userId){
    window.location.href = 'detail_house.html#' + userId;
}

function click_rental_button(userId) {
    window.location = './room_open.html'
}