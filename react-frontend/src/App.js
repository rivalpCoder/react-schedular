import React, { useState, useEffect } from 'react';
import './App.css';

const STATUS_COLORS = {
  success: '#22c55e', running: '#3b82f6', failed: '#ef4444',
  pending: '#f59e0b', healthy: '#22c55e', degraded: '#f59e0b', down: '#ef4444',
};

function Badge({ status }) {
  return (
    <span style={{ background: STATUS_COLORS[status] || '#6b7280', color: '#fff', padding: '2px 10px', borderRadius: 12, fontSize: 12 }}>
      {status}
    </span>
  );
}

function PipelinesTable({ data }) {
  return (
    <table>
      <thead><tr><th>Name</th><th>Branch</th><th>Status</th><th>Duration</th><th>Triggered By</th></tr></thead>
      <tbody>
        {data.map(p => (
          <tr key={p.id}>
            <td>{p.name}</td><td>{p.branch}</td>
            <td><Badge status={p.status} /></td>
            <td>{p.duration}</td><td>{p.triggered_by}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ServicesTable({ data }) {
  return (
    <table>
      <thead><tr><th>Name</th><th>Env</th><th>Status</th><th>Uptime</th><th>Region</th></tr></thead>
      <tbody>
        {data.map(s => (
          <tr key={s.id}>
            <td>{s.name}</td><td>{s.env}</td>
            <td><Badge status={s.status} /></td>
            <td>{s.uptime}</td><td>{s.region}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function TeamTable({ data }) {
  return (
    <table>
      <thead><tr><th>Name</th><th>Role</th><th>Email</th><th>Tools</th></tr></thead>
      <tbody>
        {data.map(m => (
          <tr key={m.id}>
            <td>{m.name}</td><td>{m.role}</td><td>{m.email}</td>
            <td>{m.tools.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const TABS = ['Pipelines', 'Services', 'Team'];

export default function App() {
  const [tab, setTab] = useState('Pipelines');
  const [data, setData] = useState({ pipelines: [], services: [], team: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/pipelines').then(r => r.json()),
      fetch('/api/services').then(r => r.json()),
      fetch('/api/team').then(r => r.json()),
    ])
      .then(([pipelines, services, team]) => { setData({ pipelines, services, team }); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  return (
    <div className="app">
      <header><h1>DevOps Dashboard</h1></header>
      <nav>
        {TABS.map(t => (
          <button key={t} className={tab === t ? 'active' : ''} onClick={() => setTab(t)}>{t}</button>
        ))}
      </nav>
      <main>
        {loading && <p>Loading...</p>}
        {error && <p className="error">Error: {error}</p>}
        {!loading && !error && (
          <>
            {tab === 'Pipelines' && <PipelinesTable data={data.pipelines} />}
            {tab === 'Services' && <ServicesTable data={data.services} />}
            {tab === 'Team' && <TeamTable data={data.team} />}
          </>
        )}
      </main>
    </div>
  );
}
