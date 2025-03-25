
index =0 ;
let mainCategories;
let subCategory;
let main={};
let lst =0
let urlkey;
let check = sessionStorage.getItem("AllCategeroies");
if(check){
   
    availableData ();
}else {
    fetch(`https://ecomm.dotvik.com/v2kart/service/categories/mainCategories`)
.then(response => response.json())
.then(res => {
           mainCategories = res.data; 
           main['maincategory']=mainCategories;
      
        sessionStorage.setItem("mainCategories", JSON.stringify(mainCategories));
        mainCat();
})
.catch(error => console.error ('Error:', error));

}

function mainCat(){
    
    if(index >mainCategories.length ){
        return;
    } 

    fetch(`https://ecomm.dotvik.com/v2kart/service/categories/${mainCategories[index].urlKey}/tree`)
 .then(response => response.json())
 .then(sub => {


        main[lst]=sub.data;
        lst++;
    index++;
    mainCat();
 })
 sessionStorage.setItem("AllCategeroies", JSON.stringify(main));
 console.log(main);
    }

   
function availableData (){
   console.log("Data is aVAIALBLE ");
   console.log(JSON.parse(check));
}

document.getElementById('navB').innerHTML=  <ul>
<li>
checnjk
</li>
</ul>