import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Map.css";

export default function Map() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [viewMode, setViewMode] = useState("map"); // map, list
  const navigate = useNavigate();

  const jobLocations = [
    {
      id: 1,
      name: "Downtown Office Building",
      address: "123 Main St, Downtown",
      coordinates: { lat: 40.7128, lng: -74.0060 },
      status: "active",
      client: "ABC Corp",
      jobType: "Plumbing",
      priority: "high"
    },
    {
      id: 2,
      name: "Residential Complex",
      address: "456 Oak Ave, Suburbs",
      coordinates: { lat: 40.7589, lng: -73.9851 },
      status: "scheduled",
      client: "XYZ Properties",
      jobType: "Electrical",
      priority: "medium"
    },
    {
      id: 3,
      name: "Shopping Center",
      address: "789 Commerce Blvd, Mall District",
      coordinates: { lat: 40.7505, lng: -73.9934 },
      status: "completed",
      client: "Mall Management",
      jobType: "HVAC",
      priority: "low"
    },
    {
      id: 4,
      name: "Industrial Warehouse",
      address: "321 Factory Rd, Industrial Zone",
      coordinates: { lat: 40.7648, lng: -73.9808 },
      status: "pending",
      client: "Industrial Co",
      jobType: "General",
      priority: "high"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "#28a745";
      case "scheduled": return "#007bff";
      case "completed": return "#6c757d";
      case "pending": return "#ffc107";
      default: return "#6c757d";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "#dc3545";
      case "medium": return "#ffc107";
      case "low": return "#28a745";
      default: return "#6c757d";
    }
  };

  return (
    <div className="map-page">
      <div className="map-header">
        <h1>🗺️ Map</h1>
        <button onClick={() => navigate("/dashboard")} className="back-btn">
          ← Back to Dashboard
        </button>
      </div>

      <div className="map-container">
        <div className="map-controls">
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${viewMode === 'map' ? 'active' : ''}`}
              onClick={() => setViewMode('map')}
            >
              🗺️ Map View
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              📋 List View
            </button>
          </div>
          
          <div className="map-filters">
            <select className="filter-select">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
            
            <select className="filter-select">
              <option value="">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        <div className="map-content">
          {viewMode === 'map' ? (
            <div className="map-view">
              <div className="map-placeholder">
                <div className="map-overlay">
                  <h3>Interactive Map</h3>
                  <p>Map integration would be implemented here</p>
                  <p>Showing {jobLocations.length} job locations</p>
                </div>
                
                {/* Simulated map markers */}
                <div className="map-markers">
                  {jobLocations.map((location, index) => (
                    <div
                      key={location.id}
                      className={`map-marker ${location.status} ${selectedLocation?.id === location.id ? 'selected' : ''}`}
                      style={{
                        left: `${20 + (index * 15)}%`,
                        top: `${30 + (index * 10)}%`
                      }}
                      onClick={() => setSelectedLocation(location)}
                    >
                      <div className="marker-dot" style={{ backgroundColor: getStatusColor(location.status) }}></div>
                      <div className="marker-label">{location.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="list-view">
              <div className="locations-list">
                {jobLocations.map(location => (
                  <div 
                    key={location.id} 
                    className={`location-card ${selectedLocation?.id === location.id ? 'selected' : ''}`}
                    onClick={() => setSelectedLocation(location)}
                  >
                    <div className="location-header">
                      <h3>{location.name}</h3>
                      <div className="location-badges">
                        <span 
                          className="status-badge"
                          style={{ backgroundColor: getStatusColor(location.status) }}
                        >
                          {location.status}
                        </span>
                        <span 
                          className="priority-badge"
                          style={{ backgroundColor: getPriorityColor(location.priority) }}
                        >
                          {location.priority}
                        </span>
                      </div>
                    </div>
                    
                    <div className="location-details">
                      <p><strong>Address:</strong> {location.address}</p>
                      <p><strong>Client:</strong> {location.client}</p>
                      <p><strong>Job Type:</strong> {location.jobType}</p>
                      <p><strong>Coordinates:</strong> {location.coordinates.lat.toFixed(4)}, {location.coordinates.lng.toFixed(4)}</p>
                    </div>
                    
                    <div className="location-actions">
                      <button className="action-btn">📍 View on Map</button>
                      <button className="action-btn">📋 View Details</button>
                      <button className="action-btn">📞 Contact Client</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="map-sidebar">
            <div className="sidebar-header">
              <h3>Location Details</h3>
            </div>
            
            {selectedLocation ? (
              <div className="location-info">
                <div className="info-header">
                  <h4>{selectedLocation.name}</h4>
                  <div className="info-badges">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(selectedLocation.status) }}
                    >
                      {selectedLocation.status}
                    </span>
                    <span 
                      className="priority-badge"
                      style={{ backgroundColor: getPriorityColor(selectedLocation.priority) }}
                    >
                      {selectedLocation.priority}
                    </span>
                  </div>
                </div>
                
                <div className="info-details">
                  <div className="info-item">
                    <label>Address:</label>
                    <p>{selectedLocation.address}</p>
                  </div>
                  
                  <div className="info-item">
                    <label>Client:</label>
                    <p>{selectedLocation.client}</p>
                  </div>
                  
                  <div className="info-item">
                    <label>Job Type:</label>
                    <p>{selectedLocation.jobType}</p>
                  </div>
                  
                  <div className="info-item">
                    <label>Coordinates:</label>
                    <p>{selectedLocation.coordinates.lat.toFixed(4)}, {selectedLocation.coordinates.lng.toFixed(4)}</p>
                  </div>
                </div>
                
                <div className="info-actions">
                  <button className="sidebar-btn">📍 Get Directions</button>
                  <button className="sidebar-btn">📞 Call Client</button>
                  <button className="sidebar-btn">📧 Send Message</button>
                  <button className="sidebar-btn">📋 View Job Details</button>
                </div>
              </div>
            ) : (
              <div className="no-selection">
                <p>Select a location to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
