export class Player {
    constructor(
        public readonly name: string,
        private _selectedColors: string[] = []
    ) {}

    get selectedColors(): string[] {
        return [...this._selectedColors];
    }

    selectColor(color: string): void {
        this._selectedColors.push(color);
    }

    clearSelectedColors(): void {
        this._selectedColors = [];
    }
}
