import React from "react";
import { FormLabel, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

const UpdateTeacher = () => {
  const teacherState = useSelector((state) => state.teacher);
  return (
    <>
      <FormLabel>Recently Added Teacher</FormLabel>
      <Table striped bordered hover variant="sm">
        <thead>
          <tr>
            <td>{teacherState.addTeacher.teacherName}</td>
            <td>{teacherState.addTeacher.teacherQualification}</td>
          </tr>
        </thead>
      </Table>
      <FormLabel>Recently Deleted Teacher</FormLabel>
      <Table striped bordered hover variant="sm">
        <thead>
          <tr>
            <td>{teacherState.deleteTeacher.teacherName}</td>
            <td>{teacherState.deleteTeacher.teacherQualification}</td>
          </tr>
        </thead>
      </Table>
      <FormLabel>Recently Updated Teacher</FormLabel>
      <Table striped bordered hover variant="sm">
        <thead>
          <tr>
            <td>{teacherState.updateTeacher.teacherName}</td>
            <td>{teacherState.updateTeacher.teacherQualification}</td>
          </tr>
        </thead>
      </Table>
    </>
  );
};

export default UpdateTeacher;
