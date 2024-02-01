/// <reference path="models/drag-drop-interfaces.ts" />
/// <reference path="models/project.ts" />
/// <reference path="state/project-state.ts" />
/// <reference path="util/validation.ts" />
/// <reference path="decorators/autobind.ts" />
/// <reference path="components/base-components.ts" />
/// <reference path="components/project-item.ts" />
/// <reference path="components/project-list.ts" />

namespace App {
  // Instances
  new ProjectInput();
  new ProjectList('active');
  new ProjectList('finished');
}
