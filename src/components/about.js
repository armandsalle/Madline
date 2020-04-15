import React, { useEffect } from "react"
import RichText from "../components/richText"
import cn from "classnames"
import gsap from "gsap"

const About = ({ aboutTitle, aboutText, backgroundImage, state }) => {
  const showAbout = () => {
    gsap.set(".about", { display: "flex", opacity: 0 })
    gsap.set(".about .content .richtext", {
      opacity: 0,
      y: 20,
    })
    gsap.set(".about .content h2", {
      opacity: 0,
      y: 100,
    })

    const tl = gsap.timeline({ paused: true })
    tl.to(".about", { opacity: 1, duration: 0.2, ease: "power3.inOut" }).to(
      [".about .content h2", ".about .content .richtext"],
      {
        opacity: 1,
        y: 0,
        stagger: {
          amount: 0.15,
        },
        ease: "power3.inOut",
        duration: 0.5,
      }
    )

    return tl
  }

  const hideAbout = () => {
    const tl = gsap.timeline({ paused: true })
    tl.to([".about .content h2", ".about .content .richtext"], {
      opacity: 0,
      stagger: {
        amount: 0.15,
      },
      ease: "power3.inOut",
      duration: 0.3,
    })
      .to(".about", { opacity: 0, duration: 0.2, ease: "power3.inOut" })
      .set(".about", { display: "none" })

    return tl
  }

  useEffect(() => {
    if (state.clicked === false) {
      hideAbout().play()
    } else if (
      state.clicked === true ||
      (state.clicked === true && state.initial === null)
    ) {
      showAbout().play()
    }
  }, [state.clicked, state.initial])

  return (
    <section className={cn("about", { visible: state.clicked })}>
      <div className="content">
        <div className="title">
          <h2>{aboutTitle}</h2>
        </div>
        <RichText data={aboutText} />
        <img src={backgroundImage.url} alt={backgroundImage?.alt} />
      </div>
    </section>
  )
}

export default About
