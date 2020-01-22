function post_login(event) {
  console.log("TEST");

  let id_label = document.getElementById("id-place");
  let pass_label = document.getElementById("pass-place");
  let id = id_label.value;
  let pass = pass_label.value;
  console.log(id);
  console.log(pass);

  let data = {
    'userId': id,
    'password': pass
  }

  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (req.readyState == 4) { // 通信の完了時
      if (req.status == 200) { // 通信の成功時
        console.log(req.response);
        console.log("通信成功");
        console.log(req);
        localStorage.userId = id;
        window.location = "./purchase.html";
      } else {
        console.log(req);
        alert("通信失敗");
      }
    }else{
    }
  }

  req.open('POST', 'https://cnko6od0yb.execute-api.us-east-2.amazonaws.com/develop/login', true);
  req.setRequestHeader('content-type','application/json');
  req.send(JSON.stringify(data));
}