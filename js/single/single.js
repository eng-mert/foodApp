import { getRecipeById, getAllRecipes } from '../utils/database.js'
import { setupNavigation, setupSearchForm } from "../utils/utils.js"


setupSearchForm();

async function setupSinglePage() {
    const recipeId = localStorage.getItem("recipeId");
    getRecipeById(recipeId).then(recipe => {

        const { _id, title, category, image, ingredients, steps } = recipe;
        const imgField = document.querySelector('#recipe-img');
        const titleField = document.querySelector('#recipe-title');
        const categoryLink = document.querySelector('#recipe-category')
        const ingredientsTable = document.querySelector('#content-table')
        const stepsList = document.querySelector('#steps-list')
        imgField.setAttribute('src', image);
        titleField.textContent = title;
        categoryLink.setAttribute('data-category', category._id);
        categoryLink.textContent = category.ar;


        if (ingredients) {
            const ingredientsContent = ingredients.map(ingredient => {
                return `
        <tr>
            <th class="text-center">${ingredient.name}</th>
            <td class="text-center">${ingredient.quantity}</td>
        </tr>
        `
            }).join('')
            ingredientsTable.innerHTML = ingredientsContent;
        }

        if (steps) {
            const stepsContent = steps.map(step => {
                return `<li class="list-group-item step-item">${step}</li>`;
            }).join('')

            stepsList.innerHTML = stepsContent;
        }
    })
}



window.addEventListener("DOMContentLoaded", function () {
    setupNavigation();
    getRecipeById().then(recipe => {
        setupSinglePage(recipe);
    });
})

const nextBtn = document.querySelector('#next-recipe-btn');
const prevBtn = document.querySelector('#prev-recipe-btn');

nextBtn.addEventListener("click", function () {
    getAllRecipes().then(recipes => {
        const recipeId = localStorage.getItem("recipeId");
        const currentRecipe = recipes.find(recipe => { return recipe._id === recipeId });
        let currentIndex = recipes.indexOf(currentRecipe);
        let nextRecipe = recipes[currentIndex + 1];
        localStorage.setItem("recipeId", nextRecipe._id)
        setupSinglePage()
    })
})

prevBtn.addEventListener("click", function () {
    getAllRecipes().then(recipes => {
        const recipeId = localStorage.getItem("recipeId");
        const currentRecipe = recipes.find(recipe => { return recipe._id === recipeId });
        let currentIndex = recipes.indexOf(currentRecipe);
        let nextRecipe = recipes[currentIndex - 1];
        localStorage.setItem("recipeId", nextRecipe._id)
        setupSinglePage()
    })
})