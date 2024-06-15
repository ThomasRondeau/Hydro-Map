import position from "./positionModel.js";
import Contributor from "./ContributorModel.js";

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