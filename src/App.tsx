import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ContactForm from './components/ContactForm';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faPencil } from '@fortawesome/free-solid-svg-icons/faPencil';
import './App.css'

interface Todo {
  id: number;
  text: string;
  phoneNumber: string;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const addTodo = (text: string, phoneNumber: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      phoneNumber,
    };
    setTodos([...todos, newTodo]);
  };

  const editTodo = (id: number, text: string, phoneNumber: string) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, text, phoneNumber } : todo));
    setEditingTodo(null);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className='d-flex' style={{padding:"5% 15%"}}>
      <ContactForm onSubmit={addTodo} />
      <section className='w-50 border-start ps-5'>
        <h1 style={{fontWeight:600}}>Contatos da empresa</h1>
        <h3 className='text-secondary mb-5'>Administre os contatos</h3>
        <div>
          {todos.map(todo => (
            <div key={todo.id} className='border-bottom d-flex flex-row'>
              <div>
                <strong>{todo.text}</strong>
                <p>{todo.phoneNumber}</p>
              </div>
                {editingTodo && editingTodo.id === todo.id ? (
                  <ContactForm
                    onSubmit={(text, phoneNumber) => editTodo(todo.id, text, phoneNumber)}
                    initialText={todo.text}
                    initialPhoneNumber={todo.phoneNumber}
                  />
                ) : (
                  <div  className='d-flex' style={{marginLeft:"auto"}}>
                    <div className='mt-4 me-4' onClick={() => setEditingTodo(todo)}><FontAwesomeIcon icon={faPencil} /> </div>
                    <div className='mt-4' onClick={() => deleteTodo(todo.id)}><FontAwesomeIcon icon={faTrash} /></div>
                  </div>
                )}
              </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default App;
