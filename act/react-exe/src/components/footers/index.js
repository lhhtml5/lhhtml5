import React,{Component} from 'react';
import './index.css';
export default class Footer extends Component{
  deleteAlldone=()=>{
    if(window.confirm('确认删除？')){
       this.props.deleteAll();
    }
  }
  countDone=()=>{
    return this.props.todos.filter((tO)=>tO.done).length
  }
  upAll =(e)=>{
    this.props.upDataAll(e.target.checked);
  }
  render(){
    const {todos}=this.props;
    return(
      <div className='todo-footer'>
      <label>
        <input type='checkbox' onChange={this.upAll}
        checked={todos.length===this.countDone()&&todos.length>0}/>
      </label>
      <span>
        <span>已完成{this.countDone()}</span> / 全部{todos.length}
      </span>
      <button className='btn btn-danger' onClick={this.deleteAlldone} >清除已完成任务</button>
    </div>
    )
  }
}