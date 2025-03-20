

fetch('https://ecomm.dotvik.com/v2kart/service/categories/mainCategories') 
    .then(response => response.json())
    .then(res => {
        ourData = res.data;

        
        mainData(ourData);
       

})
  .catch(error => console.error ('Error:', error));
 

let index =0 ;
  function mainData(ourData ) {
            if ( ourData.length <= index) {
                return ;
            }
            let categoryName = ourData[index].categoryName;
            let key = ourData[index].urlKey;
            console.log("main category " + categoryName);
          

            let list = document.createElement('li');
            let atag = document.createElement('a');
            let div = document.createElement('div');
            div.setAttribute('id','okay');
            atag.appendChild(document.createTextNode(categoryName));
           atag.href=`mainCategory.html?Category_UrlKey=${key}&Category_SearchTitle=${categoryName}&page_Num=1`;
          


            list.appendChild(atag);
            list.appendChild(div);
            document.getElementById('lists').appendChild(list);

            
        
          innerData (key , div );
    
        }

  function innerData ( key ,list ){
        fetch(`https://ecomm.dotvik.com/v2kart/service/categories/${key}/tree`)
.then(response => response.json())
.then(mydata => {


      if(mydata.data && mydata.data.subCategory){

        mydata.data.subCategory.forEach((e,i) => {
          let div = document.createElement('div');
        let innerlist =document.createElement('ul');
          let atag = document.createElement('a');
          console.log("category name and index",e.categoryName,i);
          atag.appendChild(document.createTextNode(e.categoryName));
          atag.href=`subcategory.html?q=*&categoryUrlKeys=${e.urlKey}`;
          div.appendChild(atag);
          div.appendChild(innerlist);
          list.appendChild(div);
         
          let eys =   e.id;
          nestedData(eys , innerlist);
          
        }
      );
        
      }
      
function nestedData (eys , innerli){
  mydata.data.childCategory.forEach((e)=>{
    let fkey = e.parentId;
    if(fkey == eys ){
      
      let nestedli = document.createElement('li');
      console.log(e.categoryName);
      let atag = document.createElement('a');
      atag.href=`lastCategory.html?q=*&categoryUrlKeys=${e.urlKey}`;
      atag.appendChild(document.createTextNode(e.categoryName));
      nestedli.appendChild(atag);
      innerli.appendChild(nestedli);
     
    }
  });
}      
      index ++;
      mainData( ourData) ;
})
}
