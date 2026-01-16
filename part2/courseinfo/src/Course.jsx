const Course = ({course}) =>{
  console.log(course);
  return (
    <>
      {course.map(({name,id,parts})=>
          <div key={id}>
            <Header  title={name}/>
            <Content parts={parts}/>
          </div>
        )
      }
    </>
  );
};


const Header = ({title}) =>{
   return (
    <>
      <h1>{title}</h1>
    </>
  );
};

const Part = ({parts}) =>{
  return ( 
    <li>{parts.name} {parts.exercises}</li>
  );
  
};

const Content = ({parts}) => {
  return (
    <>
      <ul>
        {parts.map((parts) => 
            <Part key={parts.id} parts={parts}/>
          )
        }
      </ul>
      <Total parts={parts}/>
    </>
  );
};

const Total = ({parts}) =>{
  return(
    <>
      <p>Total of exercises {parts.reduce((sum, {exercises})=>sum+exercises,0)}</p>  
    </>
  );
};

export default Course;