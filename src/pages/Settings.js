import React, { useState } from 'react';
import NavBar from '../components/NavBar/NavBar';

function Settings() {
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only absolute top-2 left-2 bg-primary text-white px-3 py-1 rounded z-50">Skip to Content</a>
      <NavBar />
      <main id="main-content" tabIndex="-1" className="max-w-2xl mx-auto mt-8 bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8 focus:outline-primary">
        <h1 className="text-2xl font-bold mb-4">Settings & Accessibility</h1>
        <div className="space-y-6">
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={theme === 'dark'}
                onChange={handleThemeToggle}
                aria-label="Toggle dark mode"
                className="accent-primary w-5 h-5 rounded focus:ring-2 focus:ring-primary"
              />
              <span className="font-semibold">Dark Mode</span>
            </label>
          </div>
          <div>
            <button
              className="underline text-primary font-semibold mb-2"
              onClick={() => setShowKeyboardHelp(v => !v)}
              aria-expanded={showKeyboardHelp}
              aria-controls="keyboard-help"
            >
              {showKeyboardHelp ? 'Hide' : 'Show'} Keyboard Navigation Help
            </button>
            {showKeyboardHelp && (
              <div id="keyboard-help" className="mt-2 bg-neutral-100 dark:bg-neutral-700 rounded p-4 text-sm">
                <ul className="list-disc pl-5">
                  <li>Tab/Shift+Tab: Move between interactive elements</li>
                  <li>Enter/Space: Activate buttons/links</li>
                  <li>Esc: Close modals or dialogs</li>
                  <li>Arrow keys: Navigate dropdowns/menus</li>
                </ul>
              </div>
            )}
          </div>
          <div>
            <h2 className="font-semibold mb-2">Screen Reader Tips</h2>
            <ul className="list-disc pl-5 text-sm">
              <li>All main actions and navigation are accessible by keyboard.</li>
              <li>Use the "Skip to Content" link at the top for faster navigation.</li>
              <li>Form fields and buttons have ARIA labels for clarity.</li>
              <li>Use your screen reader's shortcuts for headings, links, and form fields.</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}

export default Settings; 