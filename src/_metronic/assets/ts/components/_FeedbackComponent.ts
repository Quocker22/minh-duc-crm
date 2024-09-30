import {
  DataUtil,
  ElementStyleUtil,
  EventHandlerUtil,
  getAttributeValueByBreakpoint,
  getUniqueIdWithPrefix,
} from '@/_metronic/assets/ts/_utils/index';
import { IFunction } from '@/models';

export interface FeedbackOptions {
  content?: string;
  placement?: string;
  type?: string;
  width?: number;
}

const defaultFeedbackOptions: FeedbackOptions = {
  content: '',
  placement: 'top-center',
  type: 'popup',
  width: 100,
};

class FeedbackComponent {
  element: HTMLElement;
  options: FeedbackOptions;
  instanceUid: string;
  shown: boolean;

  constructor(_element: HTMLElement, options: FeedbackOptions) {
    this.element = _element;
    this.options = Object.assign(defaultFeedbackOptions, options);
    this.instanceUid = getUniqueIdWithPrefix('feedback');
    this.shown = false;

    // Event handlers
    this._handlers(); // will add in the show popup
    DataUtil.set(this.element, 'feedback', this);
  }

  private _handlers = () => {
    this.element.addEventListener('click', (e: Event) => {
      e.preventDefault();
      this._go();
    });
  };

  private _go = () => {
    /*empty*/
  };

  private _showPopup = () => {
    this.element = document.createElement('DIV');

    this.element.classList.add('feedback feedback-popup');
    this.element.innerHTML = this.options.content || '';

    if (this.options.placement === 'top-center') {
      this._setPopupTopCenterPosition();
    }

    document.body.appendChild(this.element);
    this.element.classList.add('feedback-shown');
    this.shown = true;
  };

  private _setPopupTopCenterPosition = () => {
    const width = getAttributeValueByBreakpoint(this.options.width?.toString() || '0');
    const height = ElementStyleUtil.get(this.element, 'height');
    this.element.classList.add('feedback-top-center');
    ElementStyleUtil.set(this.element, 'width', width);
    ElementStyleUtil.set(this.element, 'left', '50%');
    ElementStyleUtil.set(this.element, 'top', '-' + height);
  };

  private _hidePopup = () => {
    this.element.remove();
  };

  ///////////////////////
  // ** Public API  ** //
  ///////////////////////
  public show = () => {
    if (EventHandlerUtil.trigger(this.element, 'kt.feedback.show') === false) {
      return;
    }

    if (this.options.type === 'popup') {
      this._showPopup();
    }

    EventHandlerUtil.trigger(this.element, 'kt.feedback.shown');

    return this;
  };

  public hide = () => {
    if (EventHandlerUtil.trigger(this.element, 'kt.feedback.hide') === false) {
      return;
    }

    if (this.options.type === 'popup') {
      this._hidePopup();
    }

    this.shown = false;
    EventHandlerUtil.trigger(this.element, 'kt.feedback.hidden');

    return this;
  };

  public isVisiblen = () => {
    return this.isVisiblen;
  };

  public getElement = () => {
    return this.element;
  };

  // Event API
  public on = (name: string, handler: IFunction) => {
    return EventHandlerUtil.on(this.element, name, handler);
  };

  public one = (name: string, handler: IFunction) => {
    return EventHandlerUtil.one(this.element, name, handler);
  };

  public off = (name: string, handerId: string) => {
    return EventHandlerUtil.off(this.element, name, handerId);
  };

  public trigger = (name: string, event: Event) => {
    return EventHandlerUtil.trigger(this.element, name, event);
  };

  // Create Instances
  public static createInstances(_selector: string) {
    throw new Error('not implemented');
  }

  // Static methods
  public static hasInstace(_element: HTMLElement) {
    throw new Error('not implemented');
  }

  public static getInstance(_element: HTMLElement) {
    throw new Error('not implemented');
  }

  public static bootstrap(_attr = '[data-Feedback]') {
    throw new Error('not implemented');
  }
}

export { defaultFeedbackOptions, FeedbackComponent };
