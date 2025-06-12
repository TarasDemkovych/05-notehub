import css from "./ErrorMessage.module.css";
import { BiError } from "react-icons/bi";

export default function ErrorMessage() {
  return (
    <div className={css.error_text}>
      <BiError size={120} />
      <hr />
      <p>There was an error, please try again...</p>
    </div>
  );
}