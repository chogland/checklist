import { newE2EPage } from '@stencil/core/testing';

describe('app-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-modal></app-modal>');

    const element = await page.find('app-modal');
    expect(element).toHaveClass('hydrated');
  });
});
