import { AddArticleModel } from '../models/article.model';
import { faker } from '@faker-js/faker/locale/en';

export function prepareRandomArticle(titleLenght?: number): AddArticleModel {
  let title: string;
  if (titleLenght) title = faker.string.alpha(titleLenght);
  else title = faker.lorem.sentence();

  const body = faker.lorem.paragraph();

  const newArticle: AddArticleModel = { title: title, body: body };

  return newArticle;
}
