import { prepareRandomComment } from '@_src/factories/comment.factory';
import { test } from '@_src/fixtures/merge.fixture';
import { waitForResponse } from '@_src/utils/wait.util';
import { expect } from '@playwright/test';

test.describe('Verify comment', () => {
  test('should return created comment @GAD-R07-06 @logged', async ({
    createRandomArticle,
    page,
  }) => {
    // Arrange
    const expectedCommentCreatedPopup = 'Comment was created';

    const newCommentData = prepareRandomComment();
    let articlePage = createRandomArticle.articlePage;
    const addCommentView = await articlePage.clickAddCommentButton();

    const waitParameters = {
      page,
      url: '/apo/comments',
      method: 'GET',
      text: newCommentData.body,
    };

    const responsePromise = waitForResponse(waitParameters);
    // Act
    articlePage = await addCommentView.createdComment(newCommentData);
    const response = await responsePromise;
    // Assert
    await expect
      .soft(articlePage.alertPopUp)
      .toHaveText(expectedCommentCreatedPopup);
    expect(response.ok()).toBeTruthy();
  });
});
