export const editorToolbarSettings = {
  fontFamily: {
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
  },
  fontSize: {
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
  },
  image: {
    alignmentEnabled: true,
    alt: { mandatory: false, present: false },
    className: undefined,
    component: undefined,
    defaultSize: {
      height: 'auto',
      width: 'auto',
    },
    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
    popupClassName: undefined,
    previewImage: false,
    uploadCallback: undefined,
    uploadEnabled: true,
    urlEnabled: true,
  },
  inline: {
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    inDropdown: false,
    options: ['bold', 'italic', 'underline', 'strikethrough'],
  },

  link: {
    className: undefined,
    component: undefined,
    defaultTargetOption: '_self',
    dropdownClassName: undefined,
    inDropdown: false,
    link: { className: undefined },
    linkCallback: undefined,
    options: ['link', 'unlink'],
    popupClassName: undefined,
    showOpenOptionOnHover: true,
    unlink: { className: undefined },
  },
  options: ['inline', 'fontSize', 'fontFamily', 'link', 'image'],
};
