import React from 'react'
import Stat from './Stat'
import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from 'react-icons/hi2'
import { formatCurrency } from '../../utils/helpers'
export default function Stats({bookings, confirmedStays, numDays, cabinCount}) {
    // 1. Number of bookings
    const numBookings = bookings.length
    // 2. Total sales 
    const sales = bookings.reduce((acc, cur)=>acc+cur.totalPrice ,0) 
    // 3. Total check ins
    const checkins = confirmedStays.length
    // 4. occupancy rate -----------   num check in nights / all available nights 
    const occupation = confirmedStays.length === 0 ? 0 : confirmedStays.reduce((acc, cur)=>acc + Number(cur.numNights), 0) / (numDays * cabinCount)
    
  return (
    <>
        <Stat value={numBookings} title="bookings" color="blue" icon={<HiOutlineBriefcase />} />
        <Stat value={formatCurrency(sales)} title="Sales" color="green" icon={<HiOutlineBanknotes />} />
        <Stat value={checkins} title="Check ins" color="indigo" icon={<HiOutlineCalendarDays />} />
        <Stat value={Math.round(occupation*100)+"%"} title="Occupancy rate" color="yellow" icon={<HiOutlineChartBar />} />
    </>
  )
}
