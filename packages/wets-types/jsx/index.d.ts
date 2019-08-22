/// <reference path="./elements.d.ts" />

declare global {
  namespace JSX {
    interface Element {}

    interface ElementClass {
      render(): JSX.Element;
    }

    interface IntrinsicElements {
      block: WxmlViewElementProps;
      view: WxmlViewElementProps;
      'scroll-view': WxmlScrollViewElementProps;
      swiper: WxmlSwiperElementProps;
      'swiper-item': WxmlSwiperItemElementProps;
      'movable-view': WxmlMovableViewElementProps;
      'movable-area': WxmlMovableAreaElementProps;
      'cover-view': WxmlCoverViewElementProps;
      'cover-image': WxmlCoverImageElementProps;
      icon: WxmlIconElementProps;
      text: WxmlTextElementProps;
      'rich-text': WxmlRichTextElementProps;
      progress: WxmlProgressElementProps;
      button: WxmlButtonElementProps;
      checkbox: WxmlCheckboxElementProps;
      'checkbox-group': WxmlCheckboxGroupElementProps;
      form: WxmlFormElementProps;
      input: WxmlInputElementProps;
      label: WxmlLabelElementProps;
      picker: WxmlPickerElementProps;
      'picker-view': WxmlPickerViewElementProps;
      'picker-view-column': WxmlViewElementProps;
      radio: WxmlRadioElementProps;
      'radio-group': WxmlRadioGroupElementProps;
      slider: WxmlSliderElementProps;
      switch: WxmlSwitchElementProps;
      textarea: WxmlTextareaElementProps;
      navigator: WxmlNavigatorElementProps;
      audio: WxmlAudioElementProps;
      image: WxmlImageElementProps;
      video: WxmlVideoElementProps;
      camera: WxmlCameraElementProps;
      map: WxmlMapElementProps;
      canvas: WxmlCanvasElementProps;
      'open-data': WxmlOpenDataElementProps;
      'web-view': WxmlWebViewElementProps;
      'contact-button': WxmlContactButtonElementProps;
    }
  }
}

export {};
