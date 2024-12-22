import supabase from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase.from('cabins').select('*')
    if(error){
        console.error(error)
        throw new Error("Cabins could not be loaded")
    } 
    return data 
}

export async function deleteCabin(id){
    console.log("This is the id ",id)
    const { data, error } = await supabase.from('cabins').delete().eq('id', id)
    if(error){
        console.error(error)
        throw new Error("Cabin could not be deleted")
    }
    return data 
}

export async function createCabin(newCabin){
    console.log("This is the new cabin : ",newCabin)
    
const { data, error } = await supabase.from('cabins').insert([newCabin]).select()

if(error){
    console.error(error)
    throw new Error("Cabin could not be created")
    }
}