import React from 'react';

import _ from 'lodash';

const Display = ({ processed, loading }) => {
    return (
        <div className="container d-flex justify-content-around flex-row image-crop">
            {loading ? <h1>Processing...</h1>
                :
                <div>
                    <h2 className="text-center">Processed Results:</h2>
                    {_.chain(processed).get(['eager'], []).map((val, index) =>
                        <div className="d-flex flex-row" key={index}>
                            <img style={{ width: '200px', margin: '20px' }}
                                alt="cropped_images"
                                src={val.url}
                            />
                        </div>
                    ).value()}
                </div>
            }
        </div>
    );
}

export default Display;