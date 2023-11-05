import React from 'react'
import { useState, useEffect } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)


function ImageUpload({ className, name = 'Image', files, setFiles }) {
  const [Image, setImage] = useState();
  useEffect(() => {
    if (typeof files != 'string') {
      setImage(files)
    }
  }, [files, Image])

  return (
    <div className='w-full'>
      <label className='font-semibold'>{name} : <span className='text-red-600 font-semibold'>*</span></label>
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={false}
        name="files"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
    </div>
  )
}

export default ImageUpload