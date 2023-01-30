import React from 'react';
import Delivery from '../Components/myTasks/Delivery';


const TasksContainer=()=>{
    return(
        <div>Hello this is the tasks page
            <Delivery isCompleted={true}></Delivery>   
        </div>
    )
}

export default TasksContainer; 