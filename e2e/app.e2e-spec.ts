import { BestoonPage } from './app.po';

describe('bestoon App', function() {
  let page: BestoonPage;

  beforeEach(() => {
    page = new BestoonPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
