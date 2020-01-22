var albumBucketName = "bocchikdghacks";
// var bucketRegion = "ap-northeast-1";
// var IdentityPoolId = "Policy1575723510176";
// var IdentityPoolId = "23abb86d-dbf9-4551-997c-3a0198f40232";

// AWS.config.update({
//   accessKeyId: 'AKIAQAH2WHGJLAT6SBEQ',
//   secretAccessKey: '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',
//   endpoint: 'http://bocchikdghacks.s3-website-ap-northeast-1.amazonaws.com',
//   s3ForcePathStyle: true,
//   region: bucketRegion,
//   credentials: new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: IdentityPoolId
//   })
// });

AWS.config.accessKeyId = ' AKIAQAH2WHGJHC42XMWH';
AWS.config.secretAccessKey = 'tSBh1YccQYcjdFdsW1w4VGbOCpFPO1ApaLlbto0C+DWUpNLRAKBodEf20f3hME5';
AWS.config.endpoint = 'https://s3.ap-northeast-1.amazonaws.com';
AWS.config.region = 'ap-northeast-1'; // リージョン
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'ap-northeast-1:23abb86d-dbf9-4551-997c-3a0198f40232',
});
  
var s3 = new AWS.S3({
  apiVersion: "2012-10-17",
  params: { Bucket: albumBucketName }
});
  

$('#image-place').change(function(){
  if (this.files.length > 0) {
    // 選択されたファイル情報を取得
    var file = this.files[0];
    
    // readerのresultプロパティに、データURLとしてエンコードされたファイルデータを格納
    var reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = function() {
      $('#image-view').attr('src', reader.result );
    }
  }
});


function ImageToBase64(img, mime_type) {
  // New Canvas
  var canvas = document.createElement('canvas');
  canvas.width  = img.width;
  canvas.height = img.height;
  // Draw Image
  // var ctx = canvas.getContext('2d');
  // ctx.drawImage(img, 0, 0);
  // To Base64
  return canvas.toDataURL(mime_type);
}


function post_room(event) {
  // upload_image();

  // const jq_temp = $("#address-place").val();
  // console.log(jq_temp);

  const address = document.getElementById("address-place").value;
  const value = document.getElementById("value-place").value;
  const date = document.getElementById("date-place").value;
  const detail = document.getElementById("detail-place").value;
  const tags = document.getElementById("tag-place").value.split(',');
  const img_link = "https://www.google.co.jp/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";

  var formdata = new FormData($("#room-form").get(4));
  console.log("form", formdata);

  if (localStorage.userId) {

    // 部屋データの取得
    var userId = localStorage.userId;
    console.log("find ユーザID", userId);
    let data = {
      "userId": userId,
      "address": address,
      "value": value,
      "detail": {
          "image": img_link,
          "tags": tags,
          "describe": detail
      },
      "date": date
    }

    // 写真送信処理
    var img = document.getElementById('image-view');
    var b64 = ImageToBase64(img, "image/jpeg"); // "data:image/jpeg;base64,XXXXXX..." みたいな文字列
    $.ajax({
      type: "POST",
      url: "https://kzis9v162g.execute-api.ap-northeast-1.amazonaws.com/beta/upload",
      data : JSON.stringify({
        'name': 'hoge',
        'image': b64
      }),
      dataType: "text",
      success: function(data){
        // Success
        console.log("success");
        console.log(JSON.stringify(data));
        // $("#response").html(JSON.stringify(data));
      },
      error: function(data) {
        // Error
        console.log("error");
        console.log(JSON.stringify(data));
        // $("#response").html(JSON.stringify(data));
      }
    });
  

    // 部屋データ送信
    $.ajax({
      type: "POST",
      url: "https://cnko6od0yb.execute-api.us-east-2.amazonaws.com/develop/room",
      data: JSON.stringify(data),
      dataType: "text",
      success: function(data){
        // Success
        console.log("success");
        console.log(JSON.stringify(data));

        var result = confirm('コワーキングスペースが登録されました！');
        if (result) {
          window.location = "./purchase.html";
        } else {
          window.location = "./purchase.html";
        }
        // $("#response").html(JSON.stringify(data));
      },
      error: function(data) {
        // Error
        console.log("error");
        console.log(JSON.stringify(data));
        // $("#response").html(JSON.stringify(data));
      }
    });
  } else {
    console.log("not find ユーザID無し");
    console.log(localStorage.userId);
  }
}


function upload_image() { 
  var files = document.getElementById("image-place").files;
  if (!files.length) {
    return alert("Please choose a file to upload first.");
  }
  var file = files[0];
  var fileName = file.name;
  console.log(fileName);
  var albumPhotosKey = encodeURIComponent("test") + "//";

  var photoKey = albumPhotosKey + fileName;

  var params = {
    Bucket: albumBucketName,
    Key: 'test.png',
    Body: file,
    ACL: "public-read",
    ContentType: file.type
  }
  // Use S3 ManagedUpload class as it supports multipart uploads

  s3.upload(params, function (err, result) {
    console.log(err);
    console.log(result);
  })

//=====================================================
// 使い方
//=====================================================


  // var promise = upload.promise();

  // promise.then(
  //   function(data) {
  //     alert("Successfully uploaded photo.");
  //     viewAlbum(albumName);
  //   },
  //   function(err) {
  //     return alert("There was an error uploading your photo: ", err.message);
  //   }
  // );
 }

//   {
//     "userId": ,
//     "address": ,
//     "value": , 
//     "detail: {
//       "image":(画像のパスを入力),
//       "tags": [],
//       "describe": ,
//     },
//     "date": "y/m/d h:m"
//   }