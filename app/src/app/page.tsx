import Image from "next/image";

export default function Home() {
    return (
        <main className="flex min-h-[calc(100vh-57px)] flex-col items-center justify-between p-24">
            <h1 className="text-4xl font-bold">Bienvenue sur le site de Quiz</h1>
            <Image src="/assets/quizLogo.svg" alt="Quiz Marseille" width={200} height={200}/>
            <p className="text-lg text-center">
                Jouez à des quiz et testez vos connaissances
            </p>
        </main>
    );
}
