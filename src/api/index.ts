import axios from "axios";
import { IEvent, IEventCreate, TPartialEvent } from "types/event";

const API_URL = process.env.REACT_APP_API_URL;

const getEvents = async (): Promise<IEvent[]> => {
  const response = await axios.get<IEvent[]>(`${API_URL}/events`);
  return response.data;
};

const createEvent = async (event: IEventCreate): Promise<IEvent> => {
  const response = await axios.post<IEvent>(`${API_URL}/event`, {
    event,
  });
  return response.data;
};

const deleteEvent = async (eventId: string) => axios.delete(`${API_URL}/event/${eventId}`);

const updateEvent = async (eventId: string, event: TPartialEvent): Promise<IEvent> => {
  const response = await axios.put<IEvent>(`${API_URL}/event/${eventId}`, {
    event,
  });
  return response.data;
};

export default {
  getEvents,
  createEvent,
  deleteEvent,
  updateEvent,
};
