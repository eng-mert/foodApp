import { getCategories } from "../utils/database.js"

export const setUpRecipeLink = () => {
    const foodLinks = document.querySelectorAll('.recipe-title');
    foodLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            const recipeId = link.dataset.recipeId;
            localStorage.setItem("recipeId", recipeId);
            link.setAttribute('href', './single.html')
        })
    })
}

export const setUpCategoryLink = () => {
    const foodLinks = document.querySelectorAll('.recipe-category');
    foodLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            const category = link.dataset.category;
            localStorage.setItem("category", category);
            link.setAttribute('href', './category.html')
        })
    })
}


export const loading = async (time) => {
    const content = document.querySelector('#content');
    content.classList.add('loading');
    setTimeout(() => {
        content.classList.remove("loader")
        content.setAttribute("class", "row row-cols-2 mt-5")
    }, time)
}


export const setupSearchForm = async () => {
    const searchField = document.querySelector('#search-field');
    const searchBtn = document.querySelector('#search-btn');

    searchBtn.addEventListener("click", function (e) {
        const keyword = searchField.value;
        localStorage.setItem("keyword", keyword);
    });
}

export const setupNavigation = async () => {
    const navList = document.querySelector('#categories-list');
    getCategories().then(categories => {
        const content = categories.map(category => {
            return `<li><a class="dropdown-item recipe-category" data-category=${category._id} href="./category.html">${category.ar}</a></li>`
        }).join('')
        return content
    }).then(content => {
        navList.innerHTML = content;
    }).then(() => {
        setUpCategoryLink();
    })
}