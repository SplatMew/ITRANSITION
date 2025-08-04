import React, { useState } from 'react';
import SettingsPanel from './modules/SettingPanel';
import BookTable from './modules/BookTable';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [settings, setSettings] = useState({
    seed: 1, 
    language: 'en', 
    likes: 5, 
    reviews: 5
  });

  return (
    <div>
      <SettingsPanel onChange={setSettings} />
      <BookTable settings={settings} />
    </div>
  );
}

export default App;