import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function SortBy({options}) {
    const [searchParams, setSearchParams] = useSearchParams()
    const sortBy = searchParams.get("SortBy") || ""
    function handleChange(e){
        searchParams.set('SortBy', e.target.value)
        setSearchParams(searchParams)
    }
  return (
    <div>
      <Select options={options} type="white" value={sortBy} onChange={handleChange} />
    </div>
  )
}
