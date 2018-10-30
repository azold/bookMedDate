import * as moment from 'moment';

export default interface IDatetimeSlot {        
    id: number,
    dateStart: moment.Moment,
    dateEnd: moment.Moment,
    isReserved: boolean        
}