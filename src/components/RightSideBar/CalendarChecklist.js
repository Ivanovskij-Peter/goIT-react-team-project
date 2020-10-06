import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteHabitAndGetAllHabits } from "../../redux/operations";
import style from "./rightSideBar.module.css";
import { authToken, userHabits, usersHabitsDates } from "../../redux/selectors";
import moment from "moment";

export const CalendarChecklist = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const userHabitsDates = usersHabitsDates(state);
  const dateToday = new Date();
  const dateNow = moment(dateToday).format();
  const arr = [];
  const allUserHabits = userHabits(state);

  // allUserHabits.map((habites) =>
  //   userHabitsDates.map((dates) => {
  //     if (habites._id === dates.habitId) {
  //       dates.dates.forEach((date) => {
  //         if (dateNow.split("T")[0] === date.split("T")[0]) {
  //           arr.push(habites);
  //         }
  //       });
  //     }
  //   })
  // );

  // ниже более логичный вариант этой функции

  allUserHabits.map((habits) =>
    userHabitsDates.map(
      (dates) =>
        habits._id === dates.habitId &&
        dates.dates.map(
          (date) => dateNow.split("T")[0] === date.split("T")[0] && arr.push(habits)
        )
    )
  );

  const deleteHabit = (id) => {
    dispatch(deleteHabitAndGetAllHabits(id, authToken(state)));
  };

  const checkIfHabitDoneTodaay = (idOfHabit, element, arrOfAllDates) => {
    // console.log(element);

    // находим даты конкретно это привычки
    const dates = arrOfAllDates.find((el) => el.habitId === idOfHabit).dates;

    // ищем индекс нужного елемента для записи в массив

    const indx = dates.find((el, idx) =>
      el.split("T")[0] === dateNow.split("T")[0] ? el[idx] : ""
    );
    const indexOfDate = dates.indexOf(indx);

    const trueOrFalse = arr.find((el) => el._id === idOfHabit).data[
      indexOfDate
    ];

    return trueOrFalse;
  };

  return (
//       {arr.length ? (
//         <>
//           <p className={style.calendarHabitsHeader}>Привычки на сегодня</p>
//           <ul className={style.calendarChecklist}>
//             {arr.map((el) => (
//               <li key={el._id} className={style.calendarItem}>
//                 <div className={style.calendarChecklistItem}>
//                   <span
//                     className={
//                       false
//                         ? style.calendarChecklistItemProgress
//                         : style.calendarChecklistItemProgressDone
//                     }
//                   >
//                     {false && "time"}
//                   </span>
//                   <span
//                     className={
//                       false
//                         ? style.calendarChecklistItemText
//                         : style.calendarChecklistItemTextDone
//                     }
//                   >
//                     {el.name}
//                   </span>
//                   <button
//                     onClick={() => deleteHabit(el._id)}
//                     className={style.calendarChecklistItemButton}
//                   ></button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </>
//       ) : (
//         <p className={style.notificationText}>
//           Сегодня у Вас нет привычек, над которыми нужно работать
//         </p>
//       )}
//     </>

    <ul className={style.calendarChecklist}>
      {arr.sort().map((el) => (
        <li key={el._id} className={style.calendarItem}>
          <div className={style.calendarChecklistItem}>
            <div className={style.iconWrapper}>
              <span
                className={
                  checkIfHabitDoneTodaay(el._id, el, userHabitsDates)
                    ? style.calendarChecklistItemProgressDone
                    : style.calendarChecklistItemProgress
                }
              >
                {checkIfHabitDoneTodaay(el._id, el, userHabitsDates)
                  ? ""
                  : el.planningTime.split(" ")[4].slice(0, 5)}
              </span>
            </div>
            <span
              className={
                checkIfHabitDoneTodaay(el._id, el, userHabitsDates)
                  ? style.calendarChecklistItemTextDone
                  : style.calendarChecklistItemText
              }
            >
              {el.name}
            </span>
            <button
              onClick={() => deleteHabit(el._id)}
              className={style.calendarChecklistItemButton}
            ></button>
          </div>
        </li>
      ))}
    </ul>

  );
};
