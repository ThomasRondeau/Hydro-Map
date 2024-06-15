import position from "./positionModel.js";
import Contributor from "./ContributorModel.js";

export default class InterestPoint {
    private static lastId: number = 0;

    constructor(
        private position: position,
        private installablePower: number,
        private presentation: string,
        private contributor?: Contributor
    ) {
        this.Id = ++InterestPoint.lastId;
    }

    private Id: number;
}