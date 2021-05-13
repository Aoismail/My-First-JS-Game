let imgback = true
var backimgp1 = "./img/3.png"
var backimgp2 = "./img/4.png"
      
 const correctTarget = () => {
     if (imgback){
      $(`body`).css("background-image", `url(${backimgp1})`)
      imgback = false
    }else{
        imgback = true
        $(`body`).css("background-image", `url(${backimgp2})`)
    }
    };
    
let test = setInterval(correctTarget, 1500);