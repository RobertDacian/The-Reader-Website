import { message } from "../components/message.js";
import { navToggle } from "../components/nav.js";
import { baseURL } from "../constants/api.js";
import { articlesURL } from "../constants/api.js";

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////// ARTICLES PAGE ///////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

const articlesContainer = document.querySelector(".articles-wrapper ");

let articles = [];

async function getArticles(articlesURL) {
  try {
    const response = await fetch(articlesURL);
    articles = await response.json();
    displayArticles(articles);
  } catch (error) {
    console.log(error);
    articlesContainer.innerHTML = message("error", "An error occurred.", error);
  }
}
getArticles(articlesURL);

const displayArticles = (articlesToDisplay) => {
  if (articlesToDisplay.length < 1) {
    articlesContainer.innerHTML = `<div class="msg-container">
                                  <p class="error-msg" id="errorMsg">Sorry, no products matched your search</p>
                                  </div>`;
    return;
  }

  articlesContainer.innerHTML = "";

  articlesToDisplay.forEach(function (article) {
    articlesContainer.innerHTML += `<div class="card-wrapper" >
                                      <div class="card">
                                        <div class="card-image card-img--large"><img src="${article.acf.cardimage}"
                                            alt="An image with a library"/>
                                        </div>
                                        <div class="card-content">
                                          <div class="card-category">
                                            <p class="small-paragraph">${article.acf.category.name}</p>
                                          </div>
                                          <div class="card-title">
                                            <h6>${article.acf.title}</h6>
                                          </div>
                                          <div class="card-cta">
                                            <a  href="/post/?id=${article.id}&title=${article.title.rendered}"class="card-link">READ MORE</a>
                                          </div>
                                          <div class="card-author">
                                            <div class="author f-row-start--center">
                                              <div class="author-img f-center"> <img src="${article.acf.avatarimage}"
                                                  alt="Image withAshley Graham, the author of the article"/>
                                              </div>
                                              <div class="author-name">
                                                <p class="small-paragraph">${article.acf.avatarname.display_name}</p>
                                              </div>
                                            </div>
                                            <div class="article-date">
                                              <p class="small-paragraph-light">${article.acf.date}</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>`;
  });

  displayButtons(articlesToDisplay);
};

// ////////////////////////////

//Load more button
const seeAllBtn = document.querySelector(".centered-cta-wrapper ");
const switchBtn = document.querySelector(" #primaryBtn");

let articlesAmount = 6;
console.log(articlesAmount);

seeAllBtn.addEventListener("click", function () {
  if (switchBtn.innerHTML === "Show all") {
    articlesAmount = articles.length;
    switchBtn.innerHTML = "Show less";
  } else {
    articlesAmount = 6;

    switchBtn.innerHTML = "Show all";
  }

  articlesContainer.innerHTML = "";
  displayArticles(articles, articlesAmount);
});

// /////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
////////////////// SETTING UP THE SEARCH INPUT FILTER/////////////////////////
//////////////////////////////////////////////////////////////////////////////
const form = document.querySelector(".input-form");
const searchInput = document.querySelector("#search-input");

form.addEventListener("keyup", () => {
  const inputValue = searchInput.value.toLowerCase();
  console.log(inputValue);

  const filteredArticles = articles.filter((article) => {
    return article.acf.title.toLowerCase().includes(inputValue);
  });
  displayArticles(filteredArticles);
});

//////////////////////////////////////////////////////////////////////////////
////////// DISPLAYING THE FILTER BUTTONS FORM ( CATEGORY BUTTONS ) ///////////
//////////////////////////////////////////////////////////////////////////////

const categoriesDOM = document.querySelector(".categories");

const displayButtons = () => {
  const buttons = ["all", ...new Set(articles.map((article) => article.acf.category.name))];

  categoriesDOM.innerHTML = buttons
    .map((categories) => {
      return `<button class="category-btn"  data-id="${categories}">${categories}</button>`;
    })
    .join("");
};
// displayButtons();

//////////////////////////////////////////////////////////////////////////////
///// MAKING THE FILTER BUTTONS DISPLAY THE DATA ONCE THEY ARE CLICKED ///////
//////////////////////////////////////////////////////////////////////////////

let categoryArticles;

categoriesDOM.addEventListener("click", (e) => {
  console.log(e.target);
  const htmlElement = e.target;
  if (htmlElement.classList.contains("category-btn")) {
    if (htmlElement.dataset.id === "all") {
      categoryArticles = articles;
    } else {
      categoryArticles = articles.filter((article) => {
        return article.acf.category.name === htmlElement.dataset.id;
      });
    }
    searchInput.value = "";
    displayArticles(categoryArticles);
  }
});
