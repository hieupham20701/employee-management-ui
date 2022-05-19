import React from 'react';
import {
  FaInfo,
  FaTrashAlt,
  FaPlusCircle,
  FaPencilAlt,
  FaEdit,
} from 'react-icons/fa';
import clsx from 'clsx';
import styles from './Employee.module.scss';
export default function Employee() {
  return (
    <>
      <span className={clsx([styles.btnDeleteEmployee])}>
        <FaTrashAlt />
      </span>
      <span className={clsx([styles.btnEditEmployee])}>
        <FaEdit />
      </span>
      <h4 className={clsx([styles.txtNameEmployee])}>Name</h4>
      <br />
      <hr></hr>
    </>
  );
}
