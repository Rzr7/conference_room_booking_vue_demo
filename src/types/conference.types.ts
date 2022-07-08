import { IRoom } from '@/types/room.types';
import { IUser } from '@/types/user.types';

export interface IConference {
  id?: number,
  name: string,
  bookedAt: Date,
  duration: number,
  room: IRoom | number,
  owner: IUser | number,
  persons: IUser[],
}

export interface IConferenceRequest {
  name: string,
  bookedAt: string,
  duration: number,
  roomId: number,
}
