export interface ChecklistItem {
  id: number;
  name: string;
  category: string;
}

export class ChecklistService {
  private checklists: ChecklistItem[] = [];

  constructor() {
    const savedChecklists = localStorage.getItem('checklists');
    if (savedChecklists) {
      this.checklists = JSON.parse(savedChecklists);
    }
  }

  getAllChecklists(): ChecklistItem[] {
    return this.checklists;
  }

  getChecklistById(id: number): ChecklistItem {
    return this.checklists.find(checklist => checklist.id === id) || { id: 0, name: '', category: '' };
  }

  saveChecklist(name: string, category: string): void {
    const checklist: ChecklistItem = {
      id: Date.now(),
      name,
      category,
    };
    this.checklists.push(checklist);
    localStorage.setItem('checklists', JSON.stringify(this.checklists));
  }

  updateChecklist(id: number, name: string, category: string): void {
    const checklistIndex = this.checklists.findIndex(checklist => checklist.id === id);
    if (checklistIndex !== -1) {
      this.checklists[checklistIndex].name = name;
      this.checklists[checklistIndex].category = category;
      localStorage.setItem('checklists', JSON.stringify(this.checklists));
    }
  }

  deleteChecklist(id: number): void {
    const checklistIndex = this.checklists.findIndex(checklist => checklist.id === id);
    if (checklistIndex !== -1) {
      this.checklists.splice(checklistIndex, 1);
      localStorage.setItem('checklists', JSON.stringify(this.checklists));
    }
  }
}
