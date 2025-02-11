import { fi } from "date-fns/locale";
import supabase, { supabaseUrl } from "./supabase";

export async function signup({ email, password, fullName }){
    const { data, error} = await supabase.auth.signUp({email, password, options : {
         data : { // it only accepts email and password and if we want to send other data, we have to send it through options: { and then to the data : {} }
            fullName,
            avatar : ''
         }
        }
    })

    if(error){
        throw new Error(error.message)
    }
    
    return data 
}

export async function login({email, password}){
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

    if(error){
        throw new Error(error.message)
    }
    
    return data 
}
    
export async function getCurrentUser(){
    // check whether there is a current session
    const { data : session } = await supabase.auth.getSession()
    if(!session.session) return null
    const { data, error } = await supabase.auth.getUser()
    if(error){
        throw new Error(error.message)
    }
   
    return data?.user
}

export async function logout(){
    const { error } = await supabase.auth.signOut()
    if(error) throw new Error(error.message)
}   

export async function updateCurrentUser({password, fullName, avatar}){
    
    // 1. update password OR fullName
        let updateData;
        if(password) updateData = { password }
        if(fullName) updateData = { data : { fullName } }

        const { data, error } = await supabase.auth.updateUser(updateData)

        if(error) throw new Error(error.message)
        if(!avatar) return data 

    // 2. Upload avatar image 
        const fileName = `avatar-${data.user.id}-${Math.random()}`
        const {error : storageError} = await supabase.storage.from("avatars").upload(fileName, avatar)

        if(storageError) throw new Error(storageError.message)
    
    // 3. Update the avatar in the user 
        const { data : updatedUser, error : updateError }  = await supabase.auth.updateUser({
            data : {
                avatar : `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`
            }
        })

        if(updateError) throw new Error(updateError.message)
        return updatedUser
}