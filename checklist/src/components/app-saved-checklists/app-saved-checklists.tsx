import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-saved-checklists',
  styleUrl: 'app-saved-checklists.css',
  shadow: true,
})
export class AppSavedChecklists {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
