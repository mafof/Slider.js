var Sls = (function() {
  // code...
});
/* Глобальные свойства */
Sls.prototype._properties = {
  NameCarousel: null,
  StyleCarousel: null,
  WidthSlide: null,
}

/**
 * Создает карусель
 * @param {string} ElemAppend Выбрать где будет распологаться элемент
 * @param {string} idElem Выбрать id для карусели
 * @param {number} width Указать ширину
 * @param {number} height Указать высоту
 */
Sls.prototype.createCarousel = function(ElemAppend, idElem, width = null, height = null) {
  Slider._properties.NameCarousel = idElem;
  if(typeof ElemAppend === "string") {
    ElemAppend = document.getElementById(ElemAppend);
  }
  Slider._properties.StyleCarousel = getComputedStyle(ElemAppend);

  var divCarousel = document.createElement("div"); // Главный div карусели
  divCarousel.id = Slider._properties.NameCarousel;

  if(width !== null && height !== null) {
    divCarousel.style.width = width+"px";
    divCarousel.style.height = height+"px";
    Slider._properties.WidthSlide = width;
  } else {
    divCarousel.style.width = Slider._properties.StyleCarousel.width;
    divCarousel.style.height = Slider._properties.StyleCarousel.height;
    Slider._properties.WidthSlide = ElemAppend.offsetWidth;
  }
  divCarousel.style.overflow = "hidden";

  var divCarouselContent = document.createElement("div"); // контент div для карусели
  divCarouselContent.id = "content";
  divCarouselContent.style.width = "inherit";
  divCarouselContent.style.height = "inherit";

  // Добовления всего во все =>
  ElemAppend.appendChild(divCarousel);
  divCarousel.appendChild(divCarouselContent);
};

/**
 * Sls.prototype.createSlide - Создание нового слайда
 *
 * @param  {string} htmlCode = null html код который будет распологаться в слайде
 * @param  {object} cssCode = null  css код который будет распологаться в слайде
 */
Sls.prototype.createSlide = function(htmlCode = null, cssCode = null) {
  var Slide = document.createElement("div");
  Slide.className = "sliders";
  Slide.style.width = Slider._properties.WidthSlide+"px";
  Slide.style.height = "inherit";
  Slide.style.display = "inline-block";
  Slide.style.position = "relative";

  var ContentInSlide = document.createElement("div");
  ContentInSlide.style.position = "absolute";
  ContentInSlide.className = "contentInSlide";

  if(cssCode !== null) {
    for(var key in cssCode) {
      if(key != "width" && key != "height")
        eval("ContentInSlide.style."+key+" = "+"'"+cssCode[key]+"'");
    }
  }

  htmlCode !== null ? ContentInSlide.innerHTML = htmlCode : ContentInSlide.innerHTML = "";
  document.getElementById("content").appendChild(Slide);
  Slide.appendChild(ContentInSlide);
  Slider.setWidthContent(); // Перерасчитывает ширину контента
};

/**
 * Sls.prototype.checkCountSliders - Считает колл-во слайдов
 *
 * @param  {boolean} isCalculated = false Если false то возвращает колл-во слайдов, если true то возвращает просчет пикселей
 * @return {string}                      возвравщает колл-во слайдов/расчет пикселей
 */
Sls.prototype.checkCountSliders = function(isCalculated = false) {
  var countSlider = document.querySelectorAll("#"+Slider._properties.NameCarousel+" .sliders");
  if(!isCalculated)
    return countSlider.length;
  else
    return countSlider.length*Slider._properties.WidthSlide+"px";
};


/**
 * Sls.prototype.setWidthContent - Установить новое значение div контента
 */
Sls.prototype.setWidthContent = function() {
  document.querySelector("#"+Slider._properties.NameCarousel+" #content").style.width = Slider.checkCountSliders(true);
}

var Slider = Sls.prototype;
