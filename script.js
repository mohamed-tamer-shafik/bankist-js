'use strict';
// General Functions starts

// a function to select html element (return one elements only)
const selectEl = selector => document.querySelector(selector);
// a function to select html elements (return dom token list i.e group of elemtes)
const selectEls = selector => document.querySelectorAll(selector);
//function to add class to elemnt when the dom element  and class are passed as an arguments
const addClass = (element, className) => element.classList.add(className);
//function to remove certain class from certain element
const removeClass = (element, className) => element.classList.remove(className);
// function to check if the class exist is certain element
const isClassExist = (element, className) =>
  element.classList.contains(className);
// function to create intersection observers
const createIntersectionObserver = function (
  intersectionAction,
  options,
  targets
) {
  const observer = new IntersectionObserver(intersectionAction, options);
  targets.forEach(target => observer.observe(target));
};

// General Functions ends

// Elements Selection starts

// General Selecion starts
const allSections = selectEls('.section');

// General Selecion ends

//pop-up selection starts
const popUpEl = selectEl('.pop-up');
const overlayEl = selectEl('.overlay');
const windowCloseBtnEl = selectEl('.pop-up__close-btn');

//pop-up selection ends

// Header Elements Selection starts
const headerEl = selectEl('.header');
const headerIconEl = selectEl('.header__icon');
const headerNavListEl = selectEl('.header__nav-list ');
const headerRightContainerEl = selectEl('.header__right-section');
const headerBtnEl = selectEl('.header__btn');
const headerLinksEls = selectEls('.header__link');
const headerLogoEl = selectEl('.header__logo');
// Header Elements Selection ends

// Welcome section selection starts
const welcomeSecEl = selectEl('.wlc-sec');
const scrollBtnEl = selectEl('.wlc-sec__link');
// Welcome section selection ends

// Features section selection starts
const fetauresSecEl = selectEl('.fet-sec');
const featuresImgsEls = selectEls('.fet-sec__row-img');
// Features section selection ends

// Operations section selection starts
const tapsContainerEl = selectEl('.oper-sec__oper-container');
const operBtnsContainerEl = selectEl('.oper-sec__btns-container');
const operBtnsEls = selectEls('.oper-sec__btn ');
const operContentEls = selectEls('.oper-sec__oper-info ');
// Operations section selection ends

// Testimonial section selection starts
const sliderContaineEl = selectEl('.testi-sec__testi-container');
const testiSlidesEls = selectEls('.testi-sec__testimonial');
const testiBulletsContainerEl = selectEl('.testi-sec__nav-bullets');
const testiLeftArrowEl = selectEl('.testi-sec__btn--left-dir');
const testiRightArrowEl = selectEl('.testi-sec__btn--right-dir');
// Testimonial section selection ends

//Footer Elements Selections starts
const footerBtnEl = selectEl('.footer__btn');

//Footer Elements Selections ends

// Elements Selection ends

// Website Functionalities starts

// handeling pop-up and overlay appear starts
const handlePopUpDisplay = function () {
  removeClass(popUpEl, 'smooth-hide');
  removeClass(overlayEl, 'smooth-hide');
};
headerBtnEl.addEventListener('click', handlePopUpDisplay);
footerBtnEl.addEventListener('click', handlePopUpDisplay);
// handeling pop-up and overlay appear ends

// handeling pop-up and overlay disappear using click events starts
const handlePopUpClose = function () {
  addClass(popUpEl, 'smooth-hide');
  addClass(overlayEl, 'smooth-hide');
};
windowCloseBtnEl.addEventListener('click', handlePopUpClose);
overlayEl.addEventListener('click', handlePopUpClose);
// handeling pop-up and overlay disappear using click events ends
// handeling pop-up and overlay disappear when press esc key on the keyboard starts
const handleEscClose = function (e) {
  if (e.key === 'Escape') handlePopUpClose();
};
document.body.addEventListener('keydown', handleEscClose);
// handeling pop-up and overlay disappear when press esc key on the keyboard ends

//handeling nav-links toggeling in small screens starts
const handleNavLinksToggle = () =>
  headerNavListEl.classList.toggle('smooth-hide');
headerIconEl.addEventListener('click', handleNavLinksToggle);
//handeling nav-links toggeling in small screens ends

