import { useState } from 'react';
import { useParams, useLoaderData } from 'react-router-dom';
import * as todoService from '../services/todoService';
import './TodoPage.css';

// ה-loader מושך את הנתונים לפני שהעמוד נטען
export const todosLoader = async ({ params }) => {
  return await todoService.getTodosByUserId(params.userId);
};

function TodosPage() {
  const { userId } = useParams();
  // מקבלים את המידע שהגיע מה-loader
  const initialTodos = useLoaderData();
  
  // מאתחלים את הסטייט עם המידע הטעון
  const [todos, setTodos] = useState(initialTodos || []);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('title');
  const [sortBy, setSortBy] = useState('id');
  const [newTodoTitle, setNewTodoTitle] = useState('');

  // פונקציה להוספת משימה
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;
    const newTodo = { userId, title: newTodoTitle, completed: false };
    const savedTodo = await todoService.addTodo(newTodo);
    if (savedTodo) setTodos([...todos, savedTodo]);
    setNewTodoTitle('');
  };

  // פונקציה לשינוי סטטוס משימה
  const handleToggle = async (todo) => {
    const updatedTodoData = { ...todo, completed: !todo.completed };
    const updated = await todoService.updateTodo(todo.id, updatedTodoData);
    if (updated) setTodos(todos.map(t => t.id === todo.id ? updated : t));
  };

  // פונקציה לעדכון כותרת
  const handleUpdateTitle = async (todo) => {
    const newTitle = prompt("Update task title:", todo.title);
    if (newTitle && newTitle !== todo.title) {
      const updatedTodoData = { ...todo, title: newTitle };
      const updated = await todoService.updateTodo(todo.id, updatedTodoData);
      if (updated) setTodos(todos.map(t => t.id === todo.id ? updated : t));
    }
  };

  // פונקציה למחיקת משימה
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      const success = await todoService.deleteTodo(id);
      if (success) setTodos(todos.filter(t => t.id !== id));
    }
  };

  // לוגיקת סינון ומיון
  const filteredAndSortedTodos = todos
    .filter(todo => {
      if (!searchQuery) return true;
      const val = searchCriteria === 'completed' ? String(todo.completed) : String(todo[searchCriteria]);
      return val.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'completed') return a.completed - b.completed;
      return a.id - b.id;
    });

  return (
    <div className="page-container">
      <h1>My Tasks</h1>
      <div className="controls-section">
        <form onSubmit={handleAdd} className="action-form">
          <input 
            value={newTodoTitle} 
            onChange={(e) => setNewTodoTitle(e.target.value)} 
            placeholder="Add new task..." 
          />
          <button type="submit">Add</button>
        </form>

        <div className="filters-row">
          <div className="filter-group">
            <input 
              placeholder={`Search by ${searchCriteria}...`} 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
            <select value={searchCriteria} onChange={(e) => setSearchCriteria(e.target.value)}>
              <option value="title">Title</option>
              <option value="id">ID</option>
              <option value="completed">Status</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort by: </label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="id">ID</option>
              <option value="title">Title</option>
              <option value="completed">Completion</option>
            </select>
          </div>
        </div>
      </div>

      <ul className="data-list">
        {filteredAndSortedTodos.map(todo => (
          <li key={todo.id} className={`list-item ${todo.completed ? 'completed' : ''}`}>
            <span className="item-id">#{todo.id}</span>
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => handleToggle(todo)} 
            />
            <span className="item-title" onClick={() => handleUpdateTitle(todo)}>
              {todo.title}
            </span>
            <button className="delete-btn" onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodosPage;