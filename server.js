let express=require('express')
let mongodb=require("mongodb")
let b=express()
let db=null
b.use(express.static('public'));
const MongoClient=mongodb.MongoClient;

let dbstring='mongodb+srv://Dharanish:mongogct@cluster0.vyozq08.mongodb.net/todoapp?retryWrites=true&w=majority'
let dbName='todoapp'

MongoClient.connect(dbstring,{useNewUrlParser:true,useUnifiedTopology:true},function(err,client)// dbstring is unique value for us present in mongodb connect to cluster
{
  if(err){
    throw err
  }
  db=client.db(dbName)//assign database to db variable
  b.listen(12000)
}
)
function password(req, res, next){
  res.set('WWW-Authenticate', 'Basic realm="todoapp"')
  if(req.headers.authorization == 'Basic RGhhcmFuaXNoOjIwMDM='){
    next()
  }else{
    res.status(401).send("please prove id password")
  }
  }

b.use(express.json())//used to pass data correctly
b.use(express.urlencoded({extended:false}))//used to pass data in express

b.use(password)//after finshing password function only ,all other function works  
b.get('/',function(req,res)
{
  db.collection('items').find().toArray(function(err,items)
  {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Simple To-Do App</title>
    <style>
    #all:checked + label {
      color:black;
      text-decoration: line-through;

    }
    body {
      background-color: #ffffff;
      color: #333333;
    }
    .dark-mode {
      
        background-color: #333333;
        color: #ffffff;
      
    }


    .switch {
      display: inline-block;
      width: 50px;
      height: 29px;
      position: absolute;
      right: 3%;
      top:1%

    }
    
    .switch input { 
      opacity: 0;
      width: 0;
      height: 0;
    }
    
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: black;
      -webkit-transition: .4s;
      transition: .4s;
    }
    
    .slider:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
    }
    
    input:checked + .slider {
      background-color: orange;
    }
    
    input:focus + .slider {
      box-shadow: 0 0 1px grey;
    }
    
    input:checked + .slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }
    
    /* Rounded sliders */
    .slider.round {
      border-radius: 30px;
    }
    
    .slider.round:before {
      border-radius: 50%;
    }
    </style>
    
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
      </head>
    <body>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script> <!--used to update data in db easily-->
    <script src="/todo.js"></script>
    <script src="func.js"></script>

    <a href="profile.html">profile</a>

    <label class="switch">
    <input type="checkbox" onclick="toggleMode()">
    <span class="slider round"></span>
  </label> 


      <div class="container">
        <h1 class="display-6 text-center py-1">To-do APP</h1>
        <div class="jumbotron p-3 shadow-sm">
          <form action="/create-item" method="POST">
            <div class="d-flex align-items-center">
              <input name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
              <button class="btn btn-primary">Add New Item</button>
            </div>
          </form>
        </div>
        <p><b style="color:red;font-size:21px;">Click the button to sort the task</b>
<button onclick="sortList()" class=" btn btn-success btn-sm mr-1">Sort:(A-Z)</button></p>
        <ol class="list-group pb-5" id="all">
${items.map(function(item) {      //for 37th  line
 //map used in array
       return `<li  class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
      <div class="col-sm-10 text-left"> <input type="checkbox" name="chk" style="width: 17px; height: 17px;" id="all">  
       <label for="a"> <span class="item-text ">${item.text}</span></label></div>
            <div>
              <button class="edit-me btn btn-secondary btn-sm mr-1 ">Edit</button>
              <button  data-id=${item._id} class="delete-me btn btn-danger btn-sm mr-1 ">Delete</button>
            </div>
          </li>`
} ).join('')
//join used for more than 1 data
}  <br>  <p><b><button class="check-all-text btn btn btn-warning"  style="font-size: 26px;"> 
<input type="checkbox" onclick="selectall()" style="width: 26px; height: 23px;" id="sel"/>&nbsp;Select all </button></b>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<b><button class="check-all-text btn btn btn-info"  style="font-size: 26px;"> 
<input type="checkbox" onclick="deselectall()" style="width: 26px; height: 23px;" id="dsel"/>&nbsp;Deselect all </button></b></p>
        </ol>     
      </div>
    </body>
    </html>
    `)
  }
      )  
}
)
//insert
b.post('/create-item',function(req,res)
{
db.collection('items').insertOne({text:req.body.item},function()//value to be inserted
{
    res.redirect('/')//upadte on the same page
})
})
//update
b.post('/update-item',function(req,res)
{
  db.collection('items').findOneAndUpdate({_id:new mongodb.ObjectId(req.body.id)},{$set:{text:req.body.text}},function()
  {
    res.send("Data updated")
  })
})
//delete
b.post('/delete-item',function(req,res)
{
  db.collection('items').deleteOne({_id:new mongodb.ObjectId(req.body.id)},function()
  {
    res.send("data deleted")
  })
})
//search
b.post('/search-item',function(req,res)
{
  //db.collection("items").findOne({_id:new mongodb.ObjectId(req.body.id)}, function() 
  db.collection("items").find({}, { projection: { _id: new mongodb.ObjectId(req.body.id)} }).toArray(function(err, result) 
  {
    res.send("/")
    console.log(result);
    db.close();
  })
})