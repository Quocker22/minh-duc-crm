import { Editor } from '@tinymce/tinymce-react';
import { EventHandler } from '@tinymce/tinymce-react/lib/cjs/main/ts/Events';
import clsx from 'clsx';
import { isNil } from 'lodash-es';
import { ReactNode, useId, useMemo } from 'react';
import { Form } from 'react-bootstrap';
import { Control, Path, useController } from 'react-hook-form';
import { Events } from 'tinymce';

import { useThemeMode } from '@/_metronic/partials';

type EEventHandler<K extends keyof Events.EditorEventMap> = EventHandler<Events.EditorEventMap[K]>;

type IProps<IForm extends object> = {
  readonly name: Path<IForm>;
  readonly branding?: boolean;
  readonly className?: string;
  readonly control?: Control<IForm, object>;
  readonly disabled?: boolean;
  readonly errorClass?: string;
  readonly groupClass?: string;
  readonly height?: number;
  readonly hint?: ReactNode;
  readonly hintClass?: string;
  readonly inline?: boolean;
  readonly label?: ReactNode;
  readonly labelClass?: string;
  readonly menubar?: string | boolean;
  readonly onBlur?: EEventHandler<'blur'>;
  readonly onChange?: (value: string) => void;
  readonly onClick?: EEventHandler<'click'>;
  readonly onFocus?: EEventHandler<'focus'>;
  readonly required?: boolean;
  readonly value?: string;
};

const RichTextEditor = <IForm extends object>(props: IProps<IForm>) => {
  const controlId = useId();
  const { field, formState } = props.control
    ? useController({ control: props.control, name: props.name })
    : { field: undefined, formState: undefined };
  const errorMessage = (formState?.errors[props.name]?.message as string) || '';

  const value = useMemo(
    () => (!isNil(field?.value) ? field?.value : props.value),
    [field?.value, props.value]
  );

  const { mode } = useThemeMode();
  const isSmallScreen = useMemo(() => window.matchMedia('(max-width: 1023.5px)').matches, []);

  return (
    <Form.Group className={clsx(props.groupClass)} controlId={controlId}>
      <Form.Label
        className={clsx(!props.label && 'd-none', props.required && 'required', props.labelClass)}
      >
        {props.label}
      </Form.Label>

      <div className={clsx(!!errorMessage && 'is-invalid', props.className)}>
        <Editor
          {...field}
          apiKey={key}
          disabled={props.disabled}
          init={{
            autosave_ask_before_unload: true,
            autosave_interval: '30s',
            autosave_prefix: '{path}{query}-{id}-',
            autosave_restore_when_empty: false,
            autosave_retention: '2m',
            branding: props.branding,
            content_css: mode === 'dark' ? 'dark' : 'default',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
            contextmenu: 'link image table',
            editimage_cors_hosts: ['picsum.photos'],
            file_picker_callback: (callback, value, meta) => {
              /* Provide file and text for the link dialog */
              if (meta.filetype === 'file') {
                callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
              }

              /* Provide image and alt text for the image dialog */
              if (meta.filetype === 'image') {
                callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
              }

              /* Provide alternative source and posted for the media dialog */
              if (meta.filetype === 'media') {
                callback('movie.mp4', {
                  poster: 'https://www.google.com/logos/google.jpg',
                  source2: 'alt.ogg',
                });
              }
            },
            height: props.height,
            image_advtab: true,
            image_caption: true,
            image_class_list: [
              { title: 'None', value: '' },
              { title: 'Some class', value: 'class-name' },
            ],
            image_list: [
              { title: 'My page 1', value: 'https://www.tiny.cloud' },
              { title: 'My page 2', value: 'http://www.moxiecode.com' },
            ],
            importcss_append: true,
            link_list: [
              { title: 'My page 1', value: 'https://www.tiny.cloud' },
              { title: 'My page 2', value: 'http://www.moxiecode.com' },
            ],
            menubar: props.menubar,
            noneditable_class: 'mceNonEditable',
            plugins:
              'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
            quickbars_selection_toolbar:
              'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
            skin: mode === 'dark' ? 'oxide-dark' : 'oxide',
            template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
            template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
            templates: [
              {
                content:
                  '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
                description: 'creates a new table',
                title: 'New Table',
              },
              {
                content: 'Once upon a time...',
                description: 'A cure for writers block',
                title: 'Starting my story',
              },
              {
                content:
                  '<div class="mceTmpl"><span class="cdate">cdate</span><br><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
                description: 'New List with dates',
                title: 'New list with dates',
              },
            ],
            toolbar:
              'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
            toolbar_mode: 'sliding',
            toolbar_sticky: true,
            toolbar_sticky_offset: isSmallScreen ? 102 : 108,
          }}
          inline={props.inline}
          onBlur={(a, editor) => {
            field?.onBlur();
            props.onBlur?.(a, editor);
          }}
          onChange={undefined} // duplicate field on change => error
          onClick={props.onClick}
          onEditorChange={(newValue) => {
            field?.onChange(newValue);
            props.onChange?.(newValue);
          }}
          onFocus={props.onFocus}
          textareaName={props.name}
          value={value}
        />
      </div>

      <Form.Text className={clsx('text-muted', props.hintClass)}>{props.hint}</Form.Text>
      <Form.Control.Feedback className={clsx(props.errorClass)} type="invalid">
        {errorMessage}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

RichTextEditor.defaultProps = {
  branding: false,
};

export { RichTextEditor };

const key = import.meta.env.VITE_TINYMCE_API_KEY;
