
$("#mySidenav").on('click','a',function(e){
  e.preventDefault();
  const xhttp = new XMLHttpRequest();
  console.log(xhttp.status);
  xhttp.onload = function() {
    var res=JSON.parse(this.response);
    //document.getElementsByClassName("content")[0].innerHTML=res;
    document.getElementById("content").innerHTML=res.toString();
  }
  xhttp.open("GET",e.target.href);
  xhttp.send();
})
window.onload=function fetchKeyLoggers() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    var array=JSON.parse(this.responseText);
    const element = document.getElementById("mySidenav");
    for(var j=0;j<4;j++){
    for(var i=0;i<array.length;i++){
      var user = document.createElement("a");
      var node = document.createTextNode(array[i].username);
      user.appendChild(node);
      user.setAttribute('href',"/user/logs/"+array[i].username);
      user.setAttribute('class',"w3-bar-item w3-button");
      element.appendChild(user);
      element.appendChild(document.createElement('br'));
    }
  }
  }
  xhttp.open("GET", "/users");
  xhttp.send();
}