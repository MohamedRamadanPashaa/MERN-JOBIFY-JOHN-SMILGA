import Wrapper from "../assets/wrappers/StatItem";

const StatsItem = ({ title, icon, color, bcg, count }) => {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <div className="icon">{icon}</div>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  );
};
export default StatsItem;
