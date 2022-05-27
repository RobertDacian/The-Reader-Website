import { message } from "../components/message.js";
import { navToggle } from "../components/nav.js";
import { baseURL } from "../constants/api.js";
import { postURL } from "../constants/api.js";
import { cardsURL } from "../constants/api.js";

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
//////////////////////////////// POST PAGE /////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
export const id = params.get("id");
const singlePost = document.querySelector(".post-wrapper");

console.log(id);

const fetchPostURL = baseURL + id + "?&acf_format=standard";
console.log(postURL);
async function getSinglePost(fetchPostURL) {
  try {
    const response = await fetch(fetchPostURL);
    const singleResult = await response.json();
    console.log(singleResult);

    console.log(response);

    createHtml(singleResult);
  } catch (error) {
    console.log(error);
    singlePost.innerHTML = message("error", "An error occurred.", error);
  }
}

getSinglePost(fetchPostURL);

function createHtml(post) {
  singlePost.innerHTML = ` <div class="post">
              <div class="post=hero">
                <h1 class="post-title f-center--center">${post.acf.title}</h1>
                <div class="bread-crumbs f-center--center">
                  <a href="/" class="non-active dark">Home</a>
                  <i class="fas fa-long-arrow-alt-right"></i>
                  <a href="/articles/" class="non-active dark">Articles</a>
                  <i class="fas fa-long-arrow-alt-right"></i>
                  <a href="#" class="active">Post</a>
                </div>
              </div>
              <div class="post-header">
                <div class="post-image">
                  <img src="${post.acf.cardimage}" alt="" />
                </div>
              </div>
              <div class="post-main">
                <div class="post-subheading">
                  <h4>${post.acf.subheading}</h4>
                </div>
                <div class="post-description">
                  <p>
               ${post.acf.paragraph}
                  </p>
                  <ul>
                    <li class="p-bold-dark post-list">${post.acf.list}</li>
                    <li class="p-bold-dark post-list">${post.acf.list}</li>
                    <li class="p-bold-dark post-list">${post.acf.list}</li>
                  </ul>
                  <p>
                   ${post.acf.paragraph}
                  </p>
                </div>
                <div class="author-wrapper f-col--center-center">
                  <div class="comment-author-img">
                    <img src="${post.acf.avatarimage}" alt="" />
                  </div>
                  <div class="author-name">
                    <h5>${post.acf.avatarname.display_name}</h5>
                  </div>
                  <div class="author-job-title">
                    <p class="small-paragraph-light">${post.acf.avatarrole}</p>
                  </div>
                </div>
              </div>
            </div>`;
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
