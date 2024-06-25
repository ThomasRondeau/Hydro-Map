import position from "./positionModel.js";
import Contributor from "./ContributorModel.js";

export default class PCH{
    private static lastId: number = 0;

    constructor(
        private position:position,
        private PCHName:string,
        private technology:string,
        private power:number,
        private presentation:string,
        private contributor?:Contributor
    ){
        this.Id = ++PCH.lastId;
    } 
    private Id: number;
}