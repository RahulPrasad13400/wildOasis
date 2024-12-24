import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import {useForm} from "react-hook-form"
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({cabinToEdit = {}}) {
  const {isCreating, createCabin} = useCreateCabin()
  const {isEditing, editCabin} = useEditCabin()
  const isWorking = isCreating || isEditing
  const {id : editId, ...editValues} = cabinToEdit
  const isEditSession = Boolean(editId)
  const {register, handleSubmit,reset, getValues, formState} = useForm({
    defaultValues : isEditSession ? editValues : {}
  })

  function onSubmit(data){
    const image = typeof data.image === 'string' ? data.image : data.image[0]
    // console.log(data.image[0].name)
    if(isEditSession) editCabin({newCabinData : {...data, image}, id : editId}, {onSuccess : (data)=> reset()})
    else createCabin({...data, image: image}, {onSuccess : (data)=> reset()})
  }

  function onError(errors){
    console.log(errors)
  }

  const {errors} = formState;
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="cabin name" error={errors?.name?.message}>
        <Input type="text" id="name" {...register("name",{required : "Enter the cabin name"})} />
      </FormRow>
      <FormRow label="max capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" {...register("maxCapacity",{required : "Enter the maximum Room capacity", min: {value : 1, message : "capacity should be atleast one"}})} />
      </FormRow>

      <FormRow label="price" error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" {...register("regularPrice",{required : "Enter the price", min : {value : 1, message : "minimum price should be atleast one"}})} />
      </FormRow>

      <FormRow label="discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} {...register("discount",{required : "Enter the discount", validate : (value)=>value <= getValues().regularPrice || "Discount should be less than regular price"})} />
      </FormRow>

      <FormRow label="description" error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" {...register("description",{required : "Enter the description"})}/>
      </FormRow>

      <FormRow label="image" error={errors?.name?.message}>
        <FileInput id="image" accept="image/*" {...register("image",{required : isEditSession ? false : 'This field is required'})}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>{isEditSession ? 'Edit Cabin' : 'create new cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
