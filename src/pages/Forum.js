import React, { useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const courses = [
  'General',
  'CS 11', 'CS 12', 'CS 21', 'CS 30', 'CS 31', 'CS 32', 'CS 33', 'CS 140', 'CS 150', 'CS 153', 'CS 165', 'CS 180', 'CS 191', 'CS 192', 'CS 194', 'CS 195', 'CS 198', 'CS 199/200',
  'Math 21', 'Math 22', 'Math 23', 'Math 40',
  'Physics 71', 'Physics 72',
  // ...add more as needed
];

function Forum() {
  const [threads, setThreads] = useState([]); // [{id, title, course, author, createdAt, posts: [{author, content, createdAt}]}]
  const [selectedCourse, setSelectedCourse] = useState('General');
  const [newThread, setNewThread] = useState({ title: '', content: '' });
  const [activeThread, setActiveThread] = useState(null);
  const [reply, setReply] = useState('');
  const navigate = useNavigate();

  // Require login
  if (!auth.currentUser) {
    navigate('/login');
    return null;
  }

  const filteredThreads = threads.filter(t => t.course === selectedCourse);

  const handleCreateThread = (e) => {
    e.preventDefault();
    if (!newThread.title.trim() || !newThread.content.trim()) return;
    const thread = {
      id: Date.now().toString(),
      title: newThread.title,
      course: selectedCourse,
      author: auth.currentUser.email,
      createdAt: new Date().toISOString(),
      posts: [{ author: auth.currentUser.email, content: newThread.content, createdAt: new Date().toISOString() }]
    };
    setThreads(prev => [thread, ...prev]);
    setNewThread({ title: '', content: '' });
  };

  const handleReply = (e) => {
    e.preventDefault();
    if (!reply.trim()) return;
    setThreads(prev => prev.map(t =>
      t.id === activeThread.id
        ? { ...t, posts: [...t.posts, { author: auth.currentUser.email, content: reply, createdAt: new Date().toISOString() }] }
        : t
    ));
    setReply('');
  };

  return (
    <>
      <NavBar />
      <main className="max-w-4xl mx-auto mt-8 bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8 min-h-[70vh]">
        <h1 className="text-2xl font-bold mb-4">Discussion Forum</h1>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar: Course Tabs */}
          <div className="md:w-1/4">
            <div className="mb-4 font-semibold">Courses</div>
            <div className="flex md:flex-col gap-2 overflow-x-auto">
              {courses.map(c => (
                <button
                  key={c}
                  className={`px-3 py-1 rounded ${selectedCourse === c ? 'bg-primary text-white' : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-white'}`}
                  onClick={() => { setSelectedCourse(c); setActiveThread(null); }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          {/* Main: Thread List or Thread View */}
          <div className="flex-1">
            {!activeThread ? (
              <>
                {/* New Thread Form */}
                <form onSubmit={handleCreateThread} className="mb-6 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg shadow">
                  <div className="mb-2">
                    <input
                      type="text"
                      placeholder="Thread Title"
                      value={newThread.title}
                      onChange={e => setNewThread(t => ({ ...t, title: e.target.value }))}
                      className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white mb-2"
                      required
                    />
                    <textarea
                      placeholder="Post content..."
                      value={newThread.content}
                      onChange={e => setNewThread(t => ({ ...t, content: e.target.value }))}
                      className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white min-h-[60px]"
                      required
                    />
                  </div>
                  <button type="submit" className="px-4 py-2 rounded bg-primary text-white font-semibold hover:bg-primary/90 shadow">Create Thread</button>
                </form>
                {/* Thread List */}
                <div>
                  {filteredThreads.length === 0 ? (
                    <div className="text-neutral-500">No threads yet. Start the discussion!</div>
                  ) : (
                    filteredThreads.map(thread => (
                      <div key={thread.id} className="mb-4 p-4 bg-neutral-100 dark:bg-neutral-900 rounded-lg shadow cursor-pointer hover:bg-primary/10" onClick={() => setActiveThread(thread)}>
                        <div className="font-bold text-lg">{thread.title}</div>
                        <div className="text-xs text-neutral-500">By {thread.author} • {new Date(thread.createdAt).toLocaleString()}</div>
                        <div className="text-sm mt-2 line-clamp-2">{thread.posts[0].content}</div>
                      </div>
                    ))
                  )}
                </div>
              </>
            ) : (
              <div>
                <button className="mb-4 text-primary underline" onClick={() => setActiveThread(null)}>&larr; Back to Threads</button>
                <div className="mb-4 p-4 bg-neutral-100 dark:bg-neutral-900 rounded-lg shadow">
                  <div className="font-bold text-lg">{activeThread.title}</div>
                  <div className="text-xs text-neutral-500">By {activeThread.author} • {new Date(activeThread.createdAt).toLocaleString()}</div>
                </div>
                <div className="mb-6">
                  {activeThread.posts.map((post, idx) => (
                    <div key={idx} className="mb-3 p-3 rounded bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                      <div className="text-sm font-semibold">{post.author}</div>
                      <div className="text-xs text-neutral-500 mb-1">{new Date(post.createdAt).toLocaleString()}</div>
                      <div>{post.content}</div>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleReply} className="flex flex-col gap-2">
                  <textarea
                    placeholder="Write a reply..."
                    value={reply}
                    onChange={e => setReply(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white min-h-[60px]"
                    required
                  />
                  <button type="submit" className="px-4 py-2 rounded bg-primary text-white font-semibold hover:bg-primary/90 shadow self-end">Reply</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default Forum; 