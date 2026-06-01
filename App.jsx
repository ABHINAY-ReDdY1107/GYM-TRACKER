import { useEffect, useState } from "react";

export default function App() {
  const today = new Date().toISOString().split("T")[0];

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(today);

  const [gymDays, setGymDays] = useState(() => {
    return JSON.parse(localStorage.getItem("gymDays")) || {};
  });

  const [foodLogs, setFoodLogs] = useState(() => {
    return JSON.parse(localStorage.getItem("foodLogs")) || {};
  });

  useEffect(() => {
    localStorage.setItem("gymDays", JSON.stringify(gymDays));
  }, [gymDays]);

  useEffect(() => {
    localStorage.setItem("foodLogs", JSON.stringify(foodLogs));
  }, [foodLogs]);

  const previousMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      )
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1
      )
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

  const attendancePercent = Math.round(
    (monthlyCount /
      new Date(currentYear, currentMonth + 1, 0).getDate()) *
      100
  );

  function calculateStreak(days) {
    let streak = 0;
    let date = new Date();

    while (true) {
      const key = date.toISOString().split("T")[0];

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

  const daysInMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  const days = Array.from(
    { length: daysInMonth },
    (_, i) => i + 1
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#1a1814",
        color: "#fdfbf8",
        fontFamily: "Arial",
        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#c4a96d",
          marginBottom: "20px",
        }}
      >
        💪 Gym Tracker
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "15px",
        }}
      >
        <Card
          title="Gym Days This Month"
          value={monthlyCount}
        />

        <Card
          title="Attendance"
          value={`${attendancePercent}%`}
        />

        <Card
          title="Current Streak 🔥"
          value={currentStreak}
        />

        <Card
          title="Today's Date"
          value={today}
        />
      </div>

      <div
        style={{
          marginTop: "30px",
          background: "#2d2a24",
          padding: "20px",
          borderRadius: "15px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <button onClick={previousMonth}>
            ← Previous
          </button>

          <h2 style={{ color: "#c4a96d" }}>
            {currentDate.toLocaleString(
              "default",
              {
                month: "long",
                year: "numeric",
              }
            )}
          </h2>

          <button onClick={nextMonth}>
            Next →
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(7,1fr)",
            gap: "10px",
          }}
        >
          {days.map((day) => {
            const dateString = `${currentYear}-${String(
              currentMonth + 1
            ).padStart(2, "0")}-${String(
              day
            ).padStart(2, "0")}`;

            const active =
              gymDays[dateString];

            return (
              <button
                key={day}
                onClick={() => {
                  setSelectedDate(
                    dateString
                  );
                  toggleGymDay(
                    dateString
                  );
                }}
                style={{
                  padding: "15px",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  background: active
                    ? "#8b7340"
                    : "#444",
                  color: "white",
                }}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      <div
        style={{
          marginTop: "30px",
          background: "#2d2a24",
          padding: "20px",
          borderRadius: "15px",
        }}
      >
        <h2 style={{ color: "#c4a96d" }}>
          Food Log
        </h2>

        <p>
          Selected Date: {selectedDate}
        </p>

        <textarea
          value={
            foodLogs[selectedDate] || ""
          }
          onChange={(e) =>
            updateFood(e.target.value)
          }
          placeholder="Write today's meals..."
          style={{
            width: "100%",
            minHeight: "150px",
            padding: "10px",
            borderRadius: "10px",
          }}
        />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        background: "#2d2a24",
        padding: "20px",
        borderRadius: "15px",
        border: "1px solid #8b7340",
      }}
    >
      <h3 style={{ color: "#c4a96d" }}>
        {title}
      </h3>
      <h2>{value}</h2>
    </div>
  );
}