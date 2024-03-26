export interface IFREDObservationRecord {
    date: string;
    value: string;
}

export interface IFREDObservationsResponse {
    observations: IFREDObservationRecord[];
    count: number;
    units: string;
}
