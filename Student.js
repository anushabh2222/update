import { React, Component } from 'react';
import './App.css';


class Student extends Component {
  constructor(){
    super();
    this.state = {
      // title : " web Application",
      act : 0,
      idx : '',
      datas : []
    }
  }

  componentDidMount(){
    fetch('http://localhost:8080/api/list')
    .then(response=>response.json()).then(data=>{
      console.log(data)
      this.setState({datas:data})
     

       });
      }
 

    

  handleSubmit=(e)=>{
    e.preventDefault();
    let datas = this.state.datas;
    let id = this.refs.id.value;
    let name = this.refs.name.value;
    let specification = this.refs.specification.value;
    let dob = this.refs.dob.value;
    let createddate = this.refs.createddate.value;

    if(this.state.act === 0)
    {
      let data = {
        "id":id,
        "name" : name,
        "specification" : specification,
        "dob":dob,
        "createddate":createddate
      }

      datas.push(data);
      fetch(`http://localhost:8080/api/create`,{
            method : 'POST',
            headers:{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        }).then(response=>response.json()).then(data=>{
            console.log(data)
            
        });

    }
    else
    {
        let index = this.state.idx;
        datas[index].id = id;
        datas[index].name = name;
        datas[index].specification = specification;    
        datas[index].dob = dob;
        datas[index].createddate = createddate;
        let data = {
          "id":id,
          "name" : name,
          "specification" : specification,
          "dob":dob,
          "createddate":createddate
        }  
        fetch(`http://localhost:8080/api/update`,{
            method : 'PUT',
            headers:{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        }).then(response=>response.json()).then(data=>{
            console.log(data)
            let updatedStudents=[this.state.student];
    this.setState({student:updatedStudents});
            
        });
}       
    
    
    
    this.setState({
      datas : datas,
      act : 0
    })
    this.refs.myForm.reset();
    this.refs.id.focus();
  }

  handleDelete = (index,obj) =>{
    let datas = this.state.datas;
    datas.splice(index,1);
    this.setState({
      datas:datas
    })
    this.refs.id.focus();
   fetch(`http://localhost:8080/api/delete/${obj.id}`,{
    method:'DELETE',
    
  }) .then(response=>response.json()).then(data=>{
    console.log(data)
  });
  }
  
async remove(id)
{
  console.log(id)
  
  let updatedStudents=[this.state.student].filter(i=>i.id!==id);
  this.setState({student:updatedStudents});
  

}




  handleEdit = (index) => {
    let data = this.state.datas[index];
    this.refs.id.value = data.id;
    this.refs.name.value = data.name;
    this.refs.specification.value = data.specification;
    this.refs.dob.value = data.dob;
    this.refs.createddate.value = data.createddate;
    

    this.setState({
      act: 1,
      idx : index
    })
    
  }
  async update()
{
  
  // fetch(`/api/update`,{
  //   method:'PUT',
  //   headers:{
  //     'Accept':'application/json',
  //     'Content-Type':'application/json'
  //   }
  // }).then(()=>{
  //   let updatedStudents=[this.state.student];
  //   this.setState({student:updatedStudents});
  // });

}
  
  render() { 
    let datas = this.state.datas;
    return ( 
      <div className="App">
      
        <form ref="myForm" className="myForm">
        <h1>{this.state.title}</h1>
        <h2>student registration</h2>
          <label>Enrollment number</label>
          <input type="text" ref="id" placeholder="Enter roll number" className="formField"/>
          <label>Name</label>
          <input type="text" ref="name" placeholder="Enter name" className="formField"/>
          <label>Specification</label>
          <input type="text" ref="specification" placeholder="Enter specification"  className="formField"/>
          <label>Dob</label>
          <input type="text" ref="dob" placeholder="Enter dob" className="formField"/>
          <label>Created date</label>
          <input type="text" ref="createddate" placeholder="Enter created date" className="formField"/>
          
          <button onClick={e => this.handleSubmit(e)} className="myButton"> Save</button>
        </form>
        <pre className="listView">
          {this.state.datas.map((data,index)=>
            <li key={index}>  
            {data.id},{data.name} ,{data.specification},{data.dob},{data.createddate}  
            <button onClick={e => this.handleDelete(index,data)} className="myListButton">Delete</button>
            <button onClick={e => this.handleEdit (index)} className="myListButton">Edit</button>
            </li>
            )
          }
        </pre>
      </div>
     );
  }
}
 
export default Student;