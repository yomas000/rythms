function changeIcon(e){
    let img = e.path[0]

    
    if (img.src == "http://localhost/public/images/play.png") {
        img.src = "http://localhost/public/images/pause.png"
        document.getElementById('player').play()
    }else{
        img.src = "http://localhost/public/images/play.png"
        document.getElementById('player').pause()
    }
}


function makePost(){
    let context;
    let request;
    let source;

    try {
        context = new AudioContext();
        request = new XMLHttpRequest();
        request.open("GET", "/audio", true);
        request.responseType = "arraybuffer";

        request.onload = () => {
            context.decodeAudioData(request.response, (buffer) => {
                source = context.createBufferSource();
                source.buffer = buffer;
                source.connect(context.destination);
                // auto play
                source.start(0); // start was previously noteOn

            });
        };

        request.send();

    } catch (e) {
        alert('web audio api not supported');
    }
}