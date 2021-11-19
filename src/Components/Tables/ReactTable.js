import PropTypes from "prop-types"
import React from 'react'
import styles from './ReactTable.module.css'
import { useTable, useSortBy, useGlobalFilter, usePagination, useRowSelect } from 'react-table'
import {headings, data} from '../../global/dummyData'
import {AiOutlineArrowUp, AiOutlineArrowDown} from 'react-icons/ai'
import {GrUnsorted} from 'react-icons/gr'
import {RiSearchLine} from 'react-icons/ri'
import {FcNext, FcPrevious} from 'react-icons/fc'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { TextField } from "@mui/material"
// EXPORTED COMPONENT NAME: REACTTABLE
// ALL FUNCTIONALITIES ARE GIVEN IN THE COMPONENT NAMED TABLE (except usememo())


const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef()
      const resolvedRef = ref || defaultRef

      React.useEffect(() => {
          resolvedRef.current.indeterminate = indeterminate
      }, [resolvedRef, indeterminate])

      return (
          <>
              <input type="checkbox" ref={resolvedRef} {...rest} />
          </>
      )
  }
)

// TO APPLY GLOBAL FILTER
const GlobalFilter = ({filter, setFilter}) => {
  return (
      <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: '2rem'}}>
        <TextField 
          variant="standard"
          label="Search Here"
          id="search"
          value={filter || ''}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
  )
} 



