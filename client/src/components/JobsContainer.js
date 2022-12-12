import { useEffect } from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAppContext } from "../context/appContext";
import Job from "./Job";
import Loading from "./Loading";
import PageBtnContainer from "./PageBtnContainer";
import Alert from "./Alert";

const JobsContainer = () => {
  const {
    getJobs,
    jobs,
    isLoading,
    page,
    totalJobs,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
    showAlert,
  } = useAppContext();

  useEffect(() => {
    getJobs();
    // eslint-disable-next-line
  }, [search, searchStatus, searchType, sort, page]);

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No Jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {numOfPages > 1 && <PageBtnContainer />}
      <h5>
        {totalJobs} Job{totalJobs > 1 && "s"} found
      </h5>

      {showAlert && <Alert />}

      {!isLoading ? (
        <div className="jobs">
          {jobs.map((job) => (
            <Job key={job._id} {...job} />
          ))}
        </div>
      ) : (
        <Loading center />
      )}
    </Wrapper>
  );
};

export default JobsContainer;
