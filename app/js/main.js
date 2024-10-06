/* Animate increasing */

const ease = {
  easeInQuad: t => t*t
};

const counter = (EL) => {
  const duration = 3000; // Animate duration
  const start = parseInt(EL.textContent, 10); // Get start values
  const end = parseInt(EL.dataset.counter, 10); // Get end values

  if (start === end) return; // If equal values, stop here.

  const range = end - start; // Get the range
  let curr = start; // Set current at start position
  
  const timeStart = Date.now();
  const loop = () => {
    let elaps = Date.now() - timeStart;
    if (elaps > duration) elaps = duration; // Stop the loop
    const norm = ease.easeInQuad(elaps / duration); // normalised value + easing
    const step = norm * range; // Calculate the value step
    curr = start + step; // Increment or Decrement current value
    EL.textContent = Math.trunc(curr); // Apply to UI as integer
    if (elaps < duration) requestAnimationFrame(loop); // Loop
  };
  requestAnimationFrame(loop); // Start the loop!
};

document.querySelectorAll("[data-counter]").forEach(counter);

/* play video on site */ 
const videoContainer = document.querySelector(".video__container");
const video = videoContainer.querySelector("#video");
const mainState = videoContainer.querySelector(".main-state");
const loading = videoContainer.querySelector(".loader");
const currentDuration = videoContainer.querySelector(".current-duration");

let isPlaying = false;

// Video Event Listeners
video.addEventListener("loadedmetadata", canPlayInit);
video.addEventListener("play", play);
video.addEventListener("pause", pause);
video.addEventListener("progress", handleProgress);
video.ontimeupdate = handleProgressBar;
videoContainer.addEventListener("click", toggleMainState);

// show loader
video.onwaiting = () => loading.style.display = "block";
video.onplaying = () => loading.style.display = "none";

mainState.addEventListener("click", toggleMainState);

// show play button when paused
function canPlayInit() {
  currentDuration.innerHTML = showDuration(video.duration); // displayed current duration
  if (video.paused) mainState.classList.add("show-state");
}

// play
function play() {
  video.play();
  isPlaying = true;
  mainState.classList.remove("show-state");
}

// show left duration
function handleProgressBar() {
  currentDuration.innerHTML = showDuration(video.duration - video.currentTime);
}

// pause video and show play button
function pause() {
  video.pause();
  isPlaying = false;
  mainState.classList.add("show-state");
}

// calculate hours, minutes and seconds of video
function showDuration(time) {
  const hours = Math.floor(time / 60 ** 2);
  const min = Math.floor((time / 60) % 60);
  const sec = Math.floor(time % 60);
  if (hours > 0) {
    return `${formatter(hours)}:${formatter(min)}:${formatter(sec)}`;
  } else {
    return `${formatter(min)}:${formatter(sec)}`;
  }
}

// formatt returned time
function formatter(number) {
  return new Intl.NumberFormat({}, { minimumIntegerDigits: 2 }).format(number);
}

// play / pause when click on video container
function toggleMainState(e) {
  e.stopPropagation();
  if (!e.target.dataset['dataPlay']) {
    if (!isPlaying) play()
    else pause();
  }
}

function handleProgress() {
  if (!video.buffered || !video.buffered.length) {
    return;
  }
}

/* Mobile menu */

// const menuBtn = document.querySelector('.burger-menu-btn');
// const headerSection = document.querySelector('.header');

// menuBtn.addEventListener('click', () => {
//   headerSection.classList.toggle('menu--open');
// });

/* feedback slider */

// const feedbackSlider = new Swiper('.feedback__slider', {
 
//   loop: true,

//   // pagination
//   pagination: {
//     el: '.swiper-pagination',
//   }
// });

/* certificate slider */

// const certificateSlider = new Swiper('.certificate__slider', {
 
//   loop: true,
//   slidesPerView: 1,
//   spaceBetween: 20,
//   breakpoints: {
//     441: {
//       slidesPerView: 2,
//       spaceBetween: 20,
//     },
//     591: {
//       slidesPerView: 3,
//       spaceBetween: 20,
//     }
//   },
//   // pagination
//   pagination: {
//     el: '.swiper-pagination',
//   }
// });

/* accordeon */

// const accordeon = document.querySelector('.accordeon');
// const accordeonTitles = accordeon.querySelectorAll('.accordeon__title');

// accordeonTitles.forEach.call(accordeonTitles, function(accordeonTitle) {
//   accordeonTitle.addEventListener('click', function(){
//     const currentText = accordeonTitle.parentElement.querySelector('.accordeon__text');

//     accordeonTitle.classList.toggle('accordeon__title--active')
//     currentText.classList.toggle('accordeon__text--expand');

//     if (currentText.classList.contains('accordeon__text--expand')) {
//       currentText.style.maxHeight = currentText.scrollHeight + 'px';
//     } else {
//       currentText.style.maxHeight = 0;
//     }
//   });
// });

/* smooth scroling */

// const allLinks = document.querySelectorAll('a:link');

// allLinks.forEach(function(link) {
// 	link.addEventListener('click', function (e) {
// 		e.preventDefault();
// 		const href = link.getAttribute('href');
// 		// Scroll to top
// 		if (href === '#') {
// 			window.scrollTo({
// 				top: 0,
// 				behavior: 'smooth'
// 			});
// 		}
// 		// Scroll to other links
// 		if (href !== '#' && href.startsWith('#')) {
// 			const sectionEl = document.querySelector(href);
// 			sectionEl.scrollIntoView({
// 				behavior: 'smooth'
// 			});
// 		}

// 		// Close mobile menu after click on menu link
// 		if (link.classList.contains('menu-link')) {
// 			headerSection.classList.toggle('menu--open');
// 		}
// 	});
// });
