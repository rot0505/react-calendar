import * as eventsActions from "./events/actions";
import * as modalsActions from "./modals/actions";
import * as popupsActions from "./popups/actions";

export const allActions = {
  ...eventsActions,
  ...modalsActions,
  ...popupsActions,
};
