import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if(tasks.find(task => task.title === newTaskTitle)){
      Alert.alert('Task já cadastrada','Você não pode cadastrar uma task com o mesmo nome');
    }
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks(state => [...state,newTask])
  }

  function handleToggleTaskDone(id: number) {
    setTasks(state => state.map(item => {
      if(item.id === id){
        item.done = !item.done;
      }
      return item;
    }));
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel"
        },
        {
           text: "OK", 
           onPress: () =>  setTasks(state => state.filter(item => item.id !== id))
        }
      ]
    );
  }

  function handleEditTask(taskId: number, taskNewTitle:string){
    setTasks(state => state.map(item => {
      if(item.id === taskId){
        item.title = taskNewTitle;
      }
      return item;
    }))
  }
  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})