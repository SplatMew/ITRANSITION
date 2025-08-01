import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Button, Table, Form,
        OverlayTrigger, Tooltip,
        Alert, Spinner, InputGroup, FormControl} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
function timeAgo(dt){
  if(!dt) return "";
  
  const d = new Date(dt);
  const diff = Math.floor((Date.now()-d.getTime()/1000));
  if(diff<60) return "less than a minute ago";
  if(diff<3600) return `${Math.floor(diff/60)} minutes ago.`;
  if(diff<86400) return `${Math.floor(diff/3600)} hours ago.`;
  return `${Math.floor(diff/86400)} days ago.`;
}

export default function UsersPage({token, logout}){
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const navigate = useNavigate();

  useEffect(() =>{
    fetchUsers();
  },[]);

  const fetchUsers = async ()=>{
    setLoading(true);
    setError('');
    try {
      const {data} = await axios.get('http://localhost:4000/api/users', {
        headers: {Authorization:`Bearer ${token}`}
      });
      setUsers(data);
    } catch (e) {
      setError('Session expired, blocked or deleted. Please log in again.');
      logout();
      navigate('/login');
    }
    setLoading(false);
  };

  const allSelected = users.length && selected.length === users.length;
  const isSelected = (id) => selected.includes(id);
  const handleSelectAll = ()=> setSelected(allSelected ? [] : users.map(u=> u.user_id));
  const handleSelect = (id) =>setSelected(isSelected(id) ? selected.filter(i=> i!== id) : [...selected, id] );

  const handleAction = async (action) =>{
    if(!selected.length) return;
    setLoading(true);
    setStatus(''); 
    setError('');
    try {
      
      await axios.post(
        `http://localhost:4000/api/users/${action}`,
        {ids: selected},
        {headers:{Authorization:`Bearer ${token}`}}
      );
      setStatus(`Operation ${action} successful`);
      setSelected([]);
      await fetchUsers();

    } catch (e) {

      setError(e.response?.data?.error || "Server error");
      if(e.response?.status === 403){
        logout();
        navigate('/login');
      }
    }
    setLoading(false);
  };

  const filteredUsers = users.filter(
    u=>
      u.name.toLowerCase().includes(filter.toLowerCase()) ||
      u.email.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <Button variant="primary" className="me-2"
            onClick={() => handleAction('block')} disabled={!selected.length}>
              Block
          </Button>
          <OverlayTrigger placement="top" overlay={<Tooltip>Unblock selected</Tooltip>}>
            <Button variant="outline-primary" className="me-2"
              onClick={() => handleAction('unblock')} disabled={!selected.length}>
                Unblock
              
            </Button>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>Delete selected</Tooltip>}>
            <Button variant="outline-danger"
              onClick={() => handleAction('delete')} disabled={!selected.length}>
              Delete
            </Button>
          </OverlayTrigger>
        </div>
        <InputGroup style={{width: "210px"}}>
          <FormControl placeholder="Filter" value={filter} onChange={e => setFilter(e.target.value)} />
        </InputGroup>
      </div>
      {/* Status/Error */}
      {error && <Alert variant="danger">{error}</Alert>}
      {status && <Alert variant="success">{status}</Alert>}
      
      {/* Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>
              <Form.Check type="checkbox"
                checked={allSelected}
                onChange={handleSelectAll}
                aria-label="Select all rows"
                title="Select all"
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Last Login</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? <tr><td colSpan="5" className="text-center"><Spinner animation="border" /></td></tr>
            : filteredUsers.map(u => (
              <tr key={u.user_id}>
                <td>
                  <Form.Check type="checkbox"
                    checked={isSelected(u.user_id)}
                    onChange={() => handleSelect(u.user_id)}
                    aria-label={`Select ${u.email}`}
                  />
                </td>
                <td style={{
                  textDecoration: u.status === 'blocked' ? 'line-through' : 'none',
                  color: u.status === 'blocked' ? '#888' : undefined
                }}>
                  {u.name}
                </td>
                <td>{u.email}</td>
                <td>
                  <OverlayTrigger overlay={
                    <Tooltip>
                      {u.last_login_at ? new Date(u.last_login_at).toLocaleString() : "Never"}
                    </Tooltip>
                  }>
                    <span>
                      {u.last_login_at
                        ? timeAgo(u.last_login_at)
                        : <span className="text-muted">never</span>}
                    </span>
                  </OverlayTrigger>
                </td>
                <td>
                  {u.status.charAt(0).toUpperCase() + u.status.slice(1)}
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  );


}
