import { useEffect } from "react"
import styled from "styled-components"
import { useUser } from "../features/authentication/useUser"
import Spinner from "./Spinner"
import { useNavigate } from "react-router-dom"

const FullPage = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-grey-50);
`

export default function ProtectedRoute({children}) {
    const navigate = useNavigate()

    // 1. Load the authenticated user 
        const { isAuthenticated, isLoading } = useUser()

    // 3. If there is no authenticated user redirect to login
        useEffect(function(){
            if(!isAuthenticated && !isLoading) return navigate('/login')
        },[isAuthenticated, isLoading, navigate])

    // 2. whil loading show  a spinner 
        if(isLoading) return <FullPage> 
            <Spinner /> 
        </FullPage>
        
    // 4. If there is a user render the app 
        if(isAuthenticated) return children
}
