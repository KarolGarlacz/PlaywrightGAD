import { RESPONSE_TIMEOUT } from '@_pw-config';
import { Page, Response } from '@playwright/test';

interface WaitParameters {
  page: Page;
  url: string;
  method?: string;
  status?: number;
  text?: string;
}

export async function waitForResponse(
  waitParameters: WaitParameters,
): Promise<Response> {
  return waitParameters.page.waitForResponse(
    async (response) => {
      return (
        response.url().includes(waitParameters.url) &&
        (!waitParameters.method ||
          response.request().method() === waitParameters.method) &&
        (!waitParameters.status ||
          response.status() === waitParameters.status) &&
        (!waitParameters.text ||
          (await response.text()).includes(waitParameters.text))
      );
    },
    {
      timeout: RESPONSE_TIMEOUT,
    },
  );
}
