import { useState } from "react"

const containerStyle = {
        display:"flex",
        alignItems:"center",
        gap: "16px",
}

const starContainerStyle = {
    display:"flex",
    alignItems:"center",
}

export default function StarRating({maxStars=5, color='black', size=30, 
    message=[], defaultRating=0, onSetRating}){ //setting default number of stars 

    const [rating, setRating] = useState(defaultRating)
    const [tempRating, setTempRating] = useState(0)

    const textStyle = {
        fontWeight: "bold",
        color:color,
        fontSize:`${size}px`
    }

    function handleRating(id) {
        const newRating = rating === id ? 0 : id;
        setRating(newRating);
        onSetRating?.(newRating); 
      }

    return (
        <div style={containerStyle}>
            <div style={starContainerStyle}>
                {Array.from({length:maxStars}, (_,i)=>
                <Star key={i} 
                      rating={rating} 
                      onRate={handleRating} id={i+1} 
                      tempRating={tempRating}
                      onHoverIn={()=>setTempRating(i+1)}
                      onHoverOut={()=>setTempRating(0)}
                      color={color}
                      size={size}/>)}
            </div>
            <div style={textStyle}>
                {message.length===maxStars?message[tempRating?tempRating-1:rating-1]:tempRating||''}
                </div>
        </div>
    )
}

function Star({onRate,id,onHoverIn,onHoverOut,rating,tempRating,color,size}){
    const logic = tempRating?tempRating:rating;

    const starStyle = {
        display: "block",
        color:color,
        height:`${size*1.5}px`,
        width:`${size*1.5}px`,
        cursor:"pointer"
    }

    return (
        <span role="button" style={starStyle} onClick={()=>onRate(id)} 
        onMouseEnter={onHoverIn} onMouseLeave={onHoverOut}>

            {logic<id?
            /* full star*/
            <svg 
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke={color}>
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="{2}"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
            </svg> :
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={color}
                stroke={color}>
                    <path
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
            </svg>}
        </span>
    )
}