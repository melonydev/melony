import { Centered, Form } from "melony/ui";
import { singIn } from "./actions";
import LoginForm from "./login-form";

export default function LoginPage() {
	return (
		<div className="h-screen flex justify-center items-center">
			<Form />
		</div>
	);
}
