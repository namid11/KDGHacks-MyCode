function fetch_detail(userId){
    $.get( 'https://cnko6od0yb.execute-api.us-east-2.amazonaws.com/develop/room?userId='+userId)
    .done(function( data ) {
        console.log(data);
        for (const key in data) {
            console.log(key);
            if(key === "detail"){
                
                let table = document.getElementById("list_table");
                let  rows = table.insertRow(-1);
                let cell1 = rows.insertCell(-1);
                let cell2 = rows.insertCell(-1);
                cell1.innerHTML = "tags";
                cell2.innerHTML = data[key].tags.join(",");

                rows = table.insertRow(-1);
                cell1 = rows.insertCell(-1);
                cell2 = rows.insertCell(-1);
                cell1.innerHTML = "describe";
                cell2.innerHTML = data[key].describe;
                    
                continue;
            }
            let table = document.getElementById("list_table");
            let  rows = table.insertRow(-1);
            let cell1 = rows.insertCell(-1);
            let cell2 = rows.insertCell(-1);
            cell1.innerHTML = key;
            cell2.innerHTML = data[key];
        }
    });
}