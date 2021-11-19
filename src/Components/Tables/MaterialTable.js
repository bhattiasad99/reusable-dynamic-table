import React from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const label = { inputProps: { 'aria-label': 'Switch demo' } };
const MaterialTable = ({config}) => {
    const {rows, includesToolbarToggle, defaultShowToolbar, getEditedData, selectable, getMultipleSelected } = config.materialTable
    const [data, setData] = React.useState(rows)
    const [showToolbar, setShowToolbar] = React.useState(defaultShowToolbar)
    const showToolbarHandler = e => {
        setShowToolbar(!showToolbar)
    }
    const [editRowsModel, setEditRowsModel] = React.useState({});
    const [selectionModel, setSelectionModel] = React.useState([])
    const handleEditRowsModelChange = React.useCallback((model) => {
        setEditRowsModel(model);
    }, []);
    const [pageSize, setPageSize] = React.useState(10);
    React.useMemo(() => {
        let temp = [...data]
        for (let id in editRowsModel) {
            let changedRow = temp.find(row => {
                return row.id == id
            })
            const changedRowID = temp.findIndex(row => {
                return row.id == id
            })
            for (let key in editRowsModel[id]) {
                changedRow = {
                    ...changedRow,
                    [key]: editRowsModel[id][key].value
                }
                temp.splice(changedRowID, 1, changedRow);
            }
            setData(temp)
            return data
        }
    }, [editRowsModel])
    
    React.useEffect(() => {
        getEditedData(data)
        getMultipleSelected(selectionModel)
    }, [data, selectionModel])
    let selectionProps = {}
    if (selectable) {
        selectionProps = {
            checkboxSelection:true,
            onSelectionModelChange:(newSelectionModel) => {
                setSelectionModel(newSelectionModel);
            },
            selectionModel:selectionModel
        }
    }

    const clickRowHandler = e => {
        console.log(e)
    }

    return (
        <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
            {includesToolbarToggle && (
                <div style={{alignSelf: 'flex-end', margin: '0.4rem'}}>
                    <FormControlLabel
                        control={
                        <Switch 
                                {...label} 
                                onChange={showToolbarHandler} 
                                checked={showToolbar} 
                                size="small" 
                                color="secondary"
                                
                            />
                        }
                        label="Show Grid Toolbar"
                    />
                </div>
            )}
            
            <div style={{ flexGrow: 1, margin: '0.5rem' }}>
                <DataGrid
                // stickyHeader
                    rows={data} 
                    columns={config.materialTable['GridColDef[]']} 
                    components={showToolbar ? {
                        Toolbar: GridToolbar,
                    } : null}
                    editRowsModel={editRowsModel}
                    onEditRowsModelChange={handleEditRowsModelChange}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20]}
                    {...selectionProps}
                    {...data}
                    onRowClick={selectable ? null : clickRowHandler}
                />
            </div>
        </div>
    )
}

export default MaterialTable
