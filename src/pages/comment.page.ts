import { HomePage } from './home.page';
import { MainMenuComponents } from '@_src/components/main-menu.components';
import { ArticlePage } from '@_src/pages/article.page';
import { EditCommentView } from '@_src/views/edit-comment.view';
import { Page } from '@playwright/test';

export class CommentPage extends HomePage {
  url = '/comment.html';
  mainMenu = new MainMenuComponents(this.page);
  commentBody = this.page.getByTestId('comment-body');
  editButton = this.page.getByTestId('edit');
  alertPopUp = this.page.getByTestId('alert-popup');
  returnLink = this.page.getByTestId('return');

  constructor(page: Page) {
    super(page);
  }
  async clickEditButton(): Promise<EditCommentView> {
    await this.editButton.click();
    return new EditCommentView(this.page);
  }
  async clickReturnLink(): Promise<ArticlePage> {
    await this.editButton.click();
    return new ArticlePage(this.page);
  }
}
