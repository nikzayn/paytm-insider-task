import React from 'react';
import _ from 'lodash';

const Display = ({ processed }) => {
    return (
        <div className="container d-flex justify-content-around flex-row image-crop">
            <h2 className="text-center">Processed Results:</h2>
            {_.chain(processed).get(['eager'], []).map((val, index) =>
                <div className="d-flex flex-column" key={index}>
                    <img style={{ width: '200px', margin: '20px' }} alt="horizontal" src={val.url} />
                </div>
            ).value()}
        </div>
    );
}

export default Display;