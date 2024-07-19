import { Button } from "../ui/button";

export const Header = () => {
    return (
        <header className="max-h-16 w-screen flex justify-center items-center px-3 py-3 border-b">
            <div className="flex w-full justify-between">
                <Button>Home</Button>
                <Button>Games</Button>
                <Button type="button" variant="default">Connexion</Button>
            </div>
        </header>
    );
};