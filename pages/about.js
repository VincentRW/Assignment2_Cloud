import Header from '../components/header';
import Footer from '../components/footer';

export default function About() {
  const studentNumber = "22586687";
  const studentName = "Vincent Ryan Wirnata";
  return (
    <div>
      <Header studentNumber={studentNumber} />
      <main style={{ padding: 32 }}>
        <h1>About</h1>
        <p>Name: {studentName}</p>
        <p>Student Number: {studentNumber}</p>
      </main>
      <Footer name={studentName} studentNumber={studentNumber} />
    </div>
  );
}