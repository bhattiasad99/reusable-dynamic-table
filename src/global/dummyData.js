import {Button} from '@mui/material'

function getFullName(params) {
    return `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'lastName') || ''
    }`;
}

const getNameAndAge = params => {
    return `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'age') || ''
    }`;
}


export const materialHeadings = [
    // field defines the key to data
    // headerName defines the label of the column
    // 0 < flex < infinite defines the relative (responsive) width
    // if you want to hide a column just do hide=true, 
    // if you want a combination of columns, use the valueGetter prop
    // use above functions as references
    // for editing, set editable=true
    {
        field: 'id',
        headerName: 'ID',
        // flex: 0.5,
    },
    { 
        field: 'firstName',
        headerName: 'First Name',
        description: 'The first Name of the person',
        // flex: 1,
        // hide: true,
    },
    {
        field: 'lastName',
        headerName: 'Last Name',
        // flex: 1,
        editable: true
    },
    {
        field: 'age', 
        headerName: 'Age',
        // flex: 1,
    },
    {
        field: 'fullName',
        headerName: 'Full Name',
        valueGetter: getFullName,
        // flex: 1.3,
    },
    {
        field: 'nameAndAge',
        headerName: 'Name And Age',
        valueGetter: getNameAndAge,
        // flex: 1.3,
    }
]
// Toggle between header groups format 
export const headings = [
    /* WITHOUT HEADER GROUPS */
    {
        Header: 'ID',
        accessor: 'id',
        
    },
    {
        Header: 'First Name',
        accessor: 'firstName',
        
        
    },
    {
        Header: 'Last Name',
        accessor: 'lastName',
        
    },
    {
        Header: 'Age',
        accessor: 'age',
        
    },

    /* WITH HEADER GROUPS */
    // {
    //     Header: 'First Column',
    //     columns: [
    //         {
    //             Header: 'ID',
    //             accessor: 'id',
    //         },
    //         {
    //             Header: 'First Name',
    //             accessor: 'firstName',
    //         },
    //         {
    //             Header: 'Last Name',
    //             accessor: 'lastName',
    //         },
    //         {
    //             Header: 'Age',
    //             accessor: 'age',
    //         },
    //     ]
    // }
]

export const data = [
    {
        id:'asdasdas',
        firstName: 'asad',
        lastName: 'zubair',
        age: '28',
    },
    {
        id:'fdsfdsf',
        firstName: 'nimrah',
        lastName: 'asad',
        age: '25',
    },
    {
        id:2,
        firstName: 'asad',
        lastName: 'zubair',
        age: '28',
    },
    {
        id:3,
        firstName: 'nimrah',
        lastName: 'asad',
        age: '25',
    },
    {
        id:4,
        firstName: 'asad',
        lastName: 'zubair',
        age: '28',
    },
    {
        id:5,
        firstName: 'nimrah',
        lastName: 'asad',
        age: '25',
    },
    {
        id:6,
        firstName: 'asad',
        lastName: 'zubair',
        age: '28',
    },
    {
        id:7,
        firstName: 'nimrah',
        lastName: 'asad',
        age: '25',
    },
    {
        id:8,
        firstName: 'asad',
        lastName: 'zubair',
        age: '28',
    },
    {
        id:9,
        firstName: 'nimrah',
        lastName: 'asad',
        age: '25',
    },
    {
        id:10,
        firstName: 'asad',
        lastName: 'zubair',
        age: '28',
    },
    {
        id:11,
        firstName: 'nimrah',
        lastName: 'asad',
        age: '25',
    },
    {
        id:12,
        firstName: 'asad',
        lastName: 'zubair',
        age: '28',
    },
    {
        id:13,
        firstName: 'nimrah',
        lastName: 'asad',
        age: '25',
    },
    {
        id:14,
        firstName: 'asad',
        lastName: 'zubair',
        age: '28',
    },
    {
        id:15,
        firstName: 'nimrah',
        lastName: 'asad',
        age: '25',
    },
    {
        id:16,
        firstName: 'asad',
        lastName: 'zubair',
        age: '28',
    },
    {
        id:17,
        firstName: 'nimrah',
        lastName: 'asad',
        age: '25',
    },
    {
        id:18,
        firstName: 'asad',
        lastName: 'zubair',
        age: '28',
    },
    {
        id:19,
        firstName: 'nimrah',
        lastName: 'asad',
        age: '25',
    },
    {
        id:20,
        firstName: 'asad',
        lastName: 'zubair',
        age: '28',
    },
    {
        id:21,
        firstName: 'nimrah',
        lastName: 'asad',
        age: '25',
    },
    {
        id:22,
        firstName: 'asad',
        lastName: 'zubair',
        age: '28',
    },
    {
        id:23,
        firstName: 'nimrah',
        lastName: 'asad',
        age: '25',
    },
    {
        id:24,
        firstName: 'asad',
        lastName: 'zubair',
        age: '28',
    },
    {
        id:25,
        firstName: 'nimrah',
        lastName: 'asad',
        age: '25',
    },
    {
        id:26,
        firstName: 'asad',
        lastName: 'zubair',
        age: '28',
    },
    {
        id:27,
        firstName: 'nimrah',
        lastName: 'asad',
        age: '25',
    },
    {
        id:28,
        firstName: 'asad',
        lastName: 'zubair',
        age: '28',
    },
    {
        id:29,
        firstName: 'nimrah',
        lastName: 'asad',
        age: '25',
    },
]