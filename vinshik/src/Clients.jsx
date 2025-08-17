import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Clients.css";

export default function Clients() {
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();

  const clients = [
    {
      id: 1,
      name: "ABC Corporation",
      contact: "John Smith",
      email: "john.smith@abccorp.com",
      phone: "+1 (555) 123-4567",
      address: "123 Business Ave, Downtown",
      status: "active",
      totalJobs: 15,
      totalRevenue: 45000,
      lastContact: "2024-01-15",
      notes: "Regular maintenance client, prefers morning appointments"
    },
    {
      id: 2,
      name: "XYZ Properties",
      contact: "Sarah Johnson",
      email: "sarah.j@xyzproperties.com",
      phone: "+1 (555) 987-6543",
      address: "456 Real Estate Blvd, Suburbs",
      status: "active",
      totalJobs: 8,
      totalRevenue: 28000,
      lastContact: "2024-01-12",
      notes: "Property management company, multiple locations"
    },
    {
      id: 3,
      name: "Mall Management Inc",
      contact: "Mike Davis",
      email: "mike.davis@mallmgmt.com",
      phone: "+1 (555) 456-7890",
      address: "789 Shopping Center Dr, Mall District",
      status: "inactive",
      totalJobs: 22,
      totalRevenue: 67000,
      lastContact: "2023-12-20",
      notes: "Large commercial client, seasonal maintenance needs"
    },
    {
      id: 4,
      name: "Industrial Solutions Co",
      contact: "Lisa Chen",
      email: "lisa.chen@industrialsolutions.com",
      phone: "+1 (555) 321-0987",
      address: "321 Factory Road, Industrial Zone",
      status: "prospect",
      totalJobs: 0,
      totalRevenue: 0,
      lastContact: "2024-01-10",
      notes: "New prospect, interested in HVAC services"
    },
    {
      id: 5,
      name: "Residential Complex LLC",
      contact: "David Wilson",
      email: "david.wilson@rescomplex.com",
      phone: "+1 (555) 654-3210",
      address: "654 Apartment Lane, Residential Area",
      status: "active",
      totalJobs: 12,
      totalRevenue: 38000,
      lastContact: "2024-01-18",
      notes: "Apartment complex, emergency service priority"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "#28a745";
      case "inactive": return "#6c757d";
      case "prospect": return "#ffc107";
      default: return "#6c757d";
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || client.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: clients.length,
    active: clients.filter(c => c.status === "active").length,
    inactive: clients.filter(c => c.status === "inactive").length,
    prospects: clients.filter(c => c.status === "prospect").length
  };

  return (
    <div className="clients-page">
      <div className="clients-header">
        <h1>👥 Clients</h1>
        <button onClick={() => navigate("/dashboard")} className="back-btn">
          ← Back to Dashboard
        </button>
      </div>

      <div className="clients-stats">
        <div className="stat-card">
          <h3>Total Clients</h3>
          <p className="stat-number">{stats.total}</p>
        </div>
        <div className="stat-card">
          <h3>Active Clients</h3>
          <p className="stat-number active">{stats.active}</p>
        </div>
        <div className="stat-card">
          <h3>Inactive Clients</h3>
          <p className="stat-number inactive">{stats.inactive}</p>
        </div>
        <div className="stat-card">
          <h3>Prospects</h3>
          <p className="stat-number prospect">{stats.prospects}</p>
        </div>
      </div>

      <div className="clients-container">
        <div className="clients-controls">
          <div className="search-section">
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-section">
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="prospect">Prospects</option>
            </select>
            
            <button className="add-client-btn">+ Add New Client</button>
          </div>
        </div>

        <div className="clients-content">
          <div className="clients-list">
            <div className="list-header">
              <h3>Client List ({filteredClients.length})</h3>
            </div>
            
            <div className="clients-grid">
              {filteredClients.map(client => (
                <div 
                  key={client.id}
                  className={`client-card ${selectedClient?.id === client.id ? 'selected' : ''}`}
                  onClick={() => setSelectedClient(client)}
                >
                  <div className="client-header">
                    <h4>{client.name}</h4>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(client.status) }}
                    >
                      {client.status}
                    </span>
                  </div>
                  
                  <div className="client-info">
                    <p><strong>Contact:</strong> {client.contact}</p>
                    <p><strong>Email:</strong> {client.email}</p>
                    <p><strong>Phone:</strong> {client.phone}</p>
                  </div>
                  
                  <div className="client-stats">
                    <div className="stat-item">
                      <span className="stat-label">Jobs</span>
                      <span className="stat-value">{client.totalJobs}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Revenue</span>
                      <span className="stat-value">${client.totalRevenue.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="client-actions">
                    <button className="action-btn">📞 Call</button>
                    <button className="action-btn">📧 Email</button>
                    <button className="action-btn">📋 View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="client-sidebar">
            {selectedClient ? (
              <div className="client-details">
                <div className="detail-header">
                  <h3>{selectedClient.name}</h3>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(selectedClient.status) }}
                  >
                    {selectedClient.status}
                  </span>
                </div>
                
                <div className="detail-section">
                  <h4>Contact Information</h4>
                  <div className="detail-item">
                    <label>Contact Person:</label>
                    <p>{selectedClient.contact}</p>
                  </div>
                  <div className="detail-item">
                    <label>Email:</label>
                    <p>{selectedClient.email}</p>
                  </div>
                  <div className="detail-item">
                    <label>Phone:</label>
                    <p>{selectedClient.phone}</p>
                  </div>
                  <div className="detail-item">
                    <label>Address:</label>
                    <p>{selectedClient.address}</p>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Business Information</h4>
                  <div className="detail-item">
                    <label>Total Jobs:</label>
                    <p>{selectedClient.totalJobs}</p>
                  </div>
                  <div className="detail-item">
                    <label>Total Revenue:</label>
                    <p>${selectedClient.totalRevenue.toLocaleString()}</p>
                  </div>
                  <div className="detail-item">
                    <label>Last Contact:</label>
                    <p>{selectedClient.lastContact}</p>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Notes</h4>
                  <p className="notes">{selectedClient.notes}</p>
                </div>
                
                <div className="detail-actions">
                  <button className="sidebar-btn">📞 Call Client</button>
                  <button className="sidebar-btn">📧 Send Email</button>
                  <button className="sidebar-btn">📋 View Jobs</button>
                  <button className="sidebar-btn">✏️ Edit Client</button>
                </div>
              </div>
            ) : (
              <div className="no-selection">
                <p>Select a client to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
