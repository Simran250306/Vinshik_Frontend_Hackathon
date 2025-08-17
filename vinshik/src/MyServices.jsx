import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyServices.css";

export default function MyServices() {
  const [selectedService, setSelectedService] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      name: "HVAC Installation & Repair",
      category: "HVAC",
      description: "Complete HVAC system installation, maintenance, and emergency repair services",
      basePrice: 150,
      hourlyRate: 85,
      availability: "24/7 Emergency Service",
      features: [
        "System Installation",
        "Regular Maintenance",
        "Emergency Repairs",
        "Filter Replacement",
        "Duct Cleaning",
        "Energy Efficiency Upgrades"
      ],
      image: "❄️",
      status: "active",
      totalJobs: 45,
      avgRating: 4.8
    },
    {
      id: 2,
      name: "Plumbing Services",
      category: "Plumbing",
      description: "Comprehensive plumbing services for residential and commercial properties",
      basePrice: 100,
      hourlyRate: 75,
      availability: "Business Hours + Emergency",
      features: [
        "Pipe Installation",
        "Leak Repairs",
        "Drain Cleaning",
        "Fixture Installation",
        "Water Heater Service",
        "Emergency Plumbing"
      ],
      image: "🔧",
      status: "active",
      totalJobs: 32,
      avgRating: 4.9
    },
    {
      id: 3,
      name: "Electrical Services",
      category: "Electrical",
      description: "Professional electrical installation, maintenance, and safety inspections",
      basePrice: 120,
      hourlyRate: 90,
      availability: "Business Hours",
      features: [
        "Wiring Installation",
        "Panel Upgrades",
        "Safety Inspections",
        "Lighting Installation",
        "Electrical Repairs",
        "Code Compliance"
      ],
      image: "⚡",
      status: "active",
      totalJobs: 28,
      avgRating: 4.7
    },
    {
      id: 4,
      name: "General Maintenance",
      category: "Maintenance",
      description: "Comprehensive maintenance services for buildings and facilities",
      basePrice: 80,
      hourlyRate: 65,
      availability: "Business Hours",
      features: [
        "Preventive Maintenance",
        "Building Inspections",
        "Minor Repairs",
        "Equipment Service",
        "Safety Checks",
        "Cleaning Services"
      ],
      image: "🔨",
      status: "active",
      totalJobs: 56,
      avgRating: 4.6
    },
    {
      id: 5,
      name: "Emergency Response",
      category: "Emergency",
      description: "24/7 emergency response services for urgent repairs and issues",
      basePrice: 200,
      hourlyRate: 120,
      availability: "24/7 Emergency",
      features: [
        "24/7 Availability",
        "Rapid Response",
        "Emergency Repairs",
        "Safety Assessments",
        "Temporary Solutions",
        "Follow-up Service"
      ],
      image: "🚨",
      status: "active",
      totalJobs: 18,
      avgRating: 4.9
    }
  ];

  const categories = ["all", "HVAC", "Plumbing", "Electrical", "Maintenance", "Emergency"];

  const filteredServices = services.filter(service => {
    return filterCategory === "all" || service.category === filterCategory;
  });

  const stats = {
    total: services.length,
    active: services.filter(s => s.status === "active").length,
    totalJobs: services.reduce((sum, service) => sum + service.totalJobs, 0),
    avgRating: (services.reduce((sum, service) => sum + service.avgRating, 0) / services.length).toFixed(1)
  };

  return (
    <div className="services-page">
      <div className="services-header">
        <h1>📋 My Services</h1>
        <button onClick={() => navigate("/dashboard")} className="back-btn">
          ← Back to Dashboard
        </button>
      </div>

      <div className="services-stats">
        <div className="stat-card">
          <h3>Total Services</h3>
          <p className="stat-number">{stats.total}</p>
        </div>
        <div className="stat-card">
          <h3>Active Services</h3>
          <p className="stat-number active">{stats.active}</p>
        </div>
        <div className="stat-card">
          <h3>Total Jobs</h3>
          <p className="stat-number jobs">{stats.totalJobs}</p>
        </div>
        <div className="stat-card">
          <h3>Avg Rating</h3>
          <p className="stat-number rating">⭐ {stats.avgRating}</p>
        </div>
      </div>

      <div className="services-container">
        <div className="services-controls">
          <div className="filters-section">
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
          
          <button className="add-service-btn">+ Add New Service</button>
        </div>

        <div className="services-content">
          <div className="services-list">
            <div className="list-header">
              <h3>Service List ({filteredServices.length})</h3>
            </div>
            
            <div className="services-grid">
              {filteredServices.map(service => (
                <div 
                  key={service.id}
                  className={`service-card ${selectedService?.id === service.id ? 'selected' : ''}`}
                  onClick={() => setSelectedService(service)}
                >
                  <div className="service-header">
                    <div className="service-icon">
                      <span className="icon">{service.image}</span>
                    </div>
                    <div className="service-title">
                      <h4>{service.name}</h4>
                      <span className="category-badge">{service.category}</span>
                    </div>
                  </div>
                  
                  <div className="service-description">
                    <p>{service.description}</p>
                  </div>
                  
                  <div className="service-pricing">
                    <div className="price-item">
                      <span className="price-label">Base Price:</span>
                      <span className="price-value">${service.basePrice}</span>
                    </div>
                    <div className="price-item">
                      <span className="price-label">Hourly Rate:</span>
                      <span className="price-value">${service.hourlyRate}/hr</span>
                    </div>
                  </div>
                  
                  <div className="service-stats">
                    <div className="stat-item">
                      <span className="stat-label">Jobs</span>
                      <span className="stat-value">{service.totalJobs}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Rating</span>
                      <span className="stat-value">⭐ {service.avgRating}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Availability</span>
                      <span className="stat-value">{service.availability}</span>
                    </div>
                  </div>
                  
                  <div className="service-features">
                    <h5>Key Features:</h5>
                    <div className="features-list">
                      {service.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="feature-tag">{feature}</span>
                      ))}
                      {service.features.length > 3 && (
                        <span className="feature-tag more">+{service.features.length - 3} more</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="service-actions">
                    <button className="action-btn">✏️ Edit Service</button>
                    <button className="action-btn">📊 View Analytics</button>
                    <button className="action-btn">📋 Manage Pricing</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="service-sidebar">
            {selectedService ? (
              <div className="service-details">
                <div className="detail-header">
                  <div className="service-icon-large">
                    <span className="icon">{selectedService.image}</span>
                  </div>
                  <div className="service-info">
                    <h3>{selectedService.name}</h3>
                    <span className="category-badge">{selectedService.category}</span>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Service Information</h4>
                  <div className="detail-item">
                    <label>Description:</label>
                    <p>{selectedService.description}</p>
                  </div>
                  <div className="detail-item">
                    <label>Availability:</label>
                    <p>{selectedService.availability}</p>
                  </div>
                  <div className="detail-item">
                    <label>Status:</label>
                    <p className="status-active">{selectedService.status}</p>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Pricing</h4>
                  <div className="detail-item">
                    <label>Base Price:</label>
                    <p>${selectedService.basePrice}</p>
                  </div>
                  <div className="detail-item">
                    <label>Hourly Rate:</label>
                    <p>${selectedService.hourlyRate}/hour</p>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Performance</h4>
                  <div className="detail-item">
                    <label>Total Jobs:</label>
                    <p>{selectedService.totalJobs}</p>
                  </div>
                  <div className="detail-item">
                    <label>Average Rating:</label>
                    <p>⭐ {selectedService.avgRating}</p>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Features</h4>
                  <div className="features-grid">
                    {selectedService.features.map((feature, index) => (
                      <span key={index} className="feature-item">✓ {feature}</span>
                    ))}
                  </div>
                </div>
                
                <div className="detail-actions">
                  <button className="sidebar-btn">✏️ Edit Service</button>
                  <button className="sidebar-btn">📊 View Analytics</button>
                  <button className="sidebar-btn">💰 Update Pricing</button>
                  <button className="sidebar-btn">📋 Manage Features</button>
                </div>
              </div>
            ) : (
              <div className="no-selection">
                <p>Select a service to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
