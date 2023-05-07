document.addEventListener("click",function(e)//e parameter bought all the clicked values
{
    //update operation
if(e.target.classList.contains("edit-me"))  //if we click edit it shows below command ,edit-me is button name decalred in html
{
    let a= prompt("Enter the new value",  e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)//it will show data to be edited on edit box
    axios.post('update-item',{text:a,id:e.target.getAttribute("data-id")}).then(function()
    {
        e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = a //update data lively on frontend,item-text is the class name for data to be edited

    }).catch(function() //for any error detection
        {
            console.log("Error,try agian") 
            }
    )
}


//delete opeartion
if(e.target.classList.contains("delete-me"))//if we click delete it shows below command ,delete-me is button name decalred in html
{  
confirm("Are you really want to Delete?")
    axios.post('/delete-item',{id:e.target.getAttribute("data-id")}).then(function()
    {
        e.target.parentElement.parentElement.remove() //used to delete item lively

    }).catch(function() //for any error detection
        {
            console.log("Error,try agian") 
            }
    )
}
})