import { useEffect, useState } from "react";

const PAGES = [
  {
    id: "workout",
    name: "Workout",
    title: "Gym Tracker",
    emoji: "💪",
    subtitle: "Track your training days, exercises, and meals",
    statLabel: "Gym Days This Month",
    legendActive: "Gym Day (Double-click to toggle)",
    label1: "Today's Workout",
    label2: "Food & Meal Notes",
    placeholder1: "What exercises did you do today? e.g. Squats 3x10, Bench Press 4x8...",
    placeholder2: "Record your meals, water intake, supplements...",
    icon1: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5h11M6.5 17.5h11M18.5 5.5v13M5.5 5.5v13M21.5 8v8M2.5 8v8M9.5 12h5"></path></svg>
    ),
    icon2: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
    )
  },
  {
    id: "news",
    name: "News",
    title: "News Tracker",
    emoji: "📰",
    subtitle: "Track news headlines, global updates, and notes",
    statLabel: "News Days This Month",
    legendActive: "News Day (Double-click to toggle)",
    label1: "Today's News Headlines",
    label2: "Personal Notes / Thoughts",
    placeholder1: "Record the top news headlines or updates today...",
    placeholder2: "Add your personal notes or opinion on the news...",
    icon1: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="2" ry="2"></rect><line x1="7" y1="8" x2="17" y2="8"></line><line x1="7" y1="12" x2="17" y2="12"></line><line x1="7" y1="16" x2="13" y2="16"></line></svg>
    ),
    icon2: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
    )
  },
  {
    id: "suryaNamaskar",
    name: "Surya Namaskar",
    title: "Surya Namaskar Tracker",
    emoji: "🧘",
    subtitle: "Track your daily yoga rounds and practice flow",
    statLabel: "Yoga Days This Month",
    legendActive: "Yoga Day (Double-click to toggle)",
    label1: "Rounds Completed",
    label2: "Practice Notes",
    placeholder1: "How many rounds/sets of Surya Namaskar did you complete? e.g. 12 rounds, 24 rounds...",
    placeholder2: "Record how you felt, focus areas, breath control...",
    icon1: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
    ),
    icon2: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
    )
  },
  {
    id: "dailyQuiz",
    name: "Daily Quiz",
    title: "Daily Quiz Tracker",
    emoji: "🧠",
    subtitle: "Track daily quiz questions, performance, and learnings",
    statLabel: "Quiz Days This Month",
    legendActive: "Quiz Day (Double-click to toggle)",
    label1: "Quiz Performance / Topics",
    label2: "Learnings & Corrections",
    placeholder1: "What quiz did you take? e.g. Current Affairs, Math, Coding Quiz...",
    placeholder2: "Record any mistakes made, key takeaways, and things to revise...",
    icon1: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
    ),
    icon2: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
    )
  },
  {
    id: "topicOfTheDay",
    name: "Topic of the Day",
    title: "Topic of the Day Tracker",
    emoji: "📚",
    subtitle: "Track daily research topics, concepts, and key details",
    statLabel: "Topic Days This Month",
    legendActive: "Topic Day (Double-click to toggle)",
    label1: "Topic Studied / Researched",
    label2: "Summary & Key Concepts",
    placeholder1: "What was the main topic you studied today? e.g. Quantum Computing, French History...",
    placeholder2: "Summarize the key concepts, formulas, or interesting facts...",
    icon1: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
    ),
    icon2: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
    )
  },
  {
    id: "study",
    name: "Study",
    title: "Study Tracker",
    emoji: "✏️",
    subtitle: "Track subjects, study duration, and concepts covered",
    statLabel: "Study Days This Month",
    legendActive: "Study Day (Double-click to toggle)",
    label1: "Study Subject & Hours",
    label2: "Concepts Covered & Review",
    placeholder1: "What did you study today? e.g. React 19 features (2 hours), Algorithms (3 hours)...",
    placeholder2: "Detail the specific concepts covered, doubts, or review notes...",
    icon1: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
    ),
    icon2: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
    )
  }
];

