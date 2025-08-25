import { MainMenuComponents } from '@_src/components/main-menu.components';
import { ArticlesPage } from '@_src/pages/articles.page';
import { CommentsPage } from '@_src/pages/comments.page';
import { HomePage } from '@_src/pages/home.page';
import { AddCommentView } from '@_src/views/add-comment.view';
import { Locator, Page } from '@playwright/test';

interface ArticleComment {
  body: Locator;
  link: Locator;
}

export class ArticlePage extends HomePage {
  url = '/article.html';
  mainMenu = new MainMenuComponents(this.page);
  articleTitle = this.page.getByTestId('article-title');
  articleBody = this.page.getByTestId('article-body');
  deleteButton = this.page.getByTestId('delete');
  addCommentButton = this.page.locator('#add-new-comment');
  alertPopUp = this.page.getByTestId('alert-popup');

  constructor(page: Page) {
    super(page);
  }
  async clickAddCommentButton(): Promise<AddCommentView> {
    await this.addCommentButton.click();
    return new AddCommentView(this.page);
  }
  async deleteArticle(): Promise<ArticlesPage> {
    this.page.on('dialog', async (dialog) => {
      await dialog.accept();
    });
    this.deleteButton.click();
    return new ArticlesPage(this.page);
  }

  async getArticleComment(body: string): Promise<ArticleComment> {
    const commentContainer = this.page
      .locator('.comment-container')
      .filter({ hasText: body });

    return {
      body: commentContainer.locator(':text("Comment:") + span'),
      link: commentContainer.locator("[id^='gotoComment']"),
    };
  }
  async clickCommentLink(commentLink: Locator): Promise<CommentsPage> {
    await commentLink.click();
    return new CommentsPage(this.page);
  }
}
