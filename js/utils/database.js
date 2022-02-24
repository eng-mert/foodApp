const URL = "../data/recipes.json"
export const getAll = async () => {
    const response = await fetch(URL);
    const groups = await response.json();
    return groups;
}

export const getCategories = async () => {
    const groups = await getAll();
    return groups.map(group => {
        const { category, records } = group;
        return category;
    })
}


export const getCategory = async (categoryId) => {
    getCategories().then(categories => {
        return categories.find(category => { return category._id === categoryId })
    })
}

export const getAllRecipes = async () => {
    const groups = await getAll();
    let data = [];
    groups.map(group => {
        const { category, records } = group;
        return records.map(record => {
            const { _id, title, image } = record;
            if (_id && title && image) {
                record.category = category;
                data.push(record);
            }
        })
    })
    return data;
}



export const getRecipesByCategory = async (categoryId) => {
    const groups = await getAll();
    return groups.find(group => {
        const { _id, en, ar } = group.category;
        return _id === categoryId;
    }).records;
}


export const getRecipeById = async (id) => {
    const recipes = await getAllRecipes();
    return recipes.find(recipe => {
        return recipe._id === id;
    })
}


export const Paginate = (records, perPage, pageIndex = 1) => {
    const pagesCount = Math.floor(records.length / perPage)

    const startIndex = (pageIndex * perPage) - perPage
    const endIndex = startIndex + perPage;

    const recordsPerPage = records.slice(startIndex, endIndex);

    return { pagesCount: pagesCount, pageIndex: pageIndex, records: recordsPerPage };
}
