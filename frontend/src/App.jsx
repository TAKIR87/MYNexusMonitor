import { useState, useEffect } from 'react';

function App() {
  const [incidents, setIncidents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/incidents`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => setIncidents(data.data))
      .catch(err => {
        console.error("Ошибка загрузки:", err);
        setError("Не удалось подключиться к API NexusMonitor. Проверьте консоль разработчика.");
      });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>NexusMonitor: Панель управления</h1>
      {error ? <p style={{color: 'red'}}>{error}</p> : <p>Загружено инцидентов: {incidents.length}</p>}
    </div>
  );
}

export default App;