import React, { useState } from 'react'
import Button from '../../ui/Button'
import CreateCabinForm from './CreateCabinForm'
import Modal from '../../ui/Modal'
import CabinTable from './CabinTable'

export default function AddCabin() {
    return <div>
            <Modal>
                <Modal.Open opens="cabin-form">
                <Button>Add new Cabin</Button>
                </Modal.Open>
                    <Modal.Window name="cabin-form">
                    <CreateCabinForm />
                </Modal.Window>
            </Modal>
    </div>

        // {/* <Modal.Open opens="table">
        //     <Button>View Table</Button>
        // </Modal.Open>
        // <Modal.Window name="table">
        //     <CabinTable />
        // </Modal.Window> */}

 
    
//     const [isOpenModal, setIsOpenModal] = useState(false)

//   return (
//     <div>
//             <Button onClick={()=>setIsOpenModal(!isOpenModal)}>Add new Cabin</Button>
//             {isOpenModal && <Modal onClose={()=>setIsOpenModal(false)}> <CreateCabinForm onClose={()=>setIsOpenModal(false)} /> </Modal>}
//     </div>
//   )
}
