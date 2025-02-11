import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/contants";

export function useBookings(){
    const [serachParams] = useSearchParams()
    const filterdValue = serachParams.get("status")
    const queryClient = useQueryClient()

    // Filter 
    const filter = !filterdValue || filterdValue === "all" ? null : {field : "status", value : filterdValue}
    
    //Sort 
    const sortByRaw = serachParams.get("sortBy") || "startDate-desc"
    const [field, direction] = sortByRaw.split('-')
    const sortBy = {field, direction}

    // Pagination
    const page = !serachParams.get("page") ? 1 : Number(serachParams.get("page"))

    const {isLoading, data : {data : bookings, count} = {} , error} = useQuery({
        queryKey : ["bookings", filter, sortBy, page],  // querykey il filter um sortBy um specify cheyanam enale aa field change cheyumbo value fetch cheyuth kond varu allengi irunn refresh cheyuth kond irikendi varum
        queryFn : ()=>getBookings({filter, sortBy, page})
    })

    const pageCount = Math.ceil(count/PAGE_SIZE)

    if(page<pageCount)
    queryClient.prefetchQuery({
        queryKey : ["bookings", filter, sortBy, page+1],  
        queryFn : ()=>getBookings({filter, sortBy, page : page + 1})
    })

    if(page> 1)
    queryClient.prefetchQuery({
        queryKey : ["bookings", filter, sortBy, page-1],  
        queryFn : ()=>getBookings({filter, sortBy, page : page - 1})
    })
    
    return {isLoading, bookings, error, count}
}