//handeling when clicking on any element except the burger icon the list get closed starts
const handleGlobalClickHide = function (e) {
  if (e.target !== headerIconEl) addClass(headerNavListEl, 'smooth-hide');
};
document.body.addEventListener('click', handleGlobalClickHide);
//handeling when clicking on any element except the burger icon the list get closed ends

//handle smooth scrolling to features section when clicking on learn more button in welcome section starts
const handleSmoothScroll = function (e) {
  e.preventDefault();
  /*this way of performing smooth scroll is old one but more safe one from the points of browsers compatability */
  const featureSectionRect = fetauresSecEl.getBoundingClientRect(); //features section dom rectangle which contain top and left props.
  const featureSectionTop = featureSectionRect.top; //feature section top co-ordinates from the currrent view port;
  window.scrollTo({
    left: 0,
    top: featureSectionTop + window.pageYOffset,
    behavior: 'smooth',
  });
  // this method is more modern but have more concerns from the point of view of browser compatability (more modern browsers needed)
  // fetauresSecEl.scrollIntoView({ behavior: 'smooth' });
};
scrollBtnEl.addEventListener('click', handleSmoothScroll);
//handle smooth scrolling to features section when clicking on learn more button in welcome section ends
// implementing smooth navigation to sections using navigation list starts
//event delegation will be used for better performance
const handleSmoothNavigation = function (e) {
  if (isClassExist(e.target, 'header__link')) {
    e.preventDefault();
    selectEl(e.target.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
  }
};
headerNavListEl.addEventListener('click', handleSmoothNavigation);
// implementing smooth navigation to sections using navigation list ends
//tapped component functionality (operations Section functionality) starts

const tappedComponent = function () {
  //function to adjust the heigh of the container to the tallest tap to avoid container heigh change
  const adjustParentHeight = function () {
    const getHeight = element => parseFloat(getComputedStyle(element).height);
    //parent height on document load
    const parentDefaultHeigh = getHeight(tapsContainerEl);
    let maxHeigh = getHeight(operContentEls[0]);
    for (let i = 1; i < operContentEls.length; i++)
      if (getHeight(operContentEls[i]) > maxHeigh)
        maxHeigh = getHeight(operContentEls[i]);
    //the heigh of the child exist at parent at default load
    const defaultChildHeight = getHeight(operContentEls[0]);
    tapsContainerEl.style.height = `${
      parentDefaultHeigh - defaultChildHeight + maxHeigh
    }px`;
  };
  adjustParentHeight();
  //tap clicking even implmentation
  const handleTapsClicking = function (e) {
    if (!isClassExist(e.target, 'oper-sec__btn')) return;
    const clickedTap = e.target;
    //activating clicked button
    operBtnsEls.forEach(btn => removeClass(btn, 'oper-sec__btn--selected'));
    addClass(clickedTap, 'oper-sec__btn--selected');
    //activating content related to selected button
    operContentEls.forEach(ele => addClass(ele, 'hidden'));
    const tapContent = selectEl(`.tap-${clickedTap.dataset.tap}`);
    removeClass(tapContent, 'hidden');
  };
  operBtnsContainerEl.addEventListener('click', handleTapsClicking);
};
tappedComponent();
//tapped component functionality (operations Section functionality) ends

//header elements fading effect starts
const handleFading = function (e) {
  //checking the media of the view port when handler is triggred
  //this functionality operates starting from medium media (768px)
  const isSmallScreen = !window.matchMedia('(min-width: 768px)').matches;
  /*if target is not the button and not  one of the ancors or if the media is less than 768px 
  stop executing the function  */
  if (
    (!isClassExist(e.target, 'header__link') &&
      !isClassExist(e.target, 'header__btn')) ||
    isSmallScreen
  )
    return;

  //hover and leaving effect
  [headerBtnEl, ...headerLinksEls, headerLogoEl].forEach(ele => {
    if (ele !== e.target) ele.style.opacity = this;
  });
};
headerRightContainerEl.addEventListener('mouseover', handleFading.bind('0.5'));
headerRightContainerEl.addEventListener('mouseout', handleFading.bind('1'));
//header elements fading effect ends

// fixed header starts
const toggelingFixedHeader = function () {
  const intersectionAction = function ([entry]) {
    if (!entry.isIntersecting) addClass(headerEl, 'header--fixed');
    else removeClass(headerEl, 'header--fixed');
  };
  const headerHeigh = headerEl.getBoundingClientRect().height;
  const options = { root: null, threshold: 0, rootMargin: `-${headerHeigh}px` };
  createIntersectionObserver(intersectionAction, options, [welcomeSecEl]);
};
toggelingFixedHeader();
// fixed header ends

// sections arriving functionality starts
const sectionsArriving = function () {
  const intersectionAction = function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        removeClass(entry.target, 'smooth-arrving');
        observer.unobserve(entry.target);
      }
    });
  };
  const options = { root: null, threshold: 0 };
  createIntersectionObserver(intersectionAction, options, allSections);
};
sectionsArriving();
// sections arriving functionality ends
// implemnting image lazy loading functionality starts
const lazyLoading = function () {
  const intersectionAction = function (entries, observer) {
    const handleImageLoading = e =>
      removeClass(e.target, 'fet-sec__row-img--blur');
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.addEventListener('load', handleImageLoading);
        observer.unobserve(img);
      }
    });
  };
  const options = {
    root: null,
    thrshold: 0,
    rootMaring: '200px',
  };
  createIntersectionObserver(intersectionAction, options, featuresImgsEls);
};
lazyLoading();

