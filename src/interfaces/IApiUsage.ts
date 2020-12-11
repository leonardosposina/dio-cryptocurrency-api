interface IApiUsage {
  current_day: {
    credits_used: number;
    credits_left: number;
  };
  current_month: {
    credits_used: number;
    credits_left: number;
  };
}

export default IApiUsage;
