import { prepareRandomArticle } from '../../src/factories/article.factory';
import { prepareRandomComment } from '../../src/factories/comment.factory';
import { AddArticleModel } from '../../src/models/article.model';
import { AddCommentModel } from '../../src/models/comment.model';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentPage } from '../../src/pages/comment.page';
import { AddArticleView } from '../../src/views/add-article.view';
import { AddCommentView } from '../../src/views/add-comment.view';
import { EditCommentView } from '../../src/views/edit-comment.view';
import test, { expect } from '@playwright/test';

test.describe('Create, verify and delete comment', () => {
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  let articleData: AddArticleModel;
  let articlePage: ArticlePage;
  let addCommentView: AddCommentView;
  let commentPage: CommentPage;
  let editCommentView: EditCommentView;

  test.beforeEach(async ({ page }) => {
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);
    articlePage = new ArticlePage(page);
    addCommentView = new AddCommentView(page);
    commentPage = new CommentPage(page);
    editCommentView = new EditCommentView(page);

    articleData = prepareRandomArticle();

    await articlesPage.goto();
    await articlesPage.addArticleButtonLogged.click();
    await addArticleView.crateArticle(articleData);
  });

  test('operate new comment @logged', async ({}) => {
    //Arrange
    const expectedCommentCreatedPopup = 'Comment was created';

    const newCommentData = prepareRandomComment();

    await test.step('create first comment', async ({}) => {
      const expectedCommentHeader = 'Add New Comment';
      //Act
      await articlePage.addCommentButton.click();
      await expect(addCommentView.addNewHeader).toHaveText(
        expectedCommentHeader,
      );
      await addCommentView.createdComment(newCommentData);

      //Assert
      await expect(articlePage.alertPopUp).toHaveText(
        expectedCommentCreatedPopup,
      );
    });

    //Verify comment
    await test.step('verify new comment', async ({}) => {
      const articleComment = articlePage.getArticleComment(newCommentData.body);

      await expect((await articleComment).body).toHaveText(newCommentData.body);
      (await articleComment).link.click();
      //Assert
      await expect(commentPage.commentBody).toHaveText(newCommentData.body);
    });

    //Edit comment
    let editCommentData: AddCommentModel;
    await test.step('update comment', async ({}) => {
      const expectedCommentEditPopup = 'Comment was updated';
      editCommentData = prepareRandomComment();

      await commentPage.editButton.click();
      await editCommentView.updateComment(editCommentData);
      await expect(commentPage.commentBody).toHaveText(editCommentData.body);
      await expect
        .soft(commentPage.alertPopUp)
        .toHaveText(expectedCommentEditPopup);
    });

    await test.step('verify updated comment in article page', async ({}) => {
      //Act
      await commentPage.returnLink.click();

      const updatedArticleComment = articlePage.getArticleComment(
        editCommentData.body,
      );
      //Assert
      await expect((await updatedArticleComment).body).toHaveText(
        editCommentData.body,
      );
    });
  });

  test('user can add more than one comment @logged', async ({}) => {
    await test.step('create comment', async ({}) => {
      //Act
      const expectedCommentCreatedPopup = 'Comment was created';
      const newCommentData = prepareRandomComment();
      await articlePage.addCommentButton.click();

      await addCommentView.createdComment(newCommentData);
      //Assert
      await expect(articlePage.alertPopUp).toHaveText(
        expectedCommentCreatedPopup,
      );
    });
    await test.step('create and verify second comment', async ({}) => {
      //Act
      const secondCommentData = prepareRandomComment();
      //Act
      await articlePage.addCommentButton.click();
      await addCommentView.createdComment(secondCommentData);
      //Assert
      const articleComment = articlePage.getArticleComment(
        secondCommentData.body,
      );
      await expect((await articleComment).body).toHaveText(
        secondCommentData.body,
      );
      (await articleComment).link.click();
      await expect(commentPage.commentBody).toHaveText(secondCommentData.body);
    });
  });
});
