class InterestPoint {
    constructor(position, installablePower, presentation, contributor) {
        this.position = position;
        this.installablePower = installablePower;
        this.presentation = presentation;
        this.contributor = contributor;
        this.Id = ++InterestPoint.lastId;
    }
}
InterestPoint.lastId = 0;
export default InterestPoint;
//# sourceMappingURL=InterestPointModel.js.map