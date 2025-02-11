import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

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

  const [ searchParams ] = useSearchParams()

  // const {isLoading, data : cabins, error} = useQuery({
  //   queryKey : ['cabin'],
  //   queryFn : getCabins
  // })

  const {cabins, error, isLoading} = useCabins()

  if(isLoading) return <Spinner />
  if(!cabins.length) return <Empty resourceName="cabins" />

  
  // For Filtering 
  const filterdValue = searchParams.get("discount") || 'all' 
  let filterdCabins;
  if(filterdValue === 'all') filterdCabins = cabins;
  if(filterdValue === "no-discount") filterdCabins = cabins.filter(cabin=> cabin.discount === 0)
  if(filterdValue === "with-discount") filterdCabins = cabins.filter(cabin=> cabin.discount > 0)

  // For Sorting
  const sortBy = searchParams.get('sortBy') || "name-asc"
  const [field, direction] = sortBy.split('-')
  const modifier = direction === 'asc' ? 1 : -1
  let sortedCabins = filterdCabins.sort((a,b)=> (a[field]-b[field])*modifier)

  return (
    <Menus>
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body data={sortedCabins} render={sortedCabins=><CabinRow cabin={sortedCabins} key={sortedCabins.id} />} />
         {/* {cabins.map(cabin=><CabinRow cabin={cabin} key={cabin.id} />)} */}
    </Table>
    </Menus>
  )

}
