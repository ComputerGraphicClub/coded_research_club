// get correct fit size on mobile 

const setHeight = () => {
    document.getElementById("scroll-container").style.height = window.innerHeight + "px";
    window.setTimeout(setHeight, 5);
};

    window.addEventListener("resize", setHeight);

    setHeight();



// Check if "project-area" is in viewport & add +90deg on cross

const projectArea = document.getElementsByClassName("project-area");
let menuIconAngle = 0;

function isInViewportY(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= (-window.innerHeight / 2 || -document.documentElement.clientHeight / 2) &&
        rect.top <= (window.innerHeight / 2 || document.documentElement.clientHeight / 2)
    );
}

document.addEventListener('scroll', function (ev) {
     
    for (let i = 0; i < projectArea.length; i++) {

        if (isInViewportY(projectArea[i])) {
            descIcon.style.transform = "rotate(calc(" + i + "*90deg))"; 
            menuIcon.style.transform = "rotate(calc(" + i + "*90deg + " + menuIconAngle + "deg))"; 
        }
    }
}, true)




// Check img quantity on each project, update img-index and change img on click ()

    const projectImgIndex = document.getElementsByClassName("project-img-index");
    const imgList = document.getElementsByClassName('project-img-list');
    
   

for (let i = 0; i < imgList.length; i++) {  
    
    imgList[i].onclick = function () {
        // changeProjectImg(i)
    };
}

function changeProjectImg(a) {



    const projectImg = imgList[a].getElementsByTagName('img');

            if (counterImg < projectImg.length-1) {

                projectImg[counterImg].classList.remove('img-active');
                projectImg[counterImg].nextElementSibling.classList.add('img-active');
                counterImg++;
                console.log("count " + a + "= " + counterImg);
            }
        
            else {
                projectImg[0].classList.add('img-active');
                projectImg[projectImg.length-1].classList.remove('img-active');
                console.log("count: " + counterImg);
                counterImg = 0;
            }

}

for (let i = 1; i < projectArea.length; i++) { 

    const projectImgLength = imgList[i-1].getElementsByTagName('img');
   
    let counterImg = 1;
    
    projectImgIndex[i-1].innerHTML = "1/" + projectImgLength.length;

    for (let j = 0; j < projectImgLength.length; j++) {
        
    
        projectImgLength[j].onclick = function () {

           
            if (j < projectImgLength.length-1) {
            projectImgLength[j].classList.toggle('img-active');
            projectImgLength[j].nextElementSibling.classList.toggle('img-active');
            counterImg++;
            }
        
            else {
            projectImgLength[0].classList.toggle('img-active');
            projectImgLength[projectImgLength.length-1].classList.toggle('img-active');
            counterImg = 1;
            }

            projectImgIndex[i-1].innerHTML = counterImg + "/" + projectImgLength.length;
        }

     
    }
    
};

// If click on description button, add +/- 45deg & change opacity on additional description text
// If click on menu button, add +/- 45deg 

const menuIcon = document.getElementById("menu");
const menuArea = document.getElementById("menu-area");
const menuList = document.getElementById("menu-list");
const rowMenuDisable = document.getElementById("row-menu-mobile-none"); 
let menuIconState = 0;


const descIcon = document.getElementById("description");
const descText = document.querySelectorAll('#info-contact, #info-adress, #info-authors, #info-description, #info-curriculum');
let descIconState = 0;

