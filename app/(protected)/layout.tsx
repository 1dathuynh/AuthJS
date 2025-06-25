import Navbar from "./_component/navbar";

interface ProtectedLayoutProps {
	children : React.ReactNode;
}
const ProtectedLayout = ({children} : ProtectedLayoutProps) => {
	return (
		<div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-radial-[at_25%_75%]
		 from-indigo-500 via-purple-500 to-pink-500 to_50%">
			<Navbar />
			{children}
		</div>
	)
}

export default ProtectedLayout
