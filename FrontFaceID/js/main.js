$('document').ready(function () {
var video = document.querySelector(".videoElement");
  const btn = document.querySelector('button');
    btn.disabled = false;
    btn.onclick = e => {
      console.log("clic bouton");
      reconnaissance();
    };
  async function reconnaissance(){
    /*takeASnap()
    .then(download);*/
    console.log("chargement des modeles")
    const MODEL_URL = '/models'

    await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
    await faceapi.loadFaceLandmarkModel(MODEL_URL)
    await faceapi.loadFaceRecognitionModel(MODEL_URL)
    var labels = ['gwen']
    console.log("entrainement sur l image d exemple")
    const labeledFaceDescriptors = await Promise.all(

      labels.map(async label => {
        // fetch image data from urls and convert blob to HTMLImage element
        const imgUrl = `${label}.jpg`
        const img = await faceapi.fetchImage(imgUrl)

        // detect the face with the highest score in the image and compute it's landmarks and face descriptor
        const fullFaceDescription = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()

        if (!fullFaceDescription) {
          throw new Error(`pas de visage détecté pour ${label}`)
        }

        const faceDescriptors = [fullFaceDescription.descriptor]
        console.log("fin de l'entrainement")
        return new faceapi.LabeledFaceDescriptors(label, faceDescriptors)
      })
    )

    takeASnap().then(async function(blob){
      console.log("on essaie de comparer la cam aux données d entrainement")
      const imgUrl2 = `gwen2.jpg`
      const img2 = await faceapi.fetchImage(imgUrl2)
      let fullFaceDescriptions = await faceapi.detectAllFaces(img2).withFaceLandmarks().withFaceDescriptors()
      const maxDescriptorDistance = 0.6;
      const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, maxDescriptorDistance);
      console.log("comparaison terminée")
      const results = fullFaceDescriptions.map(fd => faceMatcher.findBestMatch(fd.descriptor))
      console.log(results)
    })

  }


    $('#switchCam').on('click', function (e) {
        $('RecoIcon').toggleClass('selectedIcon');
        alerteBool = !alerteBool;
        $('.alert').html('Reconnaissance ' + ChangeAlert());
        StartCam();
    })


    console.log("main.js is ready ");
    $('body').css('background-color', '#90A4AE')
    StartCam();



var alerteBool = false;

function StartCam() {

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



function takeASnap(){
  console.log("on crée un canvas")
  const canvas = document.createElement('canvas'); // create a canvas
  const ctx = canvas.getContext('2d'); // get its context
  canvas.width = video.videoWidth; // set its size to the one of the video
  canvas.height = video.videoHeight;
  console.log("on construit l image à partir de la vidéo")
  ctx.drawImage(video, 0,0); // the video
  console.log("on renvoie l image au format jpg")
  var image = document.getElementById("snap");
  return new Promise((res, rej)=>{
    image.src = canvas.toDataURL('image/jpeg', 1.0); // request a Blob from the canvas
    res(image.src);

  });
}
function download(blob){
  // uses the <a download> to download a Blob
  let a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'gwen.jpg';
  document.body.appendChild(a);
  a.click();

}
})
