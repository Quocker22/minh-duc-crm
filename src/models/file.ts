export interface FileUploadModel {
  content_type?: string;
  created_at?: string;
  errors?: { code: string; message: string }[];
  file?: File;
  id?: string;
  name?: string;
  path?: string;
  progress?: number;
  size?: number;
  type?: string;
  url?: string;
}
