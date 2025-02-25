import { useState, useEffect, useId } from "react";
import { exercises } from "../data";
import "normalize.css";
import "./ExerciseTracker.css";
import TrainingTable from "./TrainingTable";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

const ExerciseTracker = () => {
  const [selectedExercise, setSelectedExercise] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [date, setDate] = useState("");

  const [exerciseLog, setExerciseLog] = useState(() => {
    // Загрузка данных из Local Storage
    const savedLog = localStorage.getItem("exerciseLog");
    return savedLog ? JSON.parse(savedLog) : [];
  });
  const [filteredLog, setFilteredLog] = useState([]);
  const id = useId();

  useEffect(() => {
    // Сохранение данных в Local Storage при изменении exerciseLog
    localStorage.setItem("exerciseLog", JSON.stringify(exerciseLog));
    filterLogByDate();
  }, [exerciseLog, date]);

  const handleChange = (event) => {
    setSelectedExercise(event.target.value);
  };

  const sortedItems = [...exercises].sort((a, b) => {
    const exerciseA = a.exercise.toLowerCase();
    const exerciseB = b.exercise.toLowerCase();

    if (exerciseA < exerciseB) return -1;
    if (exerciseA > exerciseB) return 1;
    return 0;
  });

  const handleAddExercise = () => {
      const newEntry = {
        exercise: selectedExercise,
        weight: weight,
        reps: reps,
        sets: sets,
        date: date,
      };
      setExerciseLog([...exerciseLog, newEntry]);
      setSelectedExercise("");
      setWeight("");
      setReps("");
      setSets("");
  };

  const handleDelete = (index) => {
    const updatedLog = exerciseLog.filter((_, i) => i !== index);
    setExerciseLog(updatedLog);
  };

  const filterLogByDate = () => {
    if (date) {
      const filtered = exerciseLog.filter((entry) => entry.date === date);
      setFilteredLog(filtered);
    } else {
      setFilteredLog([]);
    }
  };

  const isFormValid = () => {
    return selectedExercise && weight && reps && sets && date;
  };

  return (
    <div className="container">
      <header
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <h1 style={{ letterSpacing: "5px", fontSize: "3rem" }}>
          TRAINING DIARY
        </h1>
        <TextField
          label=""
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ marginRight: "10px" }}
        />
      </header>
      <FormControl
        fullWidth
        variant="outlined"
        style={{ marginBottom: "1rem" }}
      >
        <InputLabel id={id}>Выберите упражнение</InputLabel>
        <Select
          labelId={id}
          value={selectedExercise}
          onChange={handleChange}
          label="Выберите опцию"
        >
          {sortedItems.map((exercise) => (
            <MenuItem key={exercise.id} value={exercise.exercise}>
              {exercise.exercise}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div
        className="textFields"
        style={{ display: "flex", gap: "30px", maxWidth: "50%" }}
      >
        <TextField
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          style={{ flex: 1 }}
          label="Вес, кг"
        />
        <TextField
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          style={{ flex: 1 }}
          label="Повторения"
        />
        <TextField
          value={sets}
          onChange={(e) => setSets(e.target.value)}
          style={{ flex: 1 }}
          label="Подходы"
        />
        <Button
          disabled={!isFormValid()}
          onClick={handleAddExercise}
          style={{ flex: 1 }}
          variant="contained"
          color="primary"
        >
          Добавить
        </Button>
      </div>
      <br />

      <TrainingTable exerciseLog={filteredLog} handleDelete={handleDelete} />
    </div>
  );
};

export default ExerciseTracker;
