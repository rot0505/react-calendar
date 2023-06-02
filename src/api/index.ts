import axios from "axios";
import { IEvent, IEventCreate, TPartialEvent } from "types/event";

const API_URL = 'https://61d8e2cfe6744d0017ba8cdc.mockapi.io/events';

const getEvents = async (): Promise<IEvent[]> => {
  const response = await axios.get<IEvent[]>(API_URL);
  return response.data;
}

const createEvent = async (eventData: IEventCreate): Promise<IEvent> => {
  const response = await axios.post<IEvent>(`${API_URL}`, {
    eventData
  });
  return response.data;
}

const deleteEvent = async (eventId: string) => axios.delete(`${API_URL}/${eventId}`);

const updateEvent = async (eventId: string, eventData: TPartialEvent): Promise<IEvent> => {
  const response = await axios.put<IEvent>(`${API_URL}/${eventId}`, {
    eventData
  });
  return response.data;
}

export default {
  getEvents,
  createEvent,
  deleteEvent,
  updateEvent,
}