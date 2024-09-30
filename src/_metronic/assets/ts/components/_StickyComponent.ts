import {
  DataUtil,
  ElementAnimateUtil,
  ElementStyleUtil,
  EventHandlerUtil,
  getAttributeValueByBreakpoint,
  getCSS,
  getElementOffset,
  getObjectPropertyValueByKey,
  getScrollTop,
  getUniqueIdWithPrefix,
  stringSnakeToCamel,
} from '@/_metronic/assets/ts/_utils/index';
import { IFunction } from '@/models';

export interface StickyOptions {
  animation: boolean;
  animationClass: string;
  animationSpeed: string;
  offset: number;
  reverse: boolean;
}

const defaultStickyOptions: StickyOptions = {
  animation: true,
  animationClass: 'animation-slide-in-down',
  animationSpeed: '0.3s',
  offset: 200,
  reverse: false,
};

class StickyComponent {
  element: HTMLElement;
  options: StickyOptions;
  instanceUid: string;
  instanceName: string | null = '';
  attributeName: string;
  eventTriggerState: boolean;
  lastScrollTop: number;

  constructor(_element: HTMLElement, options: StickyOptions) {
    this.element = _element;
    this.options = Object.assign(defaultStickyOptions, options);
    this.instanceUid = getUniqueIdWithPrefix('sticky');
    this.instanceName = this.element.getAttribute('data-kt-sticky-name');
    this.attributeName = 'data-kt-sticky-' + this.instanceName;
    this.eventTriggerState = true;
    this.lastScrollTop = 0;

    // Event Handlers
    window.addEventListener('scroll', this._scroll);

    // Initial Launch
    this._scroll();

    DataUtil.set(this.element, 'sticky', this);
  }

  private _scroll = () => {
    const offset = this._getOption('offset');
    const reverse = this._getOption('reverse');

    // Exit if false
    if (offset === false) {
      return;
    }

    let offsetNum = 0;
    if (typeof offset === 'string') {
      offsetNum = parseInt(offset);
    }

    const st = getScrollTop();

    // Reverse scroll mode
    if (reverse === true) {
      // Release on reverse scroll mode
      if (st > offsetNum && this.lastScrollTop < st) {
        if (document.body.hasAttribute(this.attributeName) === false) {
          this._enable();
          document.body.setAttribute(this.attributeName, 'on');
        }

        if (this.eventTriggerState === true) {
          EventHandlerUtil.trigger(this.element, 'kt.sticky.on');
          EventHandlerUtil.trigger(this.element, 'kt.sticky.change');

          this.eventTriggerState = false;
        }
      } else {
        // Back scroll mode
        if (document.body.hasAttribute(this.attributeName)) {
          this._disable();
          document.body.removeAttribute(this.attributeName);
        }

        if (this.eventTriggerState === false) {
          EventHandlerUtil.trigger(this.element, 'kt.sticky.off');
          EventHandlerUtil.trigger(this.element, 'kt.sticky.change');

          this.eventTriggerState = true;
        }
      }

      this.lastScrollTop = st;

      return;
    }

    // Classic scroll mode
    if (st > offsetNum) {
      if (document.body.hasAttribute(this.attributeName) === false) {
        this._enable();
        document.body.setAttribute(this.attributeName, 'on');
      }

      if (this.eventTriggerState === true) {
        EventHandlerUtil.trigger(this.element, 'kt.sticky.on');
        EventHandlerUtil.trigger(this.element, 'kt.sticky.change');
        this.eventTriggerState = false;
      }
    } else {
      // back scroll mode
      if (document.body.hasAttribute(this.attributeName) === true) {
        this._disable();
        document.body.removeAttribute(this.attributeName);
      }

      if (this.eventTriggerState === false) {
        EventHandlerUtil.trigger(this.element, 'kt.sticky.off');
        EventHandlerUtil.trigger(this.element, 'kt.sticky.change');
        this.eventTriggerState = true;
      }
    }
  };

  private _getOption = (name: string) => {
    const dataStickyAttr = 'data-kt-sticky-' + name;
    if (this.element.hasAttribute(dataStickyAttr) === true) {
      const attrValueInStr = this.element.getAttribute(dataStickyAttr);
      const attrValue = getAttributeValueByBreakpoint(attrValueInStr || '');
      if (attrValue !== null && String(attrValue) === 'true') {
        return true;
      } else if (attrValue !== null && String(attrValue) === 'false') {
        return false;
      }

      return attrValue;
    }
    const optionName = stringSnakeToCamel(name);
    const option = getObjectPropertyValueByKey(this.options, optionName);
    if (option) {
      return getAttributeValueByBreakpoint(option);
    }
  };

