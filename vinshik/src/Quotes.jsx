import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Quotes.css";

export default function Quotes() {
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();

  const quotes = [
    {
      id: 1,
      title: "HVAC System Installation",
      client: "ABC Corporation",
      amount: 15000,
      status: "pending",
      createdDate: "2024-01-15",
      expiryDate: "2024-02-15",
      description: "Complete HVAC system installation for new office building",
      items: [
        { name: "HVAC Unit", quantity: 2, price: 5000, total: 10000 },
        { name: "Installation Labor", quantity: 1, price: 3000, total: 3000 },
        { name: "Ductwork", quantity: 1, price: 2000, total: 2000 }
      ]
    },
    {
      id: 2,
      title: "Plumbing Repair Services",
      client: "XYZ Properties",
      amount: 2800,
      status: "accepted",
      createdDate: "2024-01-10",
      expiryDate: "2024-02-10",
      description: "Emergency plumbing repairs for residential complex",
      items: [
        { name: "Pipe Replacement", quantity: 1, price: 1500, total: 1500 },
        { name: "Labor", quantity: 1, price: 800, total: 800 },
        { name: "Materials", quantity: 1, price: 500, total: 500 }
      ]
    },
    {
      id: 3,
      title: "Electrical Maintenance",
      client: "Mall Management Inc",
      amount: 8500,
      status: "rejected",
      createdDate: "2024-01-08",
      expiryDate: "2024-02-08",
      description: "Annual electrical maintenance and safety inspection",
      items: [
        { name: "Safety Inspection", quantity: 1, price: 2000, total: 2000 },
        { name: "Maintenance Labor", quantity: 1, price: 4000, total: 4000 },
        { name: "Parts Replacement", quantity: 1, price: 2500, total: 2500 }
      ]
    },
    {
      id: 4,
      title: "Emergency HVAC Repair",
      client: "Industrial Solutions Co",
      amount: 4200,
      status: "pending",
      createdDate: "2024-01-20",
      expiryDate: "2024-02-20",
      description: "Emergency repair of industrial HVAC system",
      items: [
        { name: "Emergency Service", quantity: 1, price: 1500, total: 1500 },
        { name: "Parts", quantity: 1, price: 2000, total: 2000 },
        { name: "Labor", quantity: 1, price: 700, total: 700 }
      ]
    },
    {
      id: 5,
      title: "General Maintenance Contract",
      client: "Residential Complex LLC",
      amount: 12000,
      status: "accepted",
      createdDate: "2024-01-12",
      expiryDate: "2024-02-12",
      description: "Annual maintenance contract for apartment complex",
      items: [
        { name: "Monthly Maintenance", quantity: 12, price: 800, total: 9600 },
        { name: "Emergency Response", quantity: 1, price: 2400, total: 2400 }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "#ffc107";
      case "accepted": return "#28a745";
      case "rejected": return "#dc3545";
      case "expired": return "#6c757d";
      default: return "#6c757d";
    }
  };

  const filteredQuotes = quotes.filter(quote => {
    return filterStatus === "all" || quote.status === filterStatus;
  });

  const stats = {
    total: quotes.length,
    pending: quotes.filter(q => q.status === "pending").length,
    accepted: quotes.filter(q => q.status === "accepted").length,
    rejected: quotes.filter(q => q.status === "rejected").length,
    totalValue: quotes.reduce((sum, quote) => sum + quote.amount, 0)
  };

  return (
    <div className="quotes-page">
      <div className="quotes-header">
        <h1>✅ Quotes</h1>
        <button onClick={() => navigate("/dashboard")} className="back-btn">
          ← Back to Dashboard
        </button>
      </div>

      <div className="quotes-stats">
        <div className="stat-card">
          <h3>Total Quotes</h3>
          <p className="stat-number">{stats.total}</p>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <p className="stat-number pending">{stats.pending}</p>
        </div>
        <div className="stat-card">
          <h3>Accepted</h3>
          <p className="stat-number accepted">{stats.accepted}</p>
        </div>
        <div className="stat-card">
          <h3>Rejected</h3>
          <p className="stat-number rejected">{stats.rejected}</p>
        </div>
        <div className="stat-card">
          <h3>Total Value</h3>
          <p className="stat-number value">${stats.totalValue.toLocaleString()}</p>
        </div>
      </div>

      <div className="quotes-container">
        <div className="quotes-controls">
          <div className="filters-section">
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="expired">Expired</option>
            </select>
          </div>
          
          <button className="add-quote-btn">+ Create New Quote</button>
        </div>

        <div className="quotes-content">
          <div className="quotes-list">
            <div className="list-header">
              <h3>Quote List ({filteredQuotes.length})</h3>
            </div>
            
            <div className="quotes-grid">
              {filteredQuotes.map(quote => (
                <div 
                  key={quote.id}
                  className={`quote-card ${selectedQuote?.id === quote.id ? 'selected' : ''}`}
                  onClick={() => setSelectedQuote(quote)}
                >
                  <div className="quote-header">
                    <h4>{quote.title}</h4>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(quote.status) }}
                    >
                      {quote.status}
                    </span>
                  </div>
                  
                  <div className="quote-info">
                    <p><strong>Client:</strong> {quote.client}</p>
                    <p><strong>Amount:</strong> ${quote.amount.toLocaleString()}</p>
                    <p><strong>Created:</strong> {quote.createdDate}</p>
                    <p><strong>Expires:</strong> {quote.expiryDate}</p>
                  </div>
                  
                  <div className="quote-description">
                    <p>{quote.description}</p>
                  </div>
                  
                  <div className="quote-summary">
                    <div className="summary-item">
                      <span className="summary-label">Items:</span>
                      <span className="summary-value">{quote.items.length}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Total:</span>
                      <span className="summary-value">${quote.amount.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="quote-actions">
                    <button className="action-btn">📋 View Details</button>
                    <button className="action-btn">📧 Send to Client</button>
                    <button className="action-btn">✏️ Edit Quote</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="quote-sidebar">
            {selectedQuote ? (
              <div className="quote-details">
                <div className="detail-header">
                  <h3>{selectedQuote.title}</h3>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(selectedQuote.status) }}
                  >
                    {selectedQuote.status}
                  </span>
                </div>
                
                <div className="detail-section">
                  <h4>Quote Information</h4>
                  <div className="detail-item">
                    <label>Client:</label>
                    <p>{selectedQuote.client}</p>
                  </div>
                  <div className="detail-item">
                    <label>Total Amount:</label>
                    <p>${selectedQuote.amount.toLocaleString()}</p>
                  </div>
                  <div className="detail-item">
                    <label>Created Date:</label>
                    <p>{selectedQuote.createdDate}</p>
                  </div>
                  <div className="detail-item">
                    <label>Expiry Date:</label>
                    <p>{selectedQuote.expiryDate}</p>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Description</h4>
                  <p className="description">{selectedQuote.description}</p>
                </div>
                
                <div className="detail-section">
                  <h4>Quote Items</h4>
                  <div className="items-list">
                    {selectedQuote.items.map((item, index) => (
                      <div key={index} className="item-row">
                        <div className="item-info">
                          <span className="item-name">{item.name}</span>
                          <span className="item-quantity">x{item.quantity}</span>
                        </div>
                        <div className="item-pricing">
                          <span className="item-price">${item.price.toLocaleString()}</span>
                          <span className="item-total">${item.total.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="total-row">
                    <span className="total-label">Total:</span>
                    <span className="total-amount">${selectedQuote.amount.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="detail-actions">
                  <button className="sidebar-btn">📧 Send to Client</button>
                  <button className="sidebar-btn">📄 Download PDF</button>
                  <button className="sidebar-btn">✏️ Edit Quote</button>
                  <button className="sidebar-btn">📋 Convert to Job</button>
                </div>
              </div>
            ) : (
              <div className="no-selection">
                <p>Select a quote to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
