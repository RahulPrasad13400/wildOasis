import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { createEditCabin } from "../../services/apiCabins";
// import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({cabinToEdit = {}, onClose}) {

  const {id : editId, ...editValues} = cabinToEdit
  const isEditSession = Boolean(editId)

  const {register, handleSubmit, reset, getValues, formState} = useForm({
    defaultValues : isEditSession ? editValues : {}
  })

  const {errors} = formState

  const {isCreating, createCabin} = useCreateCabin()
  const {isEditing, editCabin} = useEditCabin()

  const isWorking = isCreating || isEditing

  function onSubmit(data){
    
    const image = typeof data.image === "string" ? data.image : data.image[0]
    if(isEditSession){
      editCabin(
        {newCabinData : {...data, image}, 
        id : editId
      },{
        onSuccess : data =>{
          reset()
          onClose?.()
        }
      })

    }else{
      createCabin(
        {...data, image : image},
        {onSuccess : ()=>{
          reset()
          onClose?.()
        }
        })
    }
    // console.log(data.image[0])
  }

  function onError(errors){
    console.log(errors.name)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onClose ? 'modal' : 'regular'}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input disabled={isWorking} type="text" id="name" {...register("name", {required : "This field is required"})} />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input disabled={isWorking} type="number" id="maxCapacity" {...register("maxCapacity", {required : "This field is required", 
        min : {
          value : 1,
          message : "The capacity should be atleast one"
        }
        })} />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input disabled={isWorking} defaultValue={1} type="number" id="regularPrice" {...register("regularPrice", {required : "This field is required",
          min : {
            value : 1,
            message : "A price should be there"
          }
        })} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message }>
        <Input disabl={isWorking} type="number" id="discount" defaultValue={0} {...register("discount", {required : "This field is required",
          validate : (value) => getValues().regularPrice > value || 'discount should be less than regular price'
        })} />
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea disabled={isWorking} type="number" id="description" defaultValue="" {...register("description", {required : "This field is required"})} />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput disabled={isWorking} type="file" id="image" accept="image/*" {...register("image")} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button onClick={()=>onClose?.()} disabled={isWorking} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? 'Edit cabin' : 'Add cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
