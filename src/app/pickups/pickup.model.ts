export class PickupModel {
    
    constructor(
        public id:string | null,
        public status:string, 
        public address: string,
        public createdAt: string, 
        public updatedAt:string,
        public notes:string, 
        public userId:string | null){

    }
}
