let bool = false
function changetext(){
  if(bool == true){
    bool = false
    document.getElementById("gg").innerHTML = "off"
  } else {
    bool = true
    document.getElementById("gg").innerHTML = "on"
  }
}
  
