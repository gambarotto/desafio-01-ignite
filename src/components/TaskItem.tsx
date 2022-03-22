import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import editPen from '../assets/icons/edit/edit.png';

interface IItem {
  id: number;
  title: string;
  done: boolean;
}
interface TasksListProps {
  task: IItem;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number, taskNewTitle:string) => void;
}

export function TaskItem({ task, index,toggleTaskDone, removeTask, editTask }: TasksListProps) {
  const textInputRef = useRef<TextInput>(null)
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  useEffect(() => {
    if(textInputRef.current){
      if(isEditing){
        textInputRef.current.focus();
      }else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  function handleStartEditing(){
    console.log('oi');
    
    setIsEditing(true);
  }
  function handleCancelEditing(){
    setIsEditing(false);
    setNewTitle(task.title);
  }
  function handleSubmitEditing(){
    editTask(task.id, newTitle);
    setIsEditing(false);
  }
  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View 
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>
          <TextInput 
            ref={textInputRef}
            style={task.done ? styles.taskTextDone : styles.taskText}
            value={newTitle}
            onChangeText={setNewTitle}
            editable={isEditing}
            onSubmitEditing={() => handleSubmitEditing()}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
        {
          isEditing ?
            (<TouchableOpacity onPress={handleCancelEditing}>
              <Icon name='x' color='#b2b2b2'/>
            </TouchableOpacity>) :
            (<TouchableOpacity onPress={handleStartEditing}>
              <Image source={editPen}/>
            </TouchableOpacity>)
        }
        <View style={{width:1, backgroundColor: 'red'}} />
        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 24, opacity: isEditing ? 0.2 : 1}}
          onPress={() => removeTask(task.id)}
          disabled={isEditing}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
        
      </View>

    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
});