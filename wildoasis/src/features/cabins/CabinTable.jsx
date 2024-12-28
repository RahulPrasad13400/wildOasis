import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";
import Spinner from '../../ui/Spinner'
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

export default function CabinTable() {
  const {isLoading, error, cabins} = useCabins()
  const [searchParams]=  useSearchParams()
  
  if(isLoading) return <Spinner />

  const filterValue = searchParams.get("discount") || 'all'
  console.log(cabins)
  let filteredCabins
  if(filterValue === "all") filteredCabins = cabins
  if(filterValue === "no-discount") filteredCabins = cabins.filter(cabin=>cabin.discount === 0)
  if(filterValue === "with-discount") filteredCabins = cabins.filter(cabin=>cabin.discount > 0)

  const sortBy = searchParams.get("SortBy") || "name-asc"
  const [field, direction] = sortBy.split('-')
  const modifier = direction === "asc" ? 1 : -1
  console.log(field)
  const sortedCabins = filteredCabins.sort((a,b)=>(a[field] - b[field])*modifier)
  console.log("These are the sorted cabins - ",sortedCabins)
  return (
    <Menus>
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body data={sortedCabins} render={cabin=><CabinRow key={cabin.id} cabin={cabin}/>} />
    </Table>
    </Menus>
  )
}

