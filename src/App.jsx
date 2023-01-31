import "./App.css";
import { registerUser } from "./services/registerUser";
import { useForm } from "react-hook-form";
export function App() {
  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
    watch,
    getValues,
  } = useForm({ mode: "onChange" });
  const onSubmit = (data) => {
    registerUser(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            Email
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: true,
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              })}
            />
          </label>
          {errors?.email?.type === "required" && (
            <span className="error" role="alert">
              email is required
            </span>
          )}
          {errors?.email?.type === "pattern" && (
            <span className="error" role="alert">
              email is invalid
            </span>
          )}
        </div>
        <div>
          <label>
            Name
            <input
              {...register("name", {
                required: true,
              })}
              placeholder="Name"
            />
            {errors?.name?.type === "required" && <p>name is required</p>}
          </label>
        </div>
        <div>
          <label>
            Age
            <input
              type="number"
              placeholder="Age"
              {...register("age", {
                required: true,
                min: 18,
              })}
            />
          </label>
          {errors?.age?.type === "required" && <p>age is required</p>}
          {errors?.age?.type === "min" && (
            <p>you must be above 18 to register</p>
          )}
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: true,
                minLength: 5,
              })}
            />
          </label>
          {errors?.password?.type === "required" && <p>password is required</p>}
          {errors?.password?.type === "minLength" && (
            <p>password is too short</p>
          )}
        </div>
        <div>
          <label>
            Password check
            <input
              type="password"
              placeholder="Password check"
              {...register("passwordCheck", {})}
            />
          </label>
          {watch("passwordCheck") !== watch("password") &&
          getValues("passwordCheck") ? (
            <p>passwords do not match</p>
          ) : null}
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              {...register("checkbox", {
                required: true,
              })}
            />
            Accept terms & conditions: Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Pellentesque pharetra, tortor ac placerat
            elementum, neque libero luctus mi, ut efficitur nisl mauris at nisl.
            Suspendisse non neque et neque facilisis convallis. Praesent erat
            magna, sollicitudin eu porttitor ut, tincidunt sit amet urna.
            Vestibulum congue neque metus.
          </label>
          {errors?.checkbox?.type === "required" && (
            <p>please read and accept the terms and conditions</p>
          )}
        </div>
        <button type="submit" disabled={!isDirty || !isValid}>
          Sign up
        </button>
      </form>
    </div>
  );
}
