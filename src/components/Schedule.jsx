import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin, Users } from 'lucide-react';

const Schedule = () => {
    const [currentWeek, setCurrentWeek] = useState(new Date());
    const [filterClass, setFilterClass] = useState('All');

    // Mock data for class schedule
    const scheduleData = [
        { id: 1, day: 1, time: '17:30 - 19:00', class: 'IE 1', room: 'Room A', teacher: 'Ms. Lan' }, // Monday
        { id: 2, day: 3, time: '17:30 - 19:00', class: 'IE 1', room: 'Room A', teacher: 'Ms. Lan' }, // Wednesday
        { id: 3, day: 5, time: '17:30 - 19:00', class: 'IE 1', room: 'Room A', teacher: 'Ms. Lan' }, // Friday

        { id: 4, day: 2, time: '19:15 - 20:45', class: 'IE 2', room: 'Room B', teacher: 'Mr. John' }, // Tuesday
        { id: 5, day: 4, time: '19:15 - 20:45', class: 'IE 2', room: 'Room B', teacher: 'Mr. John' }, // Thursday
        { id: 6, day: 6, time: '19:15 - 20:45', class: 'IE 2', room: 'Room B', teacher: 'Mr. John' }, // Saturday

        { id: 7, day: 1, time: '19:15 - 20:45', class: 'IE 3', room: 'Room C', teacher: 'Ms. Hoa' }, // Monday
        { id: 8, day: 3, time: '19:15 - 20:45', class: 'IE 3', room: 'Room C', teacher: 'Ms. Hoa' }, // Wednesday
        { id: 9, day: 5, time: '19:15 - 20:45', class: 'IE 3', room: 'Room C', teacher: 'Ms. Hoa' }  // Friday
    ];

    const DAYS = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

    // Get start of the current week (Sunday)
    const getStartOfWeek = (date) => {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust to make Monday start if needed, but standard is Sunday=0. Let's start Monday=1
        // Let's stick to standard JS GetDay: 0=Sun, 1=Mon...
        // Let's just show a generic "Tuần này" view for now to keep it simple, or calculate dates.
        // For simplicity in this version, let's just assume a static weekly view without date navigation logic first, 
        // as the requirement is "Weekly Calendar View".
        return d;
    };

    const filteredSchedule = filterClass === 'All'
        ? scheduleData
        : scheduleData.filter(item => item.class === filterClass);

    return (
        <div style={{ padding: 'var(--space-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
                <div>
                    <h1>Lịch học</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Thời khóa biểu hàng tuần</p>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                    <select
                        className="input"
                        value={filterClass}
                        onChange={(e) => setFilterClass(e.target.value)}
                        style={{ width: '150px' }}
                    >
                        <option value="All">Tất cả lớp</option>
                        <option value="IE 1">IE 1</option>
                        <option value="IE 2">IE 2</option>
                        <option value="IE 3">IE 3</option>
                    </select>
                </div>
            </div>

            {/* Calendar Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: 'var(--space-sm)',
                overflowX: 'auto'
            }}>
                {/* Header Row */}
                {DAYS.map((day, index) => (
                    <div key={day} style={{
                        textAlign: 'center',
                        padding: 'var(--space-md)',
                        background: 'var(--surface)',
                        borderRadius: 'var(--radius-md)',
                        borderBottom: index === new Date().getDay() ? '4px solid var(--primary)' : 'none',
                        fontWeight: '600',
                        color: index === new Date().getDay() ? 'var(--primary)' : 'var(--text-main)',
                        minWidth: '120px'
                    }}>
                        {day}
                    </div>
                ))}

                {/* Schedule Columns */}
                {DAYS.map((_, dayIndex) => {
                    const dayClasses = filteredSchedule.filter(s => s.day === dayIndex);
                    return (
                        <div key={dayIndex} style={{
                            background: 'var(--background)',
                            minHeight: '400px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--space-sm)'
                        }}>
                            {dayClasses.map(session => (
                                <div key={session.id} className="card" style={{ padding: 'var(--space-sm)', borderLeft: `4px solid ${session.class === 'IE 1' ? '#106c58' : session.class === 'IE 2' ? '#2b6cb0' : '#b83280'}` }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                        <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>{session.class}</span>
                                        <span style={{ fontSize: '0.75rem', background: '#edf2f7', padding: '2px 6px', borderRadius: '4px' }}>{session.room}</span>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                        <Clock size={14} />
                                        <span>{session.time}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                                        <Users size={14} />
                                        <span>{session.teacher}</span>
                                    </div>
                                </div>
                            ))}
                            {dayClasses.length === 0 && (
                                <div style={{
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--text-muted)',
                                    fontSize: '0.875rem',
                                    border: '1px dashed var(--border)',
                                    borderRadius: 'var(--radius-md)'
                                }}>
                                    Trống
                                </div>
                            )}
                        </div>
                    );
                })}


            </div>
        </div>
    );
};

export default Schedule;
