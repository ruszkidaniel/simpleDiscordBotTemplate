export type DatabaseMuteRow = {
    id: number,
    issuerId: string,
    targetId: string,
    active: boolean,
    startDate: date,
    endDate?: date,
    reason: string
};
