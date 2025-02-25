import { TableCell, TableRow, Table, TableBody, TableHead, TableContainer, Paper, Button } from "@mui/material";

const TrainingTable = ({ exerciseLog, handleDelete }) => {
  return (
    <TableContainer component={Paper} style={{ marginTop: "20px", maxHeight: "400px", overflowY: "auto" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Упражнение</TableCell>
            <TableCell style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Вес</TableCell>
            <TableCell style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Повторения</TableCell>
            <TableCell style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Подходы</TableCell>
            <TableCell style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Дата</TableCell>
            <TableCell style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Действие</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exerciseLog.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} style={{ textAlign: "center" }}>
                Нет данных для отображения. Пожалуйста, добавьте записи.
              </TableCell>
            </TableRow>
          ) : (
            exerciseLog.map((item, index) => (
              <TableRow key={index}>
                <TableCell style={{ fontSize: "1rem" }}>{item.exercise}</TableCell>
                <TableCell style={{ fontSize: "1rem" }}>{item.weight}</TableCell>
                <TableCell style={{ fontSize: "1rem" }}>{item.reps}</TableCell>
                <TableCell style={{ fontSize: "1rem" }}>{item.sets}</TableCell>
                <TableCell style={{ fontSize: "1rem" }}>{item.date}</TableCell>
                <TableCell style={{ fontSize: "1rem" }}>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(index)}>Удалить</Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TrainingTable;
