function Settings() {
  return (
    <section className="admin-section active">
      <div className="admin-card">
        <h1 className="page-title">System Settings</h1>

        <div className="settings-list">
          <div className="setting-row">
            <span>Global Visibility</span>
            <input type="checkbox" defaultChecked />
          </div>

          <div className="setting-row">
            <span>Admin Notifications</span>
            <input type="checkbox" />
          </div>

          <div className="setting-row">
            <span>Maintenance Mode</span>
            <input type="checkbox" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Settings;
