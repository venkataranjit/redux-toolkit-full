import React from "react";
import { FormLabel, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

const UpdateStudentHistory = () => {
  const studentState = useSelector((state) => state.student);
  return (
    <>
      {studentState.recentlyAddedStudent.hasOwnProperty("studentName") && (
        <>
          <FormLabel>Recently Added Student</FormLabel>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <td>{studentState.recentlyAddedStudent.studentName}</td>
                <td>{studentState.recentlyAddedStudent.studentClass}</td>
              </tr>
            </thead>
          </Table>
        </>
      )}
      {studentState.recentlyEditedStudent.hasOwnProperty("studentName") && (
        <>
          <FormLabel>Recently Updated Student</FormLabel>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <td>{studentState.recentlyEditedStudent.studentName}</td>
                <td>{studentState.recentlyEditedStudent.studentClass}</td>
              </tr>
            </thead>
          </Table>
        </>
      )}
      {studentState.recentlyDeletedStudent.hasOwnProperty("studentName") && (
        <>
          <FormLabel>Recently Deleted Student</FormLabel>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <td>{studentState.recentlyDeletedStudent.studentName}</td>
                <td>{studentState.recentlyDeletedStudent.studentClass}</td>
              </tr>
            </thead>
          </Table>
        </>
      )}
    </>
  );
};

export default UpdateStudentHistory;
