import { Component, h, State } from '@stencil/core';
import { ChecklistService, ChecklistItem } from './../../services/checklists-service';

@Component({
  tag: 'app-checklist',
  styleUrl: 'app-checklist.css',
  shadow: true,
})
export class ChecklistApp {
  private checklistService: ChecklistService;
  @State() checklists: ChecklistItem[] = [];
  // @State() currentChecklist: Checklist | null = null;
  @State() newName: string = '';
  @State() newCategory: string = '';
  @State() newItemName: string = '';
  @State() newItemCategory: string = '';
  @State() isUpdating: boolean = false;
  @State() isEditing: boolean = false;
  @State() editedChecklistId: number | null = null;
  @State() showModal: boolean = false;
  @State() showDeleteModal: boolean = false;

  constructor() {
    this.checklistService = new ChecklistService();
    this.checklists = this.checklistService.getAllChecklists();
  }

  handleNameChange(event: Event) {
    this.newName = (event.target as HTMLInputElement).value;
  }

  handleCategoryChange(event: Event) {
    this.newCategory = (event.target as HTMLInputElement).value;
  }

  handleSave() {
    if (this.newName && this.newCategory && !this.isUpdating) {
      this.isUpdating = true;
      this.checklistService.saveChecklist(this.newName, this.newCategory);
      this.checklists = this.checklistService.getAllChecklists();
      this.newName = '';
      this.newCategory = '';
      this.isUpdating = false;
    }
  }

  //     const savedChecklists = localStorage.getItem('checklists');
  //     let checklists = [];

  //     if (savedChecklists) {
  //       checklists = JSON.parse(savedChecklists);
  //     }

  //     checklists.push(checklist);
  //     localStorage.setItem('checklists', JSON.stringify(checklists));

  //     this.isUpdating = false;
  //     this.openChecklist(checklist);
  //   }
  // }

  handleModalConfirm() {
    if (this.showDeleteModal) {
      this.handleDeleteChecklist();
    } else {
      this.showModal = false;
      this.resetEditState();
    }
    this.resetEditState();
  }

  handleModalCancel() {
    this.showModal = false;
    this.showDeleteModal = false;
  }

