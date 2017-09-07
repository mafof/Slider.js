var Sls = (function() {
  // code...
});

Sls.prototype._properties = {
  NameCarousel: null,
  WidthSlide: null,
}
/*
 * ElemAppend - Выбрать где будет элемент
*/
Sls.prototype.createCarousel = function(ElemAppend, idElem, width = null, height = null) {
  Slider._properties.NameCarousel = idElem;
  if(typeof ElemAppend === "string") {
    ElemAppend = document.getElementById(ElemAppend);
  }
  // Создать карусель =>
  var divCarousel = document.createElement("div");

  divCarousel.id = Slider._properties.NameCarousel;

  if(width !== null && height !== null) {
    divCarousel.style.width = width;
    divCarousel.style.height = height;
    Slider._properties.WidthSlide = width;
  } else {
    divCarousel.style.width = "inherit";
    divCarousel.style.height = "inherit";
    console.log(ElemAppend.offsetWidth);
    Slider._properties.WidthSlide = ElemAppend.offsetWidth;
  }
  divCarousel.style.overflow = "hidden";

  var divCarouselContent = document.createElement("div");

  divCarouselContent.id = "content";
  divCarouselContent.style.width = "inherit";
  divCarouselContent.style.height = "inherit";

  // Добовления всего во все =>
  ElemAppend.appendChild(divCarousel);
  divCarousel.appendChild(divCarouselContent);

  // Убрать шлак за собой =>
  Slider.createSlide(null, {display: "inline-block", position: "relative"});
  Slider.createSlide(null);
  Slider.setWidthContent();
};

// Создание слайда (css код только относящийся к формированию одного слайда)=>
Sls.prototype.createSlide = function(htmlCode = null, cssCode = null) {
  var Slide = document.createElement("div");
  Slide.className = "sliders";
  Slide.style.width = "inherit";
  Slide.style.height = "inherit";

  if(cssCode !== null) {
    for(var key in cssCode) {
      if(key != "width" && key != "height")
        eval("Slide.style."+key+" = "+"'"+cssCode[key]+"'");
    }
  }

  htmlCode !== null ? Slide.innerHTML = htmlCode : Slide.innerHTML = "";
  document.getElementById("content").appendChild(Slide);
};

// Считает колл-во слайдов и возвращает колл-во слайдов или колл-во пикселей
Sls.prototype.checkCountSliders = function(isCalculated = false) {
  var countSlider = document.querySelectorAll("#"+Slider._properties.NameCarousel+" .sliders");
  if(!isCalculated)
    return countSlider;
  else
    return countSlider.length*Slider._properties.WidthSlide+"px";
};

Sls.prototype.setWidthContent = function() {
  console.log(Slider.checkCountSliders(true));
  console.log(document.querySelector("#"+Slider._properties.NameCarousel+" #content"));
  document.querySelector("#"+Slider._properties.NameCarousel+" #content").style.width = Slider.checkCountSliders(true);
}

var Slider = Sls.prototype;
