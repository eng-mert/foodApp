import { getAllRecipes, Paginate } from "./database.js";
import { setupNavigation, setUpCategoryLink, setUpRecipeLink, loading } from "./utils.js";

setupNavigation();


const setupCardsContainer = async (records) => {
    const container = document.querySelector('#cards-container');
    try {
        container.innerHTML = "";
        const content = records.map((recipe) => {
            if (!recipe.image.includes('no')) {
                return recipe;
            }
        }).map(recipe => {
            if (recipe) {
                const { _id, title, image, category } = recipe;
                return `
        <div class="card meal-card mb-3">
            <div class="card-header p-0">
                            <img src="${image}"
                                alt="${title}" class="img-fluid w-100">
            </div>
            <div class="card-body d-flex align-items-center">
                <a href="./single.html" class="recipe-title text-dark text-decoration-none" data-recipe-id = "${_id}">
                    <p class="fw-bolder fs-5">${title}</p>
                </a>
                <a href="./category.html"category-btn class="btn btn-primary btn-sm ms-auto recipe-category" data-category=${category._id}>
                    ${category.ar}
                </a>
            </div>
        </div>
        `;
            }
        }).join('')

        container.innerHTML = content;
    } catch (error) {
        console.log(error);
    }
}



function fetchCards(pageIndex) {
    const perPage = 10;
    getAllRecipes()
        .then(records => {
            const keyword = localStorage.getItem('keyword');
            return records.filter(record => { return record.title.includes(keyword) });
        }).then((results) => {
            const recipes = Paginate(results, perPage, pageIndex)
            loading(1000).then(() => {
                setupCardsContainer(recipes.records);
            })
        }).then(() => {
            setUpRecipeLink();
            setUpCategoryLink();
        })
}

window.addEventListener("DOMContentLoaded", () => {
    let currentPage = 1;
    const nextBtn = document.querySelector('#next-page-btn');
    const prevBtn = document.querySelector('#prev-page-btn');
    setupNavigation();
    fetchCards(currentPage);


    nextBtn.addEventListener("click", function (e) {
        currentPage += 1;
        fetchCards(currentPage);
    })

    prevBtn.addEventListener("click", function (e) {
        if (currentPage <= 1) {
            currentPage = 1;
        } else {
            currentPage -= 1;
        }
        fetchCards(currentPage);
    })
})