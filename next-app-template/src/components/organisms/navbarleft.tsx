// Navbar component to the left of the page
import { Button } from "@nextui-org/button";

export const Navbarleft = () => {
    return (
        <menu className="bg-light text-white flex shadow">
            <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <Button 
            className="light:bg-light dark:bg-dark text-white">
                Home</Button>
            <Button className="light:bg-light dark:bg-dark text-white">About</Button>
            <Button className="light:bg-light dark:bg-dark text-white">Contact</Button>
            </div>
        </menu>
    );
}