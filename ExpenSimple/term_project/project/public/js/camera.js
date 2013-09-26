function captureSuccess(mediaFiles) {
    //display the image on capture for preview.
    var img = $('<img id="img"></img>');
    var div = $('#myphoto');
    var c = "data:image/jpeg;base64,"+mediaFiles;
    img.attr('src', c);
    div.empty();
    div.append(img);
}

function captureError(error) {
    $('#myphoto').empty();
    $('#myphoto').append('<p class="error">Photo not taken.</p>');
}

//Called on clicking the camera button

function captureImage() {
    var options = {
        quality: 40, 
        correctOrientation: true, 
        targetWidth: 300, 
        targetHeight: 300, 
        destinationType : Camera.DestinationType.DATA_URL 
    }
    navigator.camera.getPicture(captureSuccess, captureError, options);
}