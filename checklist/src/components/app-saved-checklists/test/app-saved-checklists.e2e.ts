import { newE2EPage } from '@stencil/core/testing';

describe('app-saved-checklists', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-saved-checklists></app-saved-checklists>');

    const element = await page.find('app-saved-checklists');
    expect(element).toHaveClass('hydrated');
  });
});
