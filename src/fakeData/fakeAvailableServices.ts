import AvailableServices from "../contracts/AvailableServices";
import DatetimeSlot from "../contracts/DatetimeSlot";
import * as faker from 'faker';
import * as Moment from 'moment';
import IAvailableServices from "../contracts/AvailableServices";

const ServiceNames = [
    "Belgyógyászat",    
    "Kardiológia",
    "Laboratórium",
    "Reumatológia",
    "Szívultrahang",
    "Urológia",
    "Sebészet",
    "Szemészet",
    "Szülészet - Nőgyógyászat",
    "Mammográfia"
]

export class fakeAvailableServices{    

    public generateData(): Promise<AvailableServices[]>{
        let serviceCollection: AvailableServices[] = [];
        let startTimes = this.generateStartTimes();

        // setTimeout(() => {
            for(let i = 0; i < 10; i++) {

                let fromHour = startTimes[Math.floor(Math.random() * startTimes.length)];
                const preReqServiceId = this.definePrerequiredService(i);
                var newService: AvailableServices = {
                    service: {
                        doctor: faker.name.findName(),
                        serviceId: i,
                        referral: faker.random.boolean(),
                        serviceName: ServiceNames[i],
                        prerequiredServieId: this.definePrerequiredService(i),
                        prerequiredServieName: preReqServiceId !== undefined ? ServiceNames[preReqServiceId] : undefined
                    },
                    availableDateTimeSlots: this.generateAvailableDateTimeSlots(fromHour),
                    openHours: {
                        from: fromHour,
                        to: this.generateEndTime(fromHour)
                    },                
                    isBooked: this.defineIsBooked(i)
                };

                serviceCollection.push(newService);
            }        
         // }, 2000);
        
        return Promise.resolve(serviceCollection);
    }

    private defineIsBooked(serviceId: number): boolean {
        let booked;
        switch(serviceId) {
            case 1:
            case 4:
            case 8:
            case 9: {
                booked = false;
            }
            default: {
                booked = faker.random.boolean();
            }
         }
        
        return booked
    }

    private definePrerequiredService(serviceId: number): number | undefined{
        let id: number | undefined;

        switch(serviceId) {
            case 1: {
                id = 4;
                break;
            }
            case 9: {
                id = 8;
                break;
            }
            default: {
                id = undefined
                break;
            }
        }

        return id;
    }

    private generateStartTimes(): Moment.Moment[]{
        let timeArray: Moment.Moment[] = [];
        let i = 7;
        let hour = 7;
        let odd: boolean;
        do {
            odd = false;
            if (i % 2 === 0) {
                odd = true;
                hour = hour - 1;
            }
            let minute = odd ? 30 : 0;
            timeArray.push(Moment().hour(hour).minute(minute));
            i = i + 1;
            hour = hour + 1;
        } while (i < 18)

        return timeArray;
    }

    private generateEndTime(start: Moment.Moment): Moment.Moment {
        const startTime = Moment(start);
        const endTime = startTime.add(8, 'hours'); 
        return endTime;
    }

    private generateAvailableDateTimeSlots(start: Moment.Moment): DatetimeSlot[] {
        const timeIntervalsInMinutes = 15;
        let minTime = Moment(start).set("seconds", 0);
        let maxTime = this.generateEndTime(start);
        maxTime.add(-timeIntervalsInMinutes, 'minutes');

        let slots: DatetimeSlot[] = [];
        let count = 0;

        while (maxTime >= minTime) {
            let newMintime = Moment(minTime).add('minute', timeIntervalsInMinutes).set("seconds", 0);

            let slot: DatetimeSlot = {
                id: count,
                dateStart: minTime,
                dateEnd: newMintime,
                isReserved: faker.random.boolean()
            }
            
            minTime = Moment(newMintime);
            count++;
            slots.push(slot);
        }
        
        return slots;   
    }
}