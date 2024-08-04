import React from 'react'

type Props = {
    active : number
    setActive : (active: number) => void
courseContentData : any
setCourseContentData : any
handleSubmit : () => void
}

const CourseContent = ({active, setActive, courseContentData, setCourseContentData, handleSubmit: handleCourseSubmit}: Props) => {
  const [activeSection, setActiveSection] = React.useState(0)
  const [isCollapsed, setIsCollapsed] = React.useState(Array(courseContentData.length).fill(false))

    const handleSubmit = (e:any) => {
        e.preventDefault()
    }


    const handleCollapseToggle = (index: number) => {
        setIsCollapsed(isCollapsed.map((value, i) => i === index ? !value : value))
    }

    return (

    <div>CourseContent</div>
  )
}

export default CourseContent