import Image from 'next/image'

export default function Home() {
  return (
	<div className="flex w-full h-full justify-center items-center text-6xl font-bold">
		<a className="flex p-10 rounded-md bg-grape justify-center items-center cursor-pointer shadow-md hover:shadow-2xl hover:shadow-teal hover:text-teal duration-300 text-white text-3xl font-bold">
			Syllabase
		</a>
	</div>
  )
}
