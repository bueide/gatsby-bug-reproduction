import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { Global, ThemeProvider } from "@emotion/react"
import { themes } from "../components/themes"

function ThemeToggler({ theme, onClick }) {
  const nextTheme = theme === "light" ? "dark" : "light"
  const sunMoon = theme === "light" ? <p>Moon</p> : <p>Sun</p>
  return (
    <button aria-label="Toggle Site Theme" onClick={() => onClick(nextTheme)}>
      {sunMoon}
    </button>
  )
}

export default function Home({ data }) {
  const storedTheme = typeof window !== "undefined" && window.localStorage
  const [theme, setTheme] = useState(
    storedTheme ? localStorage.getItem("theme") : "light"
  )
  useEffect(() => {
    localStorage.setItem("theme", theme)
  }, [theme])
  console.log(theme)
  return (
    <ThemeProvider theme={themes[theme]}>
      <Global
        styles={theme => ({
          body: {
            margin: "3rem auto",
            maxWidth: 600,
            background: theme.colors.surface1,
            color: theme.colors.element1
          }
          
        })}
      />
      <nav>
        <ThemeToggler
          theme={theme}
          onClick={nextTheme => setTheme(nextTheme)}
        />
      </nav>
      <p>Hello world!</p>
      <Img fluid={data.file.childImageSharp.fluid} />
    </ThemeProvider>
  )
}

export const data = graphql`
  query {
    file(relativePath: { eq: "gatsbytoast.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
