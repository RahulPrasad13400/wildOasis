import supabase from "./supabase";
import { supabaseUrl } from "./supabase";
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

export async function createEditCabin(newCabin, id){
    console.log(newCabin, id)
    let hasImagePath = false 
    if(id){
        hasImagePath = newCabin.image?.startsWith(supabaseUrl) 
    }
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/','')
    const imgPath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    let query = supabase.from('cabins')

    if(!id) query = query.insert([{...newCabin, image : imgPath}])

    if(id){
        query = query.update({ ...newCabin, image : imgPath }).eq('id', id)
    } 
    
    const {data, error} = await query.select().single()
    if(error){    
        console.error(error)
        throw new Error("Cabin could not be created")
    }

    if(hasImagePath) return data 
    const { error : storageError } = await supabase.storage.from('cabin-images').upload(imageName, newCabin.image)

    if(storageError){
        await supabase.from('cabins').delete().eq('id', data.id)
            throw new Error("Cabin could not be deleted")
    }
}