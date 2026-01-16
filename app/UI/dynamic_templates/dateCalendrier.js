const currentYear = new Date().getFullYear();
const previousYear = currentYear - 1;

// const getMonthNames = (monthIndex) => {
//     const date = new Date();
//     const raw_month = new Intl.DateTimeFormat("ru-RU", {
//         month: "long",
//     }).format(date);

//     const month = raw_month[0].toUpperCase() + raw_month.slice(1);
//     return month;
// }

export const my_dateCalendrier = {
    html: 'div',
    class: 'dateCalendrier',
    children: {
        statCalendrier: {
            html: 'div',
            class: 'statCalendrier',
            textContent: 'СТАТКАЛЕНДАРЬ'
        },
        dateWrapper: {
            html: 'div',
            class: 'dateWrapper',
            children: {
                monthsOuterWrapper: {
                    html: 'div',
                    class: 'monthsOuterWrapper',
                    children: {
                        currentMonth: {
                            html: 'div',
                            class: 'currentMonth',
                            textContent: 'Январь',
                        },
                        monthsInnerWrapper: {
                            html: 'div',
                            class: 'monthsInnerWrapper',
                            style: 'display: none',
                            children: {
                                m1: {
                                    html: 'div',
                                    class: 'month',
                                    textContent: 'Январь'
                                },
                                m2: {
                                    html: 'div',
                                    class: 'month',
                                    textContent: 'февраль'
                                }
                            }
                        }
                    }
                },
                yearWrapper: {
                    html: 'div',
                    class: 'yearWrapper',
                    children: {
                        displayedYear: {
                            html: 'div',
                            class: 'displayedYear',
                            textContent: currentYear
                        },
                        hiddenYear: {
                            html: 'div',
                            class: 'hiddenYear',
                            textContent: previousYear
                        }
                    }
                }
            }
        }
    }
};