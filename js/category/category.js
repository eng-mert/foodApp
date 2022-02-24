import { getRecipesByCategory, getCategories, Paginate } from "../utils/database.js"
import { setupNavigation, setUpRecipeLink, setUpCategoryLink, loading, setupSearchForm } from "../utils/utils.js";


setupNavigation();
setupSearchForm();

function fetchCardsByCategoryName(pageIndex, category) {
    const perPage = 10;
    getRecipesByCategory(category._id)
        .then(records => {
            console.log(records);
            const recipes = Paginate(records, perPage, pageIndex)
            loading(1000).then(() => {
                setupCategoryCardsContainer(recipes.records, category);
            })
        }).then(() => {
            setUpRecipeLink();
            setUpCategoryLink();
        })
}


const setupCategoryCardsContainer = async (records, category) => {
    const container = document.querySelector('#cards-container');
    try {
        container.innerHTML = "";
        const content = records.map((recipe) => {
            if (recipe.image && !recipe.image.includes('no')) {
                return recipe;
            }
        }).map(recipe => {
            if (recipe) {
                const { _id, title, image } = recipe;
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


const categoryId = localStorage.getItem("category");
const category = await getCategories().then(categories => {
    return categories.find(category => { return category._id === categoryId })
})


let currentPage = 1;
const nextBtn = document.querySelector('#next-page-btn');
const prevBtn = document.querySelector('#prev-page-btn');
setupNavigation();
fetchCardsByCategoryName(currentPage, category);


nextBtn.addEventListener("click", function (e) {
    currentPage += 1;
    fetchCardsByCategoryName(currentPage, category);
})

prevBtn.addEventListener("click", function (e) {
    if (currentPage <= 1) {
        currentPage = 1;
    } else {
        currentPage -= 1;
    }
    fetchCardsByCategoryName(currentPage, category);
})