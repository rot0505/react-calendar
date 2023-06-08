export interface IEventCreate {
  title: string;
  description: string;
  start: string;
  end: string;
  type: TEventTypes;
  color: string;
}

export interface IEvent extends IEventCreate {
  id: string;
}

export type TPartialEvent = Partial<IEvent>;

export type TEventTypes = "event" | "long-event";
