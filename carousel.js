var Sls = (function() {
  // code...
});

/* Глобальные свойства */
Sls.prototype._properties = {
  NameCarousel: null, // Имя карусели
  StyleCarousel: null, // Стили элемента куда вложен слайдер
  WidthSlide: null, // Ширина слайдера
  TimerOffsetSlide: null, // Таймер переключения слайдера
  TimeNextScroll: null, // Сколько времени до следующей прокуртки
  CurrentValueOffset: 0, // Текущее значение смещения слайдера
  CurrentSlide: 0, // Текущий слайд
  CountSlides: 0, // Колл-во слайдов
  isPlayingAnimation: false, // Производиться ли сейчас анимация
};

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

  var divCarouselContent = document.createElement("div"); // div контент для карусели
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
  // Slide.style.height = "inherit";
  Slide.style.display = "inline-block";
  Slide.style.position = "relative";

  //Slide.style.left="100px"; // Удалить

  var ContentInSlide = document.createElement("div");
  ContentInSlide.style.position = "absolute";
  ContentInSlide.className = "contentInSlide";

  if(cssCode !== null) {
    for(var key in cssCode) {
      // if(key != "width" && key != "height")
        eval("ContentInSlide.style."+key+" = "+"'"+cssCode[key]+"'");
    }
  }

  htmlCode !== null ? ContentInSlide.innerHTML = htmlCode : ContentInSlide.innerHTML = "";
  document.getElementById("content").appendChild(Slide);
  Slide.appendChild(ContentInSlide);
  Slider.setWidthContent(); // Перерасчитывает ширину контента
  Slider._properties.CountSlides = Slider.checkCountSliders();
};


/**
 * Sls.prototype.automaticScrollSlides - Скролить ли автоматически слайды
 *
 * @param {boolean} isScroll true скроллить, false не скроллить
 * @param {number} timeNextScroll указывает интервал времени нужного до скролла
 */
 /*
Sls.prototype.automaticScrollSlides = function(isScroll, timeNextScroll = null) {
  let sliders = document.querySelectorAll("#"+Slider._properties.NameCarousel+" .sliders"), currentTime = 0;
  timeNextScroll == null ? timeNextScroll = 5000 : timeNextScroll = timeNextScroll;
  if(isScroll) {

    Slider.offsetSlide("left");
  } else {
    clearInterval(Slider._properties.TimerAutomaticSrollSlides);
  }
};
*/

/**
 * Sls.prototype.offsetSlide - Смещает слайды
 */
Sls.prototype.offsetSlide = function(where) {
  var width = document.querySelectorAll("#"+Slider._properties.NameCarousel+" .sliders"),
      leftValue = null,
      countPixels = 10; // колл-во смещения пикселей за 1 шаг

  // превращаем значение left из string в number =>
  for (var i = 0; i < width[0].style.left.length; i++) {
    if(!isNaN(width[0].style.left[i]) || width[0].style.left[i] == "-") {
      leftValue == null ? leftValue = width[0].style.left[i].toString() : leftValue += width[0].style.left[i].toString();
    }
  }
  leftValue = Number(leftValue);
  console.log(leftValue);

  if(!Slider._properties.isPlayingAnimation) {
    if(where == "left") {
      Slider._properties.CurrentSlide++;
      //Slider.checkCurrentSlide();
      Slider._properties.isPlayingAnimation = true;
      Slider._properties.TimerOffsetSlide = setInterval(function() {
        if((Slider._properties.CurrentValueOffset-Slider._properties.CurrentValueOffset-Slider._properties.CurrentValueOffset) < (Slider._properties.WidthSlide*Slider._properties.CurrentSlide)) { // Превращаем из отрицательного числа в положительное и сравниваем
          Slider._properties.CurrentValueOffset -= countPixels;
          leftValue -= countPixels;
          for (var i = 0; i < width.length; i++) {
            width[i].style.left = leftValue+"px";
          }
        } else {
          Slider._properties.isPlayingAnimation = false;
          clearInterval(Slider._properties.TimerOffsetSlide);
        }
      }, 20);
    } else if(where == "right") {
      Slider._properties.CurrentSlide--;
      Slider._properties.isPlayingAnimation = true;
      Slider._properties.TimerOffsetSlide = setInterval(function() {
        //if()
      }, 20);
    }
  } else {
    throw new Error("Slider now offset");
  }
};


/**
 * Sls.prototype.checkCurrentSlide - Для проверки колл-во слайдов (Переписать)
 */
Sls.prototype.checkCurrentSlide = function() {
  var sliders = document.querySelectorAll("#"+Slider._properties.NameCarousel+" .sliders"),
      main = document.getElementById(Slider._properties.NameCarousel),
      transformationToNumber = null;

  var ss = sliders[0].cloneNode(true);
  if(Slider._properties.CurrentSlide == Slider._properties.CountSlides) {
      for (var i = 0; i < ss.style.left.length; i++) {
        if(!isNaN(ss.style.left[i]) || ss.style.left[i] == "-") {
          transformationToNumber == null ? transformationToNumber = ss.style.left[i].toString() : transformationToNumber += ss.style.left[i].toString();
        }
      }
      transformationToNumber = Number(transformationToNumber);
      console.log("до", transformationToNumber);
      console.log("Slider._properties.WidthSlide", Slider._properties.WidthSlide);
      transformationToNumber = transformationToNumber-Slider._properties.WidthSlide;
      console.log("после", transformationToNumber);
      ss.style.left = transformationToNumber+"px";
      main.firstChild.appendChild(ss);
      return true;
  } else if(Slider._properties.CurrentSlide < 1) { // Переписать

  }
  return false;
}

/**
 * Sls.prototype.checkCountSliders - Считает колл-во слайдов
 *
 * @param  {boolean} isCalculated = false Если false то возвращает колл-во слайдов, если true то возвращает просчет пикселей
 * @return {string}                 возвравщает колл-во слайдов/расчет пикселей
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
};

var Slider = Sls.prototype;
