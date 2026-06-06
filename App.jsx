import { useEffect, useState } from "react";

export default function App() {
  const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD in local time

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(today);

  const [gymDays, setGymDays] = useState(() => {
    return JSON.parse(localStorage.getItem("gymDays")) || {};
  });

  const [foodLogs, setFoodLogs] = useState(() => {
    return JSON.parse(localStorage.getItem("foodLogs")) || {};
  });

  const [workoutLogs, setWorkoutLogs] = useState(() => {
    return JSON.parse(localStorage.getItem("workoutLogs")) || {};
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    localStorage.setItem("gymDays", JSON.stringify(gymDays));
  }, [gymDays]);

  useEffect(() => {
    localStorage.setItem("foodLogs", JSON.stringify(foodLogs));
  }, [foodLogs]);

  useEffect(() => {
    localStorage.setItem("workoutLogs", JSON.stringify(workoutLogs));
  }, [workoutLogs]);

  useEffect(() => {
    document.body.className = theme === "light" ? "light-theme" : "";
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const toggleGymDay = (date) => {
    setGymDays((prev) => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  const updateFood = (text) => {
    setFoodLogs((prev) => ({
      ...prev,
      [selectedDate]: text,
    }));
  };

  const updateWorkout = (text) => {
    setWorkoutLogs((prev) => ({
      ...prev,
      [selectedDate]: text,
    }));
  };

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthlyCount = Object.keys(gymDays).filter((date) => {
    const d = new Date(date);
    return (
      gymDays[date] &&
      d.getMonth() === currentMonth &&
      d.getFullYear() === currentYear
    );
  }).length;

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const attendancePercent = Math.round((monthlyCount / daysInMonth) * 100) || 0;

  function calculateStreak(days) {
    let streak = 0;
    let date = new Date();

    const getFormattedDate = (d) => {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    };

    let todayKey = getFormattedDate(date);

    // If today is not a gym day, check if yesterday was. If so, start streak from yesterday.
    if (!days[todayKey]) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayKey = getFormattedDate(yesterday);
      if (days[yesterdayKey]) {
        date = yesterday;
      } else {
        return 0; // Streak is broken / no streak
      }
    }

    while (true) {
      const key = getFormattedDate(date);
      if (days[key]) {
        streak++;
        date.setDate(date.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }

  const currentStreak = calculateStreak(gymDays);

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Calendar structure helpers
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // Index of first weekday (0 = Sun, 1 = Mon...)

  // Formatted date string for selected header
  const parseLocalDate = (dateStr) => {
    const [y, m, d] = dateStr.split("-");
    return new Date(y, m - 1, d);
  };
  const formattedSelectedDate = parseLocalDate(selectedDate).toLocaleDateString(
    undefined,
    { weekday: "long", month: "long", day: "numeric", year: "numeric" }
  );

  return (
    <div className="app-container">
      <div className="header-container">
        <header className="app-header">
          <h1 className="app-title">💪 Gym Tracker</h1>
          <p className="app-subtitle">Track your training days, exercises, and meals</p>
        </header>
        <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle theme">
          {theme === "dark" ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          )}
        </button>
      </div>

      <div className="stats-grid">
        <Card title="Gym Days This Month" value={monthlyCount} icon="calendar" />
        <Card title="Attendance" value={`${attendancePercent}%`} icon="percent" />
        <Card title="Current Streak" value={`${currentStreak} 🔥`} icon="flame" />
        <Card title="Today's Date" value={today} icon="clock" />
      </div>

      <div className="dashboard-content">
        {/* Calendar Section */}
        <div className="card">
          <div className="card-title-row">
            <h2 className="card-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              Workout Calendar
            </h2>
            <div className="calendar-nav">
              <button className="nav-btn" onClick={previousMonth} aria-label="Previous month">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <span className="month-year">
                {currentDate.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <button className="nav-btn" onClick={nextMonth} aria-label="Next month">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </div>

          <div className="calendar-grid">
            {weekdays.map((day) => (
              <div key={day} className="weekday-header">
                {day}
              </div>
            ))}

            {/* Empty space pads at the beginning of the month */}
            {Array.from({ length: firstDayIndex }).map((_, idx) => (
              <div key={`empty-${idx}`} className="day-cell-empty" />
            ))}

            {/* Days list */}
            {days.map((day) => {
              const dateString = `${currentYear}-${String(
                currentMonth + 1
              ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

              const isGymActive = gymDays[dateString];
              const isSelected = dateString === selectedDate;
              const isTodayDate = dateString === today;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(dateString)}
                  onDoubleClick={() => toggleGymDay(dateString)}
                  className={`day-cell ${isGymActive ? "active-gym" : ""} ${
                    isSelected ? "selected-day" : ""
                  } ${isTodayDate ? "is-today" : ""}`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <div className="calendar-legend">
            <span className="legend-item">
              <span className="legend-dot gym"></span>
              Gym Day (Double-click to toggle)
            </span>
            <span className="legend-item">
              <span className="legend-dot sel"></span>
              Selected (Single-click to view/edit logs)
            </span>
          </div>
        </div>

        {/* Notes and Workout Section */}
        <div className="card">
          <h2 className="card-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            Daily Tracker
          </h2>

          <div className="selected-date-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            {formattedSelectedDate}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="workout-textarea">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5h11M6.5 17.5h11M18.5 5.5v13M5.5 5.5v13M21.5 8v8M2.5 8v8M9.5 12h5"></path></svg>
              Today's Workout
            </label>
            <textarea
              id="workout-textarea"
              value={workoutLogs[selectedDate] || ""}
              onChange={(e) => updateWorkout(e.target.value)}
              placeholder="What exercises did you do today? e.g. Squats 3x10, Bench Press 4x8..."
              className="food-textarea"
              style={{ minHeight: "110px" }}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="food-textarea">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
              Food &amp; Meal Notes
            </label>
            <textarea
              id="food-textarea"
              value={foodLogs[selectedDate] || ""}
              onChange={(e) => updateFood(e.target.value)}
              placeholder="Record your meals, water intake, supplements..."
              className="food-textarea"
              style={{ minHeight: "110px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, icon }) {
  const getIcon = () => {
    switch (icon) {
      case "calendar":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
        );
      case "percent":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>
        );
      case "flame":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>
        );
      case "clock":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="stat-card">
      <div className="stat-icon-wrapper">{getIcon()}</div>
      <div className="stat-info">
        <span className="stat-label">{title}</span>
        <span className="stat-value">{value}</span>
      </div>
    </div>
  );
}