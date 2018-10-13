import BaseEl from './BaseEl';
import {writeToLogger} from '../logger';

/**
 * Extend BaseEl
 * - lazyLoading
 */
class ImageEl extends BaseEl {
  constructor({lazyLoadSrcArr, width, height, adjustSizeToOriginalImg, hideOnError}) {
    super({type: 'img'});
    this.hasBeenLoaded = false;

    this.lazyLoadSrcArr = lazyLoadSrcArr;
    this.adjustSizeToOriginalImg = adjustSizeToOriginalImg;
    this.defaultWidth = width;
    this.defaultHeight = height;
    this.hideOnError = hideOnError;

    this.checkLazyLoad = this.checkLazyLoad.bind(this);
    this.handleOnSrcError = this.handleOnSrcError.bind(this);

    document.addEventListener("scroll", this.checkLazyLoad);
    window.addEventListener("resize", this.checkLazyLoad);
    window.addEventListener("orientationchange", this.checkLazyLoad);
  }

  getPositionOfClosestSize() {
    return this.lazyLoadSrcArr.reduce((acc, v, i) => {
      if (v.width < this.defaultWidth && v.height < this.defaultHeight && acc.width < v.width && acc.height < v.height) {
        acc = {
          width: v.width,
          height: v.height,
          position: i
        }
      }
      return acc;
    }, {with: 0, height: 0}).position || 0;
  }

  /**
   * Check if el is in viewport, if its in viewport then remove DOM listeners
   */
  checkLazyLoad() {
    const lazyImage = this.el;
    if ((!this.hasBeenLoaded &&
        lazyImage.getBoundingClientRect().top <= window.innerHeight &&
        lazyImage.getBoundingClientRect().bottom >= 0) &&
      getComputedStyle(lazyImage).display !== "none") {
      this.updateSrc();
    }
  }

  /**
   * Handle onError (src error)
   * @param ev
   */
  handleOnSrcError(ev){
    const key = writeToLogger({
      msg: `unable to load img : ${ev.srcElement.currentSrc}`
    });

    if (this.hideOnError) {
      this.hideOnError.getElAsHTML().style.display = 'none';
    } else {
      this.setAttr({name: 'style', value: 'display:none;'}).notifyErrorToParent({
        type: 'srcError'
      });
    }

    return key;
  }

  updateSrc() {
    let position = 0;
    if (this.lazyLoadSrcArr.length > 1) {
      position = this.getPositionOfClosestSize()
    }

    const imgData = this.lazyLoadSrcArr[position];
    const width = this.lazyLoadSrcArr[position].width && this.adjustSizeToOriginalImg ? `${this.lazyLoadSrcArr[position].width}px` : this.defaultWidth;
    const height = this.lazyLoadSrcArr[position].height && this.adjustSizeToOriginalImg ? `${this.lazyLoadSrcArr[position].height}px` : this.defaultHeight;

    this.el.onerror = this.handleOnSrcError;

    this.setAttr({name: 'src', value: imgData.url});

    if (this.adjustSizeToOriginalImg) {
      this.setAttr({name: 'style', value: `width:${width }; height:${height};`});
    }

    this.hasBeenLoaded = true;

    document.removeEventListener("scroll", this.checkLazyLoad);
    window.removeEventListener("resize", this.checkLazyLoad);
    window.removeEventListener("orientationchange", this.checkLazyLoad);
    return this;
  }

  /**
   * Notify all children that they are attached to the DOM
   * Once El in the DOM we can check LazyLoading.
   */
  notifyAttachToDom(...data) {
    super.notifyAttachToDom(data);
    this.checkLazyLoad();

    return this;
  }

  /**
   * Load all content without lazy-load
   */
  loadAllContent() {
    super.loadAllContent();
    this.updateSrc();
  }
}

export default ImageEl;