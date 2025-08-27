
const apiKey = "7e89cbf144e4466284e5e752a77cd13c";
const newsContainer = document.getElementById("newsContainer");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let currentPage = 1;
let currentCategory = "general";

async function getNews(category = "general", page = 1) {
  currentCategory = category;
  currentPage = 1;
  newsContainer.innerHTML = "";

  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=12&apiKey=${apiKey}`;
  await fetchNews(url);
}

async function loadMore() {
  currentPage++;
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${currentCategory}&page=${currentPage}&pageSize=12&apiKey=${apiKey}`;
  await fetchNews(url, true);
}


async function fetchNews(url, append = false) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.articles.length > 0) {
      if (!append) {
        newsContainer.innerHTML = "";
      }
      data.articles.forEach(article => {
        if (article.urlToImage && article.description) {
          const card = `
            <div class="col">
              <div class="card">
                <img src="${article.urlToImage}" alt="News Image">
                <div class="card-body">
                  <h5 class="card-title">${article.title}</h5>
                  <p class="card-text">${article.description}</p>
                  <p class="publish-date">Published: ${new Date(article.publishedAt).toLocaleDateString()}</p>
                  <a href="${article.url}" target="_blank" class="btn btn-warning btn-sm mt-2">Read More</a>
                </div>
              </div>
            </div>
          `;
          newsContainer.innerHTML += card;
        }
      });

      loadMoreBtn.classList.remove("d-none");
    } else {
      if (!append) {
        newsContainer.innerHTML = "<p class='text-center text-muted'>No news found.</p>";
      }
      loadMoreBtn.classList.add("d-none");
    }
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}
getNews();
