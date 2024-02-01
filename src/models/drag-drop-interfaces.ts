// Drag & Drop interfaces
namespace App {
  export interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
  }

  export interface DragTarget {
    //if valid option
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    //for visual feedback
    dragLeaveHandler(event: DragEvent): void;
  }
}
