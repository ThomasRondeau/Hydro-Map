class PCH {
    constructor(position, PCHName, technology, power, presentation, contributor) {
        this.position = position;
        this.PCHName = PCHName;
        this.technology = technology;
        this.power = power;
        this.presentation = presentation;
        this.contributor = contributor;
        this.Id = ++PCH.lastId;
    }
}
PCH.lastId = 0;
export default PCH;
//# sourceMappingURL=PCHModel.js.map