import React from "react";
import { FormLabel, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

const UpdateTeacherHistory = () => {
  const teacherState = useSelector((state) => state.teacher);
  return (
    <>
      {teacherState.addTeacher.hasOwnProperty("teacherName") && (
        <>
          <FormLabel>Recently Added Teacher</FormLabel>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <td>{teacherState.addTeacher.teacherName}</td>
                <td>{teacherState.addTeacher.teacherQualification}</td>
              </tr>
            </thead>
          </Table>
        </>
      )}
      {teacherState.deleteTeacher.hasOwnProperty("teacherName") && (
        <>
          <FormLabel>Recently Deleted Teacher</FormLabel>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <td>{teacherState.deleteTeacher.teacherName}</td>
                <td>{teacherState.deleteTeacher.teacherQualification}</td>
              </tr>
            </thead>
          </Table>
        </>
      )}
      {teacherState.updateTeacher.hasOwnProperty("teacherName") && (
        <>
          <FormLabel>Recently Updated Teacher</FormLabel>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <td>{teacherState.updateTeacher.teacherName}</td>
                <td>{teacherState.updateTeacher.teacherQualification}</td>
              </tr>
            </thead>
          </Table>
        </>
      )}
    </>
  );
};

export default UpdateTeacherHistory;
