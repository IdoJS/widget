/**
 * Easy creating of DOM element,
 * - save el children.
 * - notify children when they are attached to the DOM
 */

class BaseEl {
  constructor({type}) {
    this.el = document.createElement(type || 'div');
    this.isAttachedToDom = false;
    this.children = [];
    this.parent = null;
    this.on = null;
    this.notifyError = this.notifyError.bind(this);
    return this;
  }

  /**
   * Attach the element to specific DOM element
   * Once it attached it notify to all the children that they are attached to the DOM
   * @param parentId <string>
   * @returns {BaseEl}
   */
  attachToDOM(parentId) {
    if (!parentId) {
      console.warn('Widget Error - pass parentEl');
    } else {
      const parentEl = document.getElementById(parentId);
      parentEl.appendChild(this.el);
      this.notifyAttachToDom();
    }
    return this;
  }

  /**
   * Attach children to the element,
   * if element alreay attached to DOM then we notify the children.
   * @param children <Array>
   * @returns {BaseEl}
   */
  attachChildren(children) {
    children.length > 0 && children.forEach(child => {
      if (child instanceof BaseEl) {
        this.children.push(child);
        this.el.appendChild(child.el);

        this.isAttachedToDom && child.notifyAttachToDom(this);
      }
    });

    return this;
  }

  /**
   * Add attributes to the element
   * @param name
   * @param value
   * @returns {BaseEl}
   */
  setAttr({name, value}) {
    this.el.setAttribute(name, value);
    return this;
  }

  /**
   * Add text to the element
   * @param text
   * @returns {BaseEl}
   */
  setText(text) {
    this.el.innerText = text;
    return this;
  }

  /**
   * Notify all children that they are attached to the DOM
   */
  notifyAttachToDom(parent) {
    this.parent = parent;
    this.isAttachedToDom = true;
    this.children && this.children.forEach(child => {
      child.notifyAttachToDom(this);
    });
  }

  /**
   * Notify parent on error
   * @param data
   * @returns {BaseEl}
   */
  notifyErrorToParent(data) {
    if (this.parent) {
      this.parent.notifyError(data);
    }
    return this;
  }

  /**
   * Notify Host on Error
   * @param type
   * @param width
   * @param height
   * @returns {BaseEl}
   */
  notifyError(data) {
    if (this.on) {
      this.on(data)
    } else {
      if (this.parent) {
        this.notifyErrorToParent(data);
      }
    }
    return this;
  }

  /**
   * Load all content without lazy-load
   */
  loadAllContent() {
    this.children && this.children.forEach(child => {
      child.loadAllContent();
    });
  }

  /**
   * get HTML element
   * @returns {Element|*}
   */
  getElAsHTML() {
    return this.el;
  }

  /**
   * save callback to notify host on events
   * @param callback
   */
  event(callback) {
    this.on = callback
  }
}

export default BaseEl;