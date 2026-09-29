import {
  AboutBlock,
  ContactBlock,
  Experience,
  Featured,
  Hero,
  ProjectGrid,
  Skills,
  Writing,
} from "../components/sections";

export default function Home() {
  return (
    <>
      <Hero />
      <Featured />
      <Experience />
      <ProjectGrid />
      <Writing />
      <Skills />
      <AboutBlock />
      <ContactBlock />
    </>
  );
}
