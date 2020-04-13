import React from 'react';

import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

const Upload = () => {
    const getUploadParams = () => {
        return { url: 'http://localhost:8080/upload' }
    }

    const handleChangeStatus = ({ meta, remove }, status) => {
        if (status === 'headers_received') {
            console.log(`${meta.name} uploaded!`)
            remove()
        } else if (status === 'aborted') {
            console.log(`${meta.name}, upload failed...`)
        }
    }

    return (
        <div>
            <Dropzone
                getUploadParams={getUploadParams}
                onChangeStatus={handleChangeStatus}
                maxFiles={1}
                accept='.jpg'
                multiple={false}
                canCancel={false}
                inputContent="Drop A File"
                styles={{
                    dropzone: { width: 400, height: 200, overflow: 'hidden' },
                    dropzoneActive: { borderColor: 'green' },
                }}
            />
        </div>
    );
}

export default Upload;