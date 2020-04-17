import React, { PureComponent, Fragment } from 'react';
import _ from 'lodash';

import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'

import Crop from '../Crop/Crop';
import Display from '../Display/Display';

class Upload extends PureComponent {

    state = {
        src: null,
        currentIndex: 0,
        processedData: [],
        submittoggle: false,
        crop: [
            {
                name: 'Horizontal',
                index: 0,
                unit: '%',
                width: 755,
                height: 450,
                x: 25,
                y: 25,
                aspect: 755 / 450
            },
            {
                name: 'Vertical',
                index: 1,
                unit: '%',
                width: 365,
                height: 450,
                x: 25,
                y: 25,
                aspect: 365 / 450
            },
            {
                name: 'Small',
                index: 2,
                unit: '%',
                width: 365,
                height: 212,
                x: 25,
                y: 25,
                aspect: 365 / 212
            },
            {
                name: 'Gallery',
                index: 3,
                unit: '%',
                width: 380,
                height: 380,
                x: 25,
                y: 25,
                aspect: 380 / 380
            }
        ],
    }

    getUploadParams = (prop) => {
        const size = prop.meta.size;
        if (size > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                this.setState({ src: reader.result, file: prop.file })
            );
            reader.readAsDataURL(prop.file);
        }
        return false;
    }

    validate = (prop) => {
        const width = 1024, height = 1024;
        const meta = prop.meta;
        if (meta.width !== width && meta.width !== height) {
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


    handleSubmit = () => {
        var formData = new FormData();
        formData.append("file", this.state.file);
        formData.append("dimensions", JSON.stringify(this.state.crop));

        var url = "http://localhost:8080/upload";

        var request = new XMLHttpRequest();
        request.onreadystatechange = () => {
            if (request.readyState === 4) {

                const data = JSON.parse(request.response);
                const result = Object.assign({}, this.state.processedData, data);
                this.setState({ processedData: result, submittoggle: true })
            }
        }

        request.open('GET', url, true);
        request.send('');

        request.open("POST", `${url}`);
        request.send(formData);

    }

    cropChanged = (cropI) => {
        const index = this.state.currentIndex <= 3 ? this.state.currentIndex : 3;
        const newCrop = this.state.crop.map(item => item);

        const elems = ["height", "width", "x", "y"];
        for (let prop of elems) {
            if (newCrop[index][prop] != cropI[prop]) {
                newCrop[index] = cropI;
                this.setState({ crop: newCrop })
                break;
            }
        }
    }

    submitPreview = () => {
        this.setState({
            currentIndex: this.state.currentIndex + 1
        })
    }


    render() {
        const { src, crop, currentIndex, processedData } = this.state;
        return (
            <Fragment>
                <Dropzone
                    getUploadParams={this.getUploadParams}
                    onChangeStatus={this.handleChangeStatus}
                    validate={this.validate}
                    maxFiles={1}
                    disabled={false}
                    accept='image/*'
                    multiple={false}
                    inputContent="Drop an Image"
                    styles={{
                        dropzone: { width: 400, height: 200, marginTop: '2em', overflow: 'hidden' },
                        dropzoneActive: { borderColor: 'green' },
                    }}
                />
                <div className="m-5">
                    {src && this.state.currentIndex < 3 && (<button className="btn btn-primary m-2" onClick={this.submitPreview}>Next</button>)}
                    {src && (<button className="btn btn-primary m-2" onClick={this.handleSubmit}>Submit</button>)}

                </div>
                <div className="container">

                    <div>
                        <div className="container d-flex justify-content-around flex-row image-crop">
                            {src && _.map(this.state.crop, (item, index) => (
                                <div className="d-flex flex-column" key={index}>
                                    <h3>{item.name}</h3>
                                    <img
                                        style={{ width: '200px', marginBottom: '20px' }}
                                        src={item.croppedImageUrl}
                                    />
                                </div>
                            ))}
                        </div>
                        {src && (
                            <Crop
                                src={src}
                                crop={crop[currentIndex <= 3 ? currentIndex : 3]}
                                cropChanged={this.cropChanged}
                            />
                        )}
                    </div>
                    <div>
                        {src && (
                            <Display processed={processedData} />
                        )}
                    </div>

                </div>
            </Fragment>
        );
    }
}



export default Upload;