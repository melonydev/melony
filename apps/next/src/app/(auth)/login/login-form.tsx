"use client";

export default function LoginForm({ mutate }: { mutate: () => void }) {
	return (
		<div>
			<button onClick={() => mutate()}>click me</button>
		</div>
	);
}
