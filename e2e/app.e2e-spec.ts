import { GroundStationPage } from './app.po';

describe('ground-station App', () => {
  let page: GroundStationPage;

  beforeEach(() => {
    page = new GroundStationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
