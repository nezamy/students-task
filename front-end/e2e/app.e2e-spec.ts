import { FrontEndPage } from './app.po';

describe('front-end App', () => {
  let page: FrontEndPage;

  beforeEach(() => {
    page = new FrontEndPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
