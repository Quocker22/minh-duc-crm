import { DataUtil } from '@/_metronic/assets/ts/_utils/_DataUtil';
import { getUniqueIdWithPrefix } from '@/_metronic/assets/ts/_utils/_TypesHelpers';
import { IFunction } from '@/models';

export interface EventMeta {
  callback: IFunction;
  fired: boolean;
  name: string;
  one: boolean;
}

export class EventHandlerUtil {
  static store: {
    [name: string]: {
      [handlerId: string]: EventMeta;
    };
  } = {};

  private static _setEventMetasByName(
    name: string,
    handlers: {
      [handlerId: string]: EventMeta;
    }
  ): void {
    EventHandlerUtil.store[name] = handlers;
  }

  private static _getEventMetaByName(name: string):
    | {
        [handlerId: string]: EventMeta;
      }
    | undefined {
    return EventHandlerUtil.store[name];
  }

  private static _setEventMetaByNameAndHandlerId(
    name: string,
    handlerId: string,
    meta: EventMeta
  ): void {
    if (EventHandlerUtil.store[name]) {
      EventHandlerUtil.store[name][handlerId] = meta;

      return;
    }
    EventHandlerUtil.store[name] = {};
    EventHandlerUtil.store[name][handlerId] = meta;
  }

  private static _getEventMetaByHandlerId(name: string, handlerId: string): EventMeta | undefined {
    const handlersIds = EventHandlerUtil.store[name];
    if (!handlersIds) {
      return;
    }

    return handlersIds[handlerId];
  }

  private static _setFiredByNameAndHandlerId(name: string, handerId: string, fired: boolean): void {
    const meta = EventHandlerUtil._getEventMetaByHandlerId(name, handerId);
    if (!meta) {
      return;
    }

    meta.fired = fired;
    EventHandlerUtil._setEventMetaByNameAndHandlerId(name, handerId, meta);
  }

  private static _addEvent(
    element: HTMLElement,
    name: string,
    callback: IFunction,
    one = false
  ): string {
    const handlerId = getUniqueIdWithPrefix('event');
    const data = DataUtil.get(element, name);
    const handlersIds = data ? (data as string[]) : [];
    handlersIds.push(handlerId);

    DataUtil.set(element, name, handlersIds);

    const meta: EventMeta = {
      callback,
      fired: false,
      name,
      one,
    };

    EventHandlerUtil._setEventMetaByNameAndHandlerId(name, handlerId, meta);

    return handlerId;
  }

  private static _removeEvent(element: HTMLElement, name: string, handerId: string) {
    DataUtil.removeOne(element, name, handerId);
    const handlersIds = EventHandlerUtil.store[name];
    if (handlersIds) {
      return;
    }

    delete EventHandlerUtil.store[name][handerId];
  }

  public static trigger(element: HTMLElement, name: string, target?: any, _?: Event): boolean {
    let returnValue = true;
    if (!DataUtil.has(element, name)) {
      return returnValue;
    }

    let eventValue;
    let handlerId;
    const data = DataUtil.get(element, name);
    const handlersIds = data ? (data as string[]) : [];
    for (let i = 0; i < handlersIds.length; i++) {
      handlerId = handlersIds[i];
      if (EventHandlerUtil.store[name] && EventHandlerUtil.store[name][handlerId]) {
        const handler = EventHandlerUtil.store[name][handlerId];
        if (handler.name === name) {
          if (handler.one) {
            if (handler.fired) {
              EventHandlerUtil.store[name][handlerId].fired = true;
              eventValue = handler.callback.call(this, target);
            }
          } else {
            eventValue = handler.callback.call(this, target);
          }

          if (eventValue === false) {
            returnValue = false;
          }
        }
      }
    }

    return returnValue;
  }

  public static on = function (element: HTMLElement, name: string, callBack: IFunction): void {
    EventHandlerUtil._addEvent(element, name, callBack, false);
  };

  public static one(element: HTMLElement, name: string, callBack: IFunction): void {
    EventHandlerUtil._addEvent(element, name, callBack, true);
  }

  public static off(element: HTMLElement, name: string, handerId: string): void {
    EventHandlerUtil._removeEvent(element, name, handerId);
  }
}
