import React from 'react';
import { useParams } from 'react-router';

const BillDetail = () => {
    const {id} = useParams();
    console.log({id});
    return (
        <div>
            <p>BillDetail id: {id}</p>
        </div>
    );
};

export default BillDetail;