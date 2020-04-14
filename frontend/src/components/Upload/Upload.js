import React, { Component } from 'react';

import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

import Popup from '../Popup/Popup';


class Upload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toggle: false,
        }
    }

    toggleChange = (val) => {
        this.setState({
            toggle: !this.state.toggle,
            val,
        })
    }

    getUploadParams = () => {
        return { url: 'http://localhost:8080/upload' }
    }

    handleChangeStatus = ({ meta, remove }, status) => {
        // if (status !== 'headers_received') {
        //     console.log("Dialog");
        // }
        if (status === 'headers_received') {
            console.log(`${meta.name} uploaded!`)
            remove()


        } else if (status === 'aborted') {
            console.log(`${meta.name}, upload failed...`)
        }
    }


    render() {
        return (
            <div>
                <button onClick={() => { this.toggleChange() }}>Popup</button>
                {this.state.toggle ? <Popup toggle={this.state.toggle} toggleChange={this.toggleChange} /> : null}
                <Dropzone
                    getUploadParams={this.getUploadParams}
                    onChangeStatus={this.handleChangeStatus}
                    maxFiles={1}
                    accept='image/*'
                    multiple={false}
                    canCancel={false}
                    inputContent="Drop an Image"
                    styles={{
                        dropzone: { width: 400, height: 200, marginTop: '2em', overflow: 'hidden' },
                        dropzoneActive: { borderColor: 'green' },
                    }}
                />
            </div>
        );
    }
}



export default Upload;