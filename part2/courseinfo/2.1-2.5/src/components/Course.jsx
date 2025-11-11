const Header = ({course}) => {
  
  return (
    <h2>{course.name}</h2>
  )
}

const Part = ({part}) => {
  return (
    <li>{part.name} {part.exercises}</li>
  )
}

const Content = ({course}) => {

  return (
    <div>
      {course.parts.map(part => 
          <Part key={part.id} part={part} />
        )}
    </div>
  )
}

const Total = ({ course }) => {
  const parts = course.parts;
  const initialValue = 0;
  const total = parts.reduce((sum, part) => { 
    return sum + part.exercises;
  }, initialValue); 

  
  return (
    <div >
      <b>total of {total} exercises</b>
    </div>
  );
};

const Course = ({course}) => {
    return (
    <div>
      
      <Header course={course}/>
      <Content course= {course} />
      <Total course={course} />
    </div>
  )
}
export default Course