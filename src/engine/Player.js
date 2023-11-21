export class Player {

    constructor() {
        this.selectedColors = [];
    }

    selectColor(color) {
        this.selectedColors.push(color);
    }

    clearSelectedColors() {
        this.selectedColors = [];
    }
}
