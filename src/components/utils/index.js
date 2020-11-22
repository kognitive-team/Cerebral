import React from 'react'
import moment from 'moment';


export const formatDate = (d, format) => {
    //this function formats date in mm/dd/yyyy
    return moment(d).format(format);
}


