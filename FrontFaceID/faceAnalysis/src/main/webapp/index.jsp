<!DOCTYPE html>
<html>

<head>
    <title>Securigo</title>
    <link rel="icon" href="img/favico.png" />
    <meta charset="UTF-8">
	 <!-- Insert these scripts at the bottom of the HTML, but before you use any Firebase services -->

  <!-- Firebase App (the core Firebase SDK) is always required and must be listed first -->
  <script src="https://www.gstatic.com/firebasejs/6.3.0/firebase-app.js"></script>

  <!-- Add Firebase products that you want to use -->
  <script src="https://www.gstatic.com/firebasejs/6.3.0/firebase-storage.js"></script>
    <script type="text/javascript" src="./node_modules/jquery/dist/jquery.min.js"></script>
    <script type="text/javascript" src="./node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="./js/face-api.js"></script>
    <script type="text/javascript" src="./js/main.js"></script>


    <link rel="stylesheet" href="css/main.css" />
    <link rel="stylesheet" href="./node_modules/bootstrap/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
        integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">

</head>

<body>
    <h1>FaceID</h1>

    <div>


        <div class="row mt-3">
            <div class="col-md-6">
                <div class="col tab-content">

                    <div class="tab-pane active" id="webcamAgent" role="tabpanel">
                        <div id="container">
                            <video autoplay="true" class="videoElement mt-3"></video>
                           <div class="row"></div> <button id="startbutton" type="button" class="btn m-2"
                                style="background-color: #379EC1">Prendre une photo <i class="fas fa-camera"></i>
                            </button></div>
                        </div>
                    </div>

                </div>

                <div class="col-md-6">
                    <div class="col tab-content">

                        <div class="tab-pane active" id="webcamAgent" role="tabpanel">
                            <div id="container">
                              <img src="" id="snap" class="mt-3" style="width:840px; height: 400px;"></img>
                            </div>
                        </div>

                    </div>


            </div>

        </div>

        <div class="col-md-6">
            <div class="mt-3">
                <label><i class="fas fa-user-shield selectedIcon RecoIcon"></i></label>
                <label class="switch m-3">
                    <input type="checkbox" id="switchCam">
                    <span class="slider round"></span>
                </label>
                <label><i class="fas fa-tools RecoIcon"></i></label>
            </div>

            <div class="row mt-2">
                <div class="alert m-auto" style="background-color: #379EC1" role="alert">
                    Reconnaissance des Agents
                </div>
            </div>
        </div>

    </div>

</body>


</html>
