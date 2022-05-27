import { message } from "../components/message.js";
import { navToggle } from "../components/nav.js";
import { slideURL } from "../constants/api.js";
import { baseURL } from "../constants/api.js";
import { cardsURL } from "../constants/api.js";

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
//////////////////////////////// HOME PAGE /////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

const slideItem = document.querySelector(".slide-item ");
const nextBtn = document.querySelector("#next-btn");
const prevBtn = document.querySelector("#prev-btn");

let slides = [];
let slide = 1;
let slideCards = 4;

async function fetchSlides(slideURL) {
  try {
    const response = await fetch(slideURL);
    slides = await response.json();

    createSlidesHtml(slides, slideCards, slide);
  } catch (error) {
    console.log(error);
  }
}
fetchSlides(slideURL);

function createSlidesHtml(slides, slideCards, slide) {
  slideItem.innerHTML = "";
  slide--;

  if (slide === 0) {
    prevBtn.style.display = "none";
  } else {
    prevBtn.style.display = "flex";
  }
  if (slide === slides.length / slideCards - 1) {
    nextBtn.style.display = "none";
  } else {
    nextBtn.style.display = "flex";
  }

  let slideLoop = slide * slideCards;
  for (let i = slideLoop; i < slideLoop + slideCards; i++) {
    slideItem.innerHTML += `<div class="card-slide">
                              <div class="card-image"><img src="${slides[i].acf.cardimage}" alt="An image with a library"/></div>
                              <div class="card-content">
                                <div class="card-category"><p class="small-paragraph">${slides[i].acf.category.name}</p></div>
                                <div class="card-title"><h6>${slides[i].acf.title}</h6></div>
                                <div class="card-cta">
                                  <a  href="/post/?id=${slides[i].id}&title=${slides[i].title.rendered}"class="card-link">READ MORE</a>
                                </div>
                                <div class="card-author">
                                  <div class="author f-row-start--center">
                                    <div class="author-img f-center">
                                      <img src="${slides[i].acf.avatarimage}" alt="Image withAshley Graham, the author of the article"/></div>
                                    <div class="author-name"><p class="small-paragraph">${slides[i].acf.avatarname.display_name}</p></div>
                                  </div>
                                  <div class="article-date"><p class="small-paragraph-light">${slides[i].acf.date}</p></div>
                                </div>
                              </div>
                            </div>`;
  }
}

// Slide Set Up

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

function nextSlide() {
  slide++;
  createSlidesHtml(slides, slideCards, slide);
}

function prevSlide() {
  slide--;
  createSlidesHtml(slides, slideCards, slide);
}

//Fetching Popular Articles

const featuredArticles = document.querySelector(".articles-wrapper ");

let results = [];

export async function fetchFeaturedArticles(url) {
  try {
    const response = await fetch(url);
    results = await response.json();
    displayFeaturedArticles(results);
  } catch (error) {
    console.log(error);
  }
}
fetchFeaturedArticles(cardsURL);

export const displayFeaturedArticles = (featuredArticlesToDisplay) => {
  featuredArticles.innerHTML = "";

  featuredArticlesToDisplay.forEach(function (featuredArticle) {
    featuredArticles.innerHTML += `<div class="card-wrapper" >
                                      <div class="card">
                                        <div class="card-image card-img--large"><img src="${featuredArticle.acf.cardimage}"
                                            alt="An image with a library"/>
                                        </div>
                                        <div class="card-content">
                                          <div class="card-category">
                                            <p class="small-paragraph">${featuredArticle.acf.category.name}</p>
                                          </div>
                                          <div class="card-title">
                                            <h6>${featuredArticle.acf.title}</h6>
                                          </div>
                                          <div class="card-cta">
                                            <a  href="/post/?id=${featuredArticle.id}&title=${featuredArticle.title.rendered}"class="card-link">READ MORE</a>
                                          </div>
                                          <div class="card-author">
                                            <div class="author f-row-start--center">
                                              <div class="author-img f-center"> <img src="${featuredArticle.acf.avatarimage}"
                                                  alt="Image withAshley Graham, the author of the article"/>
                                              </div>
                                              <div class="author-name">
                                                <p class="small-paragraph">${featuredArticle.acf.avatarname.display_name}</p>
                                              </div>
                                            </div>
                                            <div class="article-date">
                                              <p class="small-paragraph-light">${featuredArticle.acf.date}</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>`;
  });
};
