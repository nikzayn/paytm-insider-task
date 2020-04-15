import React, { Component } from 'react';

import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

import Popup from '../Popup';


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

    validate = (prop, status) => {
        const meta = prop.meta;
        console.log(prop);
        const width = 1024, height = 1024;
        if (meta.width !== width && meta.width !== height) {
            console.log("Wrong size");
            return "Wrong size. Suppored 1024X1024 size"
        }
        return false;
    }

    handleChangeStatus = ({ meta, remove }, status) => {
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
                    validate={this.validate}
                    maxFiles={1}
                    disabled={false}
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