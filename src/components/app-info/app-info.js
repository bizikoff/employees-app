import './app-info.css';

const AppInfo = (props) => {
  const { employees, employeesOnIncrease } = props;

  return (
    <div className="app-info">
      <h1>Учет сотрудников к компании N</h1>
      <h2>Общее число сотрудников: {employees}</h2>
      <h2>Премию получат: {employeesOnIncrease}</h2>
    </div>
  );
}

export default AppInfo;