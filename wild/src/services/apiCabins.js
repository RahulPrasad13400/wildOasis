import supabase, { supabaseUrl } from "./supabase";

export async function getCabins(){
    let { data, error } = await supabase
      .from('cabins')
      .select('*')

    if(error){
        console.log(error)
        throw new Error("cabins could not be loaded..")
    }

    return data 
}

export async function deleteCabin(id){
  
  const { error } = await supabase
  .from('cabins')
  .delete()
  .eq('id', id)

  if(error){
    console.error("cabin could not be deleted")
    throw new Error("cabin could not be deleted")
  }

}

export async function createEditCabin(newCabin, id){
  console.log(newCabin)
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)
    

    const imgName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/',"")
    const imgPath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imgName}`

    let query = await supabase.from('cabins')

    if(!id) query = query.insert([ {...newCabin, image : imgPath}]).select()

    if(id) query = query.update({...newCabin, image : imgPath})
      .eq('id', id)
      .select()

    const {data, error} = await query.select().single()

    if(error){
      console.error(error.message)
      throw new Error("Error occured while creating cabin")
    }

    // https://vfmgvdufuahvohrnxdgb.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

    if(hasImagePath) return data 
    
    const { error : storageError } = await supabase
    .storage
    .from('cabin-images')
    .upload(imgName, newCabin.image)

    if(storageError){
      await supabase
      .from('cabins')
      .delete()
      .eq('id', data.id)
      console.log(storageError)
      throw new Error("image uploading failed")
    }

    return data 

}