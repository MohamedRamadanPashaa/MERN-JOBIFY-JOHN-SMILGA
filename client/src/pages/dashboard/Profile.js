import { useState } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useAppContext } from "../../context/appContext";
import { Alert, FormRow } from "../../components";

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !lastName || !location) {
      displayAlert();
      return;
    }

    updateUser({ name, email, lastName, location });
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="form">
        <h3>profile</h3>

        {showAlert && <Alert />}

        {/* name */}
        <div className="form-center">
          <FormRow
            type="text"
            value={name}
            name="name"
            handleChange={(e) => setName(e.target.value)}
          />

          <FormRow
            type="text"
            value={lastName}
            name="lastName"
            labelText="Last name"
            handleChange={(e) => setLastName(e.target.value)}
          />

          <FormRow
            type="email"
            value={email}
            name="email"
            handleChange={(e) => setEmail(e.target.value)}
          />

          <FormRow
            type="text"
            value={location}
            name="location"
            handleChange={(e) => setLocation(e.target.value)}
          />

          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default Profile;
