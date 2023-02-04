function getAttachedData(data)
{
    let fd=document.getElementById("main");
    let h1=document.createElement('h1');
    h1.style.textAlign="center";
    h1.innerText=data.title;
    let p=document.createElement('p');
    p.innerText=data.author;
    fd.appendChild(h1);
    p.style.paddingLeft="16%"
    fd.appendChild(p);
    let img=document.createElement('img');
    img.src=data.imageUrl;
    img.classList.add("center");
    fd.appendChild(img);
}
async function getDetail(){
    let params = new URLSearchParams(document.location.search);
    let name = params.get("url");
    let nameSplit=name.toLowerCase().split(" ");
    let newUrl=[];
    for(let x of nameSplit)
    {
        if(x.charCodeAt(x.length-1)>=97&&x.charCodeAt(x.length-1)<=122)
        {
            newUrl.push(x);
        }else
        {
            newUrl.push(x.substring(0,x.length-1));
        }
    }
    name=newUrl.join("-");
    const value= await fetch(`http://localhost:8000/?title=${name}`);
    const data=await value.json();
    if(Object.keys(data).length==0)
    {
        let fd=document.getElementById("main");
        let h1=document.createElement('h1');
        h1.style.textAlign="center";
        h1.innerText="No Result Found";
        fd.appendChild(h1);
    }
    for(let x of data){
        getAttachedData(x);
    }
}
getDetail();