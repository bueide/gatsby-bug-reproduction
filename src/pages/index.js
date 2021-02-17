import React, {useState} from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";

function ThemeToggler() {
  const [theme, setTheme] = useState('light');
  const nextTheme = theme === "light" ? "dark" : "light";
  const sunMoon = theme === "light" ? <p>Moon</p> : <p>Sun</p>;
  return (
    <button
      aria-label="Toggle Site Theme"
      onClick={() => setTheme(nextTheme)}
    >
      {sunMoon}
    </button>
  );
}

export default function Home({ data }) {
  return (
    <div style={{ margin: `3rem auto`, maxWidth: 600 }}>
      <nav><ThemeToggler /></nav>
      <p>Hello world!</p>
      <Img fluid={data.file.childImageSharp.fluid} />
    </div>
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