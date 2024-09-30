import { axiosClient } from '@/api/axiosClient';
import { FileUploadModel, INetworkResponse } from '@/models';

const uploadAPI = {
  upload(
    formData: FormData,
    onUpload?: (progressEvent: ProgressEvent) => void,
    onDownload?: (progressEvent: ProgressEvent) => void,
    typeUpload?: 'avatar' | 'file' | 'image'
  ): Promise<INetworkResponse<FileUploadModel>> {
    let url = '';
    if (typeUpload === 'avatar' || typeUpload === 'image') {
      url = 'https://minhduc-stag.wehatech.com/upload/image';
    } else if (typeUpload === 'file') {
      url = 'https://minhduc-stag.wehatech.com/upload/file';
    }
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
      onDownloadProgress: onDownload,
      onUploadProgress: onUpload,
    };

    return axiosClient.post(url, formData, config);
  },
};

export { uploadAPI };