// implemnting image lazy loading functionality ends
// Slider Funtionality starts
const slider = function () {
  let currentSlide = 0;
  //function to activate slide (show it in the slider)
  const setActiveSlide = function (currentSlide) {
    testiSlidesEls.forEach(
      (slide, i) =>
        (slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`)
    );
  };

  //function to set Current Slide the active on
  const setActiveBullet = function (currentSlide) {
    const sliderBulletsEls = selectEls('.testi-sec__bullet');
    sliderBulletsEls.forEach(slide =>
      removeClass(slide, 'testi-sec__bullet--selected')
    );
    const activeBullet = selectEl(
      `.testi-sec__bullet[data-slide-number="${currentSlide}"]`
    );
    addClass(activeBullet, 'testi-sec__bullet--selected');
  };

  // function to navigat between slides
  const navigateTo = function (currentSlide) {
    setActiveSlide(currentSlide);
    setActiveBullet(currentSlide);
  };
  //function to create bullets dynamically
  const createBullets = () =>
    testiSlidesEls.forEach(function (_, i) {
      const bullet = `<li class="testi-sec__bullet pointer" data-slide-number="${i}" ></li>`;
      testiBulletsContainerEl.insertAdjacentHTML('beforeend', bullet);
    });
  //component Intialization
  const intialize = function () {
    createBullets();
    navigateTo(currentSlide);
  };
  intialize();
  //right arrow navigation functinality
  const handleNextSlide = function () {
    currentSlide = (currentSlide + 1) % testiSlidesEls.length;
    navigateTo(currentSlide);
  };
  testiRightArrowEl.addEventListener('click', handleNextSlide);
  //left arrow navigation functionality
  const handlePreviousSlide = function () {
    currentSlide =
      (currentSlide - 1 + testiSlidesEls.length) % testiSlidesEls.length;
    navigateTo(currentSlide);
  };
  testiLeftArrowEl.addEventListener('click', handlePreviousSlide);
  //keyboard arrows navigation functionality
  const keyboardArrowsNavigation = function (e) {
    if (e.key === 'ArrowRight') handleNextSlide();
    else if (e.key === 'ArrowLeft') handlePreviousSlide();
  };
  document.addEventListener('keydown', keyboardArrowsNavigation);
  //bullets navigation functionalty
  const handleBulltesNavigation = function (e) {
    if (!isClassExist(e.target, 'testi-sec__bullet')) return;
    currentSlide = Number(e.target.dataset.slideNumber);
    navigateTo(currentSlide);
  };
  testiBulletsContainerEl.addEventListener('click', handleBulltesNavigation);
};
slider();
document.querySelector('.class[html-attibute="value"]');
// Slider Funtionality ends

// Website Functionalities ends
document.addEventListener('DOMContentLoaded', function (e) {
  console.log(
    'HTML document is loaded , and completly parsed into DOM tree, and script are executed',
    e
  );
});
window.addEventListener('load', function (e) {
  console.log('the page is fully loaded :)', e);
});
window.addEventListener('beforeunload', function (e) {
  /*in some browsers -not chrome- we need to add the next line to make it work */
  e.preventDefault();
  /*to add a leaving confirmation message set the returnValue proprety in the event object to "" */
  e.returnValue = '';
});
