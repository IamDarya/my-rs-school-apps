import { Card } from './card';

export interface ImageCategoryModel {
  id?: number;
  category: string;
  cardsContent: Card[];
}
