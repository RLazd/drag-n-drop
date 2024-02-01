/// <reference path="base-components.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../state/project-state.ts" />
/// <reference path="../decorators/autobind.ts" />

namespace App {
  export // ProjectList Class
  class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget
  {
    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
      super('#project-list', '#app', false, `${type}-projects`);

      this.assignedProjects = [];

      this.configure();
      this.renderContent();
    }

    @Autobind
    dragOverHandler(event: DragEvent): void {
      if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
        event.preventDefault();
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.add('droppable');
      }
    }

    @Autobind
    dropHandler(event: DragEvent): void {
      const prjId = event.dataTransfer!.getData('text/plain');
      projectState.moveProject(
        prjId,
        this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
      );
      console.log(event.dataTransfer!.getData('text/plain'));
    }

    @Autobind
    dragLeaveHandler(_: DragEvent): void {
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.remove('droppable');
    }

    configure() {
      this.element.addEventListener('dragover', this.dragOverHandler);
      this.element.addEventListener('drop', this.dropHandler);
      this.element.addEventListener('dragleave', this.dragLeaveHandler);

      projectState.addListener((projects: Project[]) => {
        const relevantProjects = projects.filter((prj) => {
          if (this.type == 'active') {
            return prj.status === ProjectStatus.Active;
          }
          return prj.status === ProjectStatus.Finished;
        });
        this.assignedProjects = relevantProjects;
        this.renderProjects();
      });
    }

    renderContent() {
      const listId = `${this.type}-projects-list`;
      this.element.querySelector('ul')!.id = listId;
      this.element.querySelector(
        'h2'
      )!.textContent = `${this.type.toUpperCase()}  PROJECTS`;
    }

    private renderProjects() {
      const listEl = document.querySelector(
        `#${this.type}-projects-list`
      ) as HTMLUListElement;
      listEl.innerHTML = '';
      for (const prjItem of this.assignedProjects) {
        new ProjectItem(`#${this.element.querySelector('ul')!.id}`, prjItem);
        // const listItem = document.createElement('li');
        // listItem.textContent = prjItem.title;
        // listEl.appendChild(listItem);
      }
    }
  }
}