function changeIcon(e){
    let img = e.path[0]
    
    if (img.src == "http://localhost/public/images/play.png") {
        img.src = "http://localhost/public/images/pause.png"
    }else{
        img.src = "http://localhost/public/images/play.png"
    }
}