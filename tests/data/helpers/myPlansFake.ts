const myPlansFake = (startDateIsTypeDate = false) => {
  return [
    {
      progress: 50,
      startDate: startDateIsTypeDate ? new Date('11/5/2021') : '11/5/2021',
      title: 'Study Swift',
    },
    {
      progress: 75,
      startDate: startDateIsTypeDate ? new Date('9/12/2021') : '9/12/2021',
      title: 'Study React Native',
    },
    {
      progress: 10,
      startDate: startDateIsTypeDate ? new Date('9/04/2021') : '9/04/2021',
      title: 'Documentation New App',
    },
  ];
};
export default myPlansFake;
