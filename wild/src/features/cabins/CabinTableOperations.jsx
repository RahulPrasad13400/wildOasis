import React from 'react'
import TableOperations from '../../ui/TableOperations'
import Filter from '../../ui/Filter'
import SortBy from '../../ui/SortBy'

export default function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter filterField="discount" options={[{value : "all",label : "All" },{value : "no-discount", label : "No discount"},{value : "with-discount", label : "With discount"}]} />
        <SortBy options={[{value : "name-asc", label : "Sort by name (A-Z)"}, {value : "name-des", label : "Sort by name (Z-A)"}, {value : "regularPrice-asc", label : "Sort by price (lowest first)"}, {value : "regularPrice-desc", label : "Sort by price (highest first)"}, {value : "maxCapacity-asc", label : "Sort by capacity (lowest first)"}, {value : "maxCapacity-desc", label : "Sort by capacity (highest first)"}]} />
    </TableOperations>
  )
}
