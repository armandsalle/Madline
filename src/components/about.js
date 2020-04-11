import React from "react"
import RichText from "../components/richText"
import cn from "classnames"

const About = ({ aboutTitle, aboutText, backgroundImage, open }) => {
  return (
    <section className={cn("about", { visible: open })}>
      <div className="content">
        <h2>{aboutTitle}</h2>
        <RichText data={aboutText} />
        <img src={backgroundImage.url} alt={backgroundImage?.alt} />
      </div>
    </section>
  )
}

export default About
