let AllData;
let mainCategories;
let subCategory;
let main={};
let urlkey;
let div;

let confirmation = sessionStorage.getItem("mainCategories");
if(confirmation){
    mainCategories=JSON.parse(confirmation);
    let storedData = sessionStorage.getItem("AllData");
    AllData=JSON.parse(storedData);
    console.log('Main Categories:', mainCategories);
    availableData ();
}else {
    fetch(`https://ecomm.dotvik.com/v2kart/service/categories/mainCategories`)
    .then(response => response.json())
    .then(res => {
        mainCategories = res.data; 
        sessionStorage.setItem("mainCategories",JSON.stringify(mainCategories));
        console.log('Main Categories from API:', mainCategories);
        mainCat();
    })
    .catch(error => console.error('Error:', error));
}

function mainCat(){
    let index = 0;
    function fetchNextCategory() {
        if (index >= mainCategories.length) {
            sessionStorage.setItem("AllData", JSON.stringify(main));
            AllData = main;
            console.log('All data fetched and stored');
            CreateMainList();
            return;
        }
        
        const urlkey = mainCategories[index].urlKey;
        fetch(`https://ecomm.dotvik.com/v2kart/service/categories/${urlkey}/tree`)
            .then(response => response.json())
            .then(sub => {
                main[urlkey] = sub.data;
                console.log(`Fetched data for ${urlkey}`);
                index++;
                fetchNextCategory();
            })
            .catch(error => {
                console.error(`Error fetching ${urlkey}:`, error);
                index++;
                fetchNextCategory();
            });
    }
    
    fetchNextCategory();
}

function availableData(){
    console.log("Data is AVAILABLE");
    console.log(AllData);
    console.log(mainCategories);
    CreateMainList();
}

function CreateMainList(){
    let mainUL = document.getElementById('check');
    mainUL.innerHTML = ''; 

    if (mainCategories && mainCategories.length > 0) {
        mainCategories.forEach(e => {
            if (e && e.categoryName) {
                div = document.createElement('div');
                div.setAttribute("id", "mainDiv");
                let mainLi = document.createElement('li');
                let atag = document.createElement('a');
                atag.href=`mainCategory.html?q=*&categoryUrlKeys=${e.urlKey}`;
                atag.appendChild(document.createTextNode(e.categoryName));
                mainLi.appendChild(atag);
                mainLi.appendChild(div);
                mainUL.appendChild(mainLi);
                CreateSubList(e.urlKey);
            }
        });
    }
}

function CreateSubList(y){
    let subUL = document.createElement('ul');
    let x= AllData[y].subCategory;
    console.log(x);
    if (AllData[y] && AllData[y].subCategory) {
        console.log("asde")
        AllData[y].subCategory.forEach((sub) => {
            let div = document.createElement('div');
            let subLI = document.createElement('li');
            let atag = document.createElement('a');
            atag.href=`subCategory.html?q=*&categoryUrlKeys=${sub.urlKey}`;
            atag.appendChild(document.createTextNode(sub.categoryName));
            subLI.appendChild(atag);
            subLI.appendChild(div);
            subUL.appendChild(subLI);
            
            CreateChildlist(y, sub.id, div);
        });
    }
    
    div.appendChild(subUL);
}
function CreateChildlist(urlKey, subUrlKey, parentDiv){
    console.log('Creating child list for:', {urlKey, subUrlKey});
    console.log('Parent data:', AllData[urlKey]);
    
    if (AllData[urlKey]) {
        
        if (AllData[urlKey].childCategory) {
            let childUL = document.createElement('ul'); 
           childUL.setAttribute("id", "childUL");
            AllData[urlKey].childCategory.forEach(child => {
               

                if (child.parentId === subUrlKey) {
                    let childLI = document.createElement('li'); 
                    let childLink = document.createElement('a');  
                    childLink.href=`childCategory.html?q=*&categoryUrlKeys=${child.urlKey}`;
                    childLink.appendChild(document.createTextNode(child.categoryName));  
              
                    childLI.appendChild(childLink);
                  
                    childUL.appendChild(childLI);
                    
                 
                }
            });

            
            parentDiv.appendChild(childUL);
        }
    }
}
