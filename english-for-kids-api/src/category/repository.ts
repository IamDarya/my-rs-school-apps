import {Category} from './category';

const categories: Category[] = [{
    id: 1,
    name: 'Category 1',
    description: 'My nest category 1'
},
{
    id: 2,
    name: 'Category 2',
    description: 'My nest category 2'
}
]

const newId = (function() {
    let id = categories.length+1;
    return () => id++;
})();

export function getCategories(): Promise<Category[]> {
    return Promise.resolve(categories);
}

export function getCategoryById(id: number): Promise<Category | undefined> {
    const category = categories.find((cat) => cat.id === id);
    return Promise.resolve(category);
}

export function deleteCategory(id: number): Promise<void> {
    const categoryIndex = categories.findIndex((cat) => cat.id === id);
    if(categoryIndex < 0) return Promise.reject(new Error('Category not found'));
    categories.splice(categoryIndex, 1);
    return Promise.resolve();
}

export function createCategory(data: Category): Promise<Category> {
    const isExists = categories.findIndex((cat) => cat.name === data.name) >=0;
    if (isExists) {
        return Promise.reject(new Error(`Category with name ${data.name} already exist`));
    }
    const newCategory: Category = {
        ...data,
        id: newId()
    }
    categories.push(newCategory);
    return Promise.resolve(newCategory);
}