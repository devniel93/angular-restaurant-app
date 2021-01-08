import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display message saying Ristorante Con Fusion', async () => {
    await page.navigateTo('/');
    expect(await page.getParagraphText('app-root h1')).toEqual('Ristorante Con Fusion');
  });

  it('should navigate to about us page by clicking on the link', async () => {
    await page.navigateTo('/');
    let navlink = await page.getAllElements('a').get(1);
    await navlink.click();

    expect(await page.getParagraphText('h3')).toBe('About Us');    
  });

  it('should enter a new commnet for the first dish', async () => {
    await page.navigateTo('/dishdetail/0');

    const newAuthor = await page.getElement('input[type=text]');
    await newAuthor.sendKeys('Test Author');

    const newComment = await page.getElement('textarea');
    await newComment.sendKeys('Test Comment');

    const newSubmitButton = await page.getElement('button[type=submit]');
    await newSubmitButton.click();

    browser.pause(); // not use when async
    
  });

  /*afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });*/

});