  handleSaveChanges() {
    if (this.newName && this.newCategory) {
      this.checklistService.updateChecklist(this.editedChecklistId!, this.newName, this.newCategory);
      this.checklists = this.checklistService.getAllChecklists();
      this.resetEditState();
    }
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
      this.newName = this.checklistService.getChecklistById(checklistId).name;
      this.newCategory = this.checklistService.getChecklistById(checklistId).category;
    } else {
      if (this.hasUnsavedChanges()) {
        this.showModal = true;
      } else {
        this.resetEditState();
      }
    }
  }

  componentWillLoad() {
    this.checklistService = new ChecklistService();
    this.checklists = this.checklistService.getAllChecklists();
  }

  hasUnsavedChanges(): boolean {
    const editedChecklist = this.checklistService.getChecklistById(this.editedChecklistId || 0);
    return this.newName !== editedChecklist.name || this.newCategory !== editedChecklist.category;
  }

  resetEditState() {
    this.isEditing = false;
    this.editedChecklistId = null;
    this.newName = '';
    this.newCategory = '';
  }

  render() {
    return (
      <div class="p-8">
        {this.showModal ? (
          <app-modal>
            <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button type="button" class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span class="sr-only">Close</span>
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                    Unsaved Changes
                  </h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">Are you sure you want to proceed with unsaved changes?</p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => this.handleModalConfirm()}
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  yes
                </button>
                <button
                  onClick={() => this.handleModalCancel()}
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  no
                </button>
              </div>
            </div>
          </app-modal>
        ) : null}

        <div class="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
          <h2 class="text-base font-semibold leading-6 text-gray-900">Checklists</h2>
        </div>
        <div class="add-new-checklist">
          <div>
            <label htmlFor="checklist-name" class="block text-sm font-medium leading-6 text-gray-900">
              Name
            </label>
            <input
              type="text"
              id="checklist-name"
              onInput={event => this.handleNameChange(event)}
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <label htmlFor="checklist-cat" class="block text-sm font-medium leading-6 text-gray-900">
              Category
            </label>
            <input
              type="text"
              id="checklist-cat"
              onInput={event => this.handleCategoryChange(event)}
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div class="mt-3 sm:mt-0">
            <button
              type="button"
              onClick={() => this.handleSave()}
              class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </div>
        <div class="saved-checklists">
        <div class="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900">Saved Checklists</h3>
        </div>
        <ul>
          {this.checklists.map(checklist => (
            <li class="overflow-hidden rounded-xl border border-gray-200">
              <div class="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                <img
                  src="https://tailwindui.com/img/logos/48x48/tuple.svg"
                  alt={checklist.name}
                  class="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                />
                <div class="text-sm font-medium leading-6 text-gray-900">{checklist.name}</div>
                <div class="relative ml-auto">
                  <button type="button" class="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500" id="options-menu-0-button" aria-expanded="false" aria-haspopup="true">
                    <span class="sr-only">Open options</span>
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                    </svg>
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

                {/* <div class="flex justify-between gap-x-4 py-3">
                 <dt class="text-gray-500">Amount</dt>
                 <dd class="flex items-start gap-x-2">
                   <div class="font-medium text-gray-900"></div> TODO - add count of items here.
                   <div class="rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset text-red-700 bg-red-50 ring-red-600/10">Overdue</div>
                 </dd>
               </div> */}
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
              ) : (
                <button
                  type="button"
                  onClick={() => this.handleEdit(checklist.id)}
                  class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Edit
                </button>
              )}
            </li>
          ))}
        </ul>
        </div>
        {/* TODO - setup common modal component */}
        {this.showModal && (
          <div>
            <div>
              {this.showDeleteModal ? (
                <div>Are you sure you want to delete this checklist?</div>
              ) : (
                <div>Are you sure you want to discard unsaved changes?</div>
              )}
            </div>
            <button onClick={() => this.handleModalConfirm()}>Confirm</button>
            <button onClick={() => this.handleModalCancel()}>Cancel</button>
          </div>
        )}
      </div>
    );
  }

  // openChecklist(checklist: Checklist) {
  //   this.currentChecklist = checklist;
  // }

  // updateChecklistName(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (this.currentChecklist) {
  //     this.currentChecklist.name = input.value;
  //     this.saveChecklists();
  //   }
  // }

  // updateChecklistCategory(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (this.currentChecklist) {
  //     this.currentChecklist.category = input.value;
  //   }
  // }

  // addItem() {
  //   if (this.currentChecklist) {
  //     const item: ChecklistItem = {
  //       id: Date.now(),
  //       name: this.newItemName,
  //       checked: false,
  //     };
  //     this.currentChecklist.items.push(item);
  //     this.newItemName = '';
  //   }
  // }

  // removeItem(item: ChecklistItem) {
  //   if (this.currentChecklist) {
  //     this.currentChecklist.items = this.currentChecklist.items.filter(i => i.id !== item.id);
  //   }
  // }

  // toggleCheck(item: ChecklistItem) {
  //   item.checked = !item.checked;
  // }

  // viewUncheckedItems() {
  //   if (this.currentChecklist) {
  //     const uncheckedItems = this.currentChecklist.items.filter(item => !item.checked);
  //     console.log('Unchecked Items:', uncheckedItems);
  //   }
  // }

  // uncheckAllItems() {
  //   if (this.currentChecklist) {
  //     this.currentChecklist.items.forEach(item => {
  //       item.checked = false;
  //     });
  //   }
  // }

  handleConfirmDelete() {
    this.showModal = true;
    this.showDeleteModal = true;
  }

  updateNewItemName(event: Event) {
    const input = event.target as HTMLInputElement;
    this.newItemName = input.value;
  }

  // saveChecklist() {
  //   if (this.currentChecklist) {
  //     const checklistToSave = { ...this.currentChecklist }; // Clone the checklist object
  //     // Perform the saving logic here, e.g., send the checklist to a server or store it in local storage
  //     this.checklists = this.checklists.map(checklist => (checklist === this.currentChecklist ? checklistToSave : checklist));
  //     this.saveChecklists();
  //     console.log('Saved Checklist:', checklistToSave);
  //   }
  // }
  
  saveChecklists() {
    localStorage.setItem('checklists', JSON.stringify(this.checklists));
  }

  

  // componentWillLoad() {
  //   const savedChecklists = localStorage.getItem('checklists');
  //   if (savedChecklists) {
  //     this.checklists = JSON.parse(savedChecklists);
  //   }
  //   this.loadChecklistsFromLocalStorage();
  //   this.currentChecklist;
  // }


  // renderEditView() {
  //   if (this.currentChecklist) {
  //     return (
  //       <div>
  //         <h2>Edit Checklist</h2>
  //         <div>
  //           <label>
  //             Name:
  //             <input type="text" value={this.currentChecklist.name} onInput={e => this.updateChecklistName(e)} />
  //           </label>
  //         </div>
  //         <div>
  //           <label>
  //             Category:
  //             <input type="text" value={this.currentChecklist.category} onInput={e => this.updateChecklistCategory(e)} />
  //           </label>
  //         </div>
  //         <div>
  //           <input type="text" placeholder="Item Name" value={this.newItemName} onInput={e => (this.newItemName = (e.target as HTMLInputElement).value)} />
  //           {/* <button onClick={() => this.addItem()}>Add</button> */}
  //         </div>
  //         <ul>
  //           {this.currentChecklist.items.map(item => (
  //             <li>
  //               <label>
  //                 <input type="checkbox" checked={item.checked} onChange={() => (item.checked = !item.checked)} />
  //                 {item.name}
  //               </label>
  //               {/* <button onClick={() => this.removeItem(item)}>Remove</button> */}
  //             </li>
  //           ))}
  //         </ul>
  //       </div>
  //     );
  //   }
  //   return null;
  // }

  // render() {
  //   return (
  //     <div>
  //       <h1>Create Checklist</h1>
  //       <div>
  //         <label>
  //           Name:
  //           <input
  //             type="text"
  //             value={this.currentChecklist?.name}
  //             onInput={(e: Event) => this.updateChecklistName(e)}
  //           />
  //         </label>
  //       </div>
  //       <div>
  //         {this.checklists.map((checklist) => {
  //           checklist.name
  //         })}
  //       </div>
  //       <div>
  //         <label>
  //           Category:
  //           <input
  //             type="text"
  //             value={this.currentChecklist?.category}
  //             onInput={(e: Event) => this.updateChecklistCategory(e)}
  //           />
  //         </label>
  //       </div>
  //       <button onClick={() => this.createChecklist()}>Create Checklist</button>
  //       {this.currentChecklist && (
  //         <div>
  //           <h2>Add Items</h2>
  //           <div>
  //             <input
  //               type="text"
  //               placeholder="Item Name"
  //               value={this.newItemName}
  //               onInput={(e: Event) => this.updateNewItemName(e)}
  //             />
  //             <button onClick={() => this.addItem()}>Add</button>
  //           </div>
  //           <ul>
  //             {this.currentChecklist.items.map((item) => (
  //               <li>
  //                 <label>
  //                   <input
  //                     type="checkbox"
  //                     checked={item.checked}
  //                     onChange={() => this.toggleCheck(item)}
  //                   />
  //                   {item.name}
  //                 </label>
  //                 <button onClick={() => this.removeItem(item)}>Remove</button>
  //               </li>
  //             ))}
  //           </ul>
  //           <button onClick={() => this.viewUncheckedItems()}>View Unchecked Items</button>
  //           <button onClick={() => this.uncheckAllItems()}>Uncheck All Items</button>
  //           <button onClick={() => this.saveChecklist()}>Save Checklist</button>
  //         </div>
  //       )}
  //       <div>
  //         <h2>Saved Checklists</h2>
  //         {this.checklists && this.checklists.map((checklist) => {
  //           <p>
  //             {checklist.name}
  //           </p>
  //         })}
  //       </div>
  //     </div>
  //   );
  // }
}
