'use client'
import React, { useContext } from "react"
import ReactStars from "react-stars"
import { AppContext } from "./AppContext"

export const Ratings = () => {
  const {rating, setRating} =  useContext(AppContext);
  const handleRating = (newRating) => {
    setRating(newRating);
  };
  return (
    <div>
        <ReactStars count={5} onChange={handleRating} size={24} color2={'#ffd700'}  />
        <h1 className="text-cyan-50">You Rated: {rating} </h1>
    </div>
  )
}