  private _disable = () => {
    ElementStyleUtil.remove(this.element, 'top');
    ElementStyleUtil.remove(this.element, 'width');
    ElementStyleUtil.remove(this.element, 'left');
    ElementStyleUtil.remove(this.element, 'right');
    ElementStyleUtil.remove(this.element, 'z-index');
    ElementStyleUtil.remove(this.element, 'position');
  };

  private _enable = (update = false) => {
    const top = this._getOption('top');
    const left = this._getOption('left');

    // const right = this._getOption("right");
    let width = this._getOption('width');
    const zindex = this._getOption('zindex');

    if (update !== true && this._getOption('animation') === true) {
      ElementStyleUtil.set(this.element, 'animationDuration', this._getOption('animationSpeed'));
      ElementAnimateUtil.animateClass(
        this.element,
        'animation ' + this._getOption('animationClass')
      );
    }

    if (zindex !== null) {
      ElementStyleUtil.set(this.element, 'z-index', zindex);
      ElementStyleUtil.set(this.element, 'position', 'fixed');
    }

    if (top !== null) {
      ElementStyleUtil.set(this.element, 'top', top);
    }

    if (width !== null && width !== undefined) {
      const widthTarget = getObjectPropertyValueByKey(width, 'target');
      if (widthTarget) {
        const targetElement = document.querySelector(widthTarget);
        if (targetElement) {
          width = getCSS(targetElement, 'width');
        }
      }
      ElementStyleUtil.set(this.element, 'width', width);
    }

    if (left !== null) {
      if (String(left).toLowerCase() === 'auto') {
        const offsetLeft = getElementOffset(this.element).left;

        if (offsetLeft > 0) {
          ElementStyleUtil.set(this.element, 'left', String(offsetLeft) + 'px');
        }
      }
    }
  };

  public update = () => {
    if (document.body.hasAttribute(this.attributeName) === true) {
      this._disable();
      document.body.removeAttribute(this.attributeName);
      this._enable(true);
      document.body.setAttribute(this.attributeName, 'on');
    }
  };

  // Event API
  public on = (name: string, callBack: IFunction) => {
    return EventHandlerUtil.on(this.element, name, callBack);
  };

  public one = (name: string, callback: IFunction) => {
    return EventHandlerUtil.one(this.element, name, callback);
  };

  public off = (name: string, handlerId: string) => {
    return EventHandlerUtil.off(this.element, name, handlerId);
  };

  public trigger = (name: string) => {
    return EventHandlerUtil.trigger(this.element, name);
  };

  // Static methods
  public static hasInstace(element: HTMLElement) {
    return DataUtil.has(element, 'sticky');
  }

  public static getInstance(element: HTMLElement): StickyComponent | undefined {
    if (element !== null && StickyComponent.hasInstace(element)) {
      const data = DataUtil.get(element, 'sticky');
      if (data) {
        return data as StickyComponent;
      }
    }
  }

  // Create Instances
  public static createInstances(selector: string) {
    const elements = document.body.querySelectorAll(selector);
    elements.forEach((element) => {
      const item = element as HTMLElement;
      let sticky = StickyComponent.getInstance(item);
      if (!sticky) {
        sticky = new StickyComponent(item, defaultStickyOptions);
      }
    });
  }

  public static createInsance = (
    selector: string,
    options: StickyOptions = defaultStickyOptions
  ): StickyComponent | undefined => {
    const element = document.body.querySelector(selector);
    if (!element) {
      return;
    }
    const item = element as HTMLElement;
    let sticky = StickyComponent.getInstance(item);
    if (!sticky) {
      sticky = new StickyComponent(item, options);
    }

    return sticky;
  };

  public static bootstrap(attr = '[data-kt-sticky="true"]') {
    StickyComponent.createInstances(attr);
  }

  public static reInitialization(attr = '[data-kt-sticky="true"]') {
    StickyComponent.createInstances(attr);
  }
}

export { defaultStickyOptions, StickyComponent };
