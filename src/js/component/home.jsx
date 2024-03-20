import React, {useEffect, useState} from "react";

const Home = () => {

	const [newTask,setNewTask]=useState("")
	const [tasks,setTasks]=useState([])


function writeTask(event) {
	
	if (event.key === "Enter") {
		
		setTasks(tasks.concat( { label: newTask, done: false }))
		setNewTask("");
		putLista(tasks.concat( { label: newTask, done: false }));
	}
}


function deletetask(position) {
	console.log(position);
	const arrayfiltered = tasks.filter((item, index) => index !== position)
	setTasks(arrayfiltered)
	putLista(arrayfiltered);
	}
	

function createUser() {
	fetch('https://playground.4geeks.com/apis/fake/todos/user/anarg1812', {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json"
      }
    })

		.then((response) => response.json())
		.then((data) => {
			console.log(data)
			getLista()
})
		.catch((error) => console.log(error))
}


	function getLista() {
		fetch ('https://playground.4geeks.com/apis/fake/todos/user/anarg1812', {
			method: "GET"
		})  
		.then((response)=> {
			if (response.ok) {
				return response.json()
			} else {
				if (response.status == 404) {
					createUser();
				} else {
					console.error("Error en la solicitud", response.status);
				}
			}
		})
		.then((data) => setTasks(data))
		.catch((error) => console.log(error))
	}


function putLista(tasks) {
	console.log(tasks)
	fetch ('https://playground.4geeks.com/apis/fake/todos/user/anarg1812', {
		method: "PUT",
		body: JSON.stringify(tasks),
		headers: {
		  "Content-Type": "application/json"
		}
	  })
	  .then(resp => {
		  console.log(resp.ok); 
		  console.log(resp.status); 
		  console.log(resp.text()); 
		  return resp.json(); 
	  })
	  .then(data => {
		
		  console.log(data); 
	  })
	  .catch(error => 
		
		  console.log(error)
	  );
}


function deleteAll() {
	const arrayFiltered = [{"done": false, "label": "GET/POST/PUT/DELETE"}];
	setTasks(arrayFiltered);
	putLista(arrayFiltered);
}



useEffect(() => {
	getLista()
},[])

return (
	<>
	<h1 className="text-center"><b>App con React-Featch</b></h1>
	<div className="container">
		<input className="list container border-0 py-1 text-secondary" type="text" 
				onChange={(event) => {setNewTask(event.target.value)}} 
				onKeyDown={writeTask} value={newTask} placeholder="Método HTTP"/>
				
		<ul className="list-group list-group-flush">
				{tasks.map((task,index) => { return (<li className="list-group-item py-2 ms-3" key={index}> {task.label}   
					<span className="delete" onClick={() => deletetask(index)}><i className="fas fa-trash-alt"></i></span></li>)
				}
				)}	
		</ul>
			<div className="contador border-top p-4"><span>{tasks.length} </span></div>	
	</div>
	<div>
		<span className="newButton" onClick={() => deleteAll()}><button class="btn btn-outline-light margin-end mt-4" type="button">DELETE</button></span></div>
	</>

	);
};

export default Home;