export default function App() {
  const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD in local time

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(today);
  const [activeTab, setActiveTab] = useState("workout");

  // Workout (Gym Tracker)
  const [gymDays, setGymDays] = useState(() => {
    return JSON.parse(localStorage.getItem("gymDays")) || {};
  });
  const [foodLogs, setFoodLogs] = useState(() => {
    return JSON.parse(localStorage.getItem("foodLogs")) || {};
  });
  const [workoutLogs, setWorkoutLogs] = useState(() => {
    return JSON.parse(localStorage.getItem("workoutLogs")) || {};
  });

  // News
  const [newsDays, setNewsDays] = useState(() => {
    return JSON.parse(localStorage.getItem("newsDays")) || {};
  });
  const [newsLogs, setNewsLogs] = useState(() => {
    return JSON.parse(localStorage.getItem("newsLogs")) || {};
  });
  const [newsNotes, setNewsNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("newsNotes")) || {};
  });

  // Surya Namaskar
  const [suryaNamaskarDays, setSuryaNamaskarDays] = useState(() => {
    return JSON.parse(localStorage.getItem("suryaNamaskarDays")) || {};
  });
  const [suryaNamaskarLogs, setSuryaNamaskarLogs] = useState(() => {
    return JSON.parse(localStorage.getItem("suryaNamaskarLogs")) || {};
  });
  const [suryaNamaskarNotes, setSuryaNamaskarNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("suryaNamaskarNotes")) || {};
  });

  // Daily Quiz
  const [dailyQuizDays, setDailyQuizDays] = useState(() => {
    return JSON.parse(localStorage.getItem("dailyQuizDays")) || {};
  });
  const [dailyQuizLogs, setDailyQuizLogs] = useState(() => {
    return JSON.parse(localStorage.getItem("dailyQuizLogs")) || {};
  });
  const [dailyQuizNotes, setDailyQuizNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("dailyQuizNotes")) || {};
  });

  // Topic of the Day
  const [topicOfTheDayDays, setTopicOfTheDayDays] = useState(() => {
    return JSON.parse(localStorage.getItem("topicOfTheDayDays")) || {};
  });
  const [topicOfTheDayLogs, setTopicOfTheDayLogs] = useState(() => {
    return JSON.parse(localStorage.getItem("topicOfTheDayLogs")) || {};
  });
  const [topicOfTheDayNotes, setTopicOfTheDayNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("topicOfTheDayNotes")) || {};
  });

  // Study
  const [studyDays, setStudyDays] = useState(() => {
    return JSON.parse(localStorage.getItem("studyDays")) || {};
  });
  const [studyLogs, setStudyLogs] = useState(() => {
    return JSON.parse(localStorage.getItem("studyLogs")) || {};
  });
  const [studyNotes, setStudyNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("studyNotes")) || {};
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
    localStorage.setItem("newsDays", JSON.stringify(newsDays));
  }, [newsDays]);
  useEffect(() => {
    localStorage.setItem("newsLogs", JSON.stringify(newsLogs));
  }, [newsLogs]);
  useEffect(() => {
    localStorage.setItem("newsNotes", JSON.stringify(newsNotes));
  }, [newsNotes]);

  useEffect(() => {
    localStorage.setItem("suryaNamaskarDays", JSON.stringify(suryaNamaskarDays));
  }, [suryaNamaskarDays]);
  useEffect(() => {
    localStorage.setItem("suryaNamaskarLogs", JSON.stringify(suryaNamaskarLogs));
  }, [suryaNamaskarLogs]);
  useEffect(() => {
    localStorage.setItem("suryaNamaskarNotes", JSON.stringify(suryaNamaskarNotes));
  }, [suryaNamaskarNotes]);

  useEffect(() => {
    localStorage.setItem("dailyQuizDays", JSON.stringify(dailyQuizDays));
  }, [dailyQuizDays]);
  useEffect(() => {
    localStorage.setItem("dailyQuizLogs", JSON.stringify(dailyQuizLogs));
  }, [dailyQuizLogs]);
  useEffect(() => {
    localStorage.setItem("dailyQuizNotes", JSON.stringify(dailyQuizNotes));
  }, [dailyQuizNotes]);

  useEffect(() => {
    localStorage.setItem("topicOfTheDayDays", JSON.stringify(topicOfTheDayDays));
  }, [topicOfTheDayDays]);
  useEffect(() => {
    localStorage.setItem("topicOfTheDayLogs", JSON.stringify(topicOfTheDayLogs));
  }, [topicOfTheDayLogs]);
  useEffect(() => {
    localStorage.setItem("topicOfTheDayNotes", JSON.stringify(topicOfTheDayNotes));
  }, [topicOfTheDayNotes]);

  useEffect(() => {
    localStorage.setItem("studyDays", JSON.stringify(studyDays));
  }, [studyDays]);
  useEffect(() => {
    localStorage.setItem("studyLogs", JSON.stringify(studyLogs));
  }, [studyLogs]);
  useEffect(() => {
    localStorage.setItem("studyNotes", JSON.stringify(studyNotes));
  }, [studyNotes]);

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

  // Helper State getters and setters based on activeTab
  const getActiveDaysState = () => {
    switch (activeTab) {
      case "news": return newsDays;
      case "suryaNamaskar": return suryaNamaskarDays;
      case "dailyQuiz": return dailyQuizDays;
      case "topicOfTheDay": return topicOfTheDayDays;
      case "study": return studyDays;
      default: return gymDays;
    }
  };

  const getLog1State = () => {
    switch (activeTab) {
      case "news": return newsLogs;
      case "suryaNamaskar": return suryaNamaskarLogs;
      case "dailyQuiz": return dailyQuizLogs;
      case "topicOfTheDay": return topicOfTheDayLogs;
      case "study": return studyLogs;
      default: return workoutLogs;
    }
  };

  const getLog2State = () => {
    switch (activeTab) {
      case "news": return newsNotes;
      case "suryaNamaskar": return suryaNamaskarNotes;
      case "dailyQuiz": return dailyQuizNotes;
      case "topicOfTheDay": return topicOfTheDayNotes;
      case "study": return studyNotes;
      default: return foodLogs;
    }
  };

  const updateActiveDays = (date, value) => {
    const updateFn = (prev) => ({ ...prev, [date]: value });
    switch (activeTab) {
      case "news": setNewsDays(updateFn); break;
      case "suryaNamaskar": setSuryaNamaskarDays(updateFn); break;
      case "dailyQuiz": setDailyQuizDays(updateFn); break;
      case "topicOfTheDay": setTopicOfTheDayDays(updateFn); break;
      case "study": setStudyDays(updateFn); break;
      default: setGymDays(updateFn); break;
    }
  };

  const updateLog1 = (date, text) => {
    const updateFn = (prev) => ({ ...prev, [date]: text });
    switch (activeTab) {
      case "news": setNewsLogs(updateFn); break;
      case "suryaNamaskar": setSuryaNamaskarLogs(updateFn); break;
      case "dailyQuiz": setDailyQuizLogs(updateFn); break;
      case "topicOfTheDay": setTopicOfTheDayLogs(updateFn); break;
      case "study": setStudyLogs(updateFn); break;
      default: setWorkoutLogs(updateFn); break;
    }
  };

  const updateLog2 = (date, text) => {
    const updateFn = (prev) => ({ ...prev, [date]: text });
    switch (activeTab) {
      case "news": setNewsNotes(updateFn); break;
      case "suryaNamaskar": setSuryaNamaskarNotes(updateFn); break;
      case "dailyQuiz": setDailyQuizNotes(updateFn); break;
      case "topicOfTheDay": setTopicOfTheDayNotes(updateFn); break;
      case "study": setStudyNotes(updateFn); break;
      default: setFoodLogs(updateFn); break;
    }
  };

  const toggleActiveDay = (date) => {
    const daysObj = getActiveDaysState();
    updateActiveDays(date, !daysObj[date]);
  };

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const activeDays = getActiveDaysState();
  const monthlyCount = Object.keys(activeDays).filter((date) => {
    const d = new Date(date);
    return (
      activeDays[date] &&
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

    // If today is not an active day, check if yesterday was. If so, start streak from yesterday.
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

  const currentStreak = calculateStreak(activeDays);

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

  const activePage = PAGES.find((p) => p.id === activeTab) || PAGES[0];

  return (
    <div className="app-container">
      <div className="header-container">
        <header className="app-header">
          <h1 className="app-title">{activePage.emoji} {activePage.title}</h1>
          <p className="app-subtitle">{activePage.subtitle}</p>
        </header>
        <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle theme">
          {theme === "dark" ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          )}
        </button>
      </div>

      {/* Tabs Container */}
      <div className="tracker-tabs-container">
        {PAGES.map((page) => (
          <button
            key={page.id}
            onClick={() => setActiveTab(page.id)}
            className={`tracker-tab ${activeTab === page.id ? "active-tab" : ""}`}
          >
            <span>{page.emoji}</span>
            <span>{page.name}</span>
          </button>
        ))}
      </div>

      <div className="stats-grid">
        <Card title={activePage.statLabel} value={monthlyCount} icon="calendar" />
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
              {activePage.name} Calendar
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

              const isActive = activeDays[dateString];
              const isSelected = dateString === selectedDate;
              const isTodayDate = dateString === today;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(dateString)}
                  onDoubleClick={() => toggleActiveDay(dateString)}
                  className={`day-cell ${isActive ? "active-gym" : ""} ${
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
              {activePage.legendActive}
            </span>
            <span className="legend-item">
              <span className="legend-dot sel"></span>
              Selected (Single-click to view/edit logs)
            </span>
          </div>
        </div>

        {/* Notes and Daily Tracker Section */}
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
            <label className="form-label" htmlFor="log1-textarea">
              {activePage.icon1}
              {activePage.label1}
            </label>
            <textarea
              id="log1-textarea"
              value={getLog1State()[selectedDate] || ""}
              onChange={(e) => updateLog1(selectedDate, e.target.value)}
              placeholder={activePage.placeholder1}
              className="food-textarea"
              style={{ minHeight: "110px" }}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="log2-textarea">
              {activePage.icon2}
              {activePage.label2}
            </label>
            <textarea
              id="log2-textarea"
              value={getLog2State()[selectedDate] || ""}
              onChange={(e) => updateLog2(selectedDate, e.target.value)}
              placeholder={activePage.placeholder2}
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