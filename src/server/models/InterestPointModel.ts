import position from "./positionModel";
import Contributor from "./ContributorModel";

export default class InterestPoint{
    constructor(
        private Id:number,
        private position:position,
        private installablePower:number,
        private presentation:string,
        private contributor:Contributor
    ){} 
}