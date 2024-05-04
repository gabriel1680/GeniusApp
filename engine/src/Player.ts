export class Player {

    selectedColors: string[] = [];

    selectColor(color: string): void {
        this.selectedColors.push(color);
    }

    clearSelectedColors(): void {
        this.selectedColors = [];
    }
}

