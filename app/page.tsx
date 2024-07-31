'use client'
import { FC, useState } from "react"
import Header from "./components/Header"


interface Props{

}


const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(0)
  return (
    <div>
      <Header open={open} setOpen={setOpen} activeItem={activeItem}/>
    </div>
  )
}

export default Page