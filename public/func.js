//select and deselect all
function selectall(){  
          var a=document.querySelector('#dsel')
          var ele=document.getElementsByName('chk');  
          for(var i=0; i<ele.length; i++){  
              if(ele[i].type=='checkbox')  
                  ele[i].checked=true;  
          }  
          a.checked=false;
      }
      function deselectall(){ 
        var a=document.querySelector('#sel')
        var ele=document.getElementsByName('chk');  
        for(var i=0; i<ele.length; i++){  
            if(ele[i].type=='checkbox')  
                ele[i].checked=false;
        }  
        a.checked=false;
    }   

    //sorting
function sortList() {
  var list, i, switching, b, shouldSwitch;
  list = document.getElementById("all");
  switching = true;//sorting begins
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // start by saying: no switching is done:
    switching = false;
    b = list.getElementsByTagName("li");
    // Loop through all list-items:
    for (i = 0; i < (b.length - 1); i++) {
      // start by saying there should be no switching:
      shouldSwitch = false;
      /* check if the next item should
      switch place with the current item: */
      if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
        /* if next item is alphabetically
        lower than current item, mark as a switch
        and break the loop: */
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If shouldSwitch is true, it means that a swap was made. The insertBefore() method is used to swap the positions of the two list items. */
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;//The switching variable is set to true to indicate that another pass through the list is required.
    }
  }
}

//dark theme
function toggleMode() {
  var body = document.querySelector('body');
  body.classList.toggle('dark-mode');
}