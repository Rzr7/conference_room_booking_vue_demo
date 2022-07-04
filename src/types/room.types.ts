export interface IRoom {
  id?: number,
  name: string,
  location: string,
  capacity: number,
}

export interface ITimeSlot {
  from: Date,
  to: Date,
}
