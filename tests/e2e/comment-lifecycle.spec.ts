import { prepareRandomArticle } from '@_src/factories/article.factory';
import { prepareRandomComment } from '@_src/factories/comment.factory';
import { AddArticleModel } from '@_src/models/article.model';
import { AddCommentModel } from '@_src/models/comment.model';
import { ArticlePage } from '@_src/pages/article.page';
import { ArticlesPage } from '@_src/pages/articles.page';
import { CommentPage } from '@_src/pages/comment.page';
import { AddArticleView } from '@_src/views/add-article.view';
import { AddCommentView } from '@_src/views/add-comment.view';
import test, { expect } from '@playwright/test';

test.describe('Create, verify and delete comment', () => {
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  let articleData: AddArticleModel;
  let articlePage: ArticlePage;
  let addCommentView: AddCommentView;
  let commentPage: CommentPage;

  test.beforeEach(async ({ page }) => {
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);
    articlePage = new ArticlePage(page);
    addCommentView = new AddCommentView(page);
    commentPage = new CommentPage(page);

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

      const editCommentView = await commentPage.clickEditButton();
      await editCommentView.updateComment(editCommentData);
      await expect(commentPage.commentBody).toHaveText(editCommentData.body);
      await expect
        .soft(commentPage.alertPopUp)
        .toHaveText(expectedCommentEditPopup);
    });

    await test.step('verify updated comment in article page', async ({}) => {
      //Act
      const articlePage = await commentPage.clickReturnLink();

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
