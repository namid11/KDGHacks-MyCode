var AWS = require('aws-sdk');
var s3 = new AWS.S3({ apiVersion: '2006-03-01', region: 'ap-northeast-1'});

var BUCKET_NAME = 'bocchikdghacks';
var DIRECTORY_PATH = 'room_image';

exports.handler = async (event) => {
    // TODO implement
    
    console.log("[LOG]");
    console.log(event);
    
    var fileName = '/' + "test" + '.jpg';
    console.log('bucket:', BUCKET_NAME, 'file-path:', fileName);
    
    var imageBuffer = decodeBase64Image(event.image, context);
    console.log(imageBuffer);

    
    // var param = {Bucket: 'bocchikdghacks', Key: 'test', Body: "aaaa"};
    // console.log("s3");
    // s3.upload(param, function(err, data) {
    //     if (err) {
    //         console.log(err, err.stack); // an error occurred
    //     } else {
    //         console.log(data);           // successful response
    //     }
    // });
    
    
    const response = {
        statusCode: 200,
        body: JSON.stringify({'result': 'OK'}),
    };
    return response;
};
