import styled from "styled-components";
import {formatCurrency} from "../../utils/helpers"
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { deleteCabin } from "../../services/apiCabins";
// import toast from "react-hot-toast";
// import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";


// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({cabin}) {
  // const [showForm, setShowForm] = useState(false)
  const {name, id : cabinId, maxCapacity, discount, description, image, regularPrice, created_at}  = cabin
  const {isDeleting, deleteCabin} = useDeleteCabin()
  const {isCreating, createCabin} = useCreateCabin()

  function handleDuplicate(){
      createCabin({
        name : `copy of ${name}`,
        maxCapacity, 
        discount, 
        description, 
        image, 
        regularPrice
      })
  }

   return (
  <>
    <Table.Row role="row">
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>fits up to {maxCapacity}</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
      <div>
        <button onClick={handleDuplicate}><HiSquare2Stack /></button>
        <Modal>
          <Modal.Open opens='edit'>
            <button><HiPencil /></button>
          </Modal.Open>
          <Modal.Window name='edit'>
            <CreateCabinForm  cabinToEdit={cabin} />
          </Modal.Window>

          {/* <button onClick={()=>setShowForm(!showForm)}><HiPencil /></button> */}
          <Modal.Open opens="delete">
            <button disable={isDeleting}><HiTrash /></button>
          </Modal.Open>
          <Modal.Window name='delete'>
            <ConfirmDelete resourceName='cabins' disabled={isDeleting} onConfirm={()=>deleteCabin(cabinId)} />
          </Modal.Window>
        </Modal>

        <Menus.Menu>
          <Menus.Toggle id={cabinId} />
          <Menus.List id={cabinId}>
            <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>Duplicate</Menus.Button>
            <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
            <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
          </Menus.List>
        </Menus.Menu>

      </div>
    </Table.Row>
    
    {/* {showForm && <CreateCabinForm  cabinToEdit={cabin} />} */}
    
    </>
  )
}
