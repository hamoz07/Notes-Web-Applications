import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

type gobackprop = {
  isEditPage:boolean
}

export default function GoBack({isEditPage}:gobackprop) {
  const naver = useNavigate();
  const back = () => {
    if(isEditPage){
      naver(-1) 
    }else{
      naver("/")
    }
  };
  const gobackstyles = {
    display: "flex",
    gap: "10px",
    background: "#fff",
    color: "#00ce00",
    alignItems: "center",
    padding: "5px 10px",
    border: "none",
    outline:"2px solid #00ce00",
    marginBottom: "10px",
    borderRadius: "10px",
  };
  return (
    <button style={gobackstyles} onClick={back}>
      <ArrowUturnLeftIcon width={20} />
      <span>Go Back</span>
    </button>
  );
}
