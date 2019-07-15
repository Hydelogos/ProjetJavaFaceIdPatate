$('document').ready(function () {
	var myUrl = "";
	var labels = []
	const firebaseConfig = {
			  apiKey: "AIzaSyBwyPYT6Ip5dGbeE6R5P-Zk8m6_ojPsxe4",
			  authDomain: "faceanalysis-f875c.firebaseapp.com",
			  databaseURL: "https://faceanalysis-f875c.firebaseio.com",
			  projectId: "faceanalysis-f875c",
			  storageBucket: "faceanalysis-f875c.appspot.com",
			  messagingSenderId: "87928137075",
			  appId: "1:87928137075:web:e7818c785dfed74e"
			};
	firebase.initializeApp(firebaseConfig);
	var storage = firebase.storage();
	var storageRef = storage.ref();
	var imagesRef = storageRef.child('images');
	imagesRef.listAll().then(function(res) {
		  res.prefixes.forEach(function(folderRef) {
		    // All the prefixes under listRef.
		    // You may call listAll() recursively on them.
			  console.log(folderRef);
		  });
		  res.items.forEach(function(itemRef) {
		    // All the items under listRef.
			  console.log(itemRef);
			  labels = [];
			  labels.push(itemRef.name.replace(".jpg", ""))
			  itemRef.getDownloadURL().then(function(url) {
				  // `url` is the download URL for 'images/stars.jpg'

				  // This can be downloaded directly:
				  /*var xhr = new XMLHttpRequest();
				  xhr.responseType = 'blob';
				  xhr.onload = function(event) {
				    var blob = xhr.response;
				    console.log(blob);
				  };
				  
				  xhr.open('GET', url, true);
				  xhr.setRequestHeader('Access-Control-Allow-Origin', url);
				  xhr.send();*/

				  // Or inserted into an <img> element:
				  var img = document.getElementById('snap');
				  myUrl = url;
				  
				}).catch(function(error) {
				  console.log(error)
				});
		  });
		  console.log(labels);
		}).catch(function(error) {
			
			console.log(error);
		});
	
var video = document.querySelector(".videoElement");
  const btn = document.querySelector('button');
    btn.disabled = false;
    btn.onclick = e => {
      console.log("clic bouton");
      takeASnap();
      reconnaissance();
    };
  async function reconnaissance(){
    /*takeASnap()
    .then(download);*/
    console.log("chargement des modeles")
    const MODEL_URL = './models'

    await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
    await faceapi.loadFaceLandmarkModel(MODEL_URL)
    await faceapi.loadFaceRecognitionModel(MODEL_URL)
    await faceapi.loadTinyFaceDetectorModel(MODEL_URL)
    await faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL)
    
    console.log("entrainement sur l image d exemple")
    const labeledFaceDescriptors = await Promise.all(

      labels.map(async label => {
        // fetch image data from urls and convert blob to HTMLImage element
        const imgUrl = `${label}.jpg`
        var imgtest = document.getElementById('snap');
        const img = await faceapi.fetchImage(myUrl)
        // detect the face with the highest score in the image and compute it's landmarks and face descriptor
        const fullFaceDescription = await faceapi.detectSingleFace(img, new faceapi.SsdMobilenetv1Options()).withFaceLandmarks(true).withFaceDescriptor()

        if (!fullFaceDescription) {
          throw new Error(`pas de visage détecté pour ${label}`)
        }

        const faceDescriptors = [fullFaceDescription.descriptor]
        console.log("fin de l'entrainement")
        return new faceapi.LabeledFaceDescriptors(label, faceDescriptors)
      })
    )

    
      console.log("on essaie de comparer la cam aux données d entrainement")
      const input = document.getElementById('snap')
      let fullFaceDescriptions = await faceapi.detectAllFaces(input, new faceapi.SsdMobilenetv1Options()).withFaceLandmarks(true).withFaceDescriptors()
      const maxDescriptorDistance = 0.6;
      const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, maxDescriptorDistance);
      console.log("comparaison terminée")
      if (!fullFaceDescriptions) {
          throw new Error(`pas de visage détecté sur la capture`);
        }
      const results = fullFaceDescriptions.map(fd => faceMatcher.findBestMatch(fd.descriptor))
      console.log(results)

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
  canvas.width = video.offsetWidth; // set its size to the one of the video
  canvas.height = video.offsetHeight;
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
