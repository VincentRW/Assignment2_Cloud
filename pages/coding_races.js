import Header from '../components/header'
import Footer from '../components/footer'

export default function CodingRaces() {
  const studentNumber = "22586687";
  const studentName = "Vincent Ryan Wirnata";
  return (
    <>
      <Header studentNumber="22586687" />
      <main style={{ padding: '32px' }}>
        <h1>Escape Room</h1>
        <p>Page not yet finished.</p>
      </main>
      <Footer name={studentName} studentNumber={studentNumber} />
    </>
  )
}