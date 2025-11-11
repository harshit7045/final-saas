

export default function SimpleAlert({ severity, message }) { // Destructure the props
  return (
   
   
    <div
    className={`h-[5vh] p-[1vh] bg-opacity-30 ${
      severity == "success" ? "bg-green-400" : severity == "error" ? "bg-red-400" : "bg-opacity-90"
    }`}
  >
    
  </div>
  
      
  
  );
}
