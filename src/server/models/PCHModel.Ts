import position from "./positionModel";
import Contributor from "./ContributorModel";

export default class PCH{
    constructor(
        private Id:number,
        private position:position,
        private PCHName:string,
        private technology:string,
        private presentation:string,
        private contributor:Contributor
    ){} 
}