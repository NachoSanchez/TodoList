import React,{ Component } from 'react';

class App extends Component{

    constructor() {
        super();
        this.state= {
            title: '',
            description: '',
            status: false,
            _id: '',
            tasks: [],
        }
        this.createTask = this.createTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }

    toggleClass() {
        const currentState = task.status;
        this.setState({ status: !currentState });
    };

    createTask(e){
        if(this.state._id){
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify({
                  title: this.state.title,
                  description: this.state.description
                }),
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
              this.setState({_id: '', title: '', description: ''});
              this.readTasks();
            })
        }else{
            fetch('/api/tasks',{
                method: 'POST',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept':'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(this.setState({
                        title: '',
                        description: '',
                        status: false
                    }))
                this.readTasks();
        }
        e.preventDefault()   
    }

    componentDidMount(){
        this.readTasks()
    }

    readTasks(){
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                this.setState({tasks: data})
            })
            .catch(err => console.log(err))

    }

    updateTask(id){
        fetch(`/api/tasks/${id}`)
        .then(res => res.json())
        .then(data => {
        console.log(data);
        this.setState({
          title: data.title,
          description: data.description,
          _id: data._id
        });
      });
    }

    deleteTask(id){
        fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
        }})
        .then(() =>{
            this.readTasks();
        })
    }


    handleChange(e){
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    render(){
        return (

            <div className="container">
                <form onSubmit={this.createTask}>
                    <input type="text" name="title" onChange={this.handleChange} 
                    placeholder="Escribe un título.." value={this.state.title}/>
                    <textarea name="description" onChange={this.handleChange} 
                    rows="5"cols="15" value={this.state.description}
                    placeholder="La descripcion de tu tarea va aqui..."></textarea>
                    <button className="btn" type="submit">
                        <li className="add"></li>Guardar
                    </button>
                </form>
            
                <main>
                    {this.state.tasks.map(task=> {
                        return (
                            <div key={task._id}>
                                <h1>{task.title}</h1>
                                <p>
                                    {task.description}
                                </p>
                              { /*ToggleClass!!
                                <button className={this.state.status ? 'done-inactive' : 'done' }
                                onClick={()=>{this.doneTask(task._id)}}></button>*/ }

                                <button className="edit-inactive" 
                                onClick={() => this.updateTask(task._id)}></button>

                                <button className="delete-inactive"
                                onClick={() => this.deleteTask(task._id)}></button>
                            </div>
                        )
                    })}
                   
                </main>
            </div>
        
        )
    }
}

export default App;