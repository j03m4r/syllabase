"use client";

import { useRouter } from "next/navigation";
import Container from "../general/Container";

const Navbar = () => {
    const router = useRouter();
    return (
        <div className="fixed w-full z-10 py-6 shadow-md">
            <Container>
                <div
                        className="
                            flex
                            flex-row
                            items-center
                            justify-between
                        ">
                            <div className="select-none text-4xl hover:cursor-pointer w-fit font-bold"
                            onClick={() => router.push("/dashboard")}>syllaBASE</div>
                            <div>User menu</div>
                    </div>
            </Container>
        </div>
    );
}

export default Navbar;