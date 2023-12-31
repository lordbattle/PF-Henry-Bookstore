import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../../redux/actions";
import style from "./UserTable.module.css";
import EditProfileDashboard from "./EditProfileDashboard";
import { isEmptyArray } from "formik";

const UserTable = () => {
  const dispatch = useDispatch();
  let users = useSelector((state) => state.users.results);
  if (!users) dispatch(getUsers());

  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [userEdit, setUserEdit] = useState([]);

  useEffect(() => {}, [dispatch]);
  console.log(users);
  const handleEditUserId = (event) => {

    let userSearch = users.filter((user) => user.id == event.target.name);
    setUserEdit(userSearch);
    // setUserEdit(event.tarjet.context)
  };

  const filterUserPagination = () => {
    if (search.length === 0) {
      return users?.slice(currentPage, currentPage + 3);
    } else {
      const usersNews = users.filter((user) =>
        user.userName.toLowerCase().includes(search.toLowerCase())
      );
      return usersNews.slice(currentPage, currentPage + 3);
    }
  };
  const back = () => {
    setUserEdit([]);
    users = dispatch(getUsers());
  };
  const nextPage = () => {
    if (users.length > currentPage + 3) setCurrentPage(currentPage + 3);
  };
  const PrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 3);
  };

  const onChangeSearch = (evento) => {
    setCurrentPage(0);
    setSearch(evento.target.value);
  };

  return (
    <div className={style.containerUsers}>
      {!isEmptyArray(userEdit) ? (
        <EditProfileDashboard back={back} userEdit={userEdit[0]} />
      ) : (
        <div className={style.containTable}>
          <h1>Users Table</h1>
          <input
            type="text"
            className="mb-2 form-control w-25"
            placeholder="Search User"
            onChange={onChangeSearch}
            value={search}
          />
          <table className={style.table}>
            <thead className={style.thead}>
              <tr>
                <th>ID</th>
                <th>UserName</th>
                <th>Email</th>
                <th>GoogleUser</th>
                <th>Active</th>
                <th>PerfilPic</th>
                <th>Actions</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filterUserPagination()?.map(
                ({ id, userName, email, googleUser, active, profilePic }) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{userName}</td>
                    <td>{email}</td>
                    <td>{googleUser ? "true" : "false"}</td>
                    <td>{active ? "true" : "false"}</td>
                    <td>
                      <img
                        src={profilePic}
                        className={style.imageUser}
                        alt={userName}
                      />
                    </td>
                    <td>
                      <button
                        className={style.buttonEdit}
                        key={id}
                        name={id}
                        onClick={handleEditUserId}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          <div>
            <button
              disabled={currentPage == 0 ? true : false}
              onClick={PrevPage}
              className="btn btn-primary"
            >
              Anteriores
            </button>
            &nbsp;
            {/* DAVID user.length me decia que no se leia la propiedad length, le deje solo users. Por favor verificar que este correctamente */}
            <button
              disabled={users?.length > currentPage + 3 ? false : true}
              onClick={nextPage}
              className="btn btn-primary"
            >
              Siguientes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
