export const main_config = {
  grandWrapper: {
    html: "div",
    class: "grandWrapper",
    children: {
      dateCalendrier: {
        html: "div",
        class: "dateCalendrier",
        children: {
          statCalendrier: {
            html: "div",
            class: "statCalendrier",
          },
          dateWrapper: {
            html: "div",
            class: "dateWrapper",
            children: {
              monthsOuterWrapper: {
                html: "div",
                class: "monthsOuterWrapper",
                children: {
                  currentMonth: {
                    html: "div",
                    class: "currentMonth",
                  },
                  monthsInnerWrapper: {
                    html: "div",
                    class: "monthsInnerWrapper",
                    children: {
                      month1: { html: "div", class: "month" },
                      month2: { html: "div", class: "month" },
                      month3: { html: "div", class: "month" },
                      month4: { html: "div", class: "month" },
                      month5: { html: "div", class: "month" },
                      month6: { html: "div", class: "month" },
                      month7: { html: "div", class: "month" },
                      month8: { html: "div", class: "month" },
                      month9: { html: "div", class: "month" },
                      month10: { html: "div", class: "month" },
                      month11: { html: "div", class: "month" },
                      month12: { html: "div", class: "month" },
                    },
                  },
                },
              },
              yearWrapper: {
                html: "div",
                class: "yearWrapper",
                children: {
                  displayedYear: {
                    html: "div",
                    class: "displayedYear",
                  },
                  hiddenYear: {
                    html: "div",
                    class: "hiddenYear",
                  },
                },
              },
            },
          },
        },
      },
      outerWrapper: {},
      info: {},
    },
  },
};
