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
    this.notifyError = this.notifyError.bind(this);
    return this;
  }

  /**
   * Attach the element to specific DOM element
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
      this.children.push(child);
      this.el.appendChild(child.el);

      this.isAttachedToDom && child.notifyAttachToDom(this);
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

  notifyErrorToParent(data) {
    if (this.parent) {
      this.parent[0].notifyError(data);
    }
    return this;
  }

  notifyError({type, width, height}) {
    switch (type) {
      case 'img':
        this.setAttr({name: 'style', value: `border:1px solid black; width:${width}; height:${height}; display:flex; align-items: center; justify-content: center;`});
        break;
    }
    return this;
  }

  /**
   * Load all content without lazy-load
   */
  loadAllContent(){
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

}

export default BaseEl;