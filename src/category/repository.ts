import { Category } from "./category";

const categories: Category[] = [
  {
    id: 1,
    category: "Action (set A)",
  },

  {
    id: 2,
    category: "Action (set B)",
  },

  {
    id: 3,
    category: "Animal (set A)",
  },

  {
    id: 4,
    category: "Animal (set B)",
  },

  {
    id: 5,
    category: "Clothes",
  },

  {
    id: 6,
    category: "Emotions",
  },

  {
    id: 7,
    category: "Food",
  },

  {
    id: 8,
    category: "Seasons",
  },
];

const newId = (function () {
  let id = categories.length + 1;
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
  if (categoryIndex < 0) return Promise.reject(new Error("Category not found"));
  categories.splice(categoryIndex, 1);
  return Promise.resolve();
}

export function createCategory(data: Category): Promise<Category> {
  const isExists =
    categories.findIndex((cat) => cat.category === data.category) >= 0;
  if (isExists) {
    return Promise.reject(
      new Error(`Category with name ${data.category} already exist`)
    );
  }
  const newCategory: Category = {
    ...data,
    id: newId(),
  };
  categories.push(newCategory);
  return Promise.resolve(newCategory);
}

export function updateCategory(data: Category): Promise<Category> {
  const categoryToUpdate = categories.find((cat) => cat.id === data.id);
  if (!categoryToUpdate) return Promise.reject(new Error("Category not found"));
  if (data.category) {
    categoryToUpdate.category = data.category;
  }
  return Promise.resolve(categoryToUpdate);
}