// MAIN TABLE FUNCTIONALITIES
const Table = ({
  columns, 
  data, 
  filter, 
  includesPagination,
  selectable, 
  getSelection,
  updateMyData, 
  skipPageReset,
}) => {
  // GET REQUIRED TABLE PROPS FROM THE USETABLE HOOK
  const {
    // Init hook props on table
    getTableProps,
    // init hook props on body
    getTableBodyProps,
    // to get different header groups. Personal Info and Company Info could be two groups. Personal info may include columns like name etc.
    headerGroups,
    // Get rows from data props (NOTE: ONLY USE IF NOT INCLUDING PAGINATION)
    rows,
    // For Pagination, use page instead of rows
    page,
    // Handy Props for pagination
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Function to build rows
    prepareRow,
    // For row selection
    selectedFlatRows,
    // STATE management
    state,
    // function to set global filter. Is used in the global filter component
    setGlobalFilter,
  } = useTable({
    // Pass arguments as ES6 Syntax
    columns,
    data,
      // use the skipPageReset option to disable page resetting temporarily
      autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
    initialState: { pageIndex: 0 }
  },
  useGlobalFilter,
  useSortBy,
  usePagination,
  useRowSelect,
  hooks => {
    if (selectable) {
      hooks.visibleColumns.push(columns => [
          // Let's make a column for selection
          {
              id: 'selection',
              Cell: ({ row }) => (
                  <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              ),
          },
          ...columns,
      ])
  }
  if (!selectable) {
      return
  }
  }
  )

  // single row selection
  const clickRowHandler = e => {
    getSelection(e)
  }
  const blurHandler = e => {
    console.log(e)
    console.log('blur')
  }
  // EXTRACTING FROM STATE OBJECT PROVIDED BY REACT TABLE LIBRARY
  const {globalFilter, pageIndex, pageSize, selectedRowIds} = state
  const pageSizeOptions = [5,10,15]
  React.useEffect(() => {
    // An alternative (simpler) way to get rows. Not optimal. We shold always use methods from the library
    // for (let i in selectedRowIds) {
    //   console.log(data[i])
    // }
    const selected = selectedFlatRows.map(row => {
      return row.original
    })
    getSelection(selected)
  }, [selectedRowIds])
  return (
    <div className={styles.root}>
    {filter === 'globalFilter' && (
      <GlobalFilter
        filter={globalFilter} 
        setFilter={setGlobalFilter}
      />
    )}
    <table {...getTableProps()} className={styles.table}>
      <thead className={styles.header}>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())} className={styles.columnHeading}>
                <span style={{marginRight: '0.5rem'}}>{column.render('Header')}</span>
                <span style={{display: 'inline-flex', alignItems:'center',}}>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? (
                          <Typography color="primary">
                            <AiOutlineArrowDown />
                          </Typography>
                          )
                        : (
                          <Typography color="primary">
                            <AiOutlineArrowUp />
                          </Typography>
                            )
                      : (<GrUnsorted />)}
                  </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {includesPagination ? (
          <React.Fragment>
            {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr 
                {...row.getToggleRowSelectedProps()}
                onBlur={blurHandler}
                onClick={selectable ? (() => row.toggleRowSelected()) : (() => clickRowHandler(row.original))}
                className={styles.row}
                {...row.getRowProps()}
              >
                {row.cells.map(cell => {
                  return <td className={styles.tableElement} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
          </React.Fragment>
        ) : (
        <React.Fragment>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getToggleRowSelectedProps()}
                onClick={selectable ? (() => row.toggleRowSelected()) : (() => clickRowHandler(row.original))} 
                className={styles.row} 
                {...row.getRowProps()}
              >
                {row.cells.map(cell => {
                  return <td className={styles.tableElement} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
          </React.Fragment>
        )}
        
      </tbody>
    </table>
    {/* PAGINATION OPTIONS */}
    {includesPagination && (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', alignItems: 'center'}}>
          <IconButton onClick={() => previousPage()} disabled={!canPreviousPage}>
            <FcPrevious />
          </IconButton>
          <IconButton onClick={() => nextPage()} disabled={!canNextPage}>
            <FcNext />
          </IconButton>
          <Typography variant="body">
            Page{' '}
              {pageIndex + 1} of {pageOptions.length}
          </Typography>
          </div>
          {/* SELECT PAGINATION */}
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value))
              }}
              label={`Show ${pageSize}`}
            >
              {pageSizeOptions.map(pageSize => (
                <MenuItem
                  key={pageSize}
                  value={pageSize}
                >
                  Show {pageSize}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
    )}
    </div>
  )
}

const ReactTable = (
  {
    // CONFIG PROPS FROM PARENT
    config,
  }
  ) => {
    const {
    headings,
    data,
    filter,
    includesPagination,
    selectable,
    getSelection,
    editable,
    } = config.reactTable
    // USING USEMEMO ON COLUMNS AND ROWS TO REMOVE EXTRA RENDERING
    const columns = React.useMemo(() => headings, [])
    const [rows, setRows] = React.useState(() => data)
    const originalData = [...data]
    const [skipPageReset, setSkipPageReset] = React.useState(false)
    const allowedFilterTypes = [
      'globalFilter', 'columnFilter', 'noFilter'
    ]
    const getSelected = e => {
      getSelection(e)
    }
    const filterChoice = allowedFilterTypes.find(el => el === filter)
    if (filterChoice === undefined) {
      console.log(`
        ERROR FROM DEVELOPER!!!
        -- Filter Type is not valid (Probably has Typo). 
        -- Please select give correct filter from the following as props:
        'globalFilter', 'columnFilter', 'noFilter'
        -- This will not break the table but it may lead to undesirable results
      `)
    }
    // We need to keep the table from resetting the pageIndex when we
    // Update data. So we can keep track of that flag with a ref.

    // When our cell renderer calls updateMyData, we'll use
    // the rowIndex, columnId and new value to update the
    // original data
    const updateMyData = (rowIndex, columnId, value) => {
      // We also turn on the flag to not reset the page
      if (editable) {
        setSkipPageReset(true)
        setRows(old =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              }
            }
            return row
          })
        )
      }
      
    }
    // After data chagnes, we turn the flag back off
    // so that if data actually changes when we're not
    // editing it, the page is reset
    React.useEffect(() => {
      setSkipPageReset(false)
    }, [data])
    const resetData = () => setRows(originalData)
    return (
        <React.Fragment>
            <Table 
              columns={columns} 
              data={rows} 
              updateMyData={updateMyData}
              skipPageReset={skipPageReset}
              filter={filterChoice} 
              includesPagination={includesPagination} 
              selectable={selectable}
              getSelection={getSelected}
            />
        </React.Fragment>
    )
}

ReactTable.propTypes = {
  data: PropTypes.any,
  filter: PropTypes.string,
  headings: PropTypes.any,
  includesPagination: PropTypes.bool
}

export default ReactTable

ReactTable.defaultProps = {
  headings: headings,
  data: data,
  filter: 'globalFilter',
  includesPagination: true,
}