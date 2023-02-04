let page=1,category="",type="articles";
let fd=document.getElementById("main");
console.log(fd)

function createCard(x)
{
    // console.log(x);
    let mdiv=document.createElement('div');
    mdiv.classList.add("parent");
     let div=document.createElement('div');
     div.classList.add("parent_image");
     let div1=document.createElement('div');
     div1.classList.add("parent_text");
    let img=document.createElement("img");
    img.src=x.imageUrl;
    let a=document.createElement('a');
    let attachmentHref=x.title;
    a.href="/OuterPage/?url="+attachmentHref;
    let p=document.createElement('h2');
    let p1=document.createElement('p');
    let p2=document.createElement('p');
    a.appendChild(p);
    p.innerText=x.title;
    p1.innerText=x.metaDescription;
    p2.innerHTML=x.author;
    div.appendChild(img);
    div1.appendChild(a);
    div1.appendChild(p1);
    div1.appendChild(p2);
    mdiv.appendChild(div);
    mdiv.appendChild(div1);
    fd.appendChild(mdiv);
}


async function gettingPromiseData()
{
    let url=`http://localhost:8000/?pagesize=16&page=${page}&category=${category}&type=${type}`;
    const value=await fetch(url);
    const data=await value.json();
    if(data.length<16)
    {
        document.getElementById("more").disabled=true;
    }else{
        document.getElementById("more").disabled=false;
    }
    for(let x of data){
        createCard(x)
    }
    page+=1;
}
async function getData()
{
    // let type="articles";
    category="",type="articles";
    fd.innerHTML=" ";
    let clickedValue=document.getElementsByClassName("clickables");
    for(let element of clickedValue)  {
       element.addEventListener("click",(e)=>
       {
        document.getElementById("more").disabled=true;
        type="category";
        page=1;
        if(e.target.innerHTML=="Trends")
        {
            category="trends";
        }else if(e.target.innerHTML=="Advice")
        {
            category="advice";
        }else if(e.target.innerHTML=="Relationships")
        {
            category="relationships";
        }else if(e.target.innerHTML=="Inspiration")
        {
            category="inspiration";
        }
        fd.innerHTML=" ";
        gettingPromiseData();
       })
    };

    gettingPromiseData();
}
getData();

async function searchData()
{
    // page=1;
    fd.innerHTML=" ";
    let search=document.getElementById("searchValue").value.toLowerCase();
    let url=`http://localhost:8000/?page=${page}&search=${search}`;
    const value=await fetch(url);
    const data=await value.json();
    if(Object.keys(data).length==0)
    {
        let fd=document.getElementById("main");
        let h1=document.createElement('h1');
        h1.innerHTML="No Result Found";
        fd.appendChild(h1);
        return ;
    }
    for(let x of data){
      createCard(x)
    }

}
function getMoreData()
{
    gettingPromiseData();
}