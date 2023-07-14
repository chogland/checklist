import { Component, State, h } from '@stencil/core';
import { ChecklistService, ChecklistItem } from './../../services/checklists-service';

@Component({
  tag: 'app-saved-checklists',
  styleUrl: 'app-saved-checklists.css',
  shadow: true,
})
export class AppSavedChecklists {
  private checklistService: ChecklistService;
  @State() checklists: ChecklistItem[] = [];
  @State() isEditing: boolean = false;
  @State() editedChecklistId: number | null = null;
  @State() newCategory: string = '';
  @State() newName: string = '';
  @State() showModal: boolean = false;

  constructor() {
    this.checklistService = new ChecklistService();
    this.checklists = this.checklistService.getAllChecklists();
  }

  hasUnsavedChanges(): boolean {
    const editedChecklist = this.checklistService.getChecklistById(this.editedChecklistId || 0);
    return this.newName !== editedChecklist.name || this.newCategory !== editedChecklist.category;
  }

  handleSaveChanges() {
    if (this.newName && this.newCategory) {
      this.checklistService.updateChecklist(this.editedChecklistId!, this.newName, this.newCategory);
      this.checklists = this.checklistService.getAllChecklists();
      this.resetEditState();
    }
  }

  handleNameChange(event: Event) {
    this.newName = (event.target as HTMLInputElement).value;
  }

  handleCategoryChange(event: Event) {
    this.newCategory = (event.target as HTMLInputElement).value;
  }

  handleDeleteChecklist() {
    this.checklistService.deleteChecklist(this.editedChecklistId!);
    this.checklists = this.checklistService.getAllChecklists();
    this.resetEditState();
  }

  handleEdit(checklistId: number) {
    if (!this.isEditing) {
      this.isEditing = true;
      this.editedChecklistId = checklistId;
      const editedChecklist = this.checklistService.getChecklistById(checklistId);
      this.newName = editedChecklist.name;
      this.newCategory = editedChecklist.category;
    } else {
      if (this.hasUnsavedChanges()) {
        this.showModal = true;
      } else {
        this.resetEditState();
      }
    }
  }

  resetEditState() {
    this.isEditing = false;
    this.editedChecklistId = null;
    this.newName = '';
    this.newCategory = '';
  }

  componentWillLoad() {
    this.checklistService = new ChecklistService();
    this.checklists = this.checklistService.getAllChecklists();
  }

  render() {
    return (
      <div class="p-8">
        <div class="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between mb-5">
          <h3 class="text-base font-semibold leading-6 text-gray-900">Saved Checklists</h3>
        </div>
        <ul>
          {this.checklists.map(checklist => (
            <li class="overflow-hidden rounded-xl border border-gray-200 mb-5">
              <div class="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                <img
                  src="https://tailwindui.com/img/logos/48x48/tuple.svg"
                  alt={checklist.name}
                  class="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                />
                <div class="text-sm font-medium leading-6 text-gray-900">{checklist.name}</div>
                <div class="relative ml-auto">
                <button
                  type="button"
                  onClick={() => this.handleEdit(checklist.id)}
                  class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Edit
                </button>
                  <div
                    class="hidden absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu-0-button"
                    tabindex="-1"
                  >
                    <a href="#" class="block px-3 py-1 text-sm leading-6 text-gray-900" role="menuitem" tabindex="-1" id="options-menu-0-item-0">
                      View<span class="sr-only">, {checklist.name}</span>
                    </a>
                    <a href="#" class="block px-3 py-1 text-sm leading-6 text-gray-900" role="menuitem" tabindex="-1" id="options-menu-0-item-1">
                      Edit<span class="sr-only">, {checklist.name}</span>
                    </a>
                  </div>
                </div>
              </div>
              <dl class="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                <div class="flex justify-between gap-x-4 py-3">
                  <dt class="text-gray-500">ID</dt>
                  <dd class="text-gray-700">
                    <time dateTime={checklist.id.toString()}>{checklist.id}</time>
                  </dd>
                </div>
                <div class="flex justify-between gap-x-4 py-3">
                  <dt class="text-gray-500">Category</dt>
                  <dd class="text-gray-700">{checklist.category}</dd>
                </div>
              </dl>

              {this.isEditing && this.editedChecklistId === checklist.id ? (
                <div>
                  <label htmlFor="checklist-name-edit" class="block text-sm font-medium leading-6 text-gray-900">
                    Name
                  </label>
                  <input
                    type="text"
                    id="checklist-name-edit"
                    value={this.newName}
                    onInput={event => this.handleNameChange(event)}
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <label htmlFor="checklist-cat-edit" class="block text-sm font-medium leading-6 text-gray-900">
                    Category
                  </label>
                  <input
                    type="text"
                    id="checklist-cat-edit"
                    value={this.newCategory}
                    onInput={event => this.handleCategoryChange(event)}
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {this.hasUnsavedChanges() && <div>Unsaved changes</div>}
                  <button
                    class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => this.handleSaveChanges()}
                  >
                    Save Changes
                  </button>
                  <button
                    class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => this.handleDeleteChecklist()}
                  >
                    Delete
                  </button>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
