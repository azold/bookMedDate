export interface IServicesBase {
    serviceId: number;
    serviceName: string;
    doctor: string;
    referral: boolean;
    prerequiredServieId: number | undefined;
    prerequiredServieName: string | undefined;
}