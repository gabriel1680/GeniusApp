export class Player {
    constructor(private readonly player: string) {}

    selectedColors: string[] = [];

    selectColor(color: string): void {
        this.selectedColors.push(color);
    }

    clearSelectedColors(): void {
        this.selectedColors = [];
    }
}