function smartphoneView(maxWidth) {

    // Modification for smartphone views
    if (maxWidth.matches) { 

        const infoAuthors = document.getElementById("info-authors");
        const infoDescription = document.getElementById("info-description");
        infoAuthors.innerHTML = "valentin calame<br>architect epfl + chal<br>designer epfl + ecal lab<br>david viladomiu ceballos<br>architect epfl + etsav";
        infoDescription.innerHTML = "architecture office, based between geneva, lausanne and barcelona, engaging in diverse problematics, scales and types, negotiating the coexistence of contradictions, researching on the duality of nature / culture, experimenting with the simultaneity of structure / infrastructure / superstructure, investigating the reciprocity of beauty / performance";
        
        const projectDescription = document.getElementsByClassName("project-description");
        const projectPartners = document.getElementsByClassName("project-partners");
        

 // click on description button 
 descIcon.onclick = function () {

    if (isInViewportY(projectArea[0])) {
      

if (descIconState === 0) {
    descText[0].style.opacity = "0";
    descText[1].style.opacity = "0";
    descText[2].style.opacity = "1";
    descText[3].style.opacity = "1";
    descText[4].style.opacity = "1";
    descIcon.style.transform = "rotate(calc(" + 0 + "*90deg + 45deg))"; 
    descIconState = 1;
}
else {
    descText[0].style.opacity = "1";
    descText[1].style.opacity = "1";
    descText[2].style.opacity = "0";
    descText[3].style.opacity = "0";
    descText[4].style.opacity = "0";
    descIcon.style.transform = "rotate(calc(" + 0 + "*90deg))";  
    descIconState = 0;
}
}
    
    for (let i = 1; i < projectArea.length; i++) {

        if (isInViewportY(projectArea[i])) {
          
    
    if (descIconState === 0) {
        projectDescription[i-1].style.opacity = "1";
        projectPartners[i-1].style.opacity = "1";
        imgList[i-1].style.opacity = "0";
        projectImgIndex[i-1].style.opacity = "0";
        console.log("project desc Open " + i);
        descIconState = 1;
    }
    else {
        projectDescription[i-1].style.opacity = "0";
        projectPartners[i-1].style.opacity = "0";
        imgList[i-1].style.opacity = "1";
        projectImgIndex[i-1].style.opacity = "1";
        console.log("project desc Close " + i);
        descIconState = 0;
    }
    }

}

};

// change blue color on descIcon on desktop 

var descIconColor = document.head.appendChild(document.createElement("style"));

document.addEventListener('scroll', function (ev) {
    
    if (isInViewportY(projectArea[0])) {
        descIconColor.innerHTML = ".cross#description:before {background: rgb(36, 125, 240);} .cross#description:after {background: rgb(36, 125, 240);}";
    }

    else {
        descIconColor.innerHTML = ".cross#description:before {background: #b17f4a;}  .cross#description:after {background: #b17f4a;}";
    }

}, true)

        // click on menu button 


    menuList.onclick = function () {
    menuArea.style.opacity = "0"
    menuArea.style.backgroundColor = "rgba(240, 240, 240, 0.6)"
    menuList.style.pointerEvents = "none";
    menuIconState = 0;
};

        menuIcon.onclick = function () {
            for (let i = 0; i < projectArea.length; i++) {
        
                if (isInViewportY(projectArea[i])) {
            
            if (menuIconState === 0) {
                menuIcon.style.transform = "rotate(calc(" + i + "*90deg + 45deg))"; 
                menuArea.style.opacity = "1";
                menuList.style.pointerEvents = "auto";
                rowMenuDisable.style.opacity = "0"
                menuIconState = 1;
                console.log("mobile");
               
            }
            else {
                menuIcon.style.transform = "rotate(calc(" + i + "*90deg))"; 
                menuArea.style.opacity = "0"
                menuArea.style.backgroundColor = "rgba(240, 240, 240, 0.6)"
                menuList.style.pointerEvents = "none";
                rowMenuDisable.style.opacity = "1"
                menuIconState = 0;
            }
        }
            }
        
        };
   
    // Modification for desktop views
    } else {

 // click on description button 
descIcon.onclick = function () {

    if (isInViewportY(projectArea[0])) {
      

if (descIconState === 0) {
    descText[0].style.opacity = "1";
    descText[1].style.opacity = "1";
    descText[2].style.opacity = "1";
    descText[3].style.opacity = "1";
    descText[4].style.opacity = "1";
    descIcon.style.transform = "rotate(calc(" + 0 + "*90deg + 45deg))"; 
    descIconState = 1;
}
else {
    descText[0].style.opacity = "1";
    descText[1].style.opacity = "1";
    descText[2].style.opacity = "0";
    descText[3].style.opacity = "0";
    descText[4].style.opacity = "0";
    descIcon.style.transform = "rotate(calc(" + 0 + "*90deg))";  
    descIconState = 0;
}
}

};

// remove blue color on descIcon on desktop 

var descIconColor = document.head.appendChild(document.createElement("style"));

document.addEventListener('scroll', function (ev) {
    
    if (isInViewportY(projectArea[0])) {
        descIconColor.innerHTML = ".cross#description:before {background: rgb(36, 125, 240);} .cross#description:after {background: rgb(36, 125, 240);}";
    }

    else {
        descIconColor.innerHTML = ".cross#description:before {background: black;}  .cross#description:after {background: black;}";
    }

}, true)

     
        // click on menu button 
        menuIcon.onclick = function () {
            for (let i = 0; i < projectArea.length; i++) {
        
                if (isInViewportY(projectArea[i])) {
            
            if (menuIconState === 0) {
                menuIcon.style.transform = "rotate(calc(" + i + "*90deg + 45deg))"; 
                menuArea.style.opacity = "1";
                menuList.style.pointerEvents = "auto";
                menuIconState = 1;
                menuIconAngle = 45;
                console.log("desktop");
               
            }
            else {
                menuIcon.style.transform = "rotate(calc(" + i + "*90deg))"; 
                menuArea.style.opacity = "0"
                menuArea.style.backgroundColor = "rgba(240, 240, 240, 0.6)"
                menuList.style.pointerEvents = "none";
                menuIconState = 0;
                menuIconAngle = 0;
            }
        }
            }
        
        };
 
    }

  }
  
  // Create a MediaQueryList object
  var maxWidth = window.matchMedia("(max-width: 600px)")
  
  // Call listener function at run time
  smartphoneView(maxWidth);
  
  // Attach listener function on state changes
  maxWidth.addEventListener("change", function() {
    smartphoneView(maxWidth);
  });























