$('document').ready(function () {
 
    $('#switchCam').on('click', function (e) {
        $('i').toggleClass('selectedIcon');
        alerteBool = !alerteBool;
        $('.alert').html('Reconnaissance ' + ChangeAlert());
        StartCam();
    })


    console.log("main.js is ready ");
    $('body').css('background-color', '#90A4AE')
    StartCam();

})

var alerteBool = false;

function StartCam() {

    var video = document.querySelector(".videoElement");
    
    if (video.srcObject == null) {
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({
                    video: true
                })
                .then(function (stream) {
                    video.srcObject = stream;
                })
                .catch(function (err0r) {
                    console.log("Something went wrong!");
                });
        }
    } else {
        stop(video);
        StartCam();
    }

}

function stop(video) {
    var stream = video.srcObject;
    var tracks = stream.getTracks();

    for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        track.stop();
    }
    video.srcObject = null;
    console.log("stopped displaying")
}

function ChangeAlert() {
    if (!alerteBool) {
        return " des Agents";
    } else {
        return " du matériel";
    }
}