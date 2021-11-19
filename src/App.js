import React from 'react'
// data formats
import {headings, data, materialHeadings} from './global/dummyData'
import styles from './App.module.css'
// react hooks table
import ReactTable from './Components/Tables/ReactTable'


// material table
import MaterialTable from './Components/Tables/MaterialTable'

function App() {
  const type = 'reactHooks'
  const table_config = {
    reactTable: {
      headings,
      data,
      filter: 'globalFilter',
      includesPagination: true,
      selectable: true,
      getSelection: (e) => {console.log(e)},
      editable: true,
    },
    materialTable: {
      'GridColDef[]': materialHeadings,
      rows: data,
      // for toolbar settings (filtering using toolbar (even showing/hide columns))
      includesToolbarToggle: false,
      defaultShowToolbar: false,
      getEditedData: (e) => console.log(e),
      selectable: false,
      getMultipleSelected: (e) => console.log(e),
    }
  }
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        {type === 'material' && (
          <MaterialTable
            config={table_config}
          />
        )}
        {type === 'reactHooks' && (
            <ReactTable 
              config={table_config}
            />
          )
        }
      </div>
    </div>
  );
}

export default App;
