import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Jobs.css";

export default function Jobs() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const navigate = useNavigate();

  const jobs = [
    {
      id: 1,
      title: "HVAC Maintenance - Downtown Office",
      client: "ABC Corporation",
      location: "123 Business Ave, Downtown",
      status: "in-progress",
      priority: "high",
      startDate: "2024-01-20",
      endDate: "2024-01-25",
      assignedTo: "Mike Johnson",
      budget: 2500,
      description: "Regular HVAC maintenance and filter replacement for the main office building",
      progress: 65
    },
    {
      id: 2,
      title: "Plumbing Repair - Residential Complex",
      client: "XYZ Properties",
      location: "456 Oak Ave, Suburbs",
      status: "scheduled",
      priority: "medium",
      startDate: "2024-01-22",
      endDate: "2024-01-23",
      assignedTo: "Sarah Wilson",
      budget: 1200,
      description: "Fix leaking pipes in apartment building basement",
      progress: 0
    },
    {
      id: 3,
      title: "Electrical Installation - Shopping Center",
      client: "Mall Management Inc",
      location: "789 Commerce Blvd, Mall District",
      status: "completed",
      priority: "low",
      startDate: "2024-01-15",
      endDate: "2024-01-18",
      assignedTo: "David Chen",
      budget: 4500,
      description: "Install new lighting system in the main shopping area",
      progress: 100
    },
    {
      id: 4,
      title: "Emergency HVAC Repair - Industrial Warehouse",
      client: "Industrial Solutions Co",
      location: "321 Factory Road, Industrial Zone",
      status: "pending",
      priority: "high",
      startDate: "2024-01-24",
      endDate: "2024-01-26",
      assignedTo: "Lisa Rodriguez",
      budget: 3200,
      description: "Emergency repair of industrial HVAC system",
      progress: 0
    },
    {
      id: 5,
      title: "General Maintenance - Apartment Complex",
      client: "Residential Complex LLC",
      location: "654 Apartment Lane, Residential Area",
      status: "in-progress",
      priority: "medium",
      startDate: "2024-01-19",
      endDate: "2024-01-28",
      assignedTo: "Tom Anderson",
      budget: 1800,
      description: "General maintenance and repairs across multiple units",
      progress: 40
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "in-progress": return "#007bff";
      case "scheduled": return "#ffc107";
      case "completed": return "#28a745";
      case "pending": return "#6c757d";
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

  const filteredJobs = jobs.filter(job => {
    const matchesStatus = filterStatus === "all" || job.status === filterStatus;
    const matchesPriority = filterPriority === "all" || job.priority === filterPriority;
    return matchesStatus && matchesPriority;
  });

  const stats = {
    total: jobs.length,
    inProgress: jobs.filter(j => j.status === "in-progress").length,
    scheduled: jobs.filter(j => j.status === "scheduled").length,
    completed: jobs.filter(j => j.status === "completed").length,
    pending: jobs.filter(j => j.status === "pending").length
  };

  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <h1>💼 Jobs</h1>
        <button onClick={() => navigate("/dashboard")} className="back-btn">
          ← Back to Dashboard
        </button>
      </div>

      <div className="jobs-stats">
        <div className="stat-card">
          <h3>Total Jobs</h3>
          <p className="stat-number">{stats.total}</p>
        </div>
        <div className="stat-card">
          <h3>In Progress</h3>
          <p className="stat-number in-progress">{stats.inProgress}</p>
        </div>
        <div className="stat-card">
          <h3>Scheduled</h3>
          <p className="stat-number scheduled">{stats.scheduled}</p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p className="stat-number completed">{stats.completed}</p>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <p className="stat-number pending">{stats.pending}</p>
        </div>
      </div>

      <div className="jobs-container">
        <div className="jobs-controls">
          <div className="filters-section">
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="in-progress">In Progress</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
            
            <select 
              value={filterPriority} 
              onChange={(e) => setFilterPriority(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          
          <button className="add-job-btn">+ Add New Job</button>
        </div>

        <div className="jobs-content">
          <div className="jobs-list">
            <div className="list-header">
              <h3>Job List ({filteredJobs.length})</h3>
            </div>
            
            <div className="jobs-grid">
              {filteredJobs.map(job => (
                <div 
                  key={job.id}
                  className={`job-card ${selectedJob?.id === job.id ? 'selected' : ''}`}
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="job-header">
                    <h4>{job.title}</h4>
                    <div className="job-badges">
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(job.status) }}
                      >
                        {job.status}
                      </span>
                      <span 
                        className="priority-badge"
                        style={{ backgroundColor: getPriorityColor(job.priority) }}
                      >
                        {job.priority}
                      </span>
                    </div>
                  </div>
                  
                  <div className="job-info">
                    <p><strong>Client:</strong> {job.client}</p>
                    <p><strong>Location:</strong> {job.location}</p>
                    <p><strong>Assigned to:</strong> {job.assignedTo}</p>
                    <p><strong>Budget:</strong> ${job.budget.toLocaleString()}</p>
                  </div>
                  
                  <div className="job-progress">
                    <div className="progress-header">
                      <span>Progress</span>
                      <span>{job.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ 
                          width: `${job.progress}%`,
                          backgroundColor: getStatusColor(job.status)
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="job-dates">
                    <div className="date-item">
                      <span className="date-label">Start:</span>
                      <span className="date-value">{job.startDate}</span>
                    </div>
                    <div className="date-item">
                      <span className="date-label">End:</span>
                      <span className="date-value">{job.endDate}</span>
                    </div>
                  </div>
                  
                  <div className="job-actions">
                    <button className="action-btn">📋 View Details</button>
                    <button className="action-btn">✏️ Edit Job</button>
                    <button className="action-btn">📞 Contact Client</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="job-sidebar">
            {selectedJob ? (
              <div className="job-details">
                <div className="detail-header">
                  <h3>{selectedJob.title}</h3>
                  <div className="detail-badges">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(selectedJob.status) }}
                    >
                      {selectedJob.status}
                    </span>
                    <span 
                      className="priority-badge"
                      style={{ backgroundColor: getPriorityColor(selectedJob.priority) }}
                    >
                      {selectedJob.priority}
                    </span>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Job Information</h4>
                  <div className="detail-item">
                    <label>Client:</label>
                    <p>{selectedJob.client}</p>
                  </div>
                  <div className="detail-item">
                    <label>Location:</label>
                    <p>{selectedJob.location}</p>
                  </div>
                  <div className="detail-item">
                    <label>Assigned to:</label>
                    <p>{selectedJob.assignedTo}</p>
                  </div>
                  <div className="detail-item">
                    <label>Budget:</label>
                    <p>${selectedJob.budget.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Timeline</h4>
                  <div className="detail-item">
                    <label>Start Date:</label>
                    <p>{selectedJob.startDate}</p>
                  </div>
                  <div className="detail-item">
                    <label>End Date:</label>
                    <p>{selectedJob.endDate}</p>
                  </div>
                  <div className="detail-item">
                    <label>Progress:</label>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ 
                            width: `${selectedJob.progress}%`,
                            backgroundColor: getStatusColor(selectedJob.status)
                          }}
                        ></div>
                      </div>
                      <span className="progress-text">{selectedJob.progress}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Description</h4>
                  <p className="description">{selectedJob.description}</p>
                </div>
                
                <div className="detail-actions">
                  <button className="sidebar-btn">📋 Update Progress</button>
                  <button className="sidebar-btn">📞 Contact Client</button>
                  <button className="sidebar-btn">✏️ Edit Job</button>
                  <button className="sidebar-btn">📧 Send Report</button>
                </div>
              </div>
            ) : (
              <div className="no-selection">
                <p>Select a job to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
