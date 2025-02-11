import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createEditCabin } from "../../services/apiCabins"
import toast from "react-hot-toast"

export function useCreateCabin(){
    const queryClient = useQueryClient()
    const {isLoading : isCreating, mutate : createCabin} = useMutation({
        mutationFn : createEditCabin,
        onSuccess : () => {
          toast.success("cabin sucessfully creeated")
          queryClient.invalidateQueries({
            queryKey : ["cabin"]
          })
        //   reset()
        },
        onError : (err) =>{
          toast.error(err.message)
        } 
      })
    return {isCreating, createCabin}
}