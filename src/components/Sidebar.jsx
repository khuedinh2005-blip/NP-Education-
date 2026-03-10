import React from 'react';
import { LayoutDashboard, Users, CalendarCheck, BookOpen, Calendar, LogOut } from 'lucide-react';

const Sidebar = ({ currentView, setView, onLogout }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard },
        { id: 'schedule', label: 'Lịch học', icon: Calendar },
        { id: 'students', label: 'Học viên', icon: Users },
        { id: 'attendance', label: 'Điểm danh', icon: CalendarCheck },
        { id: 'learning', label: 'Tài liệu học tập', icon: BookOpen },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-logo-wrapper">
                    <img
                        src="/logo.png"
                        alt="NP Education Logo"
                        className="sidebar-logo"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <span className="sidebar-logo-text">NP Education</span>
                </div>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = currentView === item.id;
                        return (
                            <li key={item.id} className="nav-item">
                                <button
                                    onClick={() => setView(item.id)}
                                    className={`nav-btn ${isActive ? 'active' : ''}`}
                                >
                                    <Icon size={20} />
                                    <span>{item.label}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="sidebar-footer">
                {onLogout && (
                    <button
                        onClick={onLogout}
                        className="nav-btn"
                        style={{ width: '100%', marginBottom: '0.5rem', color: 'var(--accent)' }}
                        title="Đăng xuất"
                    >
                        <LogOut size={20} />
                        <span>Đăng xuất</span>
                    </button>
                )}
                <p>© 2026 NP Education</p>
            </div>
        </aside>
    );
};

export default Sidebar;
